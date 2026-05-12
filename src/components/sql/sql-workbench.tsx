"use client";

import { useEffect, useMemo, useState } from "react";
import * as duckdb from "@duckdb/duckdb-wasm";

type CatalogColumn = {
  name: string;
  type: string;
};

type CatalogTable = {
  name: string;
  row_count: number;
  formats: {
    json: string;
    csv: string;
    parquet: string;
  };
  columns: CatalogColumn[];
};

type SampleQuery = {
  id: string;
  title: string;
  sql: string;
};

type Catalog = {
  generated_at: string;
  dataset_base_url: string;
  privacy: string;
  tables: CatalogTable[];
  sample_queries: SampleQuery[];
};

type QueryResult = {
  columns: string[];
  rows: Record<string, unknown>[];
};

type ConnectionState =
  | { status: "loading"; message: string }
  | { status: "ready"; message: string }
  | { status: "error"; message: string };

function encodeQuery(query: string) {
  const bytes = new TextEncoder().encode(query);
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function decodeQuery(encoded: string) {
  const normalized = encoded.replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "="
  );
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function formatCell(value: unknown) {
  if (value === null || value === undefined) return "";
  if (typeof value === "bigint") return value.toString();
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function rowsFromArrow(table: { schema: { fields: Array<{ name: string }> }; toArray: () => unknown[] }) {
  const columns = table.schema.fields.map((field) => field.name);
  const rows = table.toArray().map((row) => {
    const record: Record<string, unknown> = {};
    for (const column of columns) {
      const value =
        row && typeof row === "object" && column in row
          ? (row as Record<string, unknown>)[column]
          : null;
      record[column] = value;
    }
    return record;
  });

  return { columns, rows };
}

function pickChartColumns(result: QueryResult) {
  const numeric = result.columns.find((column) =>
    result.rows.some((row) => Number.isFinite(Number(row[column])))
  );
  if (!numeric) return null;

  const label =
    result.columns.find((column) => column !== numeric) ?? result.columns[0];

  return { label, numeric };
}

function ResultChart({ result }: { result: QueryResult }) {
  const chart = pickChartColumns(result);
  if (!chart || result.rows.length === 0) return null;

  const rows = result.rows
    .slice(0, 10)
    .map((row) => ({
      label: formatCell(row[chart.label]) || "row",
      value: Number(row[chart.numeric]),
    }))
    .filter((row) => Number.isFinite(row.value));

  const max = Math.max(...rows.map((row) => row.value), 1);

  return (
    <div className="rounded-3xl border border-[--border] bg-[--surface] p-4">
      <p className="meta-line">quick chart</p>
      <div className="mt-4 space-y-3">
        {rows.map((row) => (
          <div
            key={`${row.label}-${row.value}`}
            className="grid gap-2 sm:grid-cols-[minmax(120px,0.35fr)_minmax(0,1fr)_4rem]"
          >
            <span className="truncate text-xs text-[--fg-muted]">{row.label}</span>
            <span className="h-3 overflow-hidden rounded-full bg-[--surface-strong]">
              <span
                className="block h-full rounded-full bg-[--accent]"
                style={{ width: `${Math.max((row.value / max) * 100, 2)}%` }}
              />
            </span>
            <span className="text-right font-mono text-xs text-[--fg-muted]">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SQLWorkbench() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [connection, setConnection] = useState<duckdb.AsyncDuckDBConnection | null>(
    null
  );
  const [state, setState] = useState<ConnectionState>({
    status: "loading",
    message: "Loading dataset catalog...",
  });
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<QueryResult | null>(null);
  const [explain, setExplain] = useState<QueryResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    let worker: Worker | null = null;
    let workerUrl: string | null = null;

    async function boot() {
      try {
        const catalogResponse = await fetch("/data/catalog.json", {
          cache: "no-store",
        });
        if (!catalogResponse.ok) {
          throw new Error("Could not load /data/catalog.json");
        }

        const loadedCatalog = (await catalogResponse.json()) as Catalog;
        const bundles = duckdb.getJsDelivrBundles();
        const bundle = await duckdb.selectBundle(bundles);
        workerUrl = URL.createObjectURL(
          new Blob([`importScripts("${bundle.mainWorker}");`], {
            type: "text/javascript",
          })
        );

        worker = new Worker(workerUrl);
        const db = new duckdb.AsyncDuckDB(new duckdb.ConsoleLogger(), worker);
        await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

        const conn = await db.connect();
        const baseUrl = loadedCatalog.dataset_base_url || "/data";

        setState({
          status: "loading",
          message: "Registering public dataset files...",
        });

        for (const table of loadedCatalog.tables) {
          const fileName = table.formats.csv;
          const fileUrl = new URL(
            `${baseUrl.replace(/\/$/, "")}/${fileName}`,
            window.location.origin
          ).toString();

          const csvResponse = await fetch(fileUrl, { cache: "no-store" });
          if (!csvResponse.ok) {
            throw new Error(`Could not load ${fileName}`);
          }
          await db.registerFileText(fileName, await csvResponse.text());

          await conn.query(
            `CREATE OR REPLACE TABLE ${table.name} AS SELECT * FROM read_csv_auto('${fileName}', header=true);`
          );
        }

        if (cancelled) return;

        const initialQuery =
          window.location.hash.startsWith("#q=") && window.location.hash.length > 3
            ? decodeQuery(window.location.hash.slice(3))
            : loadedCatalog.sample_queries[0]?.sql ?? "SELECT 1 AS ready;";

        setCatalog(loadedCatalog);
        setConnection(conn);
        setQuery(initialQuery);
        setState({
          status: "ready",
          message: "DuckDB-WASM is ready. Query the public portfolio dataset.",
        });
      } catch (bootError) {
        if (cancelled) return;
        setState({
          status: "error",
          message:
            bootError instanceof Error
              ? bootError.message
              : "Failed to initialize DuckDB-WASM.",
        });
      }
    }

    boot();

    return () => {
      cancelled = true;
      worker?.terminate();
      if (workerUrl) URL.revokeObjectURL(workerUrl);
    };
  }, []);

  const canRun = state.status === "ready" && Boolean(connection);

  const rowCount = useMemo(() => {
    return catalog?.tables.reduce((sum, table) => sum + table.row_count, 0) ?? 0;
  }, [catalog]);

  async function runQuery(nextQuery = query) {
    if (!connection) return;
    setError("");
    setExplain(null);
    setState({ status: "loading", message: "Running query..." });

    try {
      const arrow = await connection.query(nextQuery);
      setResult(rowsFromArrow(arrow));
      setQuery(nextQuery);
      window.history.replaceState(null, "", `#q=${encodeQuery(nextQuery)}`);
      setState({
        status: "ready",
        message: "Query complete.",
      });
    } catch (queryError) {
      setError(
        queryError instanceof Error
          ? queryError.message
          : "DuckDB could not run this query."
      );
      setState({
        status: "ready",
        message: "Query failed. Edit the SQL and try again.",
      });
    }
  }

  async function explainQuery() {
    if (!connection) return;
    setError("");
    try {
      const arrow = await connection.query(`EXPLAIN ${query}`);
      setExplain(rowsFromArrow(arrow));
    } catch (explainError) {
      setError(
        explainError instanceof Error
          ? explainError.message
          : "DuckDB could not explain this query."
      );
    }
  }

  function copyShareUrl() {
    const url = `${window.location.origin}${window.location.pathname}#q=${encodeQuery(
      query
    )}`;
    void navigator.clipboard.writeText(url);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="surface-card p-5">
        <p className="eyebrow">dataset catalog</p>
        <p className="mt-3 text-sm leading-7 text-[--fg-muted]">
          {catalog
            ? `${catalog.tables.length} tables, ${rowCount} public rows`
            : "Loading schema..."}
        </p>
        {catalog ? (
          <div className="mt-5 space-y-4">
            {catalog.tables.map((table) => (
              <details key={table.name} className="rounded-2xl border border-[--border] p-3" open>
                <summary className="cursor-pointer font-mono text-xs text-[--accent]">
                  {table.name} · {table.row_count}
                </summary>
                <div className="mt-3 space-y-2">
                  {table.columns.map((column) => (
                    <div
                      key={column.name}
                      className="flex items-center justify-between gap-3 text-xs"
                    >
                      <span className="font-mono text-[--fg]">{column.name}</span>
                      <span className="text-[--fg-muted]">{column.type}</span>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        ) : null}
      </aside>

      <section className="space-y-5">
        <div className="surface-card p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">query workbench</p>
              <p className="mt-2 text-sm text-[--fg-muted]">{state.message}</p>
            </div>
            <span
              className={`pill w-fit ${
                state.status === "error" ? "text-[--danger]" : "text-[--accent]"
              }`}
            >
              {state.status}
            </span>
          </div>

          {catalog ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {catalog.sample_queries.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  className="pill cursor-pointer hover:border-[--accent] hover:text-[--accent]"
                  onClick={() => {
                    setQuery(sample.sql);
                    void runQuery(sample.sql);
                  }}
                  disabled={!canRun}
                >
                  {sample.title}
                </button>
              ))}
            </div>
          ) : null}

          <label className="mt-5 block">
            <span className="sr-only">SQL query</span>
            <textarea
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-h-64 w-full resize-y rounded-3xl border border-[--border] bg-[--code-bg] p-4 font-mono text-sm leading-7 text-[--fg] outline-none transition focus:border-[--accent]"
              spellCheck={false}
            />
          </label>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              className="button-primary cursor-pointer"
              onClick={() => void runQuery()}
              disabled={!canRun}
            >
              Run query
            </button>
            <button
              type="button"
              className="button-secondary cursor-pointer"
              onClick={() => void explainQuery()}
              disabled={!canRun}
            >
              Explain
            </button>
            <button
              type="button"
              className="button-secondary cursor-pointer"
              onClick={copyShareUrl}
              disabled={!query}
            >
              Copy share URL
            </button>
          </div>

          {error ? (
            <pre className="mt-4 whitespace-pre-wrap rounded-3xl border border-[--danger] bg-[color-mix(in_srgb,var(--danger)_10%,transparent)] p-4 font-mono text-xs leading-6 text-[--danger]">
              {error}
            </pre>
          ) : null}
        </div>

        {explain ? (
          <div className="surface-card p-5">
            <p className="eyebrow">explain plan</p>
            <pre className="mt-4 overflow-x-auto rounded-3xl bg-[--code-bg] p-4 font-mono text-xs leading-6 text-[--fg-muted]">
              {explain.rows.map((row) => Object.values(row).map(formatCell).join(" ")).join("\n")}
            </pre>
          </div>
        ) : null}

        {result ? (
          <>
            <ResultChart result={result} />
            <div className="surface-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-[--border] px-5 py-4">
                <p className="eyebrow">result</p>
                <span className="font-mono text-xs text-[--fg-muted]">
                  {result.rows.length} rows
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                  <thead className="bg-[--surface-strong] font-mono text-xs uppercase tracking-[0.14em] text-[--fg-muted]">
                    <tr>
                      {result.columns.map((column) => (
                        <th key={column} className="border-b border-[--border] px-4 py-3">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.slice(0, 100).map((row, index) => (
                      <tr key={index} className="border-b border-[--border] last:border-b-0">
                        {result.columns.map((column) => (
                          <td key={column} className="max-w-xs truncate px-4 py-3 text-[--fg-muted]">
                            {formatCell(row[column])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}

#!/usr/bin/env python3
from pathlib import Path

import duckdb


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DATA = ROOT / "public" / "data"
DIST = ROOT / "data" / "dist"

TABLES = [
    "posts",
    "projects",
    "til",
    "github_repos",
    "coding_stats",
]


def main() -> None:
    DIST.mkdir(parents=True, exist_ok=True)
    con = duckdb.connect()

    for table in TABLES:
        csv_path = PUBLIC_DATA / f"{table}.csv"
        parquet_path = DIST / f"{table}.parquet"
        if not csv_path.exists():
            raise FileNotFoundError(f"Missing source table: {csv_path}")

        con.execute(
            f"""
            COPY (
              SELECT * FROM read_csv_auto('{csv_path.as_posix()}', header=true)
            )
            TO '{parquet_path.as_posix()}'
            (FORMAT PARQUET, COMPRESSION ZSTD);
            """
        )
        print(f"[parquet] wrote {parquet_path}")

    for sidecar in ["catalog.json"]:
        source = PUBLIC_DATA / sidecar
        target = DIST / sidecar
        target.write_bytes(source.read_bytes())
        print(f"[parquet] copied {target}")


if __name__ == "__main__":
    main()

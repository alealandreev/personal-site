import { readFileSync } from "fs";
import { join } from "path";

export type DatasetCatalog = {
  generated_at: string;
  dataset_base_url: string;
  privacy: string;
  tables: Array<{
    name: string;
    row_count: number;
    columns: Array<{ name: string; type: string }>;
  }>;
  sample_queries: Array<{ id: string; title: string; sql: string }>;
};

export function getDatasetCatalog(): DatasetCatalog | null {
  try {
    return JSON.parse(
      readFileSync(join(process.cwd(), "public", "data", "catalog.json"), "utf8")
    ) as DatasetCatalog;
  } catch {
    return null;
  }
}

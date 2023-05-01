import 'dotenv/config';
import * as process from "process";

interface envConfig {
  readonly DIRECTUS_HOST: string
  readonly SCHEMA_EXPORT_DIR: string
  readonly TRANSFORM_SCHEMA_LIST: string[]
}
export const config: envConfig = {
  DIRECTUS_HOST: process.env.DIRECTUS_HOST ?? 'http://127.0.0.1:8055',
  SCHEMA_EXPORT_DIR: process.env.SCHEMA_EXPORT_DIR ?? './export',
  TRANSFORM_SCHEMA_LIST: process.env.TRANSFORM_SCHEMA_LIST?.split(", ") ?? []
}
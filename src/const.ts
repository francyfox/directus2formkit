import 'dotenv/config';
import dotenv from 'dotenv';
import mri from 'mri';

const args = mri(process.argv.slice(2));

if (args.help || args.h) {
  console.log(`\
formkit-generate --env <env-path>
  ` )
  process.exit(0)
}

if (!args.env) {
  console.log(`set argument --env '/absolute/path/to/.env'`)
  process.exit(0)
}

dotenv.config({
  path: args.env
})

interface envConfig {
  readonly DIRECTUS_HOST: string
  readonly SCHEMA_EXPORT_DIR: string
  readonly TRANSFORM_SCHEMA_LIST: string[]
  readonly ADMIN_EMAIL: string
  readonly ADMIN_PASSWORD: string
}
export const config: envConfig = {
  DIRECTUS_HOST: process.env.DIRECTUS_HOST ?? 'http://127.0.0.1:8055',
  SCHEMA_EXPORT_DIR: process.env.SCHEMA_EXPORT_DIR ?? './export',
  TRANSFORM_SCHEMA_LIST: process.env.TRANSFORM_SCHEMA_LIST?.split(", ") ?? [],
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? '',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? ''
}
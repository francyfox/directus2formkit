# DirectUs2FormKit Schema Transform (not ready)

- Type: module
- Directus =< 9.25.0 
- Formkit Beta 16
 
### How to use
Set env variables
- DIRECTUS_HOST (example `"http://127.0.0.1:8055"`)
- SCHEMA_EXPORT_DIR (example `"./export"`)
- TRANSFORM_SCHEMA_LIST (example `"post, textblock, directus_users"`)

Use npm cli command `pnpm run formkit-generate`


or run file from dist `node ./dist/index.js`. If you globally 
installed `bun` use `pnpm run dev`


### Test

Run command `pnpm run test`


### TODO

- replace to formkit icons
- i18n
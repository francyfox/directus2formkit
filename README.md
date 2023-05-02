# DirectUs2FormKit Schema Transform (not ready)

Transform directus fields schema from api to formkit json file

`pnpm i -D @francyfox/directus2formkit`

- Type: module
- Directus =< 9.25.0 
- Formkit Beta 16
 
### How to use
Set env variables
- DIRECTUS_HOST (example `"http://127.0.0.1:8055"`)
- SCHEMA_EXPORT_DIR (example `"./export"`)
- TRANSFORM_SCHEMA_LIST (example `"post, textblock, directus_users"`)
- ADMIN_EMAIL
- ADMIN_PASSWORD

Use npm cli command `formkit-generate --env '/absolute/path/to/.env'`
or run file from dist `node @francyfox/directus2formkit/dist/cli.js`.


### Test

Run command `pnpm run test`

### TODO

- replace to formkit icons
- i18n

### Update

#### v1.0.1

- Add auth data to env variables
- Fix console command. Add arg --env, users can set own env absolute path
- Checks vars on empty
- Add errors on bad response status

#### v1.0.0
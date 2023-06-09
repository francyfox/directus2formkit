import path from 'node:path';
import { constants } from 'node:fs';
import { writeFile, mkdir, access } from 'node:fs/promises'
import { FormkitElement } from "./formkit.element";
import { IFormKitElement } from "./formkit.types";
import { config } from "../../const";
export default class FormkitSchemaGenerator {
  collections: string[]
  excludeFields = [
    'id',
    'user_created',
    'user_updated',
    'date_created',
    'date_updated',
    'sort',
  ]
  constructor(collections: string[]) {
    this.collections = collections
    this.isFilled()
  }

  isFilled() {
    const authInfoFilled = config.ADMIN_EMAIL !== '' && config.ADMIN_PASSWORD !== ''
    const configJSON = JSON.stringify(config, null, 4)
    if (!authInfoFilled) {
      throw new Error(`Required env vars is empty (ADMIN_EMAIL, ADMIN_PASSWORD) \t ${configJSON}`)
    } else if (this.collections.length === 0) {
      throw new Error(`Collection names TRANSFORM_SCHEMA_LIST is empty \t ${configJSON}`)
    }
  }

  async token(): Promise<string> {
    try {
      await fetch(`${config.DIRECTUS_HOST}/server/ping`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (e) {
      throw new Error('Connection refused. Directus offline')
    }

    try {

    } catch (e) {

    }
    const response = await fetch(`${config.DIRECTUS_HOST}/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: config.ADMIN_EMAIL,
        password: config.ADMIN_PASSWORD
      })
    })

    if (response.status !== 200) {
      console.log(response)
      throw new Error(`Auth error`)
    }

    const { data } = await response.json()

    return data.access_token
  }

  async FieldList() {
    const token = await this.token()
    const collections = await this.FieldCollections(token)

    const patterns = this.collections.reduce(((acc: any, currentValue) =>
            [...acc, `^${currentValue}$`]),
        [])

    return collections.filter(
        (i: any) => {
          return i.collection.match(new RegExp(`${patterns.join('|')}`), 'g')
              && !i.field.match(new RegExp(`${this.excludeFields.join('|')}`), 'g')
        }
    )
  }

  async FieldCollections(token: string) {
    const response = await fetch(`${config.DIRECTUS_HOST}/fields?fields=collection,field,meta.*`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        Authorization: `Bearer ${token}`
      }
    })

    // #TODO: On rest filter dont work, may be on graphql?

    const { data } = await response.json() as { data: IFormKitElement[]}

    return data
  }

  async translate2FormKitSchema() {
    const fields = await this.FieldList()
    const schema: any  = {}

    for (const field of fields) {
      const el = FormkitElement(field)

      if (el !== null) {
        if (!schema[field.collection]) {
          schema[field.collection] = []
        }

        schema[field.collection].push(el)
      }
    }

    return schema
  }

  async saveFile() {
    const collectionList = await this.translate2FormKitSchema()

    for (const schema in collectionList) {
      const filename = `${config.SCHEMA_EXPORT_DIR}/schema.${schema}.json`
      const dirname = path.dirname(filename);

      try {
        await access(dirname, constants.F_OK)
      } catch (e) {
        await mkdir(dirname, { recursive: true })
      }

      try {
        await writeFile(filename, JSON.stringify(collectionList[schema], null, 2))
        console.log(`[OK] - ${schema}`)
      } catch (e) {
        throw new Error('Cant write file')
      }
    }

    return true
  }
}
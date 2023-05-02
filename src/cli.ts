#!/usr/bin/env node

import FormkitSchemaGenerator from "./module/formkit/formkit.schema-generator";
import { config } from "./const";

async function execute() {
  const generator = new FormkitSchemaGenerator(config.TRANSFORM_SCHEMA_LIST);
  const isFine = await generator.saveFile()

  if (isFine) {
    console.log(`Schema successfully generated to ${config.SCHEMA_EXPORT_DIR}`)
  }
}


execute()
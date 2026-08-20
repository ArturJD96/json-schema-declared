import type { Metaschema, MetaschemaByID, MetaschemaByVersion } from "./../index"

const id = "https://json-schema.org/draft/2020-12/schema" as const
const version = "2020-12"

const test1: MetaschemaByID<typeof id>['$id'] = id
const test2: MetaschemaByVersion<typeof version>['$id'] = test1

const test3: Metaschema<typeof id>['$id'] = id;
const test4: Metaschema<typeof version>['$id'] = id;

const raw1: Metaschema<"2020-12", true>['allOf'][0]["$ref"] = "meta/core"

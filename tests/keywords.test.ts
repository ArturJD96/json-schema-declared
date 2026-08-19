import type { Keywords } from "./../index"

type Test<T, E extends T = T> = E

type KeywordsExtractedManually =
// Schema File
| "definitions" | "dependencies" | "$recursiveAnchor" | "$recursiveRef"
// Meta Core
| "$id" | "$schema" | "$ref" | "$anchor" | "$dynamicRef" | "$dynamicAnchor" | "$vocabulary" | "$comment" | "$defs"
// Meta Applicator
| "prefixItems" | "items" | "contains" | "additionalProperties" | "properties" | "patternProperties" | "dependentSchemas" | "propertyNames" | "if" | "then" | "else" | "allOf" | "anyOf" | "oneOf" | "not"
// Meta Unevaluated
| "unevaluatedItems" | "unevaluatedProperties"
// Meta Validation
| "type" | "const" | "enum" | "multipleOf" | "maximum" | "exclusiveMaximum" | "minimum" | "exclusiveMinimum" | "maxLength" | "minLength" | "pattern" | "maxItems" | "minItems" | "uniqueItems" | "maxContains" | "minContains" | "maxProperties" | "minProperties" | "required" | "dependentRequired"
// Meta Meta-Data
| "title" | "description" | "default" | "deprecated" | "readOnly" | "writeOnly" | "examples"
// Meta Format Annotations
| "format"
// Meta Content
| "contentEncoding" | "contentMediaType" | "contentSchema"

type Case1 = Test<Keywords<"2020-12">, KeywordsExtractedManually>
type Case2 = Test<KeywordsExtractedManually, Keywords<"https://json-schema.org/draft/2020-12/schema">>

let Case1: Case1, Case2: Case2

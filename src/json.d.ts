/**
 * All types encountered while traversing Json.
 *
 * Valid values for any JSON node according to RFC 8259,
 * "The JavaScript Object Notation (JSON) Data Interchange Format" specification
 * (source: https://datatracker.ietf.org/doc/html/rfc8259#section-3):
 * ```
 * false / null / true / object / array / number / string
 * ````
 * We represent:
 * * `false` and `true` together, as `boolean`;
 * * `object` as Json type;
 * * `array` as Json[] type.
 */
type Json = Leaf | Leaf[] | JsonObject // TO DO: rename to JsonNode
type JsonObject = { [k: string]: Json | Json[] } // to do: [k: string]
type JsonArray = { [k: number]: Leaf | JsonObject } // To DO: implement it fully
type Leaf = boolean | null | number | string
type JsonKey = string | number

/**
 * Utility type for distinguishing schemas vs. ordinary JSON objects.
 */
type MinimalJsonSchema = JsonObject & { "$schema": MetaschemaId }

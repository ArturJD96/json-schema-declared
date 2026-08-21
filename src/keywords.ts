import type { Metaschema, MetaschemaVersion, AllMetaschemaId } from "./metaschemas"
import type { JsonObject } from "./utils/json"
import type { Merge } from "./utils/merge"

/**
 * A **quick'n'dirty** implementation of AllOf keyword
 * in how it's used in top-level JSON schema metaschemas.
 */
type AllOf<J extends JsonObject> = J extends { "allOf": JsonObject[] } ? Merge<[Omit<J, 'allOf'>, Merge<J['allOf']>]> : J


/**
 * Lists all the JSON schema keywords for a given version.
 * @example Keywords<"draft-00">
 * @example Keywords<"draft-07">
 * @example Keywords<"2020-12">
 * @example Keywords<"https://json-schema.org/draft/2020-12/schema">
 */
export type Keywords<T extends MetaschemaVersion | AllMetaschemaId, M extends JsonObject = Metaschema<T>> = keyof AllOf<M>['properties']
// export type Keywords<T extends MetaschemaVersion, M = MetaschemaByVersion<T>> = keyof AllOf<M>['properties']

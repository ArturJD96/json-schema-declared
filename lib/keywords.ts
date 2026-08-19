import type { MetaschemaVersion, MetaschemaByVersion } from "./metaschemas"
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
 */
/*
  NOTE:
  The implementation defers execusion of type checking,
  so that TS does not unfolds all dereferenced types at once
  (and throw ts2589 error).
*/
export type Keywords<Version extends MetaschemaVersion, M extends JsonObject = MetaschemaByVersion<Version>> = M extends unknown ? keyof AllOf<M>['properties'] : never

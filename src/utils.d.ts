/**
 * Forces object `O` to list all values of K as keys with value V.
 */
type ForEach<K, V, O extends Record<K, V>> = O

/**
 * Extract from union Given the key `K` exists in object `O`, extract it's type.
 */
type ExtractKey<O extends object, K extends string> = Extract<O, { [key in K]: string }>[K]

/**
 * Extract keys belonging to **any** object of a union.
 *
 * _Note:_ `keyof A|B` returns keys existing **both** on `A` and `B`.
 */
type KeysOfUnion<T> = T extends unknown ? keyof T : never;

/**
 * Union to Intersection
 * Adapted from https://stackoverflow.com/a/50375286/21565668
 */
type UtoI<U> = (U extends any ? (x: U)=>void : never) extends ((x: infer I)=>void) ? I : never

/**
 * A **quick'n'dirty** implementation of AllOf keyword
 * in how it's used in top-level JSON schema metaschemas.
 */
type AllOf<J extends JsonObject> = J extends { "allOf": unknown[] } ? Merge<[Omit<J, 'allOf'>, Merge<J['allOf']>]> : J

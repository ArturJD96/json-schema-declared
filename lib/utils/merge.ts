import type { JsonArray, JsonObject, Leaf } from "./json";

/**
 * Extract keys belonging to **any** object of a union.
 *
 * _Note:_ `keyof A|B` returns keys existing **both** on `A` and `B`.
 */
type KeysOfUnion<T> = T extends unknown ? keyof T : never;


/**
 * Merge two object (unions) so that all their keys share types of all the objects.
 */
export type Merge<
  J extends JsonObject | JsonArray,
  U extends JsonObject = J extends unknown[] ? J[number] : J,
  K extends keyof U = keyof U
> = {

  // Shared keys.
  [P in K]: U[P] extends Leaf ? U[P] : U[P] extends JsonObject ? Merge<U[P]> : U[P];

} & {

  // Unique keys.
  [K in Exclude<KeysOfUnion<U>, keyof U>]: Extract<U, { [k in K]: any }>[K]

}

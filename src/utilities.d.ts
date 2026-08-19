/**
 * Extract keys belonging to **any** object of a union.
 *
 * _Note:_ `keyof A|B` returns keys existing **both** on `A` and `B`.
 */
export type KeysOfUnion<T> = T extends unknown ? keyof T : never;

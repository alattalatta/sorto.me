/**
 * Map over a value that can be either an array or a single value.
 *
 * @param fn Mapping function to use.
 * @param maybeArray A value that _can_ be an array.
 * @returns
 * - When the value is an array, returns a result of `maybeArray.map(fn)`.
 * - Otherwise, returns a result of `[fn(maybeArray)]`. Note that it's returned as a single-element array.
 */
export function mapOver<T, U>(maybeArray: T | T[], fn: (val: T, index?: number) => U): U[] {
  return Array.isArray(maybeArray) ? maybeArray.map(fn) : [fn(maybeArray, 0)]
}

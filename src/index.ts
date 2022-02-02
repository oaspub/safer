import {
  Safer,
  SaferArray,
  SaferBoolean,
  SaferInteger,
  SaferIntersection,
  SaferNot,
  SaferNumber,
  SaferObject,
  SaferRequired,
  SaferString,
  SaferUnion
} from './parsers'

export type Not<T> = Exclude<string | number | boolean | null | any[] | Record<string, any>, T>

export type Unpacked<T> = T extends Array<Safer<infer U>> ? U : T

export type Infer<T> =
  | T extends SaferArray<infer U> ? U[] | undefined
    : T extends SaferObject<infer U> ? U extends string
      ? Record<string, unknown> | undefined // Dynamic property names
      : { [K in keyof U]: U[K] } | undefined
      : T extends SaferString<infer U> ? U
        : T extends SaferNumber<infer U> ? U
          : T extends SaferInteger<infer U> ? U
            : T extends SaferBoolean<infer U> ? U
              : T extends SaferNot<infer U> ? Not<U>
                : T extends SaferUnion<infer U> ? Unpacked<U> | undefined
                  : T extends SaferIntersection<infer U, infer V> ? (U & V) | undefined
                    : T extends SaferRequired<infer U> ? U
                      : never

export const t = {
  array: Object.assign(SaferArray.from, { contains: SaferArray.contains }),
  boolean: SaferBoolean.from,
  integer: SaferInteger.from,
  intersection: SaferIntersection.from,
  not: SaferNot.from,
  number: SaferNumber.from,
  object: Object.assign(SaferObject.from, { properties: SaferObject.properties }),
  string: SaferString.from,
  union: SaferUnion.from
}

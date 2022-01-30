import {
  SaferArray,
  SaferBoolean,
  SaferInteger,
  SaferIntersection,
  SaferNumber,
  SaferObject,
  SaferString,
  SaferUnion
} from './parsers'
import { SaferNot } from './parsers/not'

export type Not<T> = Exclude<string | number | boolean | null | any[] | Record<string, any>, T>

export type Infer<T> =
  | T extends SaferArray<infer U> ? U[]
    : T extends SaferObject<infer U> ? { [K in keyof U]: U[K] }
      : T extends SaferString<infer U> ? U
        : T extends SaferNumber<infer U> ? U
          : T extends SaferInteger<infer U> ? U
            : T extends SaferBoolean<infer U> ? U
              : T extends SaferNot<infer U> ? Not<U>
                : T extends SaferUnion<infer U> ? U
                  : T extends SaferIntersection<infer U, infer V> ? U & V
                    : never

export const t = {
  array: Object.assign(SaferArray.from, { contains: SaferArray.contains }),
  boolean: SaferBoolean.from,
  integer: SaferInteger.from,
  intersection: SaferIntersection.from,
  not: SaferNot.from,
  number: SaferNumber.from,
  object: SaferObject.from,
  string: SaferString.from,
  union: SaferUnion.from
}

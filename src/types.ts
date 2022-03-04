import {
  Safer,
  SaferArray,
  SaferBoolean,
  SaferInteger,
  SaferIntersection,
  SaferNot,
  SaferNumber,
  SaferObject,
  SaferOptional,
  SaferRecursive,
  SaferReference,
  SaferString,
  SaferUnion
} from './parsers'

export type Not<T> = Exclude<string | number | boolean | null | any[] | Record<string, any>, T>

export type Unpacked<T> = T extends Array<Safer<infer U>> ? U : never

type RequiredKeys<T> = { [K in keyof T]-?:
  ({} extends { [P in K]: T[K] } ? never : K)
}[keyof T]

type OptionalKeys<T> = {[K in keyof T]-?:
  ({} extends { [P in K]: T[K] } ? K : never)
}[keyof T]

export type ExtractObject<T extends object> = {
  [K in RequiredKeys<T>]-?: Infer<T[K]> & unknown
} & {
  [K in OptionalKeys<T>]+?: Infer<T[K]> & unknown
}

export type InferTest<T> = T extends SaferObject<infer U> ? U extends object ? ExtractObject<U> : Record<string, unknown> : never

export type Infer<T> =
  | T extends SaferArray<infer U> ? U[]
    : T extends SaferObject<infer U> ? U extends object ? ExtractObject<U> : Record<string, unknown>
      : T extends SaferString<infer U> ? U
        : T extends SaferNumber<infer U> ? U
          : T extends SaferInteger<infer U> ? U
            : T extends SaferBoolean<infer U> ? U
              : T extends SaferNot<infer U> ? Not<U>
                : T extends SaferUnion<infer U> ? Unpacked<U>
                  : T extends SaferIntersection<infer U, infer V> ? (U & V)
                    : T extends SaferOptional<infer U> ? U | undefined
                      : T extends SaferReference<infer U> ? U
                        : T extends SaferRecursive<infer U> ? U
                          : never

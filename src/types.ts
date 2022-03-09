import {
  Safer,
  SaferArray,
  SaferBoolean,
  SaferInteger,
  SaferIntersection,
  SaferNot,
  SaferNumber,
  SaferObject, SaferOptional,
  SaferString,
  SaferUnion
} from './parsers'

export type Not<T> = Exclude<string | number | boolean | null | any[] | Record<string, any>, T>

export type Unpacked<T> = T extends Array<Safer<infer U>> ? U : never

export type FilterProperties<T, Cond> = {
  [K in keyof T]: T[K] extends Cond ? K : never;
}

export type FilterNames<T, Cond> = FilterProperties<T, Cond>[keyof T]

export type SubType<T, Cond, Invert = false> = Invert extends true ? Omit<T, FilterNames<T, Cond>> : Pick<T, FilterNames<T, Cond>>

export type RequiredKeys<T extends Record<string, Safer>> = SubType<T, typeof SaferOptional, true>

export type OptionalKeys<T extends Record<string, Safer>> = SubType<T, typeof SaferOptional>

export type ExtractRequiredKeys<T extends Record<string, Safer>> = {
  [K in keyof RequiredKeys<T>]-?: Infer<T[K]> & unknown
}

export type ExtractOptionalKeys<T extends Record<string, Safer>> = {
  [K in keyof OptionalKeys<T>]+?: Infer<T[K]> & unknown
}

export type ExtractObject<T extends Record<string, Safer>> = ExtractRequiredKeys<T> & ExtractOptionalKeys<T>

export type InferTest<T> =
  | T extends SaferString<infer U> ? U
    : T extends SaferNumber<infer U> ? U
      : T extends SaferUnion<infer U> ? Unpacked<U>
        : never

export type Infer<T> =
 | T extends SaferObject<infer U> ? ExtractObject<U>
   : T extends SaferArray<infer U> ? U[]
     : T extends SaferString<infer U> ? U
       : T extends SaferNumber<infer U> ? U
         : T extends SaferInteger<infer U> ? U
           : T extends SaferBoolean<infer U> ? U
             : T extends SaferNot<infer U> ? Not<U>
               : T extends SaferUnion<infer U> ? Unpacked<U>
                 : T extends SaferIntersection<infer U, infer V> ? (U & V)
                   : T extends SaferOptional<infer U> ? U | undefined
                     : never

import {
  SaferArray,
  SaferBoolean,
  SaferInteger,
  SaferIntersection,
  SaferNot,
  SaferNumber,
  SaferObject,
  SaferRecursive,
  SaferReference,
  SaferString,
  SaferUnion
} from './parsers'

export * from './types'

export const t = {
  array: Object.assign(SaferArray.from, { contains: SaferArray.contains }),
  boolean: SaferBoolean.from,
  integer: SaferInteger.from,
  intersection: SaferIntersection.from,
  not: SaferNot.from,
  number: SaferNumber.from,
  object: Object.assign(SaferObject.from, { properties: SaferObject.properties }),
  recursive: SaferRecursive.from,
  reference: SaferReference.from,
  string: SaferString.from,
  union: SaferUnion.from
}

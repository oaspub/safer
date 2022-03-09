import { JSONSchemaType } from 'ajv/dist/2019'
import { SaferNumber } from './number'
import { SaferOptional } from './optional'

/* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
export class SaferInteger<T extends number = number> extends SaferNumber {
  schema: JSONSchemaType<number> = { type: 'integer' }

  static from<T extends number = number>(): SaferInteger<T> {
    return new SaferInteger<T>()
  }

  optional (): SaferOptional<number> {
    return new SaferOptional<number>(this)
  }
}

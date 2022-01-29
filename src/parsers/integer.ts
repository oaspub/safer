import { JSONSchemaType } from 'ajv'
import { SaferNumber } from './number'

/* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
export class SaferInteger<T extends number = number> extends SaferNumber {
  schema: JSONSchemaType<number> = { type: 'integer' }

  static from (): SaferInteger {
    return new SaferInteger()
  }
}

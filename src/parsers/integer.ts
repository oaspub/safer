import { JSONSchemaType } from 'ajv/dist/2019'
import { SaferNumber } from './number'
import { SaferRequired } from './required'

/* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
export class SaferInteger<T extends number | undefined> extends SaferNumber<T> {
  schema: JSONSchemaType<number> = { type: 'integer' }

  static from<T extends number | undefined>(): SaferInteger<T> {
    return new SaferInteger()
  }

  required (): SaferRequired<number> {
    return new SaferRequired<number>(this)
  }
}

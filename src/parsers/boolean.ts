import { JSONSchemaType } from 'ajv/dist/2019'
import { Safer } from './base'
import { SaferOptional } from './optional'

/* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
export class SaferBoolean<T extends boolean = boolean> extends Safer<boolean> {
  schema: JSONSchemaType<boolean> = { type: 'boolean' }

  static from<T extends boolean = boolean>(): SaferBoolean<T> {
    return new SaferBoolean<T>()
  }

  optional (): SaferOptional<boolean> {
    return new SaferOptional<boolean>(this)
  }
}

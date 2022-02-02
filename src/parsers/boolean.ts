import { JSONSchemaType } from 'ajv/dist/2019'
import { Safer } from './base'
import { SaferRequired } from './required'

/* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
export class SaferBoolean<T extends boolean | undefined> extends Safer<boolean> {
  schema: JSONSchemaType<boolean> = { type: 'boolean' }

  static from<T extends boolean | undefined>(): SaferBoolean<T> {
    return new SaferBoolean<T>()
  }

  required (): SaferRequired<boolean> {
    return new SaferRequired<boolean>(this)
  }
}

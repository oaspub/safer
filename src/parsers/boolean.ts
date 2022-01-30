import { JSONSchemaType } from 'ajv/dist/2019'
import { Safer } from '../safer'

/* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
export class SaferBoolean<T extends boolean = boolean> extends Safer<boolean> {
  schema: JSONSchemaType<boolean> = { type: 'boolean' }

  static from (): SaferBoolean {
    return new SaferBoolean()
  }
}

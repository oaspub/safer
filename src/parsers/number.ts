import { JSONSchemaType } from 'ajv/dist/2019'
import { Safer } from './base'
import { SaferOptional } from './optional'

/* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
export class SaferNumber<T extends number = number> extends Safer<number> {
  schema: JSONSchemaType<number> = { type: 'number' }

  static from<T extends number = number>(): SaferNumber<number> {
    return new SaferNumber<T>()
  }

  optional (): SaferOptional<number> {
    return new SaferOptional<number>(this)
  }

  gte (num: number): this {
    this.schema.minimum = num
    return this
  }

  gt (num: number): this {
    this.schema.exclusiveMinimum = num
    return this
  }

  lte (num: number): this {
    this.schema.maximum = num
    return this
  }

  lt (num: number): this {
    this.schema.exclusiveMaximum = num
    return this
  }

  multipleOf (num: number): this {
    this.schema.multipleOf = num
    return this
  }
}

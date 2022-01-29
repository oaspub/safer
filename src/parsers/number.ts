import { JSONSchemaType } from 'ajv'
import { Safer } from '../safer'

/* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
export class SaferNumber<T extends number = number> extends Safer<number> {
  schema: JSONSchemaType<number> = { type: 'number' }

  static from (): SaferNumber {
    return new SaferNumber()
  }

  enum (...values: number[]): this {
    this.schema.enum = values
    return this
  }

  literal (value: number): this {
    this.schema.enum = [value]
    return this
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

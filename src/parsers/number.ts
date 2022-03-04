import { Safer } from './base'
import { SaferOptional } from './optional'
import { SaferReference } from './reference'

export class SaferNumber<T extends number = number> extends Safer<number> {
  constructor () {
    super()
    this.schema = { type: 'number' }
  }

  static from<T extends number = number>(): SaferNumber<T> {
    return new SaferNumber<T>()
  }

  optional (): SaferOptional<number> {
    return new SaferOptional<number>(this)
  }

  ref (name: string): SaferReference<number> {
    return new SaferReference<number>(name, this)
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

import { Safer } from './base'
import { SaferRequired } from './required'
import { SaferReference } from './reference'

/* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
export class SaferNumber<T extends number | undefined> extends Safer<number> {
  constructor () {
    super()
    this.schema = { type: 'number' }
  }

  static from<T extends number | undefined>(): SaferNumber<T> {
    return new SaferNumber<T>()
  }

  required (): SaferRequired<number> {
    return new SaferRequired<number>(this)
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

import { JSONSchemaType } from 'ajv/dist/2019'
import { Safer } from '../safer'

export class SaferArray<T> extends Safer<any[]> {
  schema: JSONSchemaType<any[]>

  constructor (safer: Safer<T>, contains = false) {
    super()
    // Type annotation is necessary since the items property is technically required
    this.schema = { type: 'array' } as const as JSONSchemaType<any[]>
    if (contains) {
      this.schema.contains = safer.schema
    } else {
      this.schema.items = safer.schema
    }
  }

  static from = function <T> (safer: Safer<T>, contains = false): SaferArray<T> {
    return new SaferArray(safer, contains)
  }

  static contains = function <T> (safer: Safer<T>): SaferArray<T> {
    return new SaferArray(safer, true)
  }

  maxContains (num: number): this {
    this.schema.maxContains = num
    return this
  }

  minContains (num: number): this {
    this.schema.minContains = num
    return this
  }

  maxItems (num: number): this {
    this.schema.maxItems = num
    return this
  }

  minItems (num: number): this {
    this.schema.minItems = num
    return this
  }

  unique (uniqueItems = true): this {
    this.schema.uniqueItems = uniqueItems
    return this
  }
}

import { JSONSchemaType } from 'ajv/dist/2019'
import { Safer } from './base'
import { SaferOptional } from './optional'

export class SaferIntersection<T, U> extends Safer<T & U> {
  schema: JSONSchemaType<any>

  constructor (first: Safer<T>, second: Safer<U>) {
    super()
    this.schema = first.schema
    this.schema.allOf = [second.schema]
  }

  static from<T, U> (first: Safer<T>, second: Safer<U>): SaferIntersection<T, U> {
    return new SaferIntersection(first, second)
  }

  optional (): SaferOptional<T & U> {
    return new SaferOptional<T & U>(this)
  }
}

import { JSONSchemaType } from 'ajv'
import { Safer } from '../safer'

export class SaferIntersection<T, U> extends Safer<T & U> {
  schema: JSONSchemaType<any>

  constructor (first: Safer<T>, second: Safer<U>) {
    super()
    this.schema = first.schema
    this.schema.allOf = [second.schema]
  }

  static from<T, U> (first: Safer<T>, second: Safer<U>) {
    return new SaferIntersection(first, second)
  }
}

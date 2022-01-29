import { JSONSchemaType } from 'ajv'
import { Safer } from '../safer'

export class SaferUnion<T> extends Safer<T> {
  schema: JSONSchemaType<any>

  constructor (safers: Safer<T>[]) {
    super()
    // TODO - check number of safers
    this.schema = { anyOf: safers.map(safer => safer.schema) } as JSONSchemaType<any>
  }

  static from<T> (safers: Safer<T>[]) {
    return new SaferUnion(safers)
  }
}

import { JSONSchemaType } from 'ajv/dist/2019'
import { Safer } from '../safer'

export class SaferUnion<T> extends Safer<T> {
  schema: JSONSchemaType<any>

  constructor (safers: Array<Safer<T>>) {
    super()
    // TODO - check number of safers
    this.schema = { anyOf: safers.map(safer => safer.schema) } as const as JSONSchemaType<any>
  }

  static from<T> (safers: Array<Safer<T>>): SaferUnion<T> {
    return new SaferUnion(safers)
  }
}

import { JSONSchemaType } from 'ajv/dist/2019'
import { Safer } from './base'
import { Not } from '../index'

export class SaferNot<T> extends Safer<Not<T>> {
  schema: JSONSchemaType<any>

  static from<T>(safer: Safer<T>): SaferNot<T> {
    return new SaferNot<T>(safer)
  }

  constructor (safer: Safer<T>) {
    super()
    this.schema = { not: safer.schema } as const as JSONSchemaType<any>
  }
}

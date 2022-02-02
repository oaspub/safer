import { JSONSchemaType } from 'ajv/dist/2019'
import { Safer } from './base'
import { SaferRequired } from './required'
import { Unpacked } from '../index'

export class SaferUnion<T extends readonly Safer[]> extends Safer<Unpacked<T>> {
  schema: JSONSchemaType<any>

  constructor (safers: T) {
    super()
    // TODO - check number of safers
    this.schema = { anyOf: safers.map(safer => safer.schema) } as const as JSONSchemaType<any>
  }

  static from<T extends readonly Safer[]> (safers: T): SaferUnion<T> {
    return new SaferUnion(safers)
  }

  required (): SaferRequired<Unpacked<T>> {
    return new SaferRequired<Unpacked<T>>(this)
  }
}

import { Safer } from './base'
import { Unpacked } from '../index'
import { SaferOptional } from './optional'

export class SaferUnion<T extends readonly Safer[]> extends Safer<Unpacked<T>> {
  schema: any

  constructor (safers: T) {
    super()
    // TODO - check number of safers
    this.schema = { anyOf: safers.map(safer => safer.schema) }
  }

  static from<T extends readonly Safer[]> (safers: T): SaferUnion<T> {
    return new SaferUnion<T>(safers)
  }

  optional (): SaferOptional<Unpacked<T>> {
    return new SaferOptional<Unpacked<T>>(this)
  }
}

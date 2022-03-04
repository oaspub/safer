import { Safer } from './base'
import { SaferOptional } from './optional'
import { Unpacked } from '../index'
import { SaferReference } from './reference'

export class SaferUnion<T extends readonly Safer[]> extends Safer<Unpacked<T>> {
  constructor (safers: T) {
    super()
    // TODO - check number of safers
    this.schema = { anyOf: safers.map(safer => safer.schema) }
  }

  static from<T extends readonly Safer[]> (safers: T): SaferUnion<T> {
    return new SaferUnion(safers)
  }

  optional (): SaferOptional<Unpacked<T>> {
    return new SaferOptional<Unpacked<T>>(this)
  }

  ref (name: string): SaferReference<Unpacked<T>> {
    return new SaferReference<Unpacked<T>>(name, this)
  }
}

import { Safer } from './base'
import { Not } from '../index'
import { SaferReference } from './reference'

export class SaferNot<T> extends Safer<Not<T>> {
  constructor (safer: Safer<T>) {
    super()
    this.schema = { not: safer.schema }
  }

  static from<T>(safer: Safer<T>): SaferNot<T> {
    return new SaferNot<T>(safer)
  }

  ref (name: string): SaferReference<Not<T>> {
    return new SaferReference<Not<T>>(name, this)
  }
}

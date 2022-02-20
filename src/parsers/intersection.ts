import { Safer } from './base'
import { SaferRequired } from './required'
import { SaferReference } from './reference'

export class SaferIntersection<T, U> extends Safer<T & U> {
  constructor (first: Safer<T>, second: Safer<U>) {
    super()
    this.schema = first.schema
    this.schema.allOf = [second.schema]
  }

  static from<T, U> (first: Safer<T>, second: Safer<U>): SaferIntersection<T, U> {
    return new SaferIntersection(first, second)
  }

  required (): SaferRequired<T & U> {
    return new SaferRequired<T & U>(this)
  }

  ref (name: string): SaferReference<T & U> {
    return new SaferReference<T & U>(name, this)
  }
}

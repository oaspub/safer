import { Safer } from './base'

export class SaferRecursive<T> extends Safer<T> {
  constructor () {
    super()
    this.schema = {
      $ref: '#'
    }
  }

  static from<T> (): SaferRecursive<T> {
    return new SaferRecursive<T>()
  }
}

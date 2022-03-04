import { Safer } from './base'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class SaferRecursive<T = any> extends Safer<T> {
  constructor () {
    super()
    this.schema = {
      $ref: '#'
    }
  }

  static from<T = any> (): SaferRecursive<T> {
    return new SaferRecursive<T>()
  }
}

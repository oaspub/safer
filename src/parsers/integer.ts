import { SaferNumber } from './number'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class SaferInteger<T extends number = number> extends SaferNumber<number> {
  constructor () {
    super()
    this.schema = { type: 'integer' }
  }

  static from<T extends number = number>(): SaferInteger<T> {
    return new SaferInteger()
  }
}

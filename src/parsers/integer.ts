import { SaferNumber } from './number'

/* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
export class SaferInteger<T extends number | undefined> extends SaferNumber<T> {
  constructor () {
    super()
    this.schema = { type: 'integer' }
  }

  static from<T extends number | undefined>(): SaferInteger<T> {
    return new SaferInteger()
  }
}

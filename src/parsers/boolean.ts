import { Safer } from './base'
import { SaferRequired } from './required'
import { SaferReference } from './reference'

/* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
export class SaferBoolean<T extends boolean | undefined> extends Safer<boolean> {
  constructor () {
    super()
    this.schema = { type: 'boolean' }
  }

  static from<T extends boolean | undefined>(): SaferBoolean<T> {
    return new SaferBoolean<T>()
  }

  required (): SaferRequired<boolean> {
    return new SaferRequired<boolean>(this)
  }

  ref (name: string): SaferReference<boolean> {
    return new SaferReference<boolean>(name, this)
  }
}

import { Safer } from './base'
import { SaferOptional } from './optional'
import { SaferReference } from './reference'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class SaferBoolean<T extends boolean = boolean> extends Safer<boolean> {
  constructor () {
    super()
    this.schema = { type: 'boolean' }
  }

  static from<T extends boolean = boolean>(): SaferBoolean<T> {
    return new SaferBoolean<T>()
  }

  optional (): SaferOptional<boolean> {
    return new SaferOptional<boolean>(this)
  }

  ref (name: string): SaferReference<boolean> {
    return new SaferReference<boolean>(name, this)
  }
}

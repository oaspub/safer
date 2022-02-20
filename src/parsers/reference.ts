import merge from 'lodash.merge'
import { Safer } from './base'
import { SaferRequired } from './required'

export class SaferReference<T extends any> extends Safer<T> {
  constructor (name: string, safer?: Safer<T>) {
    super()
    if (safer !== undefined) {
      merge(this.root.schema, { $defs: { [name]: safer.schema } })
    }
    // merge because root could be equal to this context
    merge(this.schema, { $ref: `#/$defs/${name}` })
  }

  static from<T> (name: string, safer?: Safer<T>): SaferReference<T> {
    return new SaferReference<T>(name, safer)
  }

  required (): SaferRequired<T> {
    return new SaferRequired<T>(this)
  }
}

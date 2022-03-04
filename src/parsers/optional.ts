import { Safer } from './base'
import { SaferReference } from './reference'

export class SaferOptional<T> extends Safer<T | undefined> {
  constructor (safer: Safer<T>) {
    safer.isRequired = false
    super(safer as unknown as Safer<T | undefined>)
  }

  static from<T>(safer: Safer): SaferOptional<T | undefined> {
    return new SaferOptional<T | undefined>(safer)
  }

  ref (name: string): SaferReference<T | undefined> {
    return new SaferReference<T | undefined>(name, this)
  }
}

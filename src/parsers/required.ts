import { Safer } from './base'
import { SaferReference } from './reference'

export class SaferRequired<T> extends Safer<T> {
  constructor (safer: Safer<T>) {
    safer.isRequired = true
    super(safer)
  }

  static from<T>(safer: Safer): SaferRequired<T> {
    return new SaferRequired(safer)
  }

  ref (name: string): SaferReference<T> {
    return new SaferReference<T>(name, this)
  }
}

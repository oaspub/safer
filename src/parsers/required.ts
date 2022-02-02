import { Safer } from './base'

export class SaferRequired<T> extends Safer<T> {
  constructor (safer: Safer<T>) {
    safer.isRequired = true
    super(safer)
  }

  static from<T>(safer: Safer): SaferRequired<T> {
    return new SaferRequired(safer)
  }
}

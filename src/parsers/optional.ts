import { Safer } from './base'

export class SaferOptional<T = any> extends Safer<T | undefined> {
  constructor (safer: Safer<T>) {
    safer.isRequired = false
    super(safer)
  }

  static from<T = any>(safer: Safer): SaferOptional<T> {
    return new SaferOptional<T>(safer)
  }
}

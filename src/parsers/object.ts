import { Safer } from './base'
import { SaferString } from './string'
import { SaferRequired } from './required'
import { SaferReference } from './reference'

function isEmpty (obj: Record<string, unknown> | null): boolean {
  if (obj === null) return true
  for (const prop in obj) {
    if (Object.hasOwnProperty.call(obj, prop)) {
      return false
    }
  }
  return true
}

export class SaferObject<T> extends Safer<T> {
  constructor (obj?: { [K in keyof T]: Safer<T[K]> } | SaferString) {
    super()
    this.schema = { type: 'object' }
    if (obj === undefined) {
      return
    }

    if (obj instanceof SaferString) {
      obj.root = this.root ?? this
      this.schema.propertyNames = obj.schema
      return
    }

    const properties: Record<string, unknown> = {}
    const required: string[] = []

    for (const prop in obj) {
      obj[prop].root = this.root ?? this
      properties[prop] = obj[prop].schema
      if (obj[prop].isRequired) {
        required.push(prop)
      }
    }
    if (!isEmpty(properties)) {
      this.schema.properties = properties
    }
    if (required.length > 0) {
      this.schema.required = required
    }
  }

  static from<T extends Record<string, unknown>> (obj?: { [K in keyof T]: Safer<T[K]> }): SaferObject<T> {
    return new SaferObject(obj)
  }

  static properties<T extends string = string> (str: SaferString<T>): SaferObject<Record<string, unknown>> {
    return new SaferObject<Record<string, unknown>>(str)
  }

  required (): SaferRequired<T> {
    return new SaferRequired<T>(this)
  }

  ref (name: string): SaferReference<T> {
    return new SaferReference<T>(name, this)
  }

  additional (additionalProperties = true): this {
    this.schema.additionalProperties = additionalProperties
    return this
  }

  unevaluated (unevaluatedProperties = true): this {
    this.schema.unevaluatedProperties = unevaluatedProperties
    return this
  }

  size (num: number): this {
    return this.min(num).max(num)
  }

  min (num: number): this {
    this.schema.minProperties = num
    return this
  }

  max (num: number): this {
    this.schema.maxProperties = num
    return this
  }
}

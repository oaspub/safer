import { Safer } from './base'
import { SaferString } from './string'
import { SaferOptional } from './optional'
import { SaferReference } from './reference'
import { ExtractObject } from '../types'

function isEmpty (obj: Record<string, unknown> | null): boolean {
  if (obj === null) return true
  for (const prop in obj) {
    if (Object.hasOwnProperty.call(obj, prop)) {
      return false
    }
  }
  return true
}

type ExtractInputType<T extends SaferString | object> = T extends SaferString ? Record<string, unknown> : ExtractObject<T>

export class SaferObject<T extends Record<string, Safer> | SaferString> extends Safer<ExtractInputType<T>> {
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

  static from<T extends Record<string, Safer> | SaferString> (obj?: { [K in keyof T]: Safer<T[K]> } | SaferString): SaferObject<T> {
    return new SaferObject(obj)
  }

  static properties<T extends SaferString> (str: T): SaferObject<T> {
    return new SaferObject<T>(str)
  }

  optional (): SaferOptional<T> {
    return new SaferOptional<T>(this)
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

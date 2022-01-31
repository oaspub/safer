import { JSONSchemaType } from 'ajv/dist/2019'
import { Safer } from '../safer'
import { SaferString } from './string'

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
  schema: JSONSchemaType<Record<string, unknown>> = { type: 'object' }

  static from<T>(obj?: {[K in keyof T]: Safer<T[K]>}): SaferObject<T> {
    return new SaferObject(obj)
  }

  static properties<T extends string = string>(str: SaferString<T>): SaferObject<T> {
    return new SaferObject<T>(str)
  }

  constructor (obj?: {[K in keyof T]: Safer<T[K]>} | SaferString<T>) {
    super()
    if (obj === undefined) return

    if (obj instanceof SaferString) {
      this.schema.propertyNames = obj.schema
      return
    }

    const properties: Record<string, unknown> = {}
    const required: string[] = []

    for (const prop in obj) {
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

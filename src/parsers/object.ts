import { JSONSchemaType } from 'ajv/dist/2019'
import { Safer } from '../safer'

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

  constructor (obj?: {[K in keyof T]: Safer<T[K]>}) {
    super()
    if (obj === undefined) return

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
}

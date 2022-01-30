import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv/dist/2019'

export class Safer<T = any> {
  schema: any
  isRequired: boolean = false
  defaultValue?: T
  protected ajv: Ajv
  private validate?: ValidateFunction<T>
  private errors?: ValidateFunction<T>['errors']

  constructor () {
    this.ajv = new Ajv()
  }

  parse (value: unknown): T | undefined {
    if (this.validate === undefined) {
      // cache validator for this schema
      this.validate = this.ajv.compile(this.schema as JSONSchemaType<T>)
    }
    if (value === undefined && this.defaultValue !== undefined) {
      // Return the default value if the parsed value is undefined
      value = this.defaultValue
    }

    if (this.validate(value)) {
      // Parse only supports sync validation
      return value
    }

    // expose errors on the Safer object
    this.errors = this.validate.errors
  }

  try (value: unknown): T {
    const parsed = this.parse(value)
    if (parsed === undefined) {
      /* eslint-disable-next-line @typescript-eslint/no-throw-literal */
      throw this.errors
    }
    return parsed
  }

  required (isRequired = true): this {
    this.isRequired = isRequired
    return this
  }

  default (value: T): this {
    this.defaultValue = value
    return this
  }
}

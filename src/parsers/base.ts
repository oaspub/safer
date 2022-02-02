import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv/dist/2019'

export class Safer<T = any> {
  schema: any
  isRequired: boolean = false
  protected ajv: Ajv
  private validate?: ValidateFunction<T>
  private errors?: ValidateFunction<T>['errors']

  constructor (safer?: Safer<T>) {
    this.ajv = new Ajv()
    if (safer !== undefined) {
      this.schema = safer.schema
      this.isRequired = safer.isRequired
    }
  }

  parse (value: unknown): T | undefined {
    if (this.validate === undefined) {
      // cache validator for this schema
      this.validate = this.ajv.compile(this.schema as JSONSchemaType<T>)
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
}

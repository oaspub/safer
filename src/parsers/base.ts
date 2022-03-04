import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv/dist/2019'
import merge from 'lodash.merge'

export class Safer<T = any> {
  schema: Record<string, unknown> = {}
  isRequired: boolean = true
  protected ajv: Ajv
  private validate?: ValidateFunction<T>
  private errors?: ValidateFunction<T>['errors']
  private _root: Safer = this

  constructor (safer?: Safer<T>, root?: Safer) {
    this.ajv = new Ajv()
    if (safer !== undefined) {
      this.schema = safer.schema
      this.isRequired = safer.isRequired
    }
    if (root !== undefined) {
      this.root = root
    }
  }

  set root (safer: Safer) {
    if (Object.hasOwnProperty.call(this._root, '$defs')) {
      merge(safer.schema, { $defs: this._root.schema.$defs })
      delete this._root.schema.$defs
    }
    this._root = safer
  }

  get root (): Safer {
    return this._root
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

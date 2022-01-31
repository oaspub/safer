import { JSONSchemaType } from 'ajv/dist/2019'
import { Safer } from '../safer'

/* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
export class SaferString<T = string> extends Safer<string> {
  schema: JSONSchemaType<string> = { type: 'string' }

  static from (): SaferString {
    return new SaferString()
  }

  min (num: number): this {
    this.schema.minLength = num
    return this
  }

  max (num: number): this {
    this.schema.maxLength = num
    return this
  }

  length (num: number): this {
    this.min(num)
    this.max(num)
    return this
  }

  match (rx: RegExp): this {
    this.schema.pattern = rx.source.toString()
    return this
  }

  format (fmt: string): this {
    this.schema.format = fmt
    return this
  }

  date (): this {
    this.format('date')
    return this
  }

  time (): this {
    this.format('time')
    return this
  }

  dateTime (): this {
    this.format('date-time')
    return this
  }

  isoTime (): this {
    this.format('iso-time')
    return this
  }

  isoDateTime (): this {
    this.format('iso-date-time')
    return this
  }

  duration (): this {
    this.format('duration')
    return this
  }

  uri (): this {
    this.format('uri')
    return this
  }

  uriReference (): this {
    this.format('uri-reference')
    return this
  }

  uriTemplate (): this {
    this.format('uri-template')
    return this
  }

  // Deprecated
  url (): this {
    this.format('url')
    return this
  }

  email (): this {
    this.format('email')
    return this
  }

  hostname (): this {
    this.format('hostname')
    return this
  }

  ipv4 (): this {
    this.format('ipv4')
    return this
  }

  ipv6 (): this {
    this.format('ipv6')
    return this
  }

  regex (): this {
    this.format('regex')
    return this
  }

  uuid (): this {
    this.format('uuid')
    return this
  }

  jsonPointer (): this {
    this.format('json-pointer')
    return this
  }

  relativeJsonPointer (): this {
    this.format('relative-json-pointer')
    return this
  }

  byte (): this {
    this.format('byte')
    return this
  }

  int32 (): this {
    this.format('int32')
    return this
  }

  int64 (): this {
    this.format('int64')
    return this
  }

  float (): this {
    this.format('float')
    return this
  }

  double (): this {
    this.format('double')
    return this
  }

  password (): this {
    this.format('password')
    return this
  }

  binary (): this {
    this.format('binary')
    return this
  }
}

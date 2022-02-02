/* eslint-disable @typescript-eslint/no-unused-vars */
import { Infer, t } from '../src'

describe('array', () => {
  it('should pass validation', () => {
    const optional = t.array(t.string())
    const _: Infer<typeof optional> = undefined
    expect(optional.isRequired).toEqual(false)
  })
  it('should not pass validation', () => {
    const required = t.array(t.string()).required()
    // @ts-expect-error
    const _: Infer<typeof required> = undefined
    expect(required.isRequired).toEqual(true)
  })
})

describe('boolean', () => {
  it('should pass validation', () => {
    const optional = t.boolean()
    const _: Infer<typeof optional> = undefined
    expect(optional.isRequired).toEqual(false)
  })
  it('should not pass validation', () => {
    const required = t.boolean().required()
    // @ts-expect-error
    const _: Infer<typeof required> = undefined
    expect(required.isRequired).toEqual(true)
  })
})

describe('integer', () => {
  it('should pass validation', () => {
    const optional = t.integer()
    const _: Infer<typeof optional> = undefined
    expect(optional.isRequired).toEqual(false)
  })
  it('should not pass validation', () => {
    const required = t.integer().required()
    // @ts-expect-error
    const _: Infer<typeof required> = undefined
    expect(required.isRequired).toEqual(true)
  })
})

describe('intersection', () => {
  it('should pass validation', () => {
    const optional = t.intersection(t.string(), t.string())
    const _: Infer<typeof optional> = undefined
    expect(optional.isRequired).toEqual(false)
  })
  it('should not pass validation', () => {
    const required = t.intersection(t.string(), t.string()).required()
    // @ts-expect-error
    const _: Infer<typeof required> = undefined
    expect(required.isRequired).toEqual(true)
  })
})

describe('number', () => {
  it('should pass validation', () => {
    const optional = t.number()
    const _: Infer<typeof optional> = undefined
    expect(optional.isRequired).toEqual(false)
  })
  it('should not pass validation', () => {
    const required = t.number().required()
    // @ts-expect-error
    const _: Infer<typeof required> = undefined
    expect(required.isRequired).toEqual(true)
  })
})

describe('object', () => {
  it('should pass validation', () => {
    const optional = t.object({
      foo: t.string()
    })
    const _: Infer<typeof optional> = undefined
    expect(optional.isRequired).toEqual(false)
    expect(optional.schema.required).toBeUndefined()
  })
  it('should not pass validation', () => {
    const required = t.object({
      foo: t.string().required()
    }).required()
    // @ts-expect-error
    const _: Infer<typeof required> = undefined
    expect(required.isRequired).toEqual(true)
    expect(required.schema.required).toBeDefined()
  })
})

describe('string', () => {
  it('should pass validation', () => {
    const optional = t.string()
    const _: Infer<typeof optional> = undefined
    expect(optional.isRequired).toEqual(false)
  })
  it('should not pass validation', () => {
    const required = t.string().required()
    // @ts-expect-error
    const _: Infer<typeof required> = undefined
    expect(required.isRequired).toEqual(true)
  })
})

describe('union', () => {
  it('should pass validation', () => {
    const optional = t.union([t.string(), t.number(), t.number()])
    const _: Infer<typeof optional> = undefined
    expect(optional.isRequired).toEqual(false)
  })
  it('should not pass validation', () => {
    const required = t.union([t.string(), t.number()]).required()
    // @ts-expect-error
    const _: Infer<typeof required> = undefined
    expect(required.isRequired).toEqual(true)
  })
})

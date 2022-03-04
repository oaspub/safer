/* eslint-disable @typescript-eslint/no-unused-vars */
import { Infer, InferTest, t } from '../src'

describe('array', () => {
  it('should pass validation', () => {
    const optional = t.array(t.string()).optional()
    const _: Infer<typeof optional> = undefined
    expect(optional.isRequired).toEqual(false)
  })
  it('should not pass validation', () => {
    const required = t.array(t.string())
    // @ts-expect-error
    const _: Infer<typeof required> = undefined
    expect(required.isRequired).toEqual(true)
  })
})

describe('boolean', () => {
  it('should pass validation', () => {
    const optional = t.boolean().optional()
    const _: Infer<typeof optional> = undefined
    expect(optional.isRequired).toEqual(false)
  })
  it('should not pass validation', () => {
    const required = t.boolean()
    // @ts-expect-error
    const _: Infer<typeof required> = undefined
    expect(required.isRequired).toEqual(true)
  })
})

describe('integer', () => {
  it('should pass validation', () => {
    const optional = t.integer().optional()
    const _: Infer<typeof optional> = undefined
    expect(optional.isRequired).toEqual(false)
  })
  it('should not pass validation', () => {
    const required = t.integer()
    // @ts-expect-error
    const _: Infer<typeof required> = undefined
    expect(required.isRequired).toEqual(true)
  })
})

describe('intersection', () => {
  it('should pass validation', () => {
    const optional = t.intersection(t.string(), t.string()).optional()
    const _: Infer<typeof optional> = undefined
    expect(optional.isRequired).toEqual(false)
  })
  it('should not pass validation', () => {
    const required = t.intersection(t.string(), t.string())
    // @ts-expect-error
    const _: Infer<typeof required> = undefined
    expect(required.isRequired).toEqual(true)
  })
})

describe('number', () => {
  it('should pass validation', () => {
    const optional = t.number().optional()
    const _: Infer<typeof optional> = undefined
    expect(optional.isRequired).toEqual(false)
  })
  it('should not pass validation', () => {
    const required = t.number()
    // @ts-expect-error
    const _: Infer<typeof required> = undefined
    expect(required.isRequired).toEqual(true)
  })
})

describe('object', () => {
  it('should pass validation', () => {
    const optional = t.object({
      foo: t.string().optional()
    })
    const _: InferTest<typeof optional> = {}
    expect(optional.isRequired).toEqual(false)
    expect(optional.schema.required).toBeUndefined()
  })
  it('should not pass validation', () => {
    const required = t.object({
      foo: t.string()
    })
    // @ts-expect-error
    const _: Infer<typeof required> = {}
    expect(required.isRequired).toEqual(true)
    expect(required.schema.required).toBeDefined()
  })
})

describe('string', () => {
  it('should pass validation', () => {
    const optional = t.string().optional()
    const _: Infer<typeof optional> = undefined
    expect(optional.isRequired).toEqual(false)
  })
  it('should not pass validation', () => {
    const required = t.string()
    // @ts-expect-error
    const _: Infer<typeof required> = undefined
    expect(required.isRequired).toEqual(true)
  })
})

describe('union', () => {
  it('should pass validation', () => {
    const optional = t.union([t.string(), t.number(), t.number()]).optional()
    const _: Infer<typeof optional> = undefined
    expect(optional.isRequired).toEqual(false)
  })
  it('should not pass validation', () => {
    const required = t.union([t.string(), t.number()])
    // @ts-expect-error
    const _: Infer<typeof required> = undefined
    expect(required.isRequired).toEqual(true)
  })
})

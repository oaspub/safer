import { Infer, t } from '../src'

describe('array', () => {
  const name = 'test'
  const safer = t.array(t.string()).ref(name)
  it('should create the subschema in the $defs object', () => {
    expect(safer.schema).toHaveProperty(`$defs.${name}`)
  })
  it('should pass validation', () => {
    const value: Infer<typeof safer> = ['hello']
    expect(() => safer.try(value)).not.toThrow()
  })
  it('should not pass validation', () => {
    const safer = t.array(t.string()).ref('ref')
    // @ts-expect-error
    const value: Infer<typeof safer> = [1]
    expect(() => safer.try(value)).toThrow()
  })
})

describe('boolean', () => {
  const name = 'test'
  const safer = t.boolean().ref(name)
  it('should create the subschema in the $defs object', () => {
    expect(safer.schema).toHaveProperty(`$defs.${name}`)
  })
  it('should pass validation', () => {
    const value: Infer<typeof safer> = true
    expect(() => safer.try(value)).not.toThrow()
  })
  it('should not pass validation', () => {
    // @ts-expect-error
    const value: Infer<typeof safer> = 'hi'
    expect(() => safer.try(value)).toThrow()
  })
})

describe('integer', () => {
  const name = 'test'
  const safer = t.integer().ref(name)
  it('should create the subschema in the $defs object', () => {
    expect(safer.schema).toHaveProperty(`$defs.${name}`)
  })
  it('should pass validation', () => {
    const value: Infer<typeof safer> = 1
    expect(() => safer.try(value)).not.toThrow()
  })
  it('should not pass validation', () => {
    // @ts-expect-error
    const value: Infer<typeof safer> = 'hi'
    expect(() => safer.try(value)).toThrow()
  })
})

describe('intersection', () => {
  const name = 'test'
  const safer = t.intersection(t.string(), t.string()).ref(name)
  it('should create the subschema in the $defs object', () => {
    expect(safer.schema).toHaveProperty(`$defs.${name}`)
  })
  it('should pass validation', () => {
    const value: Infer<typeof safer> = 'hi'
    expect(() => safer.try(value)).not.toThrow()
  })
  it('should not pass validation', () => {
    // @ts-expect-error
    const value: Infer<typeof safer> = false
    expect(() => safer.try(value)).toThrow()
  })
})

describe('number', () => {
  const name = 'test'
  const safer = t.number().ref(name)
  it('should create the subschema in the $defs object', () => {
    expect(safer.schema).toHaveProperty(`$defs.${name}`)
  })
  it('should pass validation', () => {
    const value: Infer<typeof safer> = 1
    expect(() => safer.try(value)).not.toThrow()
  })
  it('should not pass validation', () => {
    // @ts-expect-error
    const value: Infer<typeof safer> = 'hi'
    expect(() => safer.try(value)).toThrow()
  })
})

describe('object', () => {
  const name = 'test'
  const safer = t.object({ foo: t.string() }).ref(name)
  it('should create the subschema in the $defs object', () => {
    expect(safer.schema).toHaveProperty(`$defs.${name}`)
  })
  it('should pass validation', () => {
    const value: Infer<typeof safer> = { foo: 'bar' }
    expect(() => safer.try(value)).not.toThrow()
  })
  it('should not pass validation', () => {
    // @ts-expect-error
    const value: Infer<typeof safer> = 'hi'
    expect(() => safer.try(value)).toThrow()
  })
})

describe('string', () => {
  const name = 'test'
  const safer = t.string().ref(name)
  it('should create the subschema in the $defs object', () => {
    expect(safer.schema).toHaveProperty(`$defs.${name}`)
  })
  it('should pass validation', () => {
    const value: Infer<typeof safer> = 'hi'
    expect(() => safer.try(value)).not.toThrow()
  })
  it('should not pass validation', () => {
    // @ts-expect-error
    const value: Infer<typeof safer> = false
    expect(() => safer.try(value)).toThrow()
  })
})

describe('union', () => {
  const name = 'test'
  const safer = t.union([t.string(), t.number(), t.array(t.string())]).ref(name)
  it('should create the subschema in the $defs object', () => {
    expect(safer.schema).toHaveProperty(`$defs.${name}`)
  })
  it('should pass validation', () => {
    const value: Infer<typeof safer> = 1
    expect(() => safer.try(value)).not.toThrow()
  })
  it('should not pass validation', () => {
    // @ts-expect-error
    const value: Infer<typeof safer> = false
    expect(() => safer.try(value)).toThrow()
  })
})

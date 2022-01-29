import { Infer, t } from '../src'

describe('number intersection', () => {
  const num = t.intersection(
    t.number().lt(6),
    t.number().gt(3)
  )
  it('should pass validation', () => {
    const valid: Infer<typeof num> = 4
    expect(() => num.try(valid)).not.toThrow()
  })
  it('should not pass validation', () => {
    // @ts-expect-error
    const badType: Infer<typeof num> = true
    const outOfRange: Infer<typeof num> = 9
    expect(() => num.try(badType)).toThrow()
    expect(() => num.try(outOfRange)).toThrow()
  })
})

describe('string intersection', () => {
  const str = t.intersection(
    t.string().max(6),
    t.string().min(3)
  )
  it('should pass validation', () => {
    const valid: Infer<typeof str> = 'hello'
    expect(() => str.try(valid)).not.toThrow()
  })
  it('should not pass validation', () => {
    // @ts-expect-error
    const badType: Infer<typeof str> = true
    const outOfRange: Infer<typeof str> = 'hi'
    expect(() => str.try(badType)).toThrow()
    expect(() => str.try(outOfRange)).toThrow()
  })
})

describe('object intersection', () => {
  const intersection = t.intersection(
    t.object({ greet: t.string() }).unevaluated(false),
    t.object({ name: t.string() })
  )
  it('should pass validation', () => {
    const value: Infer<typeof intersection> = {
      greet: 'Hi',
      name: 'John'
    }
    expect(() => intersection.try(value)).not.toThrow()
  })
  it('should not pass validation', () => {
    const value: Infer<typeof intersection> = {
      greet: 'Hi',
      name: 'John',
      // @ts-expect-error
      prefix: 'Mr.'
    }
    expect(() => intersection.try(value)).toThrow()
  })
})

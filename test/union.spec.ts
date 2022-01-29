import { Infer, t } from '../src'

describe('string union', () => {
  const union = t.union([
    t.string().length(3),
    t.string().length(6)
  ])
  it('should pass validation', () => {
    const short: Infer<typeof union> = 'Hi!'
    const long: Infer<typeof union> = 'Hello!'
    expect(() => union.try(short)).not.toThrow()
    expect(() => union.try(long)).not.toThrow()
  })
  it('should not pass validation', () => {
    // @ts-expect-error
    const badType: Infer<typeof union> = 2
    const outOfRange: Infer<typeof union> = 'hi'
    expect(() => union.try(badType)).toThrow()
    expect(() => union.try(outOfRange)).toThrow()
  })
})

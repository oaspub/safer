import { Infer, InferTest, t } from '../src'

describe('primitive union', () => {
  const union = t.union([
    t.string().max(3),
    t.integer()
  ])
  it('should pass validation', () => {
    const letters: Infer<typeof union> = 'Hi!'
    const numbers: Infer<typeof union> = 2
    expect(() => union.try(letters)).not.toThrow()
    expect(() => union.try(numbers)).not.toThrow()
  })
  it('should not pass validation', () => {
    // @ts-expect-error
    const badType: InferTest<typeof union> = false
    const outOfRange: Infer<typeof union> = 'hello'
    expect(() => union.try(badType)).toThrow()
    expect(() => union.try(outOfRange)).toThrow()
  })
})

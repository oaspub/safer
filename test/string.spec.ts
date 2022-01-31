import { Infer, t } from '../src'

const safer = t.string().max(3)
it('should pass validation', () => {
  const short: Infer<typeof safer> = 'Hi'
  expect(() => safer.try(short)).not.toThrow()
})
it('should not pass validation', () => {
  // @ts-expect-error
  const badType: Infer<typeof safer> = 2
  const outOfRange: Infer<typeof safer> = 'Hello!'
  expect(() => safer.try(badType)).toThrow()
  expect(() => safer.try(outOfRange)).toThrow()
})

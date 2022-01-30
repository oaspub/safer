import { t, Infer } from '../src'

const notString = t.not(t.string())
it('should pass validation', () => {
  const num: Infer<typeof notString> = 1
  expect(() => notString.try(num)).not.toThrow()
})
it('should not pass validation', () => {
  // @ts-expect-error
  const str: Infer<typeof notString> = 'hello'
  expect(() => notString.try(str)).toThrow()
})

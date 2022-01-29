import { Infer, t } from '../src'

const safer = t.boolean()
it('should pass validation', () => {
  const bool: Infer<typeof safer> = false
  expect(() => safer.try(bool)).not.toThrow()
})
it('should not pass validation', () => {
  // @ts-expect-error
  const notBool: Infer<typeof safer> = 'Hello!'
  expect(() => safer.try(notBool)).toThrow()
})

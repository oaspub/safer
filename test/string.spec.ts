import { t } from '../src'

const safer = t.string().max(3)
it('should pass validation', () => {
  expect(() => safer.try('Hi!')).not.toThrow()
})
it('should not pass validation', () => {
  expect(() => safer.try('Hello!')).toThrow()
})

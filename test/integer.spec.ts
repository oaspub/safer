import { t } from '../src'

const safer = t.integer().gt(0)
it('should pass validation', () => {
  expect(() => safer.try(1)).not.toThrow()
})
it('should not pass validation', () => {
  expect(() => safer.try(0)).toThrow()
})

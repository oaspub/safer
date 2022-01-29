import { t } from '../src'

describe('exclusive range', () => {
  const exclusiveRange = t.number().lt(4).gt(2)
  it('should pass validation', () => {
    expect(() => exclusiveRange.try(3)).not.toThrow()
  })
  it('should not pass validation', () => {
    expect(() => exclusiveRange.try(2)).toThrow()
    expect(() => exclusiveRange.try(4)).toThrow()
  })
})
describe('inclusive range', () => {
  const inclusiveRange = t.number().lte(3).gte(3)
  it('should pass validation', () => {
    expect(() => inclusiveRange.try(3)).not.toThrow()
  })
  it('should not pass validation', () => {
    expect(() => inclusiveRange.try(2)).toThrow()
    expect(() => inclusiveRange.try(4)).toThrow()
  })
})

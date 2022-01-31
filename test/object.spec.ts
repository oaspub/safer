import { t, Infer } from '../src'

describe('basic', () => {
  const safer = t.object({
    greeting: t.string().max(3)
  })

  it('should pass validation', () => {
    const short: Infer<typeof safer> = {
      greeting: 'Hi!'
    }
    expect(() => safer.try(short)).not.toThrow()
  })
  it('should not pass validation', () => {
    const long: Infer<typeof safer> = {
      greeting: 'Hello!'
    }
    expect(() => safer.try(long)).toThrow()
  })
})

describe('properties', () => {
  const propsBeginWithS = t.object.properties(t.string().match(/^[sS]/))

  it('should pass validation', () => {
    const matches: Infer<typeof propsBeginWithS> = {
      salutation: 'Hi',
      Surname: 'Doe'
    }
    expect(() => propsBeginWithS.try(matches)).not.toThrow()
  })
  it('should not pass validation', () => {
    // This type will still match even though it will fail json schema validation
    const misMatches: Infer<typeof propsBeginWithS> = {
      salutation: 'Hi',
      firstname: 'John'
    }
    expect(() => propsBeginWithS.try(misMatches)).toThrow()
  })
})

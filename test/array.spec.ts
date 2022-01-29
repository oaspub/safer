import { t, Infer } from '../src'

const safer = t.array(t.object({
  greeting: t.string().max(3)
}))

it('should pass validation', () => {
  const short: Infer<typeof safer> = [{
    greeting: 'Hi!'
  }]
  expect(() => safer.try(short)).not.toThrow()
})
it('should not pass validation', () => {
  const long: Infer<typeof safer> = [{
    greeting: 'Hello!'
  }]
  expect(() => safer.try(long)).toThrow()
})

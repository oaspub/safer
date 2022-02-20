import { Infer, t } from '../src'

interface Tree {
  name: string
  children: Tree[]
}

const safer = t.object({
  name: t.string().required(),
  children: t.array(t.recursive<Tree>()).required()
})

test('should pass validation', () => {
  const value: Infer<typeof safer> = {
    name: 'John Doe',
    children: [
      {
        name: 'Johnny Doe Jr.',
        children: [
          {
            name: 'Janie Doe',
            children: []
          }
        ]
      }
    ]
  }
  expect(() => safer.try(value)).not.toThrow()
})

test('should not pass validation', () => {
  // @ts-expect-error
  const value: Infer<typeof safer> = { name: 'John Doe' }
  expect(() => safer.try(value)).toThrow()
})

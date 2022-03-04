import { Infer, t } from '../src'

describe('Basic Recursion', () => {
  interface Tree {
    name: string
    children: Tree[]
  }

  const safer = t.object({
    name: t.string(),
    children: t.array(t.recursive<Tree>())
  })

  it('should pass validation', () => {
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

  it('should not pass validation', () => {
    // @ts-expect-error
    const value: Infer<typeof safer> = { name: 'John Doe' }
    expect(() => safer.try(value)).toThrow()
  })
})

describe('Nested Recursion', () => {
  interface Ingredient {
    name: string
    description: string
    quantity: number
    unit: string
    ingredients?: Ingredient[]
  }
  const ingredient = t.object({
    name: t.string(),
    description: t.string(),
    quantity: t.number(),
    unit: t.string(),
    ingredients: t.array(t.recursive<Ingredient>())
  })
  const instruction = t.object({
    ordinal: t.integer().gt(0),
    instruction: t.string(),
    ingredients: t.array(ingredient)
  })
  const recipe = t.object({
    name: t.string(),
    instructions: t.array(instruction),
    ingredients: t.array(ingredient)
  })
  it('should pass validation', () => {
    const strawberry: Infer<typeof ingredient> = {
      name: 'Strawberry',
      description: 'The fruit of any stemless plant belonging to the genus Fragaria, of the rose family, consisting of an enlarged fleshy receptacle bearing achenes on its exterior.',
      quantity: 1,
      unit: 'Bushel'
    }
    const jam: Infer<typeof ingredient> = {
      name: 'Jam',
      description: 'A food made by boiling fruit and sugar to a thick consistency',
      quantity: 2,
      unit: 'Tablespoons',
      ingredients: [strawberry]
    }
    const peanutButter: Infer<typeof ingredient> = {
      name: 'Peanut Butter',
      description: 'A creamy food made from peanuts',
      quantity: 2,
      unit: 'Tablespoons'
    }
    const bread: Infer<typeof ingredient> = {
      name: 'Bread Slice',
      description: 'A kind of food made of flour or meal that has been mixed with milk or water, made into a dough or batter, with or without yeast or other leavening agent, and baked.',
      quantity: 2,
      unit: 'slices'
    }
    const pbj: Infer<typeof recipe> = {
      name: 'Peanut Butter & Jam Sandwich',
      instructions: [
        {
          ordinal: 1,
          instruction: 'Spread the jam over one side of a slice of bread.',
          ingredients: [bread, jam]
        },
        {
          ordinal: 2,
          instruction: 'Spread the peanut butter over one side of the other slice of bread.',
          ingredients: [bread, peanutButter]
        },
        {
          ordinal: 3,
          instruction: 'Slap the two slices of bread together with the jam and peanut butter in between.',
          ingredients: [bread, peanutButter, jam]
        }
      ],
      ingredients: [bread, peanutButter, jam]
    }
    expect(() => recipe.try(pbj)).not.toThrow()
  })

  it('should not pass validation', () => {
    // @ts-expect-error
    const value: Infer<typeof recipe> = 'not a recipe'
    expect(() => recipe.try(value)).toThrow()
  })
})

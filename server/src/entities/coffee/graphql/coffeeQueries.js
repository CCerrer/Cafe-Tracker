import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from 'graphql'
import { CoffeeType } from '../coffeeType.js'
import { Coffee } from '../coffeeModel.js'

export const coffeeQueries = {
  coffees: {
    type: new GraphQLList(CoffeeType),
    resolve: async () => {
      try {
        const find = await Coffee.find()
        return find
      } catch (error) {
        console.log(error)
      }
    }
  },
  coffee: {
    type: CoffeeType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, { id }) => {
      const find = await Coffee.findById(id)
      return find
    }
  }
}

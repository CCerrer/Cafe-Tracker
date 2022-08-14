import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLFloat
} from 'graphql'
import { CoffeeType } from '../coffeeType.js'
import { Coffee } from '../coffeeModel.js'

export const coffeeMutation = {
  addCoffee: {
    type: CoffeeType,
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      price: { type: GraphQLNonNull(GraphQLFloat) },
      imgLink: { type: GraphQLString }
    },
    resolve: (_, { name, price, imgLink }) => {
      const newCoffee = new Coffee({ name, price, imgLink })
      newCoffee.save()
      return newCoffee
    }
  },
  editCoffee: {
    type: CoffeeType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      price: { type: GraphQLFloat },
      imgLink: { type: GraphQLString }
    },
    resolve: async (_, { id, name, price, imgLink }) => {
      await Coffee.findByIdAndUpdate(id, { name, price, imgLink })
      return Coffee.findById(id)
    }
  },
  removeCoffee: {
    type: GraphQLString,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, { id }) => {
      await Coffee.findByIdAndDelete(id)
      return `The document with ID: ${id} was deleted`
    }
  }
}

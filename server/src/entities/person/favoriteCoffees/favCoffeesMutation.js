import { PersonType } from '../personType.js'
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLString
} from 'graphql'
import { Person } from '../personModel.js'
import { Coffee } from '../../coffee/coffeeModel.js'

export const favCoffeesMutation = {
  editFavoriteCoffees: {
    type: PersonType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      favoriteCoffees: { type: GraphQLList(GraphQLString) }
    },
    resolve: async (_, { id, favoriteCoffees }) => {
      const person = await Person.findById(id)
      const coffees = person.favoriteCoffees
      for (let i = 0; i < favoriteCoffees.length; i++) {
        const tempCoffee = await Coffee.findOne({ name: favoriteCoffees[i] })
        coffees.push(tempCoffee)
      }
      await Person.findByIdAndUpdate(id, { favoriteCoffees: coffees })
      return Person.findById(id)
    }
  },
  removeFavoriteCoffees: {
    type: PersonType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      favoriteCoffees: { type: GraphQLList(GraphQLString) }
    },
    resolve: async (_, { id, favoriteCoffees }) => {
      const newList = []
      if (!favoriteCoffees) {
        const person = await Person.findByIdAndUpdate(id, { favoriteCoffees: newList })
        return person
      }
      const person = await Person.findById(id)
      const coffees = person.favoriteCoffees
      const coffeesEdited = coffees.filter(coffeRejected => !favoriteCoffees.includes(coffeRejected.name))
      await Person.findByIdAndUpdate(id, { favoriteCoffees: coffeesEdited })
      return Person.findById(id)
    }
  }
}

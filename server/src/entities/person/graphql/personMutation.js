import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql'
import { PersonType } from '../personType.js'
import { Person } from '../personModel.js'
import { Coffee } from '../../coffee/coffeeModel.js'

export const personMutation = {
  addPerson: {
    type: PersonType,
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      age: { type: GraphQLNonNull(GraphQLInt) },
      favoriteCoffees: { type: GraphQLList(GraphQLString) }
    },
    resolve: async (_, { name, age, favoriteCoffees }) => {
      const newList = []
      if (favoriteCoffees === undefined) {
        favoriteCoffees = newList
      } else {
        for (let i = 0; i < favoriteCoffees.length; i++) {
          const tempCoffee = await Coffee.findOne({ name: favoriteCoffees[i] })
          newList.push(tempCoffee)
        }
      }
      const newPerson = new Person({ name, age, favoriteCoffees: newList })
      await newPerson.save()
      return newPerson
    }
  },
  editPerson: {
    type: PersonType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      age: { type: GraphQLInt }
    },
    resolve: async (_, { id, name, age }) => {
      await Person.findByIdAndUpdate(id, { name, age })
      return Person.findById(id)
    }
  },
  removePerson: {
    type: GraphQLString,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, { id }) => {
      await Person.findByIdAndDelete(id)
      return `The document with ID: ${id} was deleted`
    }
  }
}

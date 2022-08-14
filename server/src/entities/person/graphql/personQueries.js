import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} from 'graphql'
import { PersonType } from '../personType.js'
import { Person } from '../personModel.js'

export const personQueries = {
  people: {
    type: new GraphQLList(PersonType),
    resolve: async () => {
      const find = Person.find()
      return find
    }
  },
  person: {
    type: PersonType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, { id }) => {
      const find = Person.findById(id)
      return find
    }
  }
}

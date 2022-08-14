import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString
} from 'graphql'
import { CoffeeType } from '../coffee/coffeeType.js'

export const PersonType = new GraphQLObjectType({
  name: 'PersonType',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLNonNull(GraphQLInt) },
    favoriteCoffees: { type: GraphQLList(CoffeeType) }
  })
})

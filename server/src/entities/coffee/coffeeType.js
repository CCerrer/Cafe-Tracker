import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLFloat,
  GraphQLString
} from 'graphql'

export const CoffeeType = new GraphQLObjectType({
  name: 'CoffeeType',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLNonNull(GraphQLFloat) },
    imgLink: { type: GraphQLString }
  })
})

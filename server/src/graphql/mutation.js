import { personMutation } from '../entities/person/graphql/personMutation.js'
import { coffeeMutation } from '../entities/coffee/graphql/coffeeMutation.js'
import { favCoffeesMutation } from '../entities/person/favoriteCoffees/favCoffeesMutation.js'
import { GraphQLObjectType } from 'graphql'

export const mutationType = new GraphQLObjectType({
  name: 'mutation',
  fields: () => ({
    ...coffeeMutation,
    ...personMutation,
    ...favCoffeesMutation
  })
})

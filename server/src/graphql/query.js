import { coffeeQueries } from '../entities/coffee/graphql/coffeeQueries.js'
import { personQueries } from '../entities/person/graphql/personQueries.js'
import { GraphQLObjectType } from 'graphql'

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...coffeeQueries,
    ...personQueries
  })
})

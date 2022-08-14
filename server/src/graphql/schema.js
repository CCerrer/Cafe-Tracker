import { GraphQLSchema } from 'graphql'
import { queryType } from './query.js'
import { mutationType } from './mutation.js'

export const schema = new GraphQLSchema({ query: queryType, mutation: mutationType })

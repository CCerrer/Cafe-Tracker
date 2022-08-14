import Koa from 'koa'
import mount from 'koa-mount'
import { graphqlHTTP } from 'koa-graphql'
import mongoose from 'mongoose'
import envVars from './config.js'
import { schema } from './graphql/schema.js'

const app = new Koa()

app.use(
  mount(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true
    })
  )
)

async function startServer () {
  try {
    await mongoose.connect(`mongodb+srv://${envVars.user}:${envVars.password}@${envVars.cluster}.m6cypa5.mongodb.net/CafeJeri?retryWrites=true&w=majority`)
    console.log('MongoDB connected')
    app.listen(`${envVars.port}`)
    console.log(`Running a GraphQL API server at http://localhost:${envVars.port}/graphql`)
  } catch (error) {
    console.log(error)
  }
}
startServer()

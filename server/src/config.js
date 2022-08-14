import dotenv from 'dotenv'
import joi from 'joi'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.join(__dirname, '../.env') })

const envVarsSchema = joi
  .object()
  .keys({
    MONGO_USER: joi
      .string()
      .required(),
    MONGO_PASSWORD: joi
      .string()
      .required(),
    MONGO_CLUSTER: joi
      .string()
      .required(),
    PORT: joi.number().positive().required()
  })
  .unknown()

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export default {
  user: envVars.MONGO_USER,
  password: envVars.MONGO_PASSWORD,
  cluster: envVars.MONGO_CLUSTER,
  port: envVars.PORT
}

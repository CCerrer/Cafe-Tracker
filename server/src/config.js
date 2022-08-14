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
    MONGO_URI: joi
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
  connectionLink: envVars.MONGO_URI,
  port: envVars.PORT
}

import mongoose from 'mongoose'
import { coffeeSchema } from '../coffee/coffeeModel.js'

export const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  favoriteCoffees: {
    type: [coffeeSchema],
    default: [coffeeSchema]
  }
}, { collection: 'person' })

export const Person = mongoose.model('Person', personSchema)

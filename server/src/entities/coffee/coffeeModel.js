import mongoose from 'mongoose'

export const coffeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imgLink: {
    type: String,
    default: ''
  }
}, { collection: 'coffee' })

export const Coffee = mongoose.model('Coffee', coffeeSchema)

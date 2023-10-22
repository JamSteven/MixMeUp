const mongoose = require("mongoose")

const cocktailSchema = mongoose.Schema({
  name: String,
  ingredients: [String],
  instructions: String,
})

const Cocktail = mongoose.model("Cocktail", cocktailSchema)

module.exports = Cocktail

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/cocktailsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const cocktailSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  instructions: String,
})

const Cocktail = mongoose.model("Cocktail", cocktailSchema)

app.post("/addCocktail", async (req, res) => {
  const { name, ingredients, instructions } = req.body
  const newCocktail = new Cocktail({ name, ingredients, instructions })
  try {
    await newCocktail.save()
    res.status(201).send("Cocktail added successfully")
  } catch (error) {
    console.error(error)
    res.status(500).send("Server error")
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

const mongoose = require("mongoose")
const Cocktail = require("./models/Cocktail")

mongoose.connect("mongodb://127.0.0.1:27017/cocktailsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const cocktails = [
  {
    name: "Margarita",
    ingredients: ["Tequila", "Triple Sec", "Lime Juice"],
    instructions: "Shake and serve over ice.",
  },
  {
    name: "Mojito",
    ingredients: ["White Rum", "Sugar", "Lime", "Mint Leaves", "Soda Water"],
    instructions: "Muddle mint and lime, add rum, top with soda.",
  },
  // Ajoutez autant de cocktails que vous le souhaitez ici.
]

Cocktail.insertMany(cocktails)
  .then(() => {
    console.log("Cocktails ajoutés avec succès !")
    mongoose.connection.close()
  })
  .catch((error) => {
    console.error("Erreur lors de l'ajout des cocktails :", error)
    mongoose.connection.close()
  })

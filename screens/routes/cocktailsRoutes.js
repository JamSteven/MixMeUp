const express = require("express")
const Cocktail = require("../models/Cocktail")
const router = express.Router()

router.post("/addCocktail", async (req, res) => {
  try {
    const newCocktail = new Cocktail(req.body)
    await newCocktail.save()
    res.status(201).send(newCocktail)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router

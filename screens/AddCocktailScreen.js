import React, { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet } from "react-native"

const AddCocktailScreen = ({ navigation }) => {
  const [name, setName] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [instructions, setInstructions] = useState("")

  const addCocktail = async () => {
    try {
      const response = await fetch("mongodb://127.0.0.1:27017/cocktailsDB", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          ingredients: ingredients
            .split(",")
            .map((ingredient) => ingredient.trim()),
          instructions,
        }),
      })
      if (response.status === 200) {
        alert("Cocktail ajouté avec succès!")
        navigation.goBack()
      } else {
        alert("Erreur lors de l'ajout du cocktail")
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du cocktail", error)
      alert("Erreur lors de la connexion au serveur")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Ingrédients (séparés par une virgule):</Text>
      <TextInput
        style={styles.input}
        value={ingredients}
        onChangeText={setIngredients}
      />
      <Text style={styles.label}>Instructions:</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />
      <Button title="Ajouter le Cocktail" onPress={addCocktail} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "grey",
    marginBottom: 16,
    padding: 8,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
})

export default AddCocktailScreen

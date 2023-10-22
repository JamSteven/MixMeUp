import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const CocktailItem = ({ cocktail, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(cocktail)}>
      <View style={styles.container}>
        <Text style={styles.name}>{cocktail.nom}</Text>
        <Text style={styles.ingredients}>
          Ingrédients: {cocktail.ingredients.join(", ")}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ingredients: {
    fontSize: 14,
    color: "#555",
  },
})

export default CocktailItem

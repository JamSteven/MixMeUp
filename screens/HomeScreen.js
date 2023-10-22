import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native"
import { CheckBox } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import Cocktails from "./../components/Cocktails.json"

const ingredients = [
  { id: "1", name: "Vodka" },
  { id: "2", name: "Gin" },
  { id: "3", name: "Rum" },
  // Ajoutez d'autres ingrédients ici
]

const HomeScreen = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const navigation = useNavigation()

  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.includes(ingredient.id)) {
      setSelectedIngredients(
        selectedIngredients.filter((id) => id !== ingredient.id)
      )
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient.id])
    }
  }

  const filteredCocktails = Cocktails.filter((cocktail) =>
    cocktail.ingredients.every((ingredient) =>
      selectedIngredients.includes(ingredient)
    )
  )

  const navigateToCocktailScreen = () => {
    navigation.navigate("CocktailScreen", { cocktails: filteredCocktails })
  }

  const renderItem = ({ item }) => (
    <CheckBox
      title={item.name}
      checked={selectedIngredients.includes(item.id)}
      onPress={() => toggleIngredient(item)}
      containerStyle={styles.checkbox}
    />
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Ingredients</Text>
      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={navigateToCocktailScreen}
      >
        <Text style={styles.buttonText}>Create Cocktail</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  checkbox: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default HomeScreen

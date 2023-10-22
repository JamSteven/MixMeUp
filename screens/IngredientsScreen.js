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

  const createCocktail = () => {
    // Créez ici un objet de cocktail en fonction des ingrédients sélectionnés
    const cocktail = {
      nom: "Mon Cocktail",
      ingredients: selectedIngredients.map(
        (id) => ingredients.find((ingredient) => ingredient.id === id).name
      ),
      instructions: "Mélangez tous les ingrédients et dégustez !",
    }

    // Vous pouvez maintenant faire ce que vous voulez avec le cocktail, par exemple, le sauvegarder dans une liste de cocktails créés par l'utilisateur.

    // Naviguez vers l'écran de détail du cocktail pour afficher les informations du cocktail.
    navigation.navigate("CocktailScreen", { cocktail })
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
      <TouchableOpacity style={styles.button} onPress={createCocktail}>
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

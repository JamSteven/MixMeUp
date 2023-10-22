import React from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"

const cocktails = [
  {
    id: "1",
    name: "Margarita",
    ingredients: ["Tequila", "Lime Juice", "Cointreau"],
    instructions: [
      {
        step: 1,
        text: "Add Tequila, Lime Juice, and Cointreau to the shaker.",
      },
      { step: 2, text: "Fill the shaker with ice and shake well." },
      { step: 3, text: "Strain into a glass and enjoy." },
    ],
  },
  {
    id: "2",
    name: "Mojito",
    ingredients: ["Rum", "Mint", "Lime Juice", "Sugar", "Soda Water"],
    instructions: [
      { step: 1, text: "Muddle mint and lime in the glass." },
      { step: 2, text: "Add sugar and fill the glass with ice." },
      { step: 3, text: "Pour the rum over the ice." },
      { step: 4, text: "Top with soda water and stir." },
      { step: 5, text: "Garnish with a mint sprig and enjoy." },
    ],
  },
  // Ajoutez d'autres cocktails ici
]

const ResultsScreen = ({ route }) => {
  const { selectedIngredients } = route.params
  const navigation = useNavigation()

  const filteredCocktails = cocktails.filter((cocktail) =>
    cocktail.ingredients.every((ingredient) =>
      selectedIngredients.includes(ingredient)
    )
  )

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("CocktailDetail", { cocktail: item })}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cocktails You Can Make</Text>
      <FlatList
        data={filteredCocktails}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 18,
  },
})

export default ResultsScreen

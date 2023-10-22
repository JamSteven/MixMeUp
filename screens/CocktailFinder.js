import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import cocktailsData from "./../components/Cocktails.json"
import { SvgUri } from "react-native-svg"
import Icon from "react-native-vector-icons/FontAwesome"

const CocktailFinder = () => {
  const [ingredients, setIngredients] = useState("")
  const [foundCocktails, setFoundCocktails] = useState([])
  const [suggestedIngredients, setSuggestedIngredients] = useState([])
  const [sortedCocktails, setSortedCocktails] = useState([])
  const [selectedCocktailId, setSelectedCocktailId] = useState(null)
  const [showSearchResults, setShowSearchResults] = useState(false)

  const commonIngredients = [
    "Tequila",
    "Jus de citron vert",
    "Cointreau",
    "Sel",
    "Rhum",
    // Ajoutez d'autres ingrédients ici
  ]

  useEffect(() => {
    const sorted = foundCocktails
      .slice()
      .sort((a, b) => b.popularite - a.popularite)
    setSortedCocktails(sorted)

    const inputIngredients = ingredients
      .toLowerCase()
      .split(",")
      .map((ingredient) => ingredient.trim())
    const suggestions = []

    inputIngredients.forEach((inputIngredient) => {
      const matches = commonIngredients.filter((commonIngredient) =>
        commonIngredient.toLowerCase().includes(inputIngredient)
      )

      suggestions.push(...matches)
    })

    const uniqueSuggestions = Array.from(new Set(suggestions))

    setSuggestedIngredients(uniqueSuggestions)
  }, [foundCocktails, ingredients])

  const searchCocktails = () => {
    const ingredientsArray = ingredients
      .toLowerCase()
      .split(",")
      .map((ingredient) => ingredient.trim())

    const filteredCocktails = cocktailsData.filter((cocktail) =>
      ingredientsArray.every((searchIngredient) =>
        cocktail.ingredients.some((ingredient) =>
          ingredient.nom.toLowerCase().includes(searchIngredient)
        )
      )
    )

    setFoundCocktails(filteredCocktails)
    setShowSearchResults(true)
  }

  const clearSearch = () => {
    setIngredients("")
    setFoundCocktails([])
    setShowSearchResults(false)
    setSelectedCocktailId(null)
  }

  const highlightIngredients = (text, ingredientsArray) => {
    const parts = text.split(/(\s+)/)

    return parts.map((part, index) => {
      if (ingredientsArray.includes(part.toLowerCase())) {
        return (
          <Text key={index} style={styles.highlightedText}>
            {part}
          </Text>
        )
      } else {
        return part
      }
    })
  }

  const generateIngredientSuggestionsFromResults = () => {
    const allIngredients = foundCocktails
      .map((cocktail) => cocktail.ingredients)
      .flat()
      .map((ingredient) => ingredient.nom.toLowerCase())

    const inputIngredients = ingredients
      .toLowerCase()
      .split(",")
      .map((ingredient) => ingredient.trim())

    const suggestions = []

    inputIngredients.forEach((inputIngredient) => {
      const matchingIngredients = allIngredients.filter(
        (ingredient) =>
          ingredient.startsWith(inputIngredient) &&
          !inputIngredients.includes(ingredient)
      )

      suggestions.push(...matchingIngredients)
    })

    const uniqueSuggestions = Array.from(new Set(suggestions))

    return uniqueSuggestions
  }

  const showCocktailDetails = (cocktailId) => {
    setSelectedCocktailId(cocktailId)
  }

  const hideCocktailDetails = () => {
    setSelectedCocktailId(null)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recherche de cocktails par ingrédients</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Entrez les ingrédients séparés par des virgules"
          value={ingredients}
          onChangeText={(text) => setIngredients(text)}
        />
        <TouchableOpacity onPress={searchCocktails}>
          <Icon name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      {showSearchResults && (
        <Button title="Effacer la recherche" onPress={clearSearch} />
      )}
      {suggestedIngredients.length > 0 && (
        <View style={styles.suggestionContainer}>
          <Text style={styles.suggestionText}>Suggestions : </Text>
          {suggestedIngredients.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                setIngredients(
                  (prevIngredients) =>
                    prevIngredients + (prevIngredients ? "," : "") + suggestion
                )
              }
            >
              <Text style={styles.suggestedIngredient}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {showSearchResults && (
        <FlatList
          data={sortedCocktails}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                selectedCocktailId === item.id
                  ? hideCocktailDetails()
                  : showCocktailDetails(item.id)
              }
            >
              <View style={styles.cocktailCard}>
                <View style={styles.imageContainer}>
                  {item.image && item.image.endsWith(".svg") ? (
                    <SvgUri width={100} height={100} uri={item.image} />
                  ) : (
                    <Image
                      source={
                        item.image
                          ? { uri: item.image }
                          : require("../assets/basic.png")
                      }
                      style={styles.cocktailImage}
                    />
                  )}
                </View>
                <View style={styles.cocktailInfo}>
                  <Text style={styles.cocktailName}>
                    {highlightIngredients(item.nom, ingredients.split(","))}
                  </Text>
                  {/* Afficher les ingrédients uniquement si le cocktail est sélectionné */}
                  {selectedCocktailId === item.id && (
                    <Text style={styles.cocktailIngredients}>
                      Ingrédients:{" "}
                      {highlightIngredients(
                        item.ingredients
                          .map(
                            (ingredient) =>
                              `${ingredient.nom} (${ingredient.quantite} ${ingredient.unite})`
                          )
                          .join(", "),
                        ingredients.split(",")
                      )}
                    </Text>
                  )}
                </View>
              </View>
              {/* Afficher les instructions uniquement si le cocktail est sélectionné */}
              {selectedCocktailId === item.id && (
                <Text style={styles.cocktailInstructions}>
                  Instructions: {item.instructions}
                </Text>
              )}
            </TouchableOpacity>
          )}
        />
      )}

      {/* Suggestions d'ingrédients basées sur les résultats */}
      {showSearchResults &&
        generateIngredientSuggestionsFromResults().length > 0 && (
          <View style={styles.suggestions}>
            <Text style={styles.suggestionText}>
              Autres ingrédients possibles:
            </Text>
            {generateIngredientSuggestionsFromResults().map(
              (suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    setIngredients(
                      (prevIngredients) =>
                        prevIngredients +
                        (prevIngredients ? "," : "") +
                        suggestion
                    )
                  }
                >
                  <Text style={styles.suggestedIngredient}>{suggestion}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    borderRadius: 8,
  },
  suggestionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  suggestionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  suggestedIngredient: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    margin: 4,
    borderRadius: 8,
    fontSize: 16,
  },
  cocktailCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  imageContainer: {
    marginRight: 16,
  },
  cocktailImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginBottom: 8,
    borderRadius: 8,
  },
  cocktailInfo: {
    flex: 1,
  },
  cocktailName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cocktailIngredients: {
    fontSize: 16,
    marginBottom: 8,
  },
  cocktailInstructions: {
    fontSize: 16,
    marginBottom: 8,
  },
  highlightedText: {
    backgroundColor: "yellow",
  },
  suggestions: {
    marginTop: 16,
  },
})

export default CocktailFinder

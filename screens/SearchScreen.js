import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native"

const mockCocktails = [
  { id: "1", name: "Margarita" },
  { id: "2", name: "Mojito" },
  { id: "3", name: "Cosmopolitan" },
  // Ajoutez plus de données mock ici
]

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState([])

  const handleSearch = () => {
    const filteredResults = mockCocktails.filter((cocktail) =>
      cocktail.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setResults(filteredResults)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Recherchez un cocktail..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.resultItem}>
            <Text style={styles.resultText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 5,
  },
  resultItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  resultText: {
    fontSize: 16,
  },
})

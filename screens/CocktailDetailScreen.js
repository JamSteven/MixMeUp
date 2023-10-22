import React from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"

const CocktailDetailScreen = ({ route }) => {
  const { cocktail } = route.params

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{cocktail.name}</Text>
      <Text style={styles.subtitle}>Ingrédients</Text>
      {cocktail.ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.text}>
          {ingredient}
        </Text>
      ))}
      <Text style={styles.subtitle}>Instructions</Text>
      {cocktail.instructions.map((instruction) => (
        <View key={instruction.step} style={styles.instruction}>
          <Text style={styles.step}>{instruction.step}.</Text>
          <Text style={styles.text}>{instruction.text}</Text>
        </View>
      ))}
    </ScrollView>
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
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  instruction: {
    flexDirection: "row",
    marginBottom: 5,
  },
  step: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
})

export default CocktailDetailScreen

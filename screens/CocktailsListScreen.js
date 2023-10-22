import React from "react"
import { View, FlatList, StyleSheet } from "react-native"
import CocktailItem from "../components/CocktailItem"

const CocktailListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={cocktails} // Assurez-vous d'importer votre liste de cocktails ici
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CocktailItem
            cocktail={item}
            onPress={(cocktail) =>
              navigation.navigate("CocktailDetail", { cocktail })
            }
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f3f3f3",
  },
})

export default CocktailListScreen

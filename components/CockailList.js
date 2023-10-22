import React from "react"
import { View, Text, FlatList } from "react-native"
import Cocktails from "./Cocktails.json"

const CocktailList = () => {
  return (
    <FlatList
      data={cocktails}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>{item.nom}</Text>
          <Text>{item.ingredients.join(", ")}</Text>
          <Text>{item.instructions}</Text>
        </View>
      )}
    />
  )
}

export default CocktailList

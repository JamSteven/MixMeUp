import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { BottomTabNavigator } from "./components/BottomTabNavigator"
import CocktailDetailScreen from "./screens/CocktailDetailScreen"
import CocktailsListScreen from "./screens/CocktailsListScreen"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import CocktailFinder from "./screens/CocktailFinder"
const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="CocktailDetail" component={CocktailDetailScreen} />
        <Stack.Screen name="CocktailsList" component={CocktailsListScreen} />
        <Stack.Screen name="CocktailFinder" component={CocktailFinder} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// Importez les bibliothèques nécessaires
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import HomeScreen from "../screens/HomeScreen"
import AddCocktailScreen from "../screens/AddCocktailScreen"
import IngredientsScreen from "../screens/IngredientsScreen"
import SearchScreen from "../screens/SearchScreen"
import ResultsScreen from "../screens/ResultsScreen"
import CocktailFinder from "../screens/CocktailFinder"

// Créez votre navigateur de barre inférieure
const Tab = createBottomTabNavigator()

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        style: {
          backgroundColor: "#fff", // Couleur de fond de la barre de navigation
          borderTopColor: "transparent", // Supprime la ligne de séparation supérieure
        },
        labelStyle: {
          fontSize: 12, // Taille du texte des étiquettes
          marginBottom: 5, // Espace entre l'icône et l'étiquette
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Accueil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddCocktail"
        component={AddCocktailScreen}
        options={{
          tabBarLabel: "Ajouter",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Ingredients"
        component={IngredientsScreen}
        options={{
          tabBarLabel: "Ingrédients",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={CocktailFinder}
        options={{
          tabBarLabel: "Recherche",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Results"
        component={ResultsScreen}
        options={{
          tabBarLabel: "Résultats",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

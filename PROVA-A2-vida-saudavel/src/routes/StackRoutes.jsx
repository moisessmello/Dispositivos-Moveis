// src/routes/TabRoutes.jsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AlimentacaoScreen from "../screens/AlimentacaoScreen";
import ExerciciosScreen from "../screens/ExerciciosScreen";
import ConsultasScreen from "../screens/ConsultasScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Alimentação") {
            iconName = "food-apple";
          } else if (route.name === "Exercícios") {
            iconName = "dumbbell";
          } else if (route.name === "Consultas") {
            iconName = "calendar-check";
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6200ee",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Alimentação" component={AlimentacaoScreen} />
      <Tab.Screen name="Exercícios" component={ExerciciosScreen} />
      <Tab.Screen name="Consultas" component={ConsultasScreen} />
    </Tab.Navigator>
  );
}
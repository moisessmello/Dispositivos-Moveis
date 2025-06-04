import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AlimentacaoScreen from "../screens/AlimentacaoScreen";
import ExerciciosScreen from "../screens/ExerciciosScreen";
import ConsultasScreen from "../screens/ConsultasScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Alimentação") iconName = "food-apple";
          else if (route.name === "Exercícios") iconName = "run";
          else if (route.name === "Consultas") iconName = "stethoscope";

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Alimentação" component={AlimentacaoScreen} />
      <Tab.Screen name="Exercícios" component={ExerciciosScreen} />
      <Tab.Screen name="Consultas" component={ConsultasScreen} />
    </Tab.Navigator>
  );
}

export default function AlunoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeTabs" 
        component={Tabs} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

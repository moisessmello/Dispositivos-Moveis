// src/routes/TabRoutes.jsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AlimentacaoStack from "./AlimentacaoStack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ExerciciosStack from "./ExerciciosStack";
import ConsultasStack from "./ConsultasStack";

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
      <Tab.Screen name="Alimentação" component={AlimentacaoStack} />
      <Tab.Screen name="Exercícios" component={ExerciciosStack} />
      <Tab.Screen name="Consultas" component={ConsultasStack} />
    </Tab.Navigator>
  );
}
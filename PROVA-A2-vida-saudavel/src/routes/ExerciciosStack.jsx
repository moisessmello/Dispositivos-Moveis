import { createStackNavigator } from "@react-navigation/stack";
import ExerciciosScreen from "../screens/exercicios/ExerciciosScreen";
import ExercicioForm from "../screens/exercicios/ExercicioForm";

const Stack = createStackNavigator();

export default function ExerciciosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ExerciciosScreen" 
        component={ExerciciosScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ExerciciosForm"
        component={ExercicioForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="EditarExerciciosForm"
        component={ExercicioForm}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

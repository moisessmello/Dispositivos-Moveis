import { createStackNavigator } from "@react-navigation/stack";
import ConsultasScreen from "../screens/consulta/ConsultasScreen";
import ConsultaForm from "../screens/consulta/ConsultaForm";

const Stack = createStackNavigator();

export default function ConsultasStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen 
        name="ConsultasScreen" 
        component={ConsultasScreen}  
      />
      <Stack.Screen 
        name="ConsultasForm"
        component={ConsultaForm}
      />
      <Stack.Screen 
        name="EditarConsultasForm"
        component={ConsultaForm}
      />
    </Stack.Navigator>
  );
}
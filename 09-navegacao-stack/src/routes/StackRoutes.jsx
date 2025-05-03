// import das telas
import HomeScrenn from "../screens/HomeScreen";
import ProfileScrenn from "../screens/ProfileScreen";
import ConfigScrenn from "../screens/ConfigScreen";

// import do stack
import { createStackNavigator } from "@react-navigation/stack";

// Criando stack

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>

      <Stack.Screen name="HomeScreen" 
      component={HomeScrenn} 
      options={{
        title: "Início", 
        headerTitleAlign: 'center'}} 
        />
      <Stack.Screen name="ProfileScreen" component={ProfileScrenn} />
      <Stack.Screen name="ConfigScreen" component={ConfigScrenn} />

    </Stack.Navigator>
  );
}

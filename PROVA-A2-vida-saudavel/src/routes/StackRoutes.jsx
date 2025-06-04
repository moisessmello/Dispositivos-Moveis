// src/routes/StackRoutes.jsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabRoutes from "./TabRoutes";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeTabs" 
        component={TabRoutes} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import TabsRoutes from "./src/routes/TabsRoutes";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <TabsRoutes />
      </NavigationContainer>
    </PaperProvider>
  );
}
import 'react-native-gesture-handler';

import DrawerRoutes from './src/routes/DrawerRoutes'
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <DrawerRoutes/>
      </NavigationContainer>
    </PaperProvider>
    
  );
}



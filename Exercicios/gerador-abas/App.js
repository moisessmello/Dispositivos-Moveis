import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import JogoDoBichoScreen from './screens/JogoDoBichoScreen';
import MegaSenaScreen from './screens/MegaSenaScreen';

export default function App() {
  return (
    <View style={styles.container}>
            <StatusBar style="auto" />

            <JogoDoBichoScreen />

            <MegaSenaScreen />



    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


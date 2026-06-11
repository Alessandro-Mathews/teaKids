import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Baloo2_400Regular, Baloo2_700Bold } from '@expo-google-fonts/baloo-2';
import Home from './src/screens/home';
import LoginScreen from './src/screens/loginScreen';
import SelAppScreen from './src/screens/selAppScreen';
import SelRotinaFixa from './src/screens/selRotinaFixa'; 
import Register from './src/screens/registerScreen';
import EmbaralhandoCartas from './src/screens/embaralharCartas'

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Baloo2_400Regular,
    Baloo2_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SelApp" component={SelAppScreen} />
        <Stack.Screen name="SelRotina" component={SelRotinaFixa} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Embaralhar" component={EmbaralhandoCartas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
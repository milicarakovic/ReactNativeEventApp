import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import CreateAccount from './assets/screens/FIrstLvlScreens/CreateAccount';
import HomeScreen from './assets/screens/FIrstLvlScreens/HomeScreen';
import LogIn from './assets/screens/LogIn';
import ProfileScreen from './assets/screens/SecondLvlScreens/ProfileScreen';
import SearchScreen from './assets/screens/SecondLvlScreens/SearchScreen';
import { TokenContext } from './service/api';

const Stack = createStackNavigator();

export default function App() {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    // console.log(token);
    AsyncStorage.removeItem('token');
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LogIn"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TokenContext.Provider>
  );
}

import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import CreateAccount from './assets/screens/FIrstLvlScreens/CreateAccount';
import HomeScreen from './assets/screens/FIrstLvlScreens/HomeScreen';
import LogIn from './assets/screens/LogIn';
import MapScreen from './assets/screens/SecondLvlScreens/MapScreen';
import ProfileScreen from './assets/screens/SecondLvlScreens/ProfileScreen';
import SearchScreen from './assets/screens/SecondLvlScreens/SearchScreen';

const Stack = createStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);

  async function readItem() {
    let tok = await AsyncStorage.getItem('token');
    if (tok && tok !== '') {
      setToken(tok);
    }
  }
  useEffect(() => {
    readItem();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={token && token !== '' ? 'HomeScreen' : 'LogIn'}
        screenOptions={{ headerShown: false }}
      >
        {token && token !== '' ? (
          <>
            <Stack.Screen name="HomeScreen" options={{ gestureEnabled: false }}>
              {() => <HomeScreen setToken={(value) => setToken(value)} />}
            </Stack.Screen>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="LogIn">
              {() => <LogIn setToken={(value) => setToken(value)} />}
            </Stack.Screen>
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

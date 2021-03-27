import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import CreateAccount from './assets/screens/FIrstLvlScreens/CreateAccount';
import HomeScreen from './assets/screens/FIrstLvlScreens/HomeScreen';
import LogIn from './assets/screens/LogIn';
import ProfileScreen from './assets/screens/SecondLvlScreens/ProfileScreen';
import SearchScreen from './assets/screens/SecondLvlScreens/SearchScreen';
import { TokenContext } from './service/api';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import MapScreen from './assets/screens/SecondLvlScreens/MapScreen';

const Stack = createStackNavigator();

export default function App() {
  // const [token, setToken] = useState<string>('');
  const { token, setToken } = useContext(TokenContext);

  // function readItem() {
  //   AsyncStorage.getItem('token').then((itemValue) => setToken(itemValue));
  // }
  // useEffect(() => {
  //   Alert.alert('App' + token);
  // }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LogIn"
          screenOptions={{ headerShown: false }}
        >
          {/* {token !== '' ? Alert.alert(token) : Alert.alert(token)} */}
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TokenContext.Provider>
  );
}

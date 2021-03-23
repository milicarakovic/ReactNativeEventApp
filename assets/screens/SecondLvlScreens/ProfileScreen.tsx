import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MyProfile from '../ThirdLvlScreen/MyProfile';
import Reservations from '../ThirdLvlScreen/Reservations';

const Tab = createBottomTabNavigator();

function ProfileScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: { justifyContent: 'center' },
        labelStyle: { color: 'black' },
        activeBackgroundColor: '#005691',
      }}
    >
      <Tab.Screen name="Profile" component={MyProfile} />
      <Tab.Screen name="Rezervacije" component={Reservations} />
    </Tab.Navigator>
  );
}

export default ProfileScreen;

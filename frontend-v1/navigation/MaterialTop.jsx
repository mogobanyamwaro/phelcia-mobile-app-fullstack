import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Splash from '../screens/Splash';
import GetStarted from '../screens/GetStarted';
import AuthNavigation from './AuthNavigation';
const Tab = createMaterialTopTabNavigator();
import { MaterialIcons } from '@expo/vector-icons';

export default function MaterialTop() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 8 },
        tabBarItemStyle: {
          width: 20,
          elevation: 0,
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginTop: 20,
        },
        tabBarStyle: {
          backgroundColor: '#143843',
          justifyContent: 'center',
          borderTopColor: '#143843',
          borderTopWidth: 0,
          marginLeft: 130,
          marginRight: 120,
        },
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          width: 0,
          height: 0,
          elevation: 0,
        },
      }}
      tabBarPosition="bottom"
      tabBarShowLabel="false"
      tabBarShowIcon="true"
    >
      <Tab.Screen
        name="Home"
        component={Splash}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="circle" size={11} color="#0EAE4E" />
            ) : (
              <MaterialIcons name="circle" size={11} color="#fff" />
            ),
        }}
      />
      <Tab.Screen
        name="Start"
        component={GetStarted}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="circle" size={11} color="#0EAE4E" />
            ) : (
              <MaterialIcons name="circle" size={11} color="#fff" />
            ),
        }}
      />
      <Tab.Screen
        name="Auth"
        component={AuthNavigation}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="circle" size={11} color="#0EAE4E" />
            ) : (
              <MaterialIcons name="circle" size={11} color="#fff" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

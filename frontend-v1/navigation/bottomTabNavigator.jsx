import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
const Tab = createBottomTabNavigator();
// import screens
import Logout from '../screens/Logout';
import Feedback from '../screens/Feedback';
import Flag from '../screens/Flag';
import { Image, StyleSheet } from 'react-native';
// Importing the images
const Home = require('../assets/images/home.png');
const SmallFlag = require('../assets/images/smallflag.png');
const Man = require('../assets/images/man.png');
const Feedback2 = require('../assets/images/feedback2.png');

// import profile stack
import ProfileNavigator from './ProfileNavigator';

function BottomTab() {
  return (
    <Tab.Navigator
      activeBackgroundColor="green"
      tabBarOptions={{
        showLabel: false,
        inactiveTintColor: '##0EAE4E',
        activeTintColor: '#e47911',
        style: {
          backgroundColor: '#143843',
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={Home} style={tabnavigator.SafeImage} />
          ),
        }}
      />
      <Tab.Screen
        name="Feedback"
        component={Feedback}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={Feedback2} style={tabnavigator.SafeImage} />
          ),
        }}
      />
      <Tab.Screen
        name="Flag"
        component={Flag}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={SmallFlag} style={tabnavigator.SafeImage} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={Logout}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={Man} style={tabnavigator.SafeImage} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTab;

const tabnavigator = StyleSheet.create({
  SafeImage: {
    width: 17,
    height: 17,
  },
});

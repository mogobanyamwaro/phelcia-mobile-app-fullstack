import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchSafe from '../screens/SearchSafe';
import SearchNotSafe from '../screens/SearchNotSafe';
import LandingPage from '../screens/LandingPage';
const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTransparent: true, title: '' }}>
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="SearchNotSafe" component={SearchNotSafe} />
      <Stack.Screen name="SearchSafe" component={SearchSafe} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProfileNavigator;

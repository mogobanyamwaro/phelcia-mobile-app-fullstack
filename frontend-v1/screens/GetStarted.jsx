import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from '../components/styles';

import { Colors } from '../components/styles';

const GetStarted = ({ navigation }) => {
  const handleSubmit = () => {
    console.log('hello');
  };
  return (
    <View style={styles.StyledContainer}>
      <StatusBar style="light" />

      <View>
        <Text style={styles.Title}>Let's get you started</Text>
        <Text style={styles.SafeRide}>
          At Safe Rides, we value safety.We help you
        </Text>
        <Text style={styles.StaySafe}>stay safe on the move</Text>
        <TouchableOpacity
          style={styles.getStartedLogin}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.getStartedButtonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.getStartedSignup}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.ButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetStarted;

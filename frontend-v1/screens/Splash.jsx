import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { styles } from '../components/styles';

import { Colors } from '../components/styles';

const CarIcon = require('./../assets/images/Vector.png');

const Splash = () => {
  return (
    <View style={styles.SplashContainer}>
      <StatusBar style="light" />

      <View>
        <Text style={styles.splashTitle}>Safe Rides</Text>
        <Image source={CarIcon} style={styles.splashImage} />
        <Text style={styles.splashSubTitle}>Verify your ride,stay safe </Text>
      </View>
    </View>
  );
};

export default Splash;

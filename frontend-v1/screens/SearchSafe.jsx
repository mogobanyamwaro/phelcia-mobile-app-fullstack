import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Constants from 'expo-constants';
const windowWidth = Dimensions.get('window').width;

const StatusBarHeight = Constants.statusBarHeight;
import Rating from '../components/Rating';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchSafe = () => {
  return (
    <View style={searchSafe.SearchSafeContainers}>
      <StatusBar style="light" />
      <Text style={searchSafe.Title}>You're on a Safe Ride</Text>
      <View style={searchSafe.SubTitleContainer}>
        <Text style={searchSafe.SubTitle2}>
          {' '}
          The plate number you search is a safe ride
        </Text>
      </View>
      <View>
        <Text style={searchSafe.MoreInfo}>More info;</Text>
      </View>
      <View style={searchSafe.PlateNumberTextContainer}>
        <Text style={searchSafe.PlateNumberText}>
          The plate number or driver name you searched is not in our records.
          Your ride is safe and you are good to go
        </Text>
      </View>
      <View style={searchSafe.RateContainer}>
        <Text style={searchSafe.RateText}>Rate the driver or cab here</Text>
        <Rating />
      </View>
    </View>
  );
};

export default SearchSafe;

const searchSafe = StyleSheet.create({
  SearchSafeContainers: {
    flex: 1,
    padding: 25,
    paddingTop: StatusBarHeight + 30,
    backgroundColor: '#143843',
    fontFamily: ' Kollektif',
    zIndex: -100,
  },
  Title: {
    fontSize: 15,
    marginTop: 30,
    marginBottom: 17,
    letterSpacing: 1,
    // fontFamily: 'Comfortaa',
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#0EAE4E',
  },
  SubTitleContainer: {
    backgroundColor: '#fff',
    height: 100,
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'center',
  },
  SubTitle1: {
    color: '#0EAE4E',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: -30,
    marginBottom: 17,
    textAlign: 'center',
  },
  SubTitle2: {
    color: '#0EAE4E',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  MoreInfo: {
    color: '#0EAE4E',
    marginTop: 30,
    marginBottom: 20,
    fontSize: 15,
    lineHeight: 17,
  },
  PlateNumberTextContainer: {
    backgroundColor: '#0EAE4E',
    position: 'relative',
    // width: 284,

    height: 138,
    // marginRight: 20,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  PlateNumberText: {
    color: '#fff',
    lineHeight: 17,
    textAlign: 'center',
  },
  RateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    lineHeight: 16,
    marginTop: 30,
  },
  RateText: {
    color: '#0EAE4E',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

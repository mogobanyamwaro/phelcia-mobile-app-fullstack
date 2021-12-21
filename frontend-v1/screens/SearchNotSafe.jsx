import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Constants from 'expo-constants';
const windowWidth = Dimensions.get('window').width;

const StatusBarHeight = Constants.statusBarHeight;

const SearchNotSafe = ({ route: { params } }) => {
  const { name } = params;
  const { plate } = params;
  return (
    <View style={searchNotSafe.SearchSafeContainers}>
      <StatusBar style="light" />
      <Text style={searchNotSafe.Title}>Sorry, your ride might be unsafe</Text>
      <View style={searchNotSafe.SubTitleContainer}>
        <Text style={searchNotSafe.SubTitle1}>{name}</Text>
        <Text style={searchNotSafe.SubTitle2}>
          {plate} might be an unsafe ride
        </Text>
      </View>
      <View>
        <Text style={searchNotSafe.MoreInfo}>More info;</Text>
      </View>
      <View style={searchNotSafe.PlateNumberTextContainer}>
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontSize: 12,
            lineHeight: 13,
          }}
        >
          The plate number you searched for has been flaged by other users based
          on a number of accounts. This means your ride might not be safe.
        </Text>
      </View>
    </View>
  );
};

export default SearchNotSafe;

const searchNotSafe = StyleSheet.create({
  SearchSafeContainers: {
    flex: 1,
    padding: 25,
    paddingTop: StatusBarHeight + 30,
    backgroundColor: '#143843',
    fontFamily: ' Kollektif',
    justifyContent: 'space-evenly',
    zIndex: -100,
  },
  Title: {
    fontSize: 15,
    marginTop: 30,
    lineHeight: 17,

    marginBottom: 17,
    letterSpacing: 1,
    // fontFamily: 'Comfortaa',
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#fff',
  },
  SubTitleContainer: {
    backgroundColor: '#fff',
    height: 100,
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'center',
  },
  SubTitle1: {
    color: '#AF3B3B',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    lineHeight: 22,
  },
  SubTitle2: {
    color: '#AF3B3B',
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  MoreInfo: {
    color: '#fff',
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
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  PlateNumberText: {
    color: '#fff',
    marginTop: 24,
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 20,
    lineHeight: 13,
  },
  HikeCobContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: windowWidth - 300,
  },
  HikeCobSubContainer: {
    backgroundColor: '#143843',
    borderRadius: 7,
    paddingRight: 28,
    paddingLeft: 5,
    textAlign: 'center',
  },
  HikeCobSubContainerText: {
    color: '#0EAE4E',
  },
  Percent: {
    color: '#fff',
    marginLeft: 20,
  },
});

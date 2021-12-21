import React, { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// import images
const Kid = require('../assets/images/kid.png');
// height
const windowHeight = Dimensions.get('window').height;
import { styles } from '../components/styles';
import { Formik } from 'formik';

import { Colors } from '../components/styles';
// api calls
import axios from 'axios';

// creditials context
import { CredentialsContext } from '../components/CredentialsContext';
// import Colors

const { primary } = Colors;

const Logout = () => {
  // credentials context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const [loginDetails, setLoginDetails] = useState(null);

  // Function for loggin out
  const clearLogin = () => {
    AsyncStorage.removeItem('phelcia-mobile')
      .then(() => {
        setStoredCredentials('');
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.StyledContainer}>
      <StatusBar style="light" />
      <View>
        <Text style={logout.ProfileText}>Profile</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Image source={Kid} style={logout.SafeImage} />
      </View>
      <View>
        <Formik
          initialValues={{
            email: storedCredentials.email,
            name: storedCredentials.name,
          }}
        >
          {({ values }) => (
            <View style={logout.StyledFormArea}>
              <Text style={logout.labelText}>User Name</Text>
              <TextInput style={logout.StyledTextInput} value={values.name} />
              <Text style={logout.labelText}>Email Address</Text>
              <View style={{ marginBottom: 33 }}>
                <TextInput
                  style={logout.StyledTextInput}
                  value={values.email}
                />
              </View>
              {
                <TouchableOpacity
                  style={logout.StyledButton}
                  onPress={clearLogin}
                >
                  <Text style={styles.ButtonText}>Sign Out</Text>
                </TouchableOpacity>
              }
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Logout;

const logout = StyleSheet.create({
  StyledFormArea: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  StyledButton: {
    padding: 15,
    backgroundColor: Colors.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 5,
    width: 300,
    height: 50,
  },
  coolkid: {
    width: 169,
    height: 103,
    marginBottom: 30,
    marginTop: 30,
  },
  StyledTextInput: {
    backgroundColor: Colors.primary,
    padding: 15,
    paddingLeft: 5,
    paddingRight: 55,
    borderRadius: 15,
    fontSize: 16,
    height: 50,
    width: 300,
    marginVertical: 3,
    marginBottom: 10,
    color: '#0EAE4E',
  },
  ProfileText: {
    position: 'relative',
    color: '#0EAE4E',
    fontSize: 18,
    top: -24,
    lineHeight: 20,
    // marginTop: 20,
    // paddingTop: 1,
    // marginBottom: 5,
    alignSelf: 'flex-start',
  },
  labelText: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 13,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 31,
    marginBottom: 10,
  },
});

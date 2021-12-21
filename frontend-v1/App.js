import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
// apploading
import AppLoading from 'expo-app-loading';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// import view
import { View } from 'react-native';
// credentials context
import { CredentialsContext } from './components/CredentialsContext';
import RootStack from './navigation/RootStack';
import SearchNotSafe from './screens/SearchNotSafe';
import SearchSafe from './screens/SearchSafe';
import LandingPage from './screens/LandingPage';
import Feedback from './screens/Feedback';
import Signup from './screens/SignUp';
import Login from './screens/Login';
import Flag from './screens/Flag';
import Logout from './screens/Logout';
export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState('');

  const checkLoginCredentials = () => {
    AsyncStorage.getItem('phelcia-app')
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((error) => console.log(error));
  };
  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#143843' }}>
      <StatusBar style="dark" />
      <CredentialsContext.Provider
        value={{ storedCredentials, setStoredCredentials }}
      >
        <RootStack />
      </CredentialsContext.Provider>
    </View>
  );
}

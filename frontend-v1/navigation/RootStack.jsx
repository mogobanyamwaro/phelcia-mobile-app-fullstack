import React from 'react';
import { CredentialsContext } from '../components/CredentialsContext';
import { NavigationContainer } from '@react-navigation/native';
import MaterialTop from './MaterialTop';
import BottomTab from './bottomTabNavigator';
const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          {storedCredentials ? <BottomTab /> : <MaterialTop />}
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;
<BottomTab />;

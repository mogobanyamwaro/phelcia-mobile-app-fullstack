import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
// styles
import { styles } from '../components/styles';
// text input
import MyTextInput from '../components/MyTextInput';
// colors
import { Colors } from '../components/styles';
// password validator

import PasswordValidator from 'password-validator';

// keyboard avoding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// api client
import axios from 'axios';
// stylesheet

const { primary } = Colors;
// import yup
import * as yup from 'yup';

const Signup = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  // yup schema
  let yupschema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    name: yup
      .string()
      .trim()
      .required('Your Name is Required')
      .min(4, 'Your name is too short'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required')
      .max(20, ({ max }) => `Password must be ${max} characters long`)
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must contain One Uppercase, One Lowercase, One Number and one special case Character'
      ),
  });

  // credentials context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  // handle sign up
  const handleSignup = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = 'https://phelcia-app.herokuapp.com/api/auth/register';
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { status } = response;
        const { email, password, name } = result;

        if (status !== 200) {
          handleMessage('something went wrong', status);
        } else {
          persistLogin({ email, password, name });
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        if (error.message == 'Request failed with status code 400') {
          return handleMessage(
            'Please Enter Correct password or Email ',
            'incorrect_cred'
          );
        }
        handleMessage(
          'Please Check your Internet connectivity and try again ',
          'network_error'
        );
        console.log(error.toJSON());
      });
  };
  // Handle message
  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  };
  // Global errors and messages
  const globalMessages = () => {
    if (messageType == 'network_error') {
      return <Text style={{ color: '#e91010' }}>{message}</Text>;
    }
    if (messageType == 'login_success') {
      return <Text style={{ color: '#0EAE4E' }}>{message}</Text>;
    }
  };

  // Persisting login after signup
  const persistLogin = (
    credentials,
    message = 'Login Success',
    status = 'login_success'
  ) => {
    AsyncStorage.setItem('phelcia-mobile', JSON.stringify(credentials))
      .then(() => {
        handleMessage('Login success', 'login_success');
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        handleMessage('Persisting login failed', 'login_failed');
        console.log(error);
      });
  };

  return (
    <View style={styles.StyledContainer}>
      <StatusBar style="light" />

      <View>
        <Text style={styles.SubTitle}>Create Account</Text>
        <Formik
          initialValues={{ email: '', password: '', name: '' }}
          validationSchema={yupschema}
          onSubmit={(values, { setSubmitting }) => {
            if (
              values.email == '' ||
              values.password == '' ||
              values.name == ''
            ) {
              handleMessage('Please fill in all fields', 'all_fields');
              setSubmitting(false);
            } else {
              handleSignup(values, setSubmitting);
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
            touched,
            errors,
          }) => (
            <View style={signupstyles.StyledFormArea}>
              <MyTextInput
                placeholder="Name"
                placeholderTextColor={Colors.darkLight}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {errors && touched && (
                <Text style={{ color: '#e91010' }}>{errors.name}</Text>
              )}
              <MyTextInput
                placeholder="Email"
                placeholderTextColor={Colors.darkLight}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {errors && touched && (
                <Text style={{ color: '#e91010' }}>{errors.email}</Text>
              )}
              <MyTextInput
                placeholder="Password"
                placeholderTextColor={Colors.darkLight}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={hidePassword}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              {errors && touched && (
                <Text style={{ color: '#e91010' }}>{errors.password}</Text>
              )}
              {!isSubmitting ? globalMessages() : null}
              {!isSubmitting && (
                <TouchableOpacity
                  style={signupstyles.StyledButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.ButtonText}>Sign up</Text>
                </TouchableOpacity>
              )}
              {isSubmitting && (
                <TouchableOpacity style={styles.StyledButton} disabled={true}>
                  <ActivityIndicator size="large" color={primary} />
                </TouchableOpacity>
              )}
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Signup;

const signupstyles = StyleSheet.create({
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
});

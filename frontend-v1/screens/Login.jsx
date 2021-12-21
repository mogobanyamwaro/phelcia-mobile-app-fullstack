import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from 'react-native';
// height
const windowHeight = Dimensions.get('window').height;
import { styles } from '../components/styles';
import { Formik } from 'formik';
import MyTextInput from '../components/MyTextInput';
import { Colors } from '../components/styles';
// api calls
import axios from 'axios';
// import keyboard avoiding wrapper
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// import yup
import * as yup from 'yup';
// creditials context
import { CredentialsContext } from '../components/CredentialsContext';
// import Colors

const { primary } = Colors;
const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  // credentials context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  // Login the user
  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = 'https://phelcia-app.herokuapp.com/api/auth/login';
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;

        const { status } = response;

        const { email, password, name } = result;

        if (status !== 200) {
          handleMessage('something went wrong', 'went_wrong');
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
  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  };

  // Persisting login
  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem('phelcia-mobile', JSON.stringify(credentials))
      .then(() => {
        handleMessage('Login Success', 'login_success');
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        handleMessage('Persisting login failed', 'login_failed');
        console.log(error);
      });
  };
  // yup schema
  let yupschema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),

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
  // Global errors and messages
  const globalMessages = () => {
    if (messageType == 'network_error') {
      return <Text style={{ color: '#e91010' }}>{message}</Text>;
    }
    if (messageType == 'login_success') {
      return <Text style={{ color: '#0EAE4E' }}>{message}</Text>;
    } else {
      return <Text style={{ color: '#e91010' }}>{message}</Text>;
    }
  };

  return (
    <View style={styles.StyledContainer}>
      <StatusBar style="light" />

      <View>
        <Text style={styles.SubTitle}>Welcome</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={yupschema}
          onSubmit={(values, { setSubmitting }) => {
            if (values.email == '' || values.password == '') {
              handleMessage('Please fill in all fields', 'all_fields');
              setSubmitting(false);
            } else {
              handleLogin(values, setSubmitting);
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
            <View style={login.StyledFormArea}>
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
                  style={login.StyledButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.ButtonText}>Log in</Text>
                </TouchableOpacity>
              )}
              {isSubmitting && (
                <TouchableOpacity style={login.StyledButton} disabled={true}>
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

export default Login;

const login = StyleSheet.create({
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
    color: '#fff',
  },
});

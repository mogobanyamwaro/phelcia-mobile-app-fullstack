import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
// styles
import { styles } from '../components/styles';
// formik
import { Formik } from 'formik';
// import yup
import * as yup from 'yup';
// textinput
import MyTextInput from '../components/MyTextInput';
// feedbackinput
import FeedbackInput from '../components/FeedbackInput';
// colorss
import { Colors } from '../components/styles';

// images
const PersonIcon = require('../assets/images/feedback.png');
// api calls
import axios from 'axios';
// primary color
const { primary } = Colors;
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
const StatusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get('window').height;

const Feedback = () => {
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleFeedback = (feedbackValues, setSubmitting) => {
    handleMessage(null);
    const url = 'https://phelcia-app.herokuapp.com/api/v1/feedback/';
    axios
      .post(url, feedbackValues)
      .then((response) => {
        console.log(response);
        const { status } = response;
        if (status !== 200) {
          handleMessage('something went wrong', 'not_200');
        } else {
          handleMessage('Thanks for your Feedback');
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        handleMessage(
          'An Error occurred . Check your network connectivity',
          'network_error'
        );
        console.log(error.toJSON());
      });
  };

  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  };
  // yup schema
  let yupschema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Please Enter your Email Address'),
    name: yup
      .string()
      .trim()
      .required('Please Enter your Name')
      .min(4, 'Your name is too short'),
    feedback: yup
      .string()
      .trim()
      .required('Please Enter your Feedback')
      .min(10, 'Your sentence is too short'),
  });
  // Global errors and messages
  const globalMessages = () => {
    if (messageType == 'network_error') {
      return <Text style={{ color: '#e91010' }}>{message}</Text>;
    }
    if (messageType == 'not_200') {
      return <Text style={{ color: '#e91010' }}>{message}</Text>;
    } else {
      return <Text style={{ color: '#0EAE4E' }}>{message}</Text>;
    }
  };
  return (
    <ScrollView style={feebackStyles.feedbackContainer}>
      <StatusBar style="light" />
      <View style={feebackStyles.feedbackSubContainer}>
        <View style={feebackStyles.ImageContainer}>
          <Image source={PersonIcon} style={styles.FeedbackImage} />
        </View>

        <Formik
          initialValues={{ email: '', name: '', feedback: '' }}
          validationSchema={yupschema}
          onSubmit={(values, { setSubmitting }) => {
            if (
              values.email == '' ||
              values.name == '' ||
              values.feedback == ''
            ) {
              handleMessage('Please fill in all fields');
              setSubmitting(false);
            } else {
              handleFeedback(values, setSubmitting);
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
            <View style={feebackStyles.StyledFormArea}>
              <TextInput
                style={feebackStyles.FeedbackInputStyles}
                placeholder="Name"
                placeholderTextColor={Colors.darkLight}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {errors && touched && (
                <Text style={{ color: '#e91010' }}>{errors.name}</Text>
              )}
              <TextInput
                style={feebackStyles.FeedbackInputStyles}
                placeholder="Email Address"
                placeholderTextColor={Colors.darkLight}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {errors && touched && (
                <Text style={{ color: '#e91010' }}>{errors.email}</Text>
              )}
              <FeedbackInput
                placeholder="Share your feedback here"
                placeholderTextColor={Colors.darkLight}
                onChangeText={handleChange('feedback')}
                onBlur={handleBlur('feedback')}
                value={values.feedback}
              />
              {errors && touched && (
                <Text style={{ color: '#e91010' }}>{errors.feedback}</Text>
              )}
              {!isSubmitting ? globalMessages() : null}
              {!isSubmitting && (
                <View style={styles.SubmitContainer}>
                  <TouchableOpacity
                    style={styles.StyledButtonSubmit}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.ButtonTextFeedBack}>Submit</Text>
                  </TouchableOpacity>
                </View>
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
    </ScrollView>
  );
};

export default Feedback;

const feebackStyles = StyleSheet.create({
  feedbackContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  feedbackSubContainer: {
    justifyContent: 'center',
    padding: 25,
    paddingTop: StatusBarHeight + 30,

    zIndex: 10000,
    height: windowHeight,
  },
  ImageContainer: {
    alignItems: 'center',
  },
  StyledFormArea: {
    width: '100%',

    justifyContent: 'center',
  },
  FeedbackInputStyles: {
    backgroundColor: Colors.primary,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 55,
    borderRadius: 15,

    fontSize: 16,
    height: 50,
    marginVertical: 3,
    marginBottom: 10,
    color: Colors.tertiary,
  },
});

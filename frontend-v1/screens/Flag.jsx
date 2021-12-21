import React, { useContext, useState, useEffect } from 'react';
// api calls
import axios from 'axios';
// formik
import { Formik } from 'formik';
// import yup
import * as yup from 'yup';
import Splash from './Splash';
import { StatusBar } from 'expo-status-bar';

import { MaterialIcons } from '@expo/vector-icons';

import Constants from 'expo-constants';
const windowWidth = Dimensions.get('window').width;
// Backend Url for fetching the data
const url = 'https://["phelciadomain"].herokuapp.com/api/auth/register';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import Colors
import { Colors } from '../components/styles';
// keyboard avoiding wrapper
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
// status bar
const StatusBarHeight = Constants.statusBarHeight;
// styles
import { styles } from '../components/styles';

// Checkboxes from native base
import { HStack, Checkbox, Center, NativeBaseProvider } from 'native-base';
const { primary } = Colors;
// image picker
import * as ImagePicker from 'expo-image-picker';
const windowHeight = Dimensions.get('window').height;

const Flag = () => {
  // client details
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [image, setImage] = useState(null);
  // yup schema
  let yupschema = yup.object().shape({
    driver_name: yup
      .string()
      .trim()
      .required('Please Enter Driver Name')
      .min(4, 'name is too short'),
    plate_number: yup
      .string()
      .trim()
      .required('Please Enter Valid Number Plate')
      .min(8, 'Plate Number is too short')
      .matches(/^[K]/i, 'The Number plate should start with K'),
  });

  // PIck the image
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleFlag = (flagValues, setSubmitting) => {
    handleMessage(null);
    const url = 'https://phelcia-app.herokuapp.com/api/v1/driver';
    axios
      .post(url, flagValues)
      .then((response) => {
        console.log(response);
        const { status } = response;
        if (status !== 201) {
          handleMessage('something went wrong', 'not_200');
        } else {
          handleMessage('Your Information has been successfully submitted');
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
    <ScrollView style={{ flex: 1, backgroundColor: Colors.background }}>
      <NativeBaseProvider>
        <View style={landingScreen.landingContainer}>
          <StatusBar style="light" />
          <View style={landingScreen.SafeRide}>
            <Text style={landingScreen.SafeRideText}>Safe Rides</Text>
          </View>
          <View style={landingScreen.UsersSafeContainer}>
            <Text style={landingScreen.UserSafeTitle1}>
              Want to flag a harmful driver or cab?
            </Text>
            <Text style={landingScreen.UserSafeTitle2}>
              Help us keep you and other
            </Text>
            <Text style={landingScreen.UserSafeTitle2}>users safe.</Text>
          </View>
          <Formik
            initialValues={{
              driver_name: '',
              plate_number: '',
              cabfare: '',
              physical_assault: '',
              robbery: '',
              sexual_assault: '',
              reckless_driving: '',
              rude_driver: '',
            }}
            validationSchema={yupschema}
            onSubmit={(values, { setSubmitting }) => {
              if (values.driver_name == '' || values.plate_number == '') {
                handleMessage('Please fill in all fields');
                setSubmitting(false);
              } else {
                console.log(values);
                handleFlag(values, setSubmitting);
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
              <View style={{ flex: 1 }}>
                <View style={{ alignItems: 'center' }}>
                  <View style={landingScreen.TextInputContainer}>
                    <TextInput
                      onBlur={handleBlur('driver_name')}
                      onChangeText={handleChange('driver_name')}
                      style={{ marginLeft: 17 }}
                      value={values.driver_name}
                      placeholder="Enter Driver's Name"
                    />
                  </View>
                  {errors && touched && (
                    <Text style={{ color: '#e91010' }}>
                      {errors.driver_name}
                    </Text>
                  )}
                  <View style={landingScreen.TextInputContainerPlate}>
                    <TextInput
                      value={values.plate_number}
                      onBlur={handleBlur('plate_number')}
                      onChangeText={handleChange('plate_number')}
                      style={{ marginLeft: 17 }}
                      placeholder="Enter Plate Number"
                    />
                  </View>
                  {errors && touched && (
                    <Text style={{ color: '#e91010' }}>
                      {errors.plate_number}
                    </Text>
                  )}
                </View>

                {!isSubmitting ? globalMessages() : null}

                <View style={landingScreen.DriverContainer}>
                  <View style={landingScreen.FlaggingText}>
                    <Text style={{ color: '#fff' }}>Reasons for flagging:</Text>
                  </View>
                  <View style={landingScreen.FlaggingCheckBoxes}>
                    <View style={landingScreen.DriverSubContainer}>
                      <View style={landingScreen.checkboxIcon}>
                        <Checkbox
                          value="cabfare"
                          onChangeText={handleChange('cabfare')}
                        >
                          <Text style={landingScreen.checkBoxText}>
                            Hiked Cab Fare
                          </Text>
                        </Checkbox>
                      </View>
                    </View>
                    <View style={landingScreen.DriverSubContainer}>
                      <View style={landingScreen.checkboxIcon}>
                        <Checkbox
                          value="physical_assault"
                          onChangeText={handleChange('physical_assault')}
                        >
                          <Text style={landingScreen.checkBoxText}>
                            Physical assault
                          </Text>
                        </Checkbox>
                      </View>
                    </View>
                    <View style={landingScreen.DriverSubContainer}>
                      <View style={landingScreen.checkboxIcon}>
                        <Checkbox
                          value="robbery"
                          onChangeText={handleChange('robbery')}
                        >
                          <Text style={landingScreen.checkBoxText}>
                            Theft or robbery
                          </Text>
                        </Checkbox>
                      </View>
                    </View>
                    <View style={landingScreen.DriverSubContainer}>
                      <View style={landingScreen.checkboxIcon}>
                        <Checkbox
                          value="sexual_assault"
                          onChangeText={handleChange('sexual_assault')}
                        >
                          <Text style={landingScreen.checkBoxText}>
                            Sexual assault
                          </Text>
                        </Checkbox>
                      </View>
                    </View>
                    <View style={landingScreen.DriverSubContainer}>
                      <View style={landingScreen.checkboxIcon}>
                        <Checkbox
                          value="rude_driver}"
                          onChangeText={handleChange('rude_driver')}
                        >
                          <Text style={landingScreen.checkBoxText}>
                            Reckless driving
                          </Text>
                        </Checkbox>
                      </View>
                    </View>
                  </View>
                  <View style={landingScreen.OtherContainer}>
                    <Text style={{ color: '#0EAE4E', fontSize: 12 }}>
                      Other reasons:
                    </Text>
                  </View>
                  <View style={landingScreen.AttachContainer}>
                    <MaterialIcons
                      name="attachment"
                      size={24}
                      color="#143843"
                      style={{ marginRight: 5 }}
                    />
                    <TouchableOpacity onPress={pickImage}>
                      <Text style={landingScreen.AttachImage}>
                        Attach screenshot images of report
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {!isSubmitting && (
                  <View style={landingScreen.FlagButtonContainer}>
                    <TouchableOpacity
                      style={landingScreen.FlagButton}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.ButtonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {isSubmitting && (
                  <TouchableOpacity
                    style={landingScreen.FlagButton}
                    disabled={true}
                  >
                    <ActivityIndicator size="large" color={primary} />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </Formik>
        </View>
      </NativeBaseProvider>
    </ScrollView>
  );
};

export default Flag;

const landingScreen = StyleSheet.create({
  landingContainer: {
    padding: 25,
    paddingTop: StatusBarHeight,
    backgroundColor: '#1B5B70',
    zIndex: -100,
    height: windowHeight,
  },
  SafeRide: {
    backgroundColor: '#143843',
    width: windowWidth,
    marginLeft: -25,
    marginTop: -24,
    height: 140,
  },
  SafeRideText: {
    color: '#0EAE4E',
    fontSize: 18,
    lineHeight: 20,
    marginTop: 40,
    marginLeft: 30,
    marginBottom: 5,
  },
  TextInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '100%',

    marginTop: 40,
    borderRadius: 5,
    height: 40,
  },
  TextInputContainerPlate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: 310,

    marginTop: 10,
    borderRadius: 5,
    height: 40,
  },
  UsersSafeContainer: {
    position: 'absolute',
    backgroundColor: '#0F323D',
    top: 80,
    height: 90,
    marginLeft: windowWidth / 13,
    width: 303,
    borderRadius: 7,

    alignItems: 'center',
    justifyContent: 'center',
  },
  DriverContainer: {
    marginTop: 10,
  },
  DriverSubContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  OtherContainer: {
    flexDirection: 'row',
  },
  UserSafeTitle1: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 15,
  },
  UserSafeTitle2: {
    color: '#0EAE4E',
    textAlign: 'center',
  },
  Line: {
    width: 120,
    height: 30,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginTop: -15,
    marginLeft: 10,
  },
  FlaggingText: {
    marginBottom: 8,
    // textAlign: 'left',
    marginRight: 100,
    width: windowWidth,
  },
  FlaggingCheckBoxes: {
    marginLeft: 1,
  },
  FlagButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  FlagButton: {
    backgroundColor: Colors.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 150,
    marginVertical: 5,

    height: 40,
  },
  checkBox: {
    backgroundColor: '#1B5B70',
    color: '#fff',
    marginRight: 9,
  },
  checkBoxText: {
    color: '#0EAE4E',
    marginLeft: 10,
  },
  AttachImage: {
    color: '#0EAE4E',
  },
  AttachContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-evenly',
  },
  ShareText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    marginTop: 10,
    // marginLeft: 10,
  },
  Here: {
    color: '#0EAE4E',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 10,
  },
  ShareContainer: {
    backgroundColor: '#143843',
    width: windowWidth,
    marginLeft: -25,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',

    height: 70,
    bottom: -27,
  },
  checkboxIcon: {
    marginRight: 8,
  },
});

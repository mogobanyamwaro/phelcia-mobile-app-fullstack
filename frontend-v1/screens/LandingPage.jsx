import React, { useContext, useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Octicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
// formik
import { Formik } from 'formik';
// api calls
import axios from 'axios';
import Constants from 'expo-constants';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

// width
const windowWidth = Dimensions.get('window').width;
// height
const windowHeight = Dimensions.get('window').height;
const StatusBarHeight = Constants.statusBarHeight;

// Importing the images
const Chat = require('../assets/images/chat.png');
const Flag = require('../assets/images/flag.png');
const Search = require('../assets/images/search.png');
// import colos
import { Colors } from '../components/styles';
// password validator
import PasswordValidator from 'password-validator';

const LandingPage = ({ navigation }) => {
  let [plate_number, setPlateNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [plateDetails, setPlateDetails] = useState(false);

  // validation schema
  const schema = new PasswordValidator();

  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase(4) // Must have uppercase letters
    .has()
    .digits(3)
    .has()
    .spaces(1); // Must have at least 3 digits

  const handlePlateNumber = async () => {
    plate_number = plate_number.toUpperCase();
    console.log(plate_number, 1);
    if (schema.validate(plate_number)) {
      setPlateDetails(false);
      const newPlate = { plate_number };
      console.log(newPlate, 2);
      // url
      const url = 'https://phelcia-app.herokuapp.com/api/v1/driver/plate';
      try {
        setLoading(true);
        const response = await axios.post(url, newPlate);
        setPlateDetails(response.data);
        if (response.data.Custom_plate_number) {
          navigation.navigate('SearchNotSafe', {
            plate: response.data.Custom_plate_number,
            name: response.data.Custom_driver_name,
          });
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        navigation.navigate('SearchSafe');
      }
    } else {
      setPlateDetails(true);
    }
  };

  return (
    <ScrollView style={landingScreen.landingContainer}>
      <StatusBar style="light" />
      <View
        style={{
          justifyContent: 'center',
          padding: 25,
          paddingTop: StatusBarHeight + 30,
        }}
      >
        <View style={landingScreen.safeRideContainer}>
          <View style={landingScreen.SafeRide}>
            <Text style={landingScreen.SafeRideText}>Safe Rides</Text>

            <View style={landingScreen.TextInputContainer}>
              <TextInput
                value={plate_number}
                onChangeText={(e) => setPlateNumber(e)}
                placeholder="Search Plate Number"
                autoCapitalize={'characters'}
              />

              <TouchableOpacity onPress={handlePlateNumber}>
                <Octicons name="search" size={20} color="black" />
              </TouchableOpacity>
            </View>
            {plateDetails && (
              <Text style={{ color: 'red' }}>
                Number plate must be Kenyan,start with a K and be in uppercase
              </Text>
            )}
          </View>
          <View style={landingScreen.safeRideSubContainer}>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Flag')}>
                <Text style={{ color: '#4bafce' }}> Flag</Text>
              </TouchableOpacity>
              <Text style={{ color: '#fff', width: 140 }}>
                previously unsafe drivers and Bolt cabs.
              </Text>
            </View>
            <Image source={Flag} style={landingScreen.SafeImage} />
          </View>
          <View style={landingScreen.safeRideSubContainer}>
            <Image source={Search} style={landingScreen.SafeImage} />
            <View>
              <Text style={{ color: '#fff', width: 140 }}>
                Search for flagged Bolt cabs and drivers.
              </Text>
            </View>
          </View>
          <View style={landingScreen.safeRideSubContainer}>
            <View>
              <Text style={{ color: '#fff', width: 140 }}>
                Give feedback to Safe Rides{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
                <Text style={{ color: '#4bafce' }}> here.</Text>
              </TouchableOpacity>
            </View>
            <Image source={Chat} style={landingScreen.SafeImage} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LandingPage;

const landingScreen = StyleSheet.create({
  landingContainer: {
    flex: 1,

    backgroundColor: Colors.background,
    zIndex: -100,
  },
  SafeRide: {
    width: 280,

    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
  },
  SafeRideText: {
    color: '#0EAE4E',
    fontSize: 18,
    lineHeight: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  TextInputContainer: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    width: 280,

    borderRadius: 5,
    height: 40,
  },
  safeRideContainer: {
    alignItems: 'center',

    height: windowHeight - 100,
  },
  safeRideSubContainer: {
    width: 300,
    height: 110,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 'auto',
    marginBottom: 'auto',

    flexDirection: 'row',
    backgroundColor: '#1B5B70',
  },
  SafeImage: {
    width: 60,
    height: 60,
    marginBottom: 30,
    marginTop: 30,
  },
});

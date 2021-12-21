import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;
// colors
export const Colors = {
  primary: '#ffffff',
  secondary: '#E5E7EB',
  tertiary: '#1F2937',
  darkLight: '#9CA3AF',
  brand: '#0000FF',
  green: '#10B981',
  red: '#EF4444',
  background: '#143843',
  buttonColor: '#0EAE4E',
};

export const styles = StyleSheet.create({
  // View
  StyledContainer: {
    flex: 1,
    padding: 25,
    fontFamily: 'Kollektif',
    paddingTop: StatusBarHeight + 30,
    backgroundColor: Colors.background,
    zIndex: -100,
    justifyContent: 'center',
  },
  SplashContainer: {
    flex: 1,
    padding: 25,
    paddingTop: StatusBarHeight + 30,
    backgroundColor: Colors.background,
    zIndex: -100,
    fontFamily: 'Kollektif',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  FeedBackContainer: {
    // flex: 1,
    padding: 25,
    paddingTop: StatusBarHeight + 30,
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: Colors.background,
    zIndex: -100,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: ' Kollektif',
  },
  SearchSafeCon: {
    flex: 1,
    padding: 25,
    paddingTop: StatusBarHeight + 30,
    backgroundColor: Colors.background,
    zIndex: -100,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  // View
  InnerContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  WelcomeContainer: {
    padding: 25,
    paddingTop: 10,
    justifyContent: 'center',
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  // Image
  PageLogo: {
    width: 250,
    height: 200,
  },
  // Image
  Avatar: {
    width: 100,
    height: 100,
    margin: 'auto',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.secondary,
    marginBottom: 10,
    marginTop: 10,
  },
  splashImage: {
    width: 70,
    height: 70,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 60,
  },
  FeedbackImage: {
    width: 70,
    height: 70,
    marginBottom: 30,
    marginTop: 30,
  },

  splashTitle: {
    fontSize: 18,
    marginTop: 100,
    marginBottom: 80,
    letterSpacing: 1,
    // fontFamily: 'Comfortaa',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#0EAE4E',
  },
  splashSubTitle: {
    fontSize: 13,
    marginTop: 100,
    // marginBottom: 80,
    letterSpacing: 1,
    // fontFamily: 'Comfortaa',
    textAlign: 'center',
    fontWeight: '300',
    color: Colors.primary,
  },
  // Image
  WelcomeImage: {
    height: ' 50%',
    width: '100%',
  },
  // Text
  PageTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.brand,
    padding: 10,
  },
  // Text
  SubTitle: {
    fontSize: 18,
    marginTop: 60,
    marginBottom: 50,
    letterSpacing: 1,
    // fontFamily: 'Comfortaa',
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#0EAE4E',
  },
  Title: {
    fontSize: 18,
    marginTop: 60,
    marginBottom: 30,
    letterSpacing: 1,
    // fontFamily: 'Comfortaa',
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#0EAE4E',
  },
  SafeRide: {
    fontSize: 10,
    marginBottom: 10,
    letterSpacing: 1,
    // fontFamily: 'Comfortaa',
    textAlign: 'left',
    fontWeight: 'bold',
    color: Colors.primary,
  },
  StaySafe: {
    fontSize: 10,
    marginBottom: 40,
    letterSpacing: 1,
    // fontFamily: 'Comfortaa',
    textAlign: 'left',
    fontWeight: 'bold',
    color: Colors.buttonColor,
  },

  // TExtInput
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
    color: Colors.tertiary,
  },
  StyledTextInputFeedback: {
    backgroundColor: Colors.primary,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 55,
    borderRadius: 15,

    fontSize: 16,
    height: 150,
    marginVertical: 3,
    marginBottom: 10,
    color: Colors.tertiary,
  },
  // text
  StyledInputLabel: {
    color: Colors.tertiary,
    fontSize: 13,
    textAlign: 'left',
  },
  LeftIcon: {
    left: 15,
    top: 38,
    position: 'absolute',
    zIndex: 1,
  },
  RightIcon: {
    zIndex: 1,
    right: 15,
    position: 'absolute',
    top: 38,
  },
  getStartedLogin: {
    padding: 15,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 5,

    height: 50,
  },
  getStartedSignup: {
    padding: 15,
    backgroundColor: Colors.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 5,
    marginTop: 29,

    height: 50,
  },
  StyledButton: {
    padding: 15,
    backgroundColor: Colors.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 5,

    height: 50,
  },
  StyledButtonSubmit: {
    padding: 4,

    backgroundColor: Colors.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: 114,
    borderRadius: 10,
    marginVertical: 5,

    height: 35,
  },
  SubmitContainer: {
    alignItems: 'flex-end',
  },
  ButtonText: {
    color: Colors.primary,

    fontSize: 16,
  },
  ButtonTextFeedBack: {
    color: Colors.primary,
    letterSpacing: 2,
    fontSize: 16,
  },
  getStartedButtonText: {
    color: Colors.buttonColor,

    fontSize: 16,
  },
  MsgBox: {
    textAlign: 'center',
    fontSize: 13,
  },
  Line: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.darkLight,
    marginVertical: 10,
  },
  StyledFormArea: {
    width: '100%',
    // alignContent: 'flex-end',
    justifyContent: 'center',
  },
  ExtraView: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  ExtraText: {
    justifyContent: 'center',
    alignContent: 'center',
    color: Colors.tertiary,
    fontSize: 15,
  },
  TextLink: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextLinkContent: {
    color: Colors.brand,
    fontSize: 15,
  },
});

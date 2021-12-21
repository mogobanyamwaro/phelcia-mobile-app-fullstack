import React from 'react';
import { View, TextInput } from 'react-native';
import { styles } from './styles';
import { Colors } from './styles';

// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  isDate,
  showDatePicker,
  ...props
}) => {
  return (
    <>
      {!isDate && <TextInput style={styles.StyledTextInput} {...props} />}

      {isPassword && (
        <View
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Ionicons
            name={hidePassword ? 'md-eye-off' : 'md-eye'}
            size={30}
            color={Colors.darkLight}
          />
        </View>
      )}
    </>
  );
};

export default MyTextInput;

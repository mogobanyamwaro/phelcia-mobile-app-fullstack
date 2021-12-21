import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Rating = () => {
  const [defaultRating, setdefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  // handle alert

  const showAlert = () =>
    Alert.alert('Driver Rating', 'You are about to Rate the Driver', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  const handleSelectedRating = (item) => {
    setdefaultRating(item);
    showAlert();
  };

  return (
    <View style={styles.ratingsContainer}>
      {maxRating.map((item, key) => {
        return (
          <TouchableOpacity
            onPress={() => handleSelectedRating(item)}
            activeOpacity={0.7}
            key={item}
          >
            {item <= defaultRating ? (
              <FontAwesome
                key={item}
                style={styles.star}
                name={'star'}
                size={18}
                color={'#E9ED2F'}
              />
            ) : (
              <FontAwesome
                key={item}
                style={styles.star}
                name={'star-half-empty'}
                size={18}
                color={'#E9ED2F'}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  star: { margin: 2 },
});

import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
// import { Card } from 'react-native-paper';
// import { generateRandomIntFromInterval } from '../utils';

const { width: windowWidth } = Dimensions.get('window');

const CarouselItem =  React.memo(
  () => {
    const [withPlaceholder, setPlaceholder] = React.useState(false);
    return (
      <View style={styles.item}>
       
      </View>
    );
  },
  () => true
);

export default CarouselItem;

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  imageStyle: {
    width: (windowWidth - 32) / 1.5,
    height: 150,
    resizeMode: 'cover',
  },
});

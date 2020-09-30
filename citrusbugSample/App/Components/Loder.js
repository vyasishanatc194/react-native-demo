import React from 'react';
import {View, ActivityIndicator} from 'react-native';


import {colors} from '../Resources/colors';
const BarIndicatorLoader = props => (
  <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)',
    }}>
    <ActivityIndicator size={props.size} color={colors.white} count={5} />
  </View>
);

export default BarIndicatorLoader;

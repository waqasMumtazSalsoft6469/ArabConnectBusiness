import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {colors} from '../../utils/Colors';

const ActivityLoader = props => {
  return (
    <View style={[styles.container, props.style]}>
      <ActivityIndicator
        size={props?.size || 'large'}
        color={props?.color || colors?.secondary}
      />
    </View>
  );
};
export default ActivityLoader;

const styles = StyleSheet.create({
  container: {
    // height : vh*5,
  },
});

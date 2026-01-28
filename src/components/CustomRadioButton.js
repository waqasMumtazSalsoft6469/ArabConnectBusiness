import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

import {family, size} from '../utils';
import {colors} from '../utils/Colors';

const CustomRadioButton = ({selected, onPress, label}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.radioButtonOuter,
          {borderColor: selected ? colors?.secondary : '#ccc'},
        ]}>
        {selected && <View style={styles.radioButtonInner} />}
      </View>
      <Text
        style={[
          styles.radioButtonLabel,
          {color: selected ? colors.secondary : '#000'},
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  radioButtonOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioButtonInner: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: colors?.secondary, // This will be replaced dynamically
  },
  radioButtonLabel: {
    fontSize: size?.medium,
    fontFamily: family?.Gilroy_Medium,
  },
});

export default CustomRadioButton;

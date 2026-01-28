import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { appIcons } from '../assets';
import { colors } from '../utils/Colors';



const CustomCheckbox = ({checked, onChange, iconSrc, cutsomStyle, disabled}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleCheckbox = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <TouchableOpacity onPress={toggleCheckbox} style={styles.checkboxContainer} disabled={disabled}>
      <View style={[styles.checkbox,cutsomStyle , isChecked && styles.checked, ]}>
        {isChecked && (
          <Image
            source={appIcons?.check}
            style={styles.checkmark}
            tintColor={colors?.white}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 26,
    height:  26,    
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors?.lightgray,
  },
  checked: {
    backgroundColor: colors?.secondary,
  },
  checkmark: {
    width: 16,
    height: 16,
    tintColor: colors?.white,
  },
});

export default CustomCheckbox;

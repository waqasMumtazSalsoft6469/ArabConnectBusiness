import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Shadows from '../helpers/Shadows';
import { family, HP, size as fontSize, WP} from '../utils';
import { colors } from '../utils/Colors';
const {width} = Dimensions.get('screen');
export default function CustomButton2({
  color,
  title,
  onPress,
  buttonStyle,
  textStyle,
  disabled,
  nextBtn,
  gradientColorArr,
  iconSrc,
  customWidth,
  textColor,
  buttonStyles,
  size,
}) {
  const defaultColors = [colors?.secondary, colors?.secondary];
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.9}
      style={buttonStyles}>
      <LinearGradient
        colors={gradientColorArr ? gradientColorArr : defaultColors}
        style={[
          {
            width:
              size == 'large'
                ? WP('100%')
                : size == 'medium'
                ? WP('70%')
                : size == 'small'
                ? WP('50%')
                : '100%',
            height: HP('7%'),
            alignItems: 'center',
            justifyContent: 'center',
            ...Shadows.shadow5,
            flexDirection: 'row',
            borderRadius: 6,
          },
          buttonStyle,
        ]}>
        {iconSrc && (
          <FastImage
            source={iconSrc}
            style={styles?.iconStyles}
            resizeMode="contain"
          />
        )}
        <Text
          style={[
            {
              fontSize: fontSize?.large,
              color: textColor ? textColor : colors.white,
              fontFamily: family.Gilroy_SemiBold,
              textTransform: 'uppercase',
              textAlign: 'center',
              flex: 1,
            },
            textStyle,
          ]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconStyles: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
});
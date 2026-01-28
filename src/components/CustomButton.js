import React from 'react';
import {
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// import Shadows from '../helpers/Shadows';
const { width } = Dimensions.get('screen');
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../utils/Colors';
import { family, size } from '../utils';
export default function CustomButton(props) {
  const {
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
    customHeight,
  } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.7}
      style={[buttonStyles, { width: customWidth ? customWidth : '100%', alignSelf: 'center' }]}>
      <LinearGradient
        colors={gradientColorArr}
        style={[
          {
            width: '100%',
            height: customHeight? customHeight: 55,
            alignItems: 'center',
            justifyContent: 'center',
            // ...Shadows.shadow5,
            flexDirection: 'row',
            gap: 5,
            borderRadius: 50,
            
         
          },
          buttonStyle,
        ]}>
        {iconSrc && (
          <Image
            source={iconSrc}
            tintColor={colors?.white}
            style={styles?.iconStyles}
            resizeMode="contain"
          />
        )}
        <Text
          style={[
            {
              fontSize: size.normal,
              color: textColor ? textColor : colors.white,
              fontFamily: family?.Gilroy_SemiBold,
              textTransform: 'uppercase',
              marginLeft: iconSrc? 15 : 0
            },
            textStyle,
          ]}>
          {title}
        </Text>

        {/* {nextBtn && (
          <Image
            resizeMode="contain"
            source={Icons.next}
            style={{
              height: 22,
              width: 22,
              marginLeft: '4%',
            }}
          />
        )} */}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconStyles: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    position: 'absolute', 
    left: 50
  },
});

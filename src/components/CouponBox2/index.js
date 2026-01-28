import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {appIcons, appImages} from '../../assets';
import {family, size, vh, vw} from '../../utils';
import CustomText from '.././CustomText';
import {colors} from '../../utils/Colors';
import FastImage from 'react-native-fast-image';
import Shadows from '../../helpers/Shadows';
import {formatDateYear, getImageUrl, LOG} from '../../utils/helperFunction';
import ActivityLoader from '.././ActivityLoader';
import CustomIcon from '.././CustomIcon';
import {HEIGHT} from '../../theme/units';

const Coupon2 = ({onPress, couponItem, noPadding, disabled}) => {
  return (
    <TouchableOpacity
      style={[styles.container, {paddingHorizontal: noPadding ? 0 : 5}]}
      onPress={onPress}
      activeOpacity={0.9}
      disabled={disabled}>
      <View style={{position: 'relative'}}>
        <CustomIcon
          src={getImageUrl(couponItem?.image)}
          disabled={true}
          customIconWrapper={[styles.eventImg, {height: HEIGHT * 0.22}]}
          resizeMode={'cover'}
          customIconStyle={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />

        <View
          style={[
            styles?.couponItems,
            {
              height:
                couponItem?.isCampaign === true ? HEIGHT * 0.11 : HEIGHT * 0.11,
            },
          ]}>
          <View style={{width: '73%', gap: 5}}>
            <CustomText
              text={`${couponItem?.couponName}`}
              font={family?.Gilroy_SemiBold}
              size={size?.h6}
              color={colors?.headingText}
              numberOfLines={2}
            />
            <CustomText
              text={`${couponItem?.description}`}
              font={family?.Gilroy_Regular}
              size={size?.medium}
              color={colors?.headingText}
              numberOfLines={2}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Coupon2;

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: colors?.white,
  },
  container: {
    paddingVertical: 10,
    borderRadius: 10,
    position: 'relative',
  },
  image: {
    width: '30%',
    height: '50%',
    marginBottom: 10,
    borderRadius: 10,
  },
  textContainer: {
    width: '63%',
    gap: 3,
    marginBottom: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    width: '70%',
    height: '65%',
    gap: 10,
    alignItems: 'center',
    position: 'relative',
  },
  iconContainer: {
    width: '24%',
    height: '95%',
    borderRadius: 10,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  couponItems: {
    ...Shadows?.shadow5,
    backgroundColor: colors?.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,

    // gap: 5,
  },
  eventImg: {
    height: HEIGHT * 0.215,
    width: '100%',
  },
});

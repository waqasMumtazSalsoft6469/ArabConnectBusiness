import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {appImages, appIcons} from '../assets';
import {family, size} from '../utils';
import CustomText from './CustomText';
import {colors} from '../utils/Colors';
import FastImage from 'react-native-fast-image';
import {Swipeable} from 'react-native-gesture-handler';
import BottomSheet from './BottomSheet';
import {formatDateYear, getImageUrl} from '../utils/helperFunction';

const {height} = Dimensions.get('screen');
const Coupon = ({onPress, couponItem, onDelete}) => {
  const [bgColor, setBgColor] = useState(colors?.white);
  const swipeableRef = useRef(null);
  const bottomSheetRef = useRef();

  const handleButtonPress = () => {
    setBgColor(colors?.white);
    swipeableRef.current?.close();
    bottomSheetRef.current.open();
  };

  const handleScreenPress = () => {
    setBgColor(colors?.white);
    swipeableRef.current?.close();
  };
  // FF85AF
  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={{paddingHorizontal: 14}}>
        {bgColor === colors?.secondary && (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={handleButtonPress}>
            <FastImage
              source={appIcons?.remove}
              style={styles.iconSwipe}
              tintColor={'white'}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        <Swipeable
          ref={swipeableRef}
          containerStyle={{}}
          renderRightActions={() => <View style={styles.iconContainer}></View>}
          friction={3}
          onSwipeableCloseStartDrag={() => setBgColor(colors?.white)}
          onSwipeableOpen={direction => {
            if (direction === 'right') {
              setBgColor(colors?.secondary);
            }
          }}>
          <ImageBackground
            source={appImages?.couponBG}
            style={[styles.background, {backgroundColor: bgColor}]}
            imageStyle={{left: 2, top: 2, bottom: -2, height: height * 0.17}}>
            <TouchableOpacity
              style={styles.itemContainer}
              activeOpacity={0.6}
              onPress={onPress}>
              <FastImage
                source={getImageUrl(couponItem?.image)}
                style={styles.image}
                resizeMode="cover"
                defaultSource={appImages?.placeholder}
              />

              <View style={styles.textContainer}>
                <CustomText
                  text={couponItem?.couponName}
                  font={family?.Gilroy_SemiBold}
                  size={size?.h6}
                  color={colors?.headingText}
                />
                <CustomText
                  text={`Expiry Date: ${formatDateYear(couponItem?.endDate)}`}
                  numberOfLines={1}
                  font={family?.Questrial_Regular}
                  size={size?.medium}
                  color={colors?.secondary}
                />
                <CustomText
                  text={couponItem?.description}
                  font={family?.Questrial_Regular}
                  size={size?.medium}
                  numberOfLines={3}
                  color={colors?.placeholderText}
                />
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </Swipeable>
        <BottomSheet
          remove={true}
          text={'Are you sure you want to remove this coupon?'}
          ref={bottomSheetRef}
          OnNoPress={() => {
            Alert.alert('No Pressed');
            bottomSheetRef.current.close();
          }}
          OnYesPress={() => {
            onDelete?.(couponItem?._id);
            bottomSheetRef.current.close();
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Coupon;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: height * 0.17,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
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
    width: '100%',
    height: '100%',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  iconSwipe: {
    width: 22,
    height: 22,
  },
  removeButton: {
    alignSelf: 'flex-end',
    height: height * 0.16,
    position: 'absolute',
    justifyContent: 'center',
    padding: 10,
    zIndex: 999,
    top: height * 0.022,
    bottom: 0,
    right: 50,
  },
});

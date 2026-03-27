import React, {useState, useRef, useMemo} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  Image,
} from 'react-native';
import {appIcons, appImages} from '../assets';
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

  const isExpired = useMemo(() => {
    if (!couponItem?.endDate) {
      return false;
    }
    return new Date(couponItem.endDate) < new Date();
  }, [couponItem?.endDate]);

  const handleButtonPress = () => {
    setBgColor(colors?.white);
    swipeableRef.current?.close();
    bottomSheetRef.current.open();
  };

  const handleScreenPress = () => {
    setBgColor(colors?.white);
    swipeableRef.current?.close();
  };

  const accentColor = isExpired ? colors.lightText : colors.secondary;

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.outer}>
        {bgColor === colors?.secondary && (
          <TouchableOpacity
            style={styles.removeFloating}
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
          containerStyle={styles.swipeable}
          renderRightActions={() => <View style={styles.iconContainer} />}
          friction={3}
          onSwipeableCloseStartDrag={() => setBgColor(colors?.white)}
          onSwipeableOpen={direction => {
            if (direction === 'right') {
              setBgColor(colors?.secondary);
            }
          }}>
          <TouchableOpacity
            style={[styles.card, {backgroundColor: bgColor}]}
            activeOpacity={0.92}
            onPress={onPress}>
            <View style={[styles.accentStrip, {backgroundColor: accentColor}]} />
            <View style={styles.cardInner}>
              <FastImage
                source={getImageUrl(couponItem?.image)}
                style={styles.thumb}
                resizeMode="cover"
                defaultSource={appImages?.placeholder}
              />
              <View style={styles.textBlock}>
                <View style={styles.titleRow}>
                  <CustomText
                    text={couponItem?.couponName}
                    font={family?.Gilroy_SemiBold}
                    size={size?.h6}
                    color={colors?.headingText}
                    numberOfLines={2}
                    style={styles.flex1}
                  />
                  <View
                    style={[
                      styles.badge,
                      isExpired ? styles.badgeExpired : styles.badgeActive,
                    ]}>
                    <CustomText
                      text={isExpired ? 'Expired' : 'Active'}
                      font={family.Gilroy_SemiBold}
                      size={size.xsmall}
                      color={isExpired ? colors.headingText : colors.white}
                    />
                  </View>
                </View>
                <View style={styles.metaRow}>
                  <Image
                    source={appIcons.timing}
                    style={styles.metaIcon}
                  />
                  <CustomText
                    text={`Expires ${formatDateYear(couponItem?.endDate)}`}
                    numberOfLines={1}
                    font={family?.Questrial_Regular}
                    size={size?.small}
                    color={colors.secondary}
                  />
                </View>
                <CustomText
                  text={couponItem?.description}
                  font={family?.Questrial_Regular}
                  size={size?.medium}
                  numberOfLines={3}
                  color={colors?.placeholderText}
                />
              </View>
            </View>
            <View style={styles.swipeHint}>
              <CustomText
                text={'Swipe left for delete'}
                font={family.Questrial_Regular}
                size={size.xxtiny}
                color={colors.lightText}
              />
            </View>
          </TouchableOpacity>
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
  outer: {
    paddingHorizontal: 16,
  },
  swipeable: {
    marginBottom: 4,
  },
  swipeHint: {
    paddingHorizontal: 18,
    paddingBottom: 12,
    paddingTop: 0,
  },
  card: {
    borderRadius: 26,
    overflow: 'hidden',
    marginVertical: 10,
    marginTop: height * 0.015,
    width: '100%',
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.09,
    shadowRadius: 20,
    elevation: 8,
  },
  flex1: {
    flex: 1,
    paddingRight: 8,
  },
  accentStrip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    borderTopLeftRadius: 26,
    borderBottomLeftRadius: 26,
  },
  cardInner: {
    flexDirection: 'row',
    padding: 16,
    paddingLeft: 20,
    gap: 14,
    alignItems: 'flex-start',
  },
  thumb: {
    width: 88,
    height: 88,
    borderRadius: 20,
  },
  textBlock: {
    flex: 1,
    gap: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  badgeActive: {
    backgroundColor: colors.secondary,
  },
  badgeExpired: {
    backgroundColor: colors.grayBgDarker,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaIcon: {
    width: 14,
    height: 14,
    tintColor: colors.secondary,
    resizeMode: 'contain',
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
  removeFloating: {
    alignSelf: 'flex-end',
    height: height * 0.14,
    position: 'absolute',
    justifyContent: 'center',
    padding: 10,
    zIndex: 999,
    top: height * 0.018,
    right: 44,
  },
});

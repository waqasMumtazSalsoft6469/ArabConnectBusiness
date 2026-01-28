import {StyleSheet, View, Animated, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {HEIGHT, WIDTH} from '../../theme/units';
import {family, size, vh} from '../../utils';
import CustomIcon from '../CustomIcon';
import CustomText from '../CustomText';
import {colors} from '../../utils/Colors';
import {appIcons} from '../../assets';
import {formatDateYear} from '../../utils/helperFunction';

const AnalyticsCard = ({item, navigation, disabled}) => {
  const isCustomerCard = item?.customerCard === true;

  // WIDTH LOGIC
  const cardWidth = item.full ? WIDTH - vh * 3 : (WIDTH - vh * 5) / 2;

  // -------------------------------
  // ANIMATIONS (ONLY NON-CUSTOMER)
  // -------------------------------
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const elevationAnim = useRef(new Animated.Value(5)).current;

  const onPressIn = () => {
    if (isCustomerCard) return;

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.92,
        friction: 4,
        tension: 150,
        useNativeDriver: true,
      }),
      Animated.spring(rotateAnim, {
        toValue: 1,
        friction: 4,
        tension: 150,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(elevationAnim, {
      toValue: 12,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const onPressOut = () => {
    if (isCustomerCard) return;

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 120,
        useNativeDriver: true,
      }),
      Animated.spring(rotateAnim, {
        toValue: 0,
        friction: 5,
        tension: 120,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(elevationAnim, {
      toValue: 5,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '2deg'],
  });

  const Wrapper = isCustomerCard ? View : Animated.View;

  return (
    <Wrapper
      style={{
        elevation: isCustomerCard ? 0 : elevationAnim,
        marginBottom: vh * 2,
      }}>
      <Wrapper
        style={
          isCustomerCard
            ? {}
            : {transform: [{scale: scaleAnim}, {rotateZ: rotate}]}
        }>
        <TouchableOpacity
          activeOpacity={0.9}
          disabled={disabled || isCustomerCard}
          onPress={() => !isCustomerCard && navigation.navigate(item.screen)}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={[
            styles.card,
            {width: cardWidth, elevation: isCustomerCard ? 0 : 5},
            isCustomerCard && styles.customerCardContainer,
          ]}>
          <View
            style={[
              styles.gradientBackground,
              {backgroundColor: item?.color || '#fff'},
            ]}>
            <View style={styles.iconWrapper}>
              <CustomIcon
                src={item.icon}
                disabled
                size={item?.size || HEIGHT * 0.05}
                resizeMode="contain"
              />
            </View>

            <CustomText
              text={item.title}
              font={family.Gilroy_SemiBold}
              size={size.medium}
              color={'#6A7282'}
            />

            <CustomText
              text={item.num}
              font={family.Gilroy_SemiBold}
              size={size.h3}
              color={colors?.headingText}
              style={{marginTop: vh * 0.5}}
            />
          </View>
        </TouchableOpacity>
      </Wrapper>
    </Wrapper>
  );
};

export default AnalyticsCard;
const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 5,
  },

  gradientBackground: {
    flex: 1,
    padding: vh * 2,
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
  },

  gradientBackground2: {
    flex: 1,
    paddingTop: vh * 2,
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
  },

  iconWrapper: {
    width: HEIGHT * 0.07,
    height: HEIGHT * 0.07,
    borderRadius: HEIGHT * 0.045,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vh,
  },

  iconWrapper2: {
    backgroundColor: 'rgba(122, 112, 112, 0.19)',
    width: HEIGHT * 0.07,
    height: HEIGHT * 0.07,
    borderRadius: HEIGHT * 0.045,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vh,
  },

  /* ---------------------- CUSTOMER CARD ---------------------- */

  customerCardContainer: {
    padding: vh * 2,
    backgroundColor: 'white',
    borderRadius: 20,
  },

  customerContent: {
    width: '100%',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: vh * 1.5,
  },

  dataBox: {
    width: '48%',
    padding: vh * 2,
    paddingVertical: vh * 3,
    borderRadius: 15,
    alignItems: 'center',
  },

  fullBox: {
    width: '100%',
    padding: vh * 2,
    borderRadius: 15,
    marginBottom: vh * 1.5,
    alignItems: 'center',
  },
  fullBox2: {
    width: '100%',
    padding: vh * 2,
    borderRadius: 15,
    marginBottom: vh * 1.5,
    alignItems: 'center',
    paddingVertical: vh * 5,
  },

  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

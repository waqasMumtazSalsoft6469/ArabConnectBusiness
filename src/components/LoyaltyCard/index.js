import {StyleSheet, View, Animated, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {HEIGHT, WIDTH} from '../../theme/units';
import {family, size, vh} from '../../utils';
import CustomIcon from '../CustomIcon';
import CustomText from '../CustomText';
import {colors} from '../../utils/Colors';
import {appIcons} from '../../assets';
import {formatDateYear} from '../../utils/helperFunction';

const LoyaltyCard = ({
  item,
  navigation,
  isDashboard = false,
  disabled,
  hubVariant = false,
}) => {
  const isCustomerCard = item?.customerCard === true;

  // WIDTH LOGIC
  const cardWidth = item.full ? WIDTH - vh * 3 : (WIDTH - vh * 5) / 2;

  // -------------------------------
  // ANIMATIONS ONLY FOR NON-CUSTOMER CARDS
  // -------------------------------
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const elevationAnim = useRef(new Animated.Value(5)).current;

  const onPressIn = () => {
    if (isCustomerCard) return;

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: hubVariant ? 0.97 : 0.92,
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

  // Wrapper (Animated for normal, View for customer card)
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
          {/* -------------------------------------
              CUSTOMER CARD DESIGN (FULL UI)
          -------------------------------------- */}
          {isCustomerCard ? (
            <View style={styles.customerContent}>
              {/* ROW 1 */}
              <View style={styles.row}>
                <View style={[styles.dataBox, {backgroundColor: '#FBD1BF'}]}>
                  <CustomText
                    text="Current Balance"
                    size={size.h6}
                    color="#6A7282"
                    font={family.Gilroy_Medium}
                  />
                  <CustomText
                    text={item.customerData?.currentPoints}
                    size={size.huge}
                    color="#E76F51"
                    font={family.Gilroy_Bold}
                  />
                  <CustomText text="Points" size={size.h6} color="#6A7282" />
                </View>

                <View style={[styles.dataBox, {backgroundColor: '#CBE7FF'}]}>
                  <CustomText
                    text="Total Earned"
                    size={size.h6}
                    color="#6A7282"
                    font={family.Gilroy_Medium}
                  />
                  <CustomText
                    text={item.customerData?.totalEarnedPoints || 'N/A  '}
                    size={size.huge}
                    color="#0077C2"
                    font={family.Gilroy_Bold}
                  />
                  <CustomText text="Lifetime" size={size.h6} color="#6A7282" />
                </View>
              </View>

              {/* MEMBER SINCE */}
              <View style={[styles.fullBox2, {backgroundColor: '#B0F4A3'}]}>
                <CustomText
                  text="Member Since"
                  size={size.large}
                  color="#000"
                />
                <CustomText
                  text={formatDateYear(item.customerData?.joinedAt) || 'N/A'}
                  size={size.huge}
                  color={colors?.greenIcon}
                  font={family.Gilroy_Bold}
                />
              </View>

              {/* CONTACT DETAILS */}
              <View style={[styles.fullBox, {backgroundColor: '#F5F5F5'}]}>
                <View style={styles.contactRow}>
                  <CustomIcon src={appIcons?.email2} size={HEIGHT * 0.025} />

                  <CustomText
                    text={item?.customerData?.user?.email || ''}
                    size={size.large}
                    color="#6A7282"
                    style={{marginLeft: 10}}
                  />
                </View>
              </View>
            </View>
          ) : hubVariant ? (
            <LinearGradient
              colors={(() => {
                const c = item?.color || colors.primary;
                return [c + '44', c];
              })()}
              start={{x: 0.1, y: 0}}
              end={{x: 0.9, y: 1}}
              style={styles.hubGradient}>
              <View style={styles.hubIconRing}>
                <CustomIcon
                  src={item.icon}
                  disabled
                  size={HEIGHT * 0.048}
                  resizeMode="contain"
                />
              </View>
              <CustomText
                text={item.title}
                font={family.Gilroy_SemiBold}
                size={size.h5}
                color={colors.white}
              />
              <CustomText
                text={item.subtitle}
                font={family.Questrial_Regular}
                size={size.medium}
                color="rgba(255,255,255,0.92)"
                style={{marginTop: vh * 0.6}}
              />
            </LinearGradient>
          ) : (
            <View
              style={[
                isDashboard
                  ? styles.gradientBackground2
                  : styles.gradientBackground,
                {backgroundColor: item?.color ? item?.color : '#fff'},
              ]}>
              <View
                style={isDashboard ? styles.iconWrapper2 : styles.iconWrapper}>
                <CustomIcon
                  src={item.icon}
                  disabled
                  size={item?.size ? item?.size : HEIGHT * 0.05}
                  resizeMode="contain"
                />
              </View>

              <CustomText
                text={item.title}
                font={family.Gilroy_SemiBold}
                size={isDashboard ? size?.xxlarge : size.h5}
                color={isDashboard ? '#6A7282' : 'white'}
              />

              <CustomText
                text={item.subtitle}
                font={family.Gilroy_Regular}
                size={size.large}
                color={isDashboard ? '#6A7282' : 'white'}
                style={{marginTop: vh * 0.5}}
              />
            </View>
          )}
          {isDashboard && (
            <View
              style={{
                bottom: 0,
                alignItems: 'center',
                width: '100%',
                backgroundColor: '#99A1AF',
                padding: vh * 0.5,
              }}>
              <CustomText
                text={item?.info}
                font={family.Gilroy_Medium}
                size={size.large}
                color={colors?.white}
                style={{marginTop: vh * 0.5}}
              />
            </View>
          )}
        </TouchableOpacity>
      </Wrapper>
    </Wrapper>
  );
};

export default LoyaltyCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },

  hubGradient: {
    flex: 1,
    // padding: vh * 2.2,
    minHeight: HEIGHT * 0.22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 26,
  },
  hubIconRing: {
    width: HEIGHT * 0.1,
    height: HEIGHT * 0.1,
    borderRadius: HEIGHT * 0.05,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vh * 1.2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
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
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: HEIGHT * 0.09,
    height: HEIGHT * 0.09,
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

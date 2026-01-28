import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Platform,
} from 'react-native';
import {colors} from '../utils/Colors';
import {appIcons, appImages} from '../assets';
import CustomText from './CustomText';
import {size} from '../utils';
import {CommonActions} from '@react-navigation/native';
import NavService from '../helpers/NavService';
import {useSubscriptionGuard} from '../Api/methods/method';

const {width} = Dimensions.get('screen');
const isAndroid = Platform.OS === 'android';

const TabBar = ({state, navigation}) => {
  // const {data, isLoading} = useFetchActiveSubscriptionQuery();
  // LOG('SUBSCRIPTION DATA: ', data);

  const {navigateWithSubscription, isSubscribed} =
    useSubscriptionGuard(navigation);

  const resetAndNavigate = routeName => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: routeName}],
      }),
    );
  };

  return (
    <ImageBackground
      style={{
        position: 'absolute',
        width: '100%',
        bottom: isAndroid ? -12 : 0,
      }}
      source={appImages?.tabBar}
      resizeMode="stretch"
      imageStyle={styles?.tabbarContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          gap: 10,
        }}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          let imageSrc = appIcons.homeUnSelected;
          let tabLabel = 'Home';

          if (route.name === 'MyBusinessStack') {
            imageSrc = appIcons.myBusinesses;
            tabLabel = 'BUSINESSES';
          } else if (route.name === 'LoyaltyStack') {
            imageSrc = appIcons.campaignIcon;
            tabLabel = 'LOYALTY';
          } else if (route.name === 'HomeStack') {
            imageSrc = appIcons.home;
            tabLabel = 'HOME';
          } else if (route.name === 'CouponStack') {
            imageSrc = appIcons.couponIcon;
            tabLabel = 'COUPONS';
          }

          if (route.name === 'EventStack') {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                onPress={() => NavService.navigate('QRScannerScreen')}
                style={{
                  backgroundColor: colors?.secondary,
                  borderRadius: 100,
                  height: 70,
                  width: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: -56,
                }}>
                <Image
                  source={appIcons?.scan2}
                  style={{
                    height: '45%',
                    width: '45%',
                  }}
                  tintColor={'white'}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={index}
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityRole="button"
              activeOpacity={0.8}
              onPress={() => {
                if (
                  route.name === 'CouponStack' ||
                  route.name === 'LoyaltyStack' ||
                  route.name === 'MyBusinessStack'
                ) {
                  navigateWithSubscription(route.name, true, { fromTab: true });
                } else {
                  navigateWithSubscription(route.name);
                }
              }}
              style={styles.tabs}>
              <Image
                source={imageSrc}
                style={{
                  height: isAndroid ? 25 : 30,
                  width: isAndroid ? 25 : 30,
                  tintColor: isFocused
                    ? colors.secondary
                    : colors.unselectedTab,
                }}
                resizeMode="contain"
              />
              <CustomText
                text={tabLabel}
                size={size?.tiny}
                color={isFocused ? colors.secondary : colors.unselectedTab}
                style={{marginTop: 4}}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  tabbarContainer: {},
  tabs: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 5,
    height: 80,
    borderRadius: 65,
  },
});

export default TabBar;

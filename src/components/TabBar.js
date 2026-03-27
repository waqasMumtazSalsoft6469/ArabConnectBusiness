import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../utils/Colors';
import {appIcons} from '../assets';
import CustomText from './CustomText';
import {size} from '../utils';
import NavService from '../helpers/NavService';
import {useSubscriptionGuard} from '../Api/methods/method';

const isAndroid = Platform.OS === 'android';

const TabBar = ({state, navigation}) => {
  const {navigateWithSubscription} = useSubscriptionGuard(navigation);
  const insets = useSafeAreaInsets();
  const padBottom = Math.max(insets.bottom, isAndroid ? 10 : 8);

  const tabMeta = routeName => {
    switch (routeName) {
      case 'HomeStack':
        return {icon: appIcons.home, label: 'Home'};
      case 'CouponStack':
        return {icon: appIcons.couponIcon, label: 'Coupons'};
      case 'EventStack':
        return {icon: appIcons.scan2, label: 'Scan', isScan: true};
      case 'LoyaltyStack':
        return {icon: appIcons.campaignIcon, label: 'Loyalty'};
      case 'MyBusinessStack':
        return {icon: appIcons.myBusinesses, label: 'Business'};
      default:
        return {icon: appIcons.homeUnSelected, label: 'Tab'};
    }
  };

  const onTabPress = routeName => {
    if (routeName === 'EventStack') {
      NavService.navigate('QRScannerScreen');
      return;
    }
    if (
      routeName === 'CouponStack' ||
      routeName === 'LoyaltyStack' ||
      routeName === 'MyBusinessStack'
    ) {
      navigateWithSubscription(routeName, true, {fromTab: true});
    } else {
      navigateWithSubscription(routeName);
    }
  };

  return (
    <View
      pointerEvents="box-none"
      style={[styles.barRoot, {paddingBottom: padBottom}]}>
      <View style={styles.barCard}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const meta = tabMeta(route.name);
          const {icon, label, isScan} = meta;

          if (isScan) {
            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityLabel="Scan QR code"
                activeOpacity={0.85}
                onPress={() => onTabPress(route.name)}
                style={styles.scanSlot}>
                <View style={styles.scanFab}>
                  <Image
                    source={icon}
                    style={styles.scanIcon}
                    resizeMode="contain"
                  />
                </View>
                <CustomText
                  text={label}
                  size={size.xxsmall}
                  color={colors.primary}
                  style={styles.tabLabel}
                />
                <View style={styles.tabDot} />
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              activeOpacity={0.85}
              onPress={() => onTabPress(route.name)}
              style={[styles.tab, isFocused && styles.tabActive]}>
              <Image
                source={icon}
                style={[
                  styles.tabIcon,
                  {
                    tintColor: isFocused ? colors.primary : colors.lightText,
                  },
                ]}
                resizeMode="contain"
              />
              <CustomText
                text={label}
                size={size.xxsmall}
                color={isFocused ? colors.primary : colors.lightText}
                style={styles.tabLabel}
              />
              <View
                style={[
                  styles.tabDot,
                  isFocused && {backgroundColor: colors.secondary},
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barRoot: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  barCard: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.white,
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E2E8EF',
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderRadius: 16,
    minHeight: 56,
  },
  tabActive: {
    backgroundColor: 'rgba(2, 66, 52, 0.07)',
  },
  tabIcon: {
    width: isAndroid ? 22 : 24,
    height: isAndroid ? 22 : 24,
    marginBottom: 2,
  },
  tabLabel: {
    marginTop: 2,
    fontWeight: '600',
  },
  tabDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4,
    backgroundColor: 'transparent',
  },
  scanSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 2,
    minHeight: 56,
  },
  scanFab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    shadowColor: colors.secondary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 10,
    top: -18,
  },
  scanIcon: {
    width: 26,
    height: 26,
    tintColor: colors.white,
  },
});

export default TabBar;

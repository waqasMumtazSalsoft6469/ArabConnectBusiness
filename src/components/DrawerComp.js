import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useNavigation} from '@react-navigation/native';
import {appIcons, appImages} from '../assets';
import {colors} from '../utils/Colors';
import {family, size} from '../utils';
import CustomIcon from './CustomIcon';
import NavService from '../helpers/NavService';
import {useDispatch, useSelector} from 'react-redux';

import {getImageUrl} from '../utils/helperFunction';
import {persistor} from '../redux/store';
import {jobApi} from '../Api/jobsApiSlice';
import {clearAuth} from '../redux/slices/authSlice';
import {subscriptionApi} from '../Api/subscriptionApiSlice';
import {eventApi} from '../Api/EventsApiSlice';
import {couponApi} from '../Api/couponApiSlice';
import {
  businessprofileApi,
  useFetchBusinessProfileByIDQuery,
} from '../Api/businessApiSlice';
import CustomText from './CustomText';
import {profileApi} from '../Api/profileApiSlice';
import {orderApi} from '../Api/orderApiSlice';
import {useSubscriptionGuard} from '../Api/methods/method';
import {campaignApi} from '../Api/campaignApiSlice';
import {rewardsApi} from '../Api/rewardsApiSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ANIM_DURATION = 280;

const menuItems = [
  {
    icon: appIcons?.subscription,
    title: 'SUBSCRIPTION PLANS',
    nav: 'SubscriptionPlan',
    border: '#FF7940',
  },
  {
    icon: appIcons?.mysubscription,
    title: 'MY SUBSCRIPTION',
    nav: 'MySubscription',
    border: '#333333',
  },
  {
    icon: appIcons?.gender,
    title: 'MY PROFILE',
    nav: 'myProfile',
    border: '#0FAAFA',
  },
  {
    icon: appIcons?.business_profile,
    title: 'ADD BUSINESS PROFILE',
    nav: 'AddBusiness',
    border: '#a1f542',
    tint: '#a1f542',
  },
  {
    icon: appIcons.eventsIcon,
    title: 'EVENTS & ADD EVENT',
    nav: 'Events',
    border: '#6D8600',
  },
  {
    icon: appIcons.myCollab,
    title: 'My Collaborations',
    nav: 'mycollab',
    border: '#DB36F5',
  },
  {
    icon: appIcons?.myProducts,
    title: 'My Products',
    nav: 'myProducts',
    border: '#EB1414',
  },
  {
    icon: appIcons?.orderHistory2,
    title: 'Order History',
    nav: 'orderDetails',
    border: '#1C979A',
  },
  {
    icon: appIcons?.job,
    title: 'Jobs',
    nav: 'Jobs',
    border: '#F5B936',
    tint: '#F5B936',
  },
  {
    icon: appIcons?.campaignIcon,
    title: 'Flyyer',
    nav: 'flyyerList',
    border: '#FF388C',
    tint: '#FF388C',
  },
  {
    icon: appIcons?.orderHistory2,
    title: 'Approve/Reject Receipt',
    nav: 'receiptList',
    border: '#1C979A',
  },
  {
    icon: appIcons?.rewards,
    title: 'Point Rule',
    nav: 'pointRule',
    border: '#F5B936',
    tint: '#F5B936',
  },
  {
    icon: appIcons?.otherBusiness,
    title: 'BUSINESS',
    nav: 'otherBusiness',
    border: '#FF2E00',
  },
  {
    icon: appIcons?.heart,
    title: 'FAVORITIES',
    nav: 'favorites',
    border: '#25E750',
  },
  {
    icon: appIcons.settings,
    title: 'SETTINGS',
    nav: 'settings',
    border: '#FF388C',
  },
  {
    icon: appIcons.contact,
    title: 'CONTACT US',
    nav: 'contact',
    border: '#654EF5',
  },
  {
    icon: appIcons.terms,
    title: 'TERMS OF USE',
    nav: 'terms',
    border: '#FA9C0F',
  },
  {
    icon: appIcons.newsletter,
    title: 'NEWSLETTER',
    nav: 'newsletter',
    border: '#B700FF',
  },
  {
    icon: appIcons.logoutBtn,
    title: 'LOGOUT',
    nav: '',
    border: '#EF314C',
  },
];

function DrawerMenuRow({item, onPress, showBorder}) {
  const isLogout = item.title === 'LOGOUT';
  return (
    <TouchableOpacity
      style={[styles.drawerRow, showBorder && styles.drawerRowBorder]}
      onPress={onPress}
      activeOpacity={0.72}>
      <View
        style={[
          styles.drawerIconTile,
          {borderColor: item.border},
          isLogout && styles.drawerIconTileLogout,
        ]}>
        <Image
          source={item.icon}
          style={[
            styles.drawerIconImg,
            {
              tintColor: isLogout
                ? colors.secondary
                : item.tint || colors.primary,
            },
          ]}
          resizeMode="contain"
        />
      </View>
      <Text
        style={[styles.drawerRowTitle, isLogout && styles.drawerRowTitleLogout]}
        numberOfLines={2}>
        {item.title}
      </Text>
      <CustomIcon
        src={appIcons.rightArrow}
        size={16}
        tintColor={isLogout ? colors.secondary : colors.placeholderText}
      />
    </TouchableOpacity>
  );
}

const DrawerComp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslate = useRef(new Animated.Value(12)).current;

  const userDetails = useSelector(state => state?.auth?.user || {});
  let fullName = userDetails?.fullName;
  let email = userDetails?.email;
  const insets = useSafeAreaInsets();

  const {navigateWithSubscription} = useSubscriptionGuard(navigation);
  const activeBusinessProfileId = userDetails?.activeProfile || null;
  const {data: profileData} = useFetchBusinessProfileByIDQuery(
    {id: activeBusinessProfileId},
    {skip: !activeBusinessProfileId},
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: ANIM_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(headerTranslate, {
        toValue: 0,
        duration: ANIM_DURATION,
        useNativeDriver: true,
      }),
    ]).start();
  }, [headerOpacity, headerTranslate]);

  const handleItemPress = item => {
    const {title, nav} = item;
    if (title === 'LOGOUT') {
      setTimeout(async () => {
        dispatch(clearAuth());
        dispatch(jobApi.util.resetApiState());
        dispatch(eventApi.util.resetApiState());
        dispatch(couponApi.util.resetApiState());
        dispatch(businessprofileApi.util.resetApiState());
        dispatch(subscriptionApi.util.resetApiState());
        dispatch(profileApi.util.resetApiState());
        dispatch(orderApi.util.resetApiState());
        dispatch(campaignApi.util.resetApiState());
        dispatch(rewardsApi.util.resetApiState());
        await persistor.purge();
      }, 550);
      NavService.closeDrawer();
      return;
    }
    if (item?.browser) {
      Linking.openURL(item?.browser);
      return;
    }
    NavService.closeDrawer();
    if (nav === 'myProducts') {
      navigateWithSubscription(nav, true);
    } else {
      navigateWithSubscription(nav);
    }
  };

  const renderItem = ({item, index}) => (
    <DrawerMenuRow
      item={item}
      onPress={() => handleItemPress(item)}
      showBorder={index < menuItems.length - 1}
    />
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop:
            Platform.OS === 'ios' ? insets.top + 8 : getStatusBarHeight() + 8,
        },
      ]}>
      <View style={styles.topBar}>
        <CustomIcon
          src={appIcons.back}
          size={36}
          tintColor={colors.white}
          onPress={NavService?.closeDrawer}
          customIconWrapper={styles.closeBtn}
        />
      </View>

      <Animated.View
        style={[
          styles.hero,
          {
            opacity: headerOpacity,
            transform: [{translateY: headerTranslate}],
          },
        ]}>
        <View style={styles.heroInner}>
          <Image
            source={
              userDetails?.image
                ? getImageUrl(userDetails.image)
                : appImages.userImage
            }
            style={styles.avatarImg}
          />
          <View style={styles.heroText}>
            <Text style={styles.heroName} numberOfLines={1}>
              {fullName ?? 'User'}
            </Text>
            <Text style={styles.heroEmail} numberOfLines={2}>
              {email ?? ''}
            </Text>
            {profileData?.businessName ? (
              <CustomText
                text={`Active: ${profileData?.businessName}`}
                font={family?.Questrial_Regular}
                size={size?.small}
                color="rgba(255,255,255,0.9)"
                numberOfLines={2}
                style={{marginTop: 6}}
              />
            ) : null}
          </View>
        </View>
      </Animated.View>

      <View style={styles.menuPanel}>
        <View style={styles.menuSheet}>
          <FlatList
            data={menuItems}
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.menuListContent}
            renderItem={renderItem}
            keyExtractor={(item, i) => `${item.title}-${item.nav}-${i}`}
          />
        </View>
      </View>
    </View>
  );
};

export default DrawerComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  closeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  heroInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarImg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.9)',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  heroText: {
    flex: 1,
    minWidth: 0,
  },
  heroName: {
    color: colors.white,
    fontSize: size.h5,
    fontFamily: family.Gilroy_SemiBold,
    marginBottom: 4,
  },
  heroEmail: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: size.small,
    fontFamily: family.Questrial_Regular,
    lineHeight: 18,
  },
  menuPanel: {
    flex: 1,
    backgroundColor: '#E8ECF2',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 8,
  },
  menuSheet: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D9DEE6',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  menuListContent: {
    paddingHorizontal: 4,
    paddingVertical: 6,
    paddingBottom: 28,
  },
  drawerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 12,
    gap: 12,
  },
  drawerRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E8ECF0',
  },
  drawerIconTile: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1.5,
    backgroundColor: 'rgba(2, 66, 52, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerIconTileLogout: {
    backgroundColor: 'rgba(223, 43, 58, 0.1)',
    borderColor: 'rgba(223, 43, 58, 0.45)',
  },
  drawerIconImg: {
    width: 22,
    height: 22,
  },
  drawerRowTitle: {
    flex: 1,
    color: colors.headingText,
    fontSize: size.medium,
    fontFamily: family.Gilroy_Medium,
  },
  drawerRowTitleLogout: {
    color: colors.secondary,
    fontFamily: family.Gilroy_SemiBold,
  },
});

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation } from '@react-navigation/native';
import { appIcons, appImages } from '../assets';
import { colors } from '../utils/Colors';
import { family, size } from '../utils';
import ProfileImage from './ProfileImage';
import CustomIcon from './CustomIcon';
import NavService from '../helpers/NavService';
import { useDispatch, useSelector } from 'react-redux';

import { getImageUrl, LOG } from '../utils/helperFunction';
import { persistor } from '../redux/store';
import { jobApi } from '../Api/jobsApiSlice';
import { clearAuth } from '../redux/slices/authSlice';
import { subscriptionApi } from '../Api/subscriptionApiSlice';
import { eventApi } from '../Api/EventsApiSlice';
import { couponApi } from '../Api/couponApiSlice';
import {
  businessprofileApi,
  useFetchBusinessProfileByIDQuery,
} from '../Api/businessApiSlice';
import CustomText from './CustomText';
import { profileApi } from '../Api/profileApiSlice';
import { orderApi } from '../Api/orderApiSlice';
import { useSubscriptionGuard } from '../Api/methods/method';
import { campaignApi } from '../Api/campaignApiSlice';
import { rewardsApi } from '../Api/rewardsApiSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('screen');

const menuItems = [
  //Edit Profile
  // {
  //   icon: appIcons?.gender,
  //   title: 'EDIT PROFILE',
  //   nav: 'editProfile',
  //   border: '#0FAAFA',
  // },
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
  // {
  //   icon: appIcons?.business_profile,
  //   title: 'EDIT BUSINESS PROFILE',
  //   nav: 'EditBusinessProfile',
  //   border: '#9747FF',
  // },
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
  //Change Password

  {
    icon: appIcons?.myProducts,
    title: 'My Products',
    // nav: 'myProducts',
    nav: 'myProducts',
    border: '#EB1414',
  },
  {
    icon: appIcons?.orderHistory2,
    title: 'Order History',
    // nav: 'myProducts',
    nav: 'orderDetails',
    border: '#1C979A',
  },
  {
    icon: appIcons?.job,
    title: 'Jobs',
    // title: 'Campaign Management',
    // nav: 'myProducts',
    nav: 'Jobs',
    // nav: 'newcampaign',
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
    // nav: 'myProducts',
    nav: 'otherBusiness',
    border: '#FF2E00',
  },
  // Favorites
  {
    icon: appIcons?.heart,
    title: 'FAVORITIES',
    nav: 'favorites',
    border: '#25E750',
  },
  // {
  //   icon: appIcons?.scan2,
  //   title: 'Scan',
  //   nav: 'favorites',
  //   border: '#0FAAFA',
  // },
  // {
  //   icon: appIcons?.customers2,
  //   title: 'My Customers',
  //   nav: 'customerListing',
  //   border: '#17B451',
  //   customWidth: 30,
  // },

  {
    icon: appIcons.settings,
    title: 'SETTINGS',
    nav: 'settings',
    border: '#FF388C',
  },
  // {
  //   icon: appIcons.about,
  //   title: 'ABOUT US',
  //   nav: 'about',
  //   border: '#0FDEFA',
  // },
  // {
  //   icon: appIcons?.lock,
  //   title: 'CHANGE PASSWORD',
  //   nav: 'changePassword',
  //   border: '#FDA864',
  // },
  {
    icon: appIcons.contact,
    title: 'CONTACT US',
    // nav: 'collaborate',
    nav: 'contact',
    border: '#654EF5',
  },
  // {
  //   icon: appIcons.help,
  //   title: 'HELP CENTER',
  //   nav: 'help',
  //   border: '#D9DD00',
  // },
  // {
  //   icon: appIcons.privacy,
  //   title: 'PRIVACY POLICY',
  //   nav: 'privacy',
  //   border: '#FF7971',
  // },
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
    // nav: 'orderDetails',
    // nav: 'customerListing',
    // nav: 'restaurants',
    border: '#B700FF',
  },
  {
    icon: appIcons.logoutBtn,
    title: 'LOGOUT',
    nav: '',
    border: '#EF314C',
  },
];

const DrawerComp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userDetails = useSelector(state => state?.auth?.user || {});
  let fullName = userDetails?.fullName;
  let profileImage = getImageUrl(userDetails?.image);
  let email = userDetails?.email;
  const insets = useSafeAreaInsets();

  const { navigateWithSubscription } = useSubscriptionGuard(navigation);
  const activeBusinessProfileId = userDetails?.activeProfile || null;
  const {
    data: profileData,
    isLoading,
    refetch,
  } = useFetchBusinessProfileByIDQuery(
    { id: activeBusinessProfileId },
    { skip: !activeBusinessProfileId }, // <- this line prevents the query from running if businessId is null
  );

  const renderItem = ({ item, index }) => {
    const { title, icon, nav } = item;
    const handlePress = () => {
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
          // resetToScreen(0, routes.mainStack.auth);
        }, 550);
      } else if (item?.browser) {
        Linking.openURL(item?.browser);
      } else {
        if (nav === 'myProducts') {
          navigateWithSubscription(nav, true);
        } else {
          navigateWithSubscription(nav);
        }
      }
    };

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        style={[styles.menuItem, !(index === menuItems.length - 1)]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <View
            style={{
              padding: 15,
              borderRadius: 50,
              borderWidth: 1.5,
              borderColor: item?.border,
            }}>
            <Image
              source={icon}
              style={{
                width: item?.customWidth ? item?.customWidth : 25,
                height: item?.customWidth ? item?.customWidth : 25,
                resizeMode: 'contain',
                tintColor: item?.tint ? item?.tint : null,
              }}
            />
          </View>
          <Text style={styles.menuItemText}>{title.toUpperCase()}</Text>
        </View>
        <CustomIcon
          src={appIcons.rightArrow}
          size={14}
          tintColor={colors.description}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: Platform.OS === 'ios' ? insets.top * 1 : getStatusBarHeight() }]}>
      <View
        style={{
          height: 35,
          width: 35,
          paddingHorizontal: 20,
          justifyContent: 'center',
        }}>
        <CustomIcon
          src={appIcons.back}
          size={30}
          tintColor={colors.black}
          onPress={NavService?.closeDrawer}
        />
      </View>

      <View style={styles.header}>
        <ProfileImage
          size={'100%'}
          innerAsset={!userDetails?.image}
          imageUri={
            userDetails?.image
              ? getImageUrl(userDetails.image) // remote image
              : appImages.userImage // must be a require('...') asset
          }
          style={{ borderWidth: 2, borderColor: colors.white }}
        />

        <View>
          <Text style={styles?.profileName}>{fullName ?? 'Mark Carson'}</Text>

          <Text style={styles?.profileEmail}>
            {email ?? 'mark.carson@gmail.com'}
          </Text>
          {profileData?.businessName && (
            <CustomText
              text={`Active Profile: ${profileData?.businessName}`}
              font={family?.Questrial_Regular}
              size={size?.xxlarge}
              color={colors?.black}
              numberOfLines={2}
            />
          )}
        </View>
      </View>
      <View style={{ flex: 1, marginTop: 10 }}>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={menuItems}
          style={{ paddingHorizontal: 20 }}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default DrawerComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.white,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    marginTop: height * 0.02,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 30,
  },
  profileName: {
    color: colors?.black,
    fontSize: size.h6,
    fontFamily: family?.Gilroy_SemiBold,
    textAlign: 'center',
  },
  profileEmail: {
    color: colors.black,
    fontSize: size.xxlarge,
    fontFamily: family?.Questrial_Regular,
    marginLeft: 10,
    textAlign: 'center',
  },
  menuItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  menuItemText: {
    marginLeft: 10,
    color: colors?.drawerItem,
    fontSize: size?.large,
    fontFamily: family?.Gilroy_Regular,
  },
  borderBottom: {
    borderBottomWidth: 0.3,
    borderColor: colors?.black,
  },
});

import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {colors} from '../utils/Colors';
import {appIcons} from '../assets';
import {family, size} from '../utils';
import NavService from '../helpers/NavService';
import CustomText from './CustomText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const {height} = Dimensions.get('screen');

function AppBackground(
  {
    children,
    editIcon = false,
    title,
    add = false,
    back = false,
    onBackPress = false,
    menu = false,
    nav = '',
    rightIcon = appIcons.notification,
    heart = false,
    marginHorizontal = true,
    childrenContainerStyle = {},
    rightIconNav = () => {
      NavService.navigate('Notification');
    },
    notification = false,
    cart = false,
    titleColor,
    titleSize,
    iconColor,
    filter,
    header,
    headerCustomStyles,
    isMapScreen = false,
    filterPress,
    description,
    jobEditPress,
    download = false,
    onDownloadPress,
    couponDetails = false,
    isAlone,
    addPress,
    isDashboard = false,
    onCustomerPress,
    onCampaignPress,
    onRewardsPress,
    addCustomer = false,
    addCampaign = false,
    addRewards = false,
    managePoints = false,
    onPointsPress,
  },
  props,
) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleHeartPress = () => {
    setIsFavorite(!isFavorite);
  };

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDashboard ? colors?.primary : colors?.white,
      }}>
      {/* {!header && ( */}
      {isMapScreen && (
        <View
          style={{
            backgroundColor: colors?.white,
            height: Platform.OS === 'ios' ? insets.top : getStatusBarHeight(),
          }}
        />
      )}
      <View
        style={[
          {
           marginTop: Platform.OS === 'ios' ? insets.top * 1 : getStatusBarHeight() * 0.7,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: description ? 15 : 10,
            zIndex: 999,
            position: couponDetails ? 'absolute' : 'relative',
            padding: 8,

            // top:0
          },
          headerCustomStyles,
        ]}>
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (nav?.length) {
                NavService.navigate(nav);
              } else if (back) {
                if (onBackPress) {
                  onBackPress(); // ✅ now actually calls the custom function
                } else {
                  NavService.goBack(); // fallback to default goBack
                }
              } else {
                NavService.openDrawer();
              }
            }}
            style={{
              position: 'absolute',
              alignItems: 'center',
              // backgroundColor: emenu ? colors.primary : 'transparent',
              borderRadius: menu ? 10 : 0,
              left: 20,
              width: 45,
              height: 45,
              justifyContent: 'center',

              // ...Shadows.shadow3,
            }}>
            {back && (
              <Image
                source={appIcons.back}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  tintColor: colors.black,
                }}
                tintColor={titleColor ? titleColor : colors.black}
              />
            )}
            {menu && (
              <Image
                source={appIcons.menu}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                  tintColor: isDashboard ? colors?.white : colors.black,
                }}
              />
            )}
          </TouchableOpacity>

          <View>
            <Text
              style={{
                color: titleColor ? titleColor : colors.black,
                fontFamily: family?.Gilroy_SemiBold,
                fontSize: titleSize ? titleSize : size?.h4,
              }}>
              {title.toUpperCase()}
            </Text>
          </View>
          {filter && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={filterPress}
              style={{
                position: 'absolute',
                right: 70,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#DFDFDF',
              }}>
              <Image
                source={appIcons?.filter}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          )}
          {editIcon && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={jobEditPress}
              style={{
                position: 'absolute',
                right: isAlone ? 20 : 65,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#DFDFDF',
              }}>
              <Image
                source={appIcons?.jobEdit}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          )}

          {notification && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                NavService.navigate('Notification');
              }}
              style={{
                position: 'absolute',
                right: 15,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#DFDFDF',
              }}>
              <Image
                source={rightIcon}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
              {/* <View style={{ backgroundColor: colors?.red, padding: 5.5, borderRadius: 50, position: 'absolute', top: 10, left: 21.2 }} /> */}
            </TouchableOpacity>
          )}
          {addCustomer && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onCustomerPress}
              style={{
                position: 'absolute',
                right: 15,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#493362',
              }}>
              <Image
                source={appIcons?.addCustomer}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
              {/* <View style={{ backgroundColor: colors?.red, padding: 5.5, borderRadius: 50, position: 'absolute', top: 10, left: 21.2 }} /> */}
            </TouchableOpacity>
          )}
          {managePoints && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPointsPress}
              style={{
                position: 'absolute',
                right: 15,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#493362',
              }}>
              <CustomText
                text={'Manage Points'}
                font={family?.Gilroy_Medium}
                size={size?.medium}
                color={colors?.white}
                numberOfLines={2}
              />
              {/* <View style={{ backgroundColor: colors?.red, padding: 5.5, borderRadius: 50, position: 'absolute', top: 10, left: 21.2 }} /> */}
            </TouchableOpacity>
          )}
          {addCampaign && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onCampaignPress}
              style={{
                position: 'absolute',
                right: 15,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#493362',
              }}>
              <Image
                source={appIcons?.addCampaign}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
              {/* <View style={{ backgroundColor: colors?.red, padding: 5.5, borderRadius: 50, position: 'absolute', top: 10, left: 21.2 }} /> */}
            </TouchableOpacity>
          )}
          {addRewards && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onRewardsPress}
              style={{
                position: 'absolute',
                right: 15,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#493362',
              }}>
              <Image
                source={appIcons?.addRewards}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
              {/* <View style={{ backgroundColor: colors?.red, padding: 5.5, borderRadius: 50, position: 'absolute', top: 10, left: 21.2 }} /> */}
            </TouchableOpacity>
          )}
          {download && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onDownloadPress}
              style={{
                position: 'absolute',
                right: 20,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#DFDFDF',
              }}>
              <Image
                source={appIcons?.downloadIcon}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
              {/* <View style={{ backgroundColor: colors?.red, padding: 5.5, borderRadius: 50, position: 'absolute', top: 10, left: 21.2 }} /> */}
            </TouchableOpacity>
          )}
          {add && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={addPress}
              style={{
                position: 'absolute',
                right: 20,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#DFDFDF',
              }}>
              <Image
                source={appIcons?.addIcon}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
              {/* <View style={{ backgroundColor: colors?.red, padding: 5.5, borderRadius: 50, position: 'absolute', top: 10, left: 21.2 }} /> */}
            </TouchableOpacity>
          )}
          {heart && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleHeartPress}
              style={{
                position: 'absolute',
                right: 20,
                paddingHorizontal: 8,
                paddingVertical: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: colors?.white,
                zIndex: 999,
              }}>
              <Image
                source={appIcons?.heart}
                style={{
                  width: 14,
                  height: 14,
                  resizeMode: 'contain',
                  tintColor: !isFavorite
                    ? colors?.placeholderText
                    : colors?.iconColor,
                }}
              />
            </TouchableOpacity>
          )}
        </>
      </View>
      {description && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 15,
          }}>
          <Text
            style={{
              paddingHorizontal: '12%',
              color: titleColor ? titleColor : colors.placeholderText,
              fontFamily: family?.Questrial_Regular,
              fontSize: titleSize ? titleSize : size?.xxlarge,
              textAlign: 'center',
            }}>
            {description}
          </Text>
        </View>
      )}
      <View
        style={{
          flex: 1,
          marginHorizontal: !marginHorizontal ? 20 : 0,
          marginBottom: 10,
          overflow: 'visible',
        }}>
        {children}
      </View>
    </View>
  );
}

export default AppBackground;

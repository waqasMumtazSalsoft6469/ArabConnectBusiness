import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Platform, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../utils/Colors';
import {appIcons} from '../assets';
import {family, size} from '../utils';
import NavService from '../helpers/NavService';
import CustomText from './CustomText';

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
) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleHeartPress = () => {
    setIsFavorite(!isFavorite);
  };

  const insets = useSafeAreaInsets();

  const headerTint = titleColor || colors.white;
  const titleDisplay = title ? String(title).toUpperCase() : '';

  const renderRightCluster = () => {
    const items = [];

    if (filter) {
      items.push(
        <TouchableOpacity
          key="filter"
          activeOpacity={0.8}
          onPress={filterPress}
          style={styles.iconWrapper}>
          <Image
            source={appIcons?.filter}
            style={[styles.headerIcon, {tintColor: colors.white}]}
          />
        </TouchableOpacity>,
      );
    }
    if (editIcon) {
      items.push(
        <TouchableOpacity
          key="edit"
          activeOpacity={0.8}
          onPress={jobEditPress}
          style={styles.iconWrapper}>
          <Image
            source={appIcons?.jobEdit}
            style={[styles.headerIcon, {tintColor: colors.white}]}
          />
        </TouchableOpacity>,
      );
    }
    if (download) {
      items.push(
        <TouchableOpacity
          key="download"
          activeOpacity={0.8}
          onPress={onDownloadPress}
          style={styles.iconWrapper}>
          <Image
            source={appIcons?.downloadIcon}
            style={[styles.headerIcon, {tintColor: colors.white}]}
          />
        </TouchableOpacity>,
      );
    }
    if (add) {
      items.push(
        <TouchableOpacity
          key="add"
          activeOpacity={0.8}
          onPress={addPress}
          style={styles.iconWrapper}>
          <Image
            source={appIcons?.addIcon}
            style={[styles.headerIcon, {tintColor: colors.white}]}
          />
        </TouchableOpacity>,
      );
    }
    if (addCustomer) {
      items.push(
        <TouchableOpacity
          key="addCustomer"
          activeOpacity={0.8}
          onPress={onCustomerPress}
          style={styles.iconWrapperAccent}>
          <Image
            source={appIcons?.addCustomer}
            style={[styles.headerIcon, {tintColor: colors.white}]}
          />
        </TouchableOpacity>,
      );
    }
    if (managePoints) {
      items.push(
        <TouchableOpacity
          key="managePoints"
          activeOpacity={0.8}
          onPress={onPointsPress}
          style={styles.managePointsBtn}>
          <CustomText
            text={'Manage Points'}
            font={family?.Gilroy_Medium}
            size={size?.small}
            color={colors?.white}
            numberOfLines={2}
          />
        </TouchableOpacity>,
      );
    }
    if (addCampaign) {
      items.push(
        <TouchableOpacity
          key="addCampaign"
          activeOpacity={0.8}
          onPress={onCampaignPress}
          style={styles.iconWrapperAccent}>
          <Image
            source={appIcons?.addCampaign}
            style={[styles.headerIcon, {tintColor: colors.white}]}
          />
        </TouchableOpacity>,
      );
    }
    if (addRewards) {
      items.push(
        <TouchableOpacity
          key="addRewards"
          activeOpacity={0.8}
          onPress={onRewardsPress}
          style={styles.iconWrapperAccent}>
          <Image
            source={appIcons?.addRewards}
            style={[styles.headerIcon, {tintColor: colors.white}]}
          />
        </TouchableOpacity>,
      );
    }
    if (notification) {
      items.push(
        <TouchableOpacity
          key="notification"
          activeOpacity={0.8}
          onPress={() => {
            rightIconNav();
          }}
          style={styles.iconWrapper}>
          <Image
            source={rightIcon}
            style={[styles.headerIcon, {tintColor: colors.white}]}
          />
        </TouchableOpacity>,
      );
    }
    if (heart) {
      items.push(
        <TouchableOpacity
          key="heart"
          activeOpacity={0.8}
          onPress={handleHeartPress}
          style={styles.heartBtn}>
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
        </TouchableOpacity>,
      );
    }

    if (!items.length) {
      return null;
    }

    return <View style={styles.rightCluster}>{items}</View>;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDashboard ? colors?.primary : colors?.white,
      }}>
      {isMapScreen && (
        <View
          style={{
            backgroundColor: '#0F766E',
            height: Platform.OS === 'ios' ? insets.top : getStatusBarHeight(),
          }}
        />
      )}

      <View
        style={[
          styles.headerContainer,
          {paddingTop: insets.top},
          couponDetails ? {position: 'absolute', zIndex: 999, width: '100%'} : null,
          headerCustomStyles,
        ]}>
        <View style={styles.headerRow}>
          <View style={styles.leftContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (nav?.length) {
                  NavService.navigate(nav);
                } else if (back) {
                  if (onBackPress) {
                    onBackPress();
                  } else {
                    NavService.goBack();
                  }
                } else {
                  NavService.openDrawer();
                }
              }}
              style={styles.iconWrapper}>
              {back && (
                <Image
                  source={appIcons.back}
                  style={[
                    styles.headerIcon,
                    {tintColor: iconColor || colors.white},
                  ]}
                />
              )}
              {menu && (
                <Image
                  source={appIcons.menu}
                  style={[
                    styles.headerIcon,
                    {tintColor: iconColor || colors.white},
                  ]}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.centerAbsolute}>
            <CustomText
              text={titleDisplay}
              size={titleSize || size.h5}
              font={family.Gilroy_SemiBold}
              color={headerTint}
              numberOfLines={1}
            />
            {description ? (
              <CustomText
                text={description}
                size={size.xsmall}
                color={'rgba(255,255,255,0.82)'}
                style={styles.descriptionInHeader}
                numberOfLines={2}
              />
            ) : null}
          </View>

          {renderRightCluster()}
        </View>
      </View>

      <View
        style={[
          {
            flex: 1,
            marginHorizontal: !marginHorizontal ? 20 : 0,
            marginBottom: 10,
            overflow: 'visible',
          },
          childrenContainerStyle,
        ]}>
        {children}
      </View>
    </View>
  );
}

export default AppBackground;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingBottom: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerRow: {
    minHeight: 56,
    justifyContent: 'center',
  },
  leftContainer: {
    position: 'absolute',
    left: 0,
    zIndex: 2,
    height: '100%',
    justifyContent: 'center',
  },
  centerAbsolute: {
    position: 'absolute',
    left: 56,
    right: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  descriptionInHeader: {
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  rightCluster: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 2,
    gap: 8,
    flexWrap: 'wrap',
    maxWidth: '52%',
    marginTop: 7

  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperAccent: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(223, 43, 58, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  managePointsBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.14)',
    maxWidth: 120,
  },
  heartBtn: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});

import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {family, size, vh, vw} from '../../utils';
import {colors} from '../../utils/Colors';
import CustomText from '../CustomText';
import styles from './styles';
import Shadows from '../../helpers/Shadows';
import CustomIcon from '../CustomIcon';
import {appIcons, appImages} from '../../assets';
import CustomButton from '../CustomButton';
import {
  formatDate,
  formatDateShort,
  formatDateYear,
  formattedTime,
  getImageUrl,
} from '../../utils/helperFunction';
import FastImage from 'react-native-fast-image';
import {colors2} from '../../theme/colors2';
const {width, height} = Dimensions.get('screen');

const CustomBox = ({
  onPress,
  item,
  resumeBox = false,
  newsletterBox = false,
  ticketBox = false,
  CustomerBox = false,
  onDeletePress = false,
  CampaignBox = false,
  onRefundPress,
  onEditPress,
  onViewPress,
  RefundDisabled,
  disabled,
}) => {
  const segments = ['Bronze', 'Silver', 'Gold', 'Platinum'];

  const segmentStyles = {
    Bronze: {
      bg: '#FBE2C0',
      text: '#AB690C',
    },
    Silver: {
      bg: '#DAE3F0',
      text: '#364153',
    },
    Gold: {
      bg: '#FEF9C2',
      text: '#AB690C',
    },
    Platinum: {
      bg: '#EFD8FF',
      text: '#890DDD',
    },
  };

  return (
    <View
      style={[
        styles?.contactContainer,
        {
          backgroundColor: 'white',
          ...Shadows?.shadow4,
          justifyContent: 'flex-start',
          padding: CampaignBox ? 0 : 15,
          paddingVertical: 20,
          marginBottom: 10,
          borderWidth: CampaignBox ? 1 : 0,
          borderColor: colors2?.border?.color_1,
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        disabled={disabled}
        style={{
          flexDirection: 'row',
          justifyContent: resumeBox ? 'space-between' : 'flex-start',
          alignItems: CustomerBox ? 'flex-start' : 'center',
          width: '97%',
        }}>
        {resumeBox && (
          <>
            <View style={{gap: vh * 0.5}}>
              <View style={{flexDirection: 'row', gap: 2}}>
                <CustomText
                  text={'Name: '}
                  size={size?.h6}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
                <CustomText
                  text={item?.user?.fullName}
                  size={size?.xxlarge}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
              </View>
              <View style={{flexDirection: 'row', gap: 2}}>
                <CustomText
                  text={'Email: '}
                  size={size?.h6}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
                <CustomText
                  text={item?.user?.email}
                  size={size?.xxlarge}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
              </View>
              <View style={{flexDirection: 'row', gap: 2}}>
                <CustomText
                  text={'Uploaded On: '}
                  size={size?.h6}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
                <CustomText
                  text={formatDate(item?.createdAt)}
                  size={size?.xxlarge}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onPress} // Handle press and navigate
              style={{
                padding: 10,
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#DFDFDF',
              }}>
              <Image
                source={appIcons?.pdfIcon}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </>
        )}
        {newsletterBox && (
          <>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onPress} // Handle press and navigate
              style={{
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#DFDFDF',
                marginRight: vw * 3,
                width: vw * 15,
                height: vw * 15,
              }}>
              <Image
                source={item?.image}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
            <View>
              <CustomText
                text={item?.name}
                size={size?.h6}
                font={family?.Questrial_Regular}
                color={colors?.headingText}
              />

              <CustomText
                text={item?.email}
                size={size?.large}
                font={family?.Questrial_Regular}
                color={colors?.placeholderText}
              />
            </View>
          </>
        )}
        {ticketBox && (
          <>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onPress} // Handle press and navigate
              style={{
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#DFDFDF',
                marginRight: vw * 3,
                width: vw * 15,
                height: vw * 15,
              }}>
              <FastImage
                source={getImageUrl(item?.user?.image)}
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
            <View style={{width: width * 0.412}}>
              <CustomText
                text={item?.user?.fullName}
                size={size?.h6}
                font={family?.Questrial_Regular}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <CustomIcon size={size?.xxlarge} src={appIcons?.timing} />
                <CustomText
                  text={`${formatDateShort(item?.event?.date)}/${formattedTime(
                    item?.event?.time,
                  )}`}
                  size={size?.large}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                  numberOfLines={1}
                />
              </View>
              <CustomText
                text={`Total: $${item?.totalAmount}`}
                size={size?.h6}
                font={family?.Questrial_Regular}
                color={colors?.headingText}
                numberOfLines={1}
              />
            </View>
            <CustomButton
              gradientColorArr={[colors.secondary, colors.secondary]}
              title={'Refund'}
              //   disabled={RefundDisabled}
              customHeight={30}
              customWidth={width / 5}
              buttonStyle={{borderRadius: 50, alignItems: 'center'}}
              textStyle={{fontSize: size.medium}}
              onPress={onRefundPress}
            />
          </>
        )}
        {CustomerBox && (
          <>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onPress} // Handle press and navigate
              disabled={disabled}
              style={{
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#DFDFDF',
                marginRight: vw * 3,
                width: vw * 15,
                height: vw * 15,
              }}>
              <Image
                source={getImageUrl(item?.user?.image)}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                  borderRadius: 50,
                }}
                defaultSource={appImages?.placeholder}
              />
            </TouchableOpacity>
            <View style={{width: '60%', gap: vh * 0.5}}>
              <CustomText
                text={`${item?.user?.fullName || 'New Customer'}`}
                size={size?.h6}
                font={family?.Gilroy_Medium}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <View
                style={{
                  // padding: vh * 0.3,
                  paddingVertical: vh * 0.3,
                  backgroundColor:
                    item?.status === 'invited'
                      ? '#F5A4C0'
                      : segmentStyles[item?.segment]?.bg,
                  width: '33%',
                  paddingHorizontal: vw * 1,
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CustomText
                  text={
                    item?.status === 'invited' ? item?.status : item?.segment
                  }
                  size={size?.xsmall}
                  font={family?.Gilroy_Medium}
                  color={
                    item?.status === 'invited'
                      ? colors?.headingText
                      : segmentStyles[item?.segment]?.text
                  }
                  numberOfLines={1}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginTop: vh * 3,
                }}>
                <CustomIcon size={size?.xxlarge} src={appIcons?.email2} />
                <CustomText
                  text={item?.user?.email}
                  size={size?.small}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                  // numberOfLines={1}
                />
              </View>
              <CustomText
                text={`Total Orders: ${item?.totalOrders}`}
                size={size?.large}
                font={family?.Questrial_Regular}
                color={colors?.headingText}
                numberOfLines={1}
              />
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                position: 'absolute',
                right: -10,
                top: -10,
              }}>
              <CustomText
                text={item?.currentPoints}
                size={size?.h2}
                font={family?.Gilroy_SemiBold}
                color={colors?.secondary}
                numberOfLines={1}
              />
              <CustomText
                text={`POINTS`}
                size={size?.medium}
                font={family?.Questrial_Regular}
                color={colors?.headingText}
                numberOfLines={1}
              />
            </View>
            {/* <CustomButton
              gradientColorArr={[colors.secondary, colors.secondary]}
              title={'View'}
              //   disabled={RefundDisabled}
              customHeight={30}
              customWidth={width / 5}
              buttonStyle={{borderRadius: 50, alignItems: 'center'}}
              textStyle={{fontSize: size.medium}}
              onPress={onViewPress}
            /> */}
          </>
        )}
        {CampaignBox && (
          <>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                justifyContent: 'space-between',
                // backgroundColor: 'red',
                paddingHorizontal: 10,
              }}>
              <View style={{width: '60%'}}>
                <CustomText
                  text={item?.title}
                  size={size?.xxlarge}
                  font={family?.Questrial_Regular}
                  color={colors?.headingText}
                  numberOfLines={2}
                />
                <CustomText
                  text={`Start Date: ${formatDateYear(
                    item?.campaignStartDate,
                  )}`}
                  size={size?.xxlarge}
                  font={family?.Questrial_Regular}
                  color={colors?.headingText}
                  numberOfLines={2}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  left: 10,
                }}>
                {/* <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={onEditPress}
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    borderColor: '#E8E6EA',
                    borderRadius: 50,
                  }}>
                  <CustomIcon
                    size={size?.xlarge}
                    src={appIcons?.edit}
                    disabled={true}
                  />
                </TouchableOpacity> */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => onDeletePress(item?._id)}
                  style={{
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#E8E6EA',
                    borderRadius: 50,
                  }}>
                  <CustomIcon
                    size={size?.h6}
                    src={appIcons?.remove}
                    disabled={true}
                    tintColor={'red'}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    padding: 5,
                    paddingHorizontal: 10,
                    borderRadius: 25,
                    backgroundColor:
                      item?.status === 'upcoming'
                        ? 'yellow'
                        : item?.status === 'expired'
                        ? colors?.red
                        : colors?.green,
                  }}>
                  <CustomText
                    text={item?.status.toUpperCase()}
                    size={size?.small}
                    font={family?.Questrial_Regular}
                    color={
                      item?.status === 'upcoming'
                        ? colors?.black
                        : item?.status === 'expired'
                        ? colors?.white
                        : colors?.white
                    }
                    numberOfLines={1}
                  />
                </View>
              </View>
            </View>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomBox;

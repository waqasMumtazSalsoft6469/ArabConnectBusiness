import React from 'react';
import {Dimensions, ScrollView, View, StyleSheet, Alert} from 'react-native';
import {colors} from '../../../utils/Colors';
import AppBackground from '../../../components/AppBackground';
import {appImages} from '../../../assets';
import CustomText from '../../../components/CustomText';
import {family, size} from '../../../utils';
import CustomContainer from '../../../components/CustomContainer';
import {couponBenefits} from '../../../utils/dummyData';
import CustomButton from '../../../components/CustomButton';
import NavService from '../../../helpers/NavService';
import {formatDateYear, getImageUrl} from '../../../utils/helperFunction';

const {width, height} = Dimensions.get('screen');

const CouponDetails = ({route}) => {
  const {couponDetails} = route.params;

  return (
    <AppBackground
      back
      titleColor={colors?.white}
      title={'COUPON DETAILS'}
      editIcon
      isAlone={true}
      couponDetails={true}
      jobEditPress={() => {
        NavService?.navigate('EditCoupon', {item: couponDetails});
      }}
      marginHorizontal={true}>
      <CustomContainer
        bgImage={getImageUrl(couponDetails?.image)}
        // bgImage={getImageUrl(couponDetails?.image)}
        customBgStyles={{marginTop: height * 0.015}}>
        <View style={[styles?.titleSection, {gap: 10}]}>
          <CustomText
            text={couponDetails?.couponName}
            font={family?.Gilroy_SemiBold}
            size={size?.h1}
            color={colors?.headingText}
            numberOfLines={1}
          />
          <CustomText
            text={`Created by: ${couponDetails?.businessProfile?.businessName}`}
            numberOfLines={1}
            font={family?.Questrial_Regular}
            size={size?.h6}
            color={colors?.iconColor}
          />
          <View style={{flexDirection: 'row', gap: 3}}>
            <CustomText
              text={'Expiry Date:'}
              font={family?.Questrial_Regular}
              size={size?.xxlarge}
              color={colors?.placeholderText}
            />
            <CustomText
              text={formatDateYear(couponDetails?.endDate)}
              font={family?.Questrial_Regular}
              size={size?.xxlarge}
              color={colors?.placeholderText}
            />
          </View>
          <View style={{flexDirection: 'row', gap: 3}}>
            <CustomText
              text={'Redemption Limit:'}
              font={family?.Questrial_Regular}
              size={size?.xxlarge}
              color={colors?.placeholderText}
            />
            <CustomText
              text={couponDetails?.redemptionLimit}
              font={family?.Questrial_Regular}
              size={size?.xxlarge}
              color={colors?.placeholderText}
            />
          </View>
          <View style={{flexDirection: 'row', gap: 3}}>
            <CustomText
              text={'Redemption Count:'}
              font={family?.Questrial_Regular}
              size={size?.xxlarge}
              color={colors?.placeholderText}
            />
            <CustomText
              text={couponDetails?.redemptionCount}
              font={family?.Questrial_Regular}
              size={size?.xxlarge}
              color={colors?.placeholderText}
            />
          </View>
          <View style={{flexDirection: 'row', gap: 3}}>
            <CustomText
              text={'Active Location:'}
              font={family?.Questrial_Regular}
              size={size?.xxlarge}
              color={colors?.placeholderText}
            />
            <CustomText
              text={couponDetails?.location?.address}
              font={family?.Questrial_Regular}
              size={size?.xxlarge}
              color={colors?.placeholderText}
            />
          </View>

          <View style={{marginTop: 15}}>
            <CustomText
              text={couponDetails?.description}
              font={family?.Questrial_Regular}
              size={size?.xxlarge}
              color={colors?.placeholderText}
              style={{lineHeight: height * 0.03, marginTop: 5}}
            />
          </View>
        </View>
      </CustomContainer>
    </AppBackground>
  );
};

export default CouponDetails;

const styles = StyleSheet.create({
  titleSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});

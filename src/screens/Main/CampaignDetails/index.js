import {ScrollView, StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import AppBackground from '../../../components/AppBackground';
import {HEIGHT} from '../../../theme/units';
import {
  LOG,
  capitalizeWords,
  formatDateYear,
} from '../../../utils/helperFunction';
import CustomText from '../../../components/CustomText';
import {family, size} from '../../../utils';
import {colors} from '../../../utils/Colors';
import Coupon2 from '../../../components/CouponBox2';

const CampaignDetails = ({route}) => {
  const {item} = route.params; // full campaign object
  LOG('DATATAT', item);

  const renderCoupon = ({item}) => <Coupon2 couponItem={item} disabled />;
  return (
    <AppBackground back={true} title={'Campaign Details'} notification>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 15, paddingHorizontal: 20}}>
        <View style={styles.field}>
          <CustomText
            text="Campaign Title"
            font={family?.Gilroy_SemiBold}
            size={size.h6}
            color={colors?.headingText}
          />
          <CustomText
            text={item?.title}
            font={family?.Questrial_Regular}
            size={size?.xxlarge}
            color={colors?.headingText}
            style={{marginTop: 3}}
          />
        </View>
        <View style={styles.field}>
          <CustomText
            text="Activation Date"
            font={family?.Gilroy_SemiBold}
            size={size.h6}
            color={colors?.headingText}
          />
          <CustomText
            text={formatDateYear(item?.campaignStartDate)}
            font={family?.Questrial_Regular}
            size={size.medium}
            color={colors?.headingText}
            style={{marginTop: 3}}
          />
        </View>
        <View style={styles.field}>
          <CustomText
            text="Expiry Date"
            font={family?.Gilroy_SemiBold}
            size={size.h6}
            color={colors?.headingText}
          />
          <CustomText
            text={formatDateYear(item?.campaignEndDate)}
            font={family?.Questrial_Regular}
            size={size.medium}
            color={colors?.headingText}
            style={{marginTop: 3}}
          />
        </View>
        <View style={styles.field}>
          <CustomText
            text="Campaign Status"
            font={family?.Gilroy_SemiBold}
            size={size.h6}
            color={colors?.headingText}
          />
          <CustomText
            text={item?.status?.toUpperCase()}
            font={family?.Questrial_Regular}
            size={size.medium}
            color={
              item?.status === 'active'
                ? 'green'
                : item?.status === 'expired'
                ? 'red'
                : 'orange'
            }
            style={{marginTop: 3}}
          />
        </View>
        <View style={styles.field}>
          <CustomText
            text="Valid For"
            font={family?.Gilroy_SemiBold}
            size={size.h6}
            color={colors?.headingText}
          />
          <CustomText
            text={`${capitalizeWords(item?.membershipTier)} Customers`}
            font={family?.Questrial_Regular}
            size={size.medium}
            color={colors?.headingText}
            style={{marginTop: 3}}
          />
        </View>
        {/* Coupons Heading */}
        <CustomText
          text="Campaign Coupons"
          font={family?.Gilroy_SemiBold}
          size={size.h6}
          color={colors?.headingText}
          style={{marginVertical: 10}}
        />
        {/* Coupons List */}
        <FlatList
          data={item?.couponIds || []}
          renderItem={renderCoupon}
          scrollEnabled={false}
          keyExtractor={item => item._id}
          contentContainerStyle={{paddingBottom: HEIGHT * 0.1}}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
        />
      </ScrollView>
    </AppBackground>
  );
};

export default CampaignDetails;

const styles = StyleSheet.create({
  field: {
    marginBottom: 12,
  },
});

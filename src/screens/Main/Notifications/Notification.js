import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, FlatList, ScrollView, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import Coupon from '../../../components/Coupon';
import {
  couponData,
  notificationData,
  notificationYesterdayData,
} from '../../../utils/dummyData';
import {SearchInput} from '../../../components/CustomTextInput';
import CustomText from '../../../components/CustomText';
import {family, size} from '../../../utils';
import Shadows from '../../../helpers/Shadows';
import CustomButton from '../../../components/CustomButton';

const {width, height} = Dimensions.get('screen');
const Notification = () => {
  return (
    <AppBackground back={true} title={'NOTIFICATIONS'} notification>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 25,
            paddingVertical: 15,
            marginTop: height * 0.02,
          }}>
          <View style={{alignSelf: 'flex-end'}}>
            <CustomButton
              gradientColorArr={[colors?.white, colors.white]}
              title={'PUSH NEW NOTIFICATION'}
              customWidth={width - 220}
              customHeight={40}
              buttonStyle={{
                borderWidth: 1,
                borderColor: colors?.secondary,
              }}
              onPress={() => {
                NavService?.navigate('PushNotifications');
              }}
              textStyle={{fontSize: size?.small, color: colors?.secondary}}
            />
          </View>
          <CustomText
            text={'TODAY'}
            font={family?.Gilroy_SemiBold}
            size={size?.h6}
            color={colors?.headingText}
            numberOfLines={1}
          />
          <FlatList
            contentContainerStyle={{
              paddingBottom: height * 0.03,
              backgroundColor: colors?.white,
            }}
            showsVerticalScrollIndicator={false}
            data={notificationData}
            ItemSeparatorComponent={() => <View style={{height: 15}} />}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({item}) => (
              <View style={{marginTop: height * 0.01, padding: 5}}>
                <View
                  style={{
                    gap: 5,
                    padding: 20,
                    backgroundColor: colors?.white,
                    justifyContent: 'center',
                    borderRadius: 15,
                    ...Shadows?.shadow5,
                  }}>
                  <CustomText
                    text={item?.notification}
                    font={family?.Questrial_Regular}
                    size={size?.xxlarge}
                    color={colors?.headingText}
                    numberOfLines={2}
                  />
                  <CustomText
                    text={item?.time}
                    font={family?.Questrial_Regular}
                    size={size?.normal}
                    color={colors?.secondary}
                    numberOfLines={1}
                  />
                </View>
              </View>
            )}
          />
          <CustomText
            text={'YESTERDAY'}
            font={family?.Gilroy_SemiBold}
            size={size?.h6}
            color={colors?.headingText}
            numberOfLines={1}
          />
          <FlatList
            contentContainerStyle={{
              paddingBottom: height * 0.03,
              backgroundColor: colors?.white,
            }}
            showsVerticalScrollIndicator={false}
            data={notificationYesterdayData}
            ItemSeparatorComponent={() => <View style={{height: 15}} />}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({item}) => (
              <View style={{marginTop: height * 0.01, padding: 5}}>
                <View
                  style={{
                    gap: 5,
                    padding: 20,
                    backgroundColor: colors?.white,
                    justifyContent: 'center',
                    borderRadius: 15,
                    ...Shadows?.shadow5,
                  }}>
                  <CustomText
                    text={item?.notification}
                    font={family?.Questrial_Regular}
                    size={size?.xxlarge}
                    color={colors?.headingText}
                    numberOfLines={2}
                  />
                  <CustomText
                    text={item?.time}
                    font={family?.Questrial_Regular}
                    size={size?.normal}
                    color={colors?.secondary}
                    numberOfLines={1}
                  />
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default Notification;

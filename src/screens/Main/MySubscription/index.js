import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  ScrollView,
  Easing,
  Alert,
} from 'react-native';
import CustomBackground from '../../../components/CustomBackground';
import Shadows from '../../../helpers/Shadows';
import CustomText from '../../../components/CustomText';
import {family, HP, size, vh} from '../../../utils';
import {colors} from '../../../utils/Colors';
import CustomCheckbox from '../../../components/CustomCheckbox';
import CustomIcon from '../../../components/CustomIcon';
import CustomButton from '../../../components/CustomButton';
import {appIcons} from '../../../assets';
import NavService from '../../../helpers/NavService';
import {
  useBuyMutation,
  useFetchPlanByUserIDQuery,
  useFetchPlanByUserQuery,
} from '../../../Api/subscriptionApiSlice';
import {capitalizeWords, formatDate, LOG} from '../../../utils/helperFunction';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import {executeApiRequest} from '../../../Api/methods/method';
import {DATE_FORMAT1} from '../../../utils/constants';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';

const {width, height} = Dimensions.get('screen');

const MySubscription = () => {
  const {data, isLoading, refetch} = useFetchPlanByUserIDQuery();
  LOG('DATA: ', data);
  //   const [buy, {isLoading: isBuying}] = useBuyMutation();
  let data2;
  const planData = data || {};

  return (
    <CustomBackground
      back={true}
      titleText={'MY SUBSCRIPTION'}
      descriptionText={'Your chosen package plan'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: width * 0.08, paddingTop: 30}}>
          {isLoading ? (
            <ActivityLoader color={colors2.theme.secondary} />
          ) : (
            <>
              {planData?.plan ? (
                <View
                  style={[styles.cardContainer, {marginBottom: height * 0.05}]}>
                  <View style={{padding: 10, gap: HP('0.5%'), marginTop: 5}}>
                    <CustomCheckbox
                      checked={true}
                      disabled={true}
                      cutsomStyle={{
                        backgroundColor:
                          planData.plan.title === 'BASIC PACKAGE'
                            ? '#D4F0FF'
                            : planData.plan.title === 'STANDARD PACKAGE'
                            ? '#FFD4D4'
                            : '#D4D8FF',
                      }}
                    />
                    <CustomText
                      text={planData.plan.title}
                      font={family?.Gilroy_SemiBold}
                      size={size?.h6}
                      style={{textTransform: 'uppercase'}}
                      color={colors?.headingText}
                    />
                    <CustomText
                      text={`Expiration Date: ${formatDate(
                        planData?.expirationDate,
                      )}`}
                      font={family?.Questrial_Regular}
                      size={size?.large}
                      color={colors?.secondary}
                    />
                  </View>

                  <View style={[styles.packageContainer]}>
                    <View
                      style={{
                        marginTop: height * 0.03,
                        paddingHorizontal: 20,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 2,
                        }}>
                        <CustomText
                          text={'$'}
                          font={family?.Gilroy_SemiBold}
                          size={size?.large}
                          color={colors?.headingText}
                        />
                        <CustomText
                          text={planData.plan.price}
                          font={family?.Gilroy_SemiBold}
                          size={size?.h1}
                          color={colors?.headingText}
                        />
                        <CustomText
                          text={'/per month'}
                          font={family?.Gilroy_SemiBold}
                          size={size?.medium}
                          color={colors?.headingText}
                          style={{left: 3}}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 8,
                          marginVertical: height * 0.02,
                        }}>
                        <CustomIcon
                          size={size?.h5}
                          src={appIcons?.checkmark}
                          resizeMode={'center'}
                        />
                        <CustomText
                          text={`Businesses Allowed: ${
                            planData?.plan?.businessesAllowed || '-'
                          }`}
                          font={family?.Questrial_Regular}
                          size={size?.large}
                          color={colors?.headingText}
                          numberOfLines={1}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 8,
                          marginBottom: vh * 3,
                        }}>
                        <CustomIcon
                          size={size?.h5}
                          src={appIcons?.checkmark}
                          resizeMode={'center'}
                        />
                        <CustomText
                          text={`Purchase Date: ${formatDate(
                            planData?.purchaseDate,
                          )}`}
                          font={family?.Questrial_Regular}
                          size={size?.large}
                          color={colors?.headingText}
                          numberOfLines={1}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <PullToRefreshScrollView 
                  onRefresh={refetch}
                  refreshingColor={colors2?.theme?.secondary}
                  contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}>
                  {isLoading && (
                    <ActivityLoader color={colors2?.theme?.secondary} />
                  )}
                  <EmptyDataComponent
                    message={
                      isLoading ? 'Loading! Please Wait.' : 'No Data Available.'
                    }
                  />
                </PullToRefreshScrollView>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </CustomBackground>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    ...Shadows?.shadow4,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: height * 0.02,
  },
  packageContainer: {
    overflow: 'hidden',
    backgroundColor: '#D4F1FF',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  touchableButton: {
    alignItems: 'center',
    width: height * 0.028,
    alignSelf: 'center',
    height: height * 0.028,
    justifyContent: 'center',
    top: 10,
    zIndex: 999,
    backgroundColor: 'white',
    borderRadius: 50,
    ...Shadows?.shadow5,
  },
});

export default MySubscription;

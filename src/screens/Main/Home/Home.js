import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import AppBackground from '../../../components/AppBackground';
import CustomText from '../../../components/CustomText';
import CustomIcon from '../../../components/CustomIcon';
import {colors} from '../../../utils/Colors';
import {family, HP, WP, size, vh, vw} from '../../../utils';
import Shadows from '../../../helpers/Shadows';
import {BarChart, LineChart} from 'react-native-gifted-charts';
import styles from './styles';
import {appIcons, appImages} from '../../../assets';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {useSelector} from 'react-redux';
import {LOG} from '../../../utils/helperFunction';
import {
  useFetchBusinessAnalyticsQuery,
  useFetchBusinessProfileByIDQuery,
} from '../../../Api/businessApiSlice';
import {WIDTH} from '../../../theme/units';
import {useIsFocused} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

const Home = () => {
  const [selectedBarValue, setSelectedBarValue] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('July 2024'); // default value
  const userDetails = useSelector(state => state?.auth?.user || {});
  LOG('UserDetails in State: ', userDetails);

  const activeBusinessProfileId = userDetails?.activeProfile || null;
  LOG('active: ', activeBusinessProfileId);
  const isFocused = useIsFocused();

  const {
    data: profileData,
    isLoading,
    refetch,
  } = useFetchBusinessProfileByIDQuery(
    {id: activeBusinessProfileId},
    {skip: !activeBusinessProfileId},
  );
  LOG('DATA: ', profileData);

  const {
    data: analyticsData,
    isLoading: analyticsLoading,
    refetch: analyticsRefetch,
  } = useFetchBusinessAnalyticsQuery(
    {businessProfileId: activeBusinessProfileId},
    {skip: !activeBusinessProfileId},
  );
  LOG('DATA: ', profileData);
  LOG('analyticsData: ', analyticsData);

  useEffect(() => {
    if (isFocused && activeBusinessProfileId) {
      analyticsRefetch();
    }
  }, [isFocused, activeBusinessProfileId]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  const data = Array.from({length: 30}, (_, i) => {
    let label = '';
    switch (i + 1) {
      case 1:
        label = '1';
        break;
      case 5:
        label = '5';
        break;
      case 10:
        label = '10';
        break;
      case 15:
        label = '15';
        break;
      case 20:
        label = '20';
        break;
      case 25:
        label = '25';
        break;
      case 30:
        label = '30';
        break;
      default:
        label = '';
    }
    return {
      value: Math.floor(Math.random() * 200) + 50, // Random value between 50 and 250
      label,
    };
  });

  const barData = [
    {
      value: Math.floor(Math.random() * 150) + 50,
      label: '10%',
      frontColor: '#7B7B7B',
    },
    {
      value: Math.floor(Math.random() * 150) + 50,
      label: '15%',
      frontColor: '#F8397B',
    },
    {
      value: Math.floor(Math.random() * 150) + 50,
      label: '20%',
      frontColor: '#BD0008',
    },
    {
      value: Math.floor(Math.random() * 150) + 50,
      label: '25%',
      frontColor: '#344BFD',
    },
    {
      value: Math.floor(Math.random() * 150) + 50,
      label: '30%',
      frontColor: colors?.secondary,
    },
    {
      value: Math.floor(Math.random() * 150) + 50,
      label: '35%',
      frontColor: colors?.headingText,
    },
  ]; // Empty dependency array ensures this only runs once on mount

  // const couponData = [
  //   {
  //     title: 'TOTAL VISITORS',
  //     number: '395',
  //     growth: '348.9',
  //     color: '#FBD1BF',
  //     size: size?.h1,
  //     width: width * 0.05,
  //   },
  //   {
  //     title: 'NO OF CUSTOMERS',
  //     number: '20,312',
  //     growth: '148.9',
  //     color: '#FBBFF5',
  //     size: size?.h1,
  //     width: width * 0.1,
  //   },
  //   {
  //     title: 'Total Redeem Coupon',
  //     number: '932',
  //     growth: '148.2',
  //     color: '#9EDEFF',
  //     size: size?.h1,
  //     width: width * 0.06,
  //   },
  //   {
  //     title: 'Coupon added',
  //     number: '932',
  //     growth: '348.9',
  //     color: '#9EF097',
  //     size: size?.h1,
  //     width: width * 0.06,
  //   },
  // ];

  const analytics = analyticsData?.summary;

  const couponData = [
    {
      title: 'TOTAL ORDERS Received',
      number: analytics?.totalOrders?.toString() || 'N/A',

      color: '#FBD1BF',
      size: size?.h1,
      width: width * 0.05,
    },
    {
      title: 'PRODUCTS ADDED',
      number: analytics?.totalProductsAdded?.toString() || 'N/A',

      color: '#FBBFF5',
      size: size?.h1,
      width: width * 0.1,
    },
    {
      title: 'COUPONS REDEEMED',
      number: analytics?.totalCouponRedemptions?.toString() || 'N/A',

      color: '#9EDEFF',
      size: size?.h1,
      width: width * 0.06,
    },
    {
      title: 'COUPONS CREATED',
      number: analytics?.totalCouponsCreated?.toString() || 'N/A',

      color: '#9EF097',
      size: size?.h1,
      width: width * 0.06,
    },
  ];

  const renderCustomLabels = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: WP('3.5%'),
        paddingHorizontal: WP('9%'),
      }}>
      {barData.map((item, index) => (
        <View
          key={index}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 3,
          }}>
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 3,
              backgroundColor: item.frontColor,
            }}
          />
          <Text
            style={{
              color: colors.headingText,
              fontFamily: family.Questrial_Regular,
              fontSize: size.small,
            }}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <AppBackground
      menu={true}
      title={'DASHBOARD'}
      notification={true}
      titleColor={'white'}
      isDashboard={true}
      headerCustomStyles={{backgroundColor: colors?.primary}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            position: 'relative',
            height: 180,
            zIndex: 999,
            paddingHorizontal: WP(5),
          }}>
          <View style={styles?.boxContainer}>
            <View style={{marginTop: HP(2), gap: 10}}>
              {/* <TouchableOpacity
                activeOpacity={0.7}
                onPress={showDatePicker}
                style={styles?.dateContainer}>
                <CustomText
                  text={selectedDate}
                  font={family?.Questrial_Regular}
                  size={size?.small}
                  color={colors?.white}
                  numberOfLines={1}
                />
                <CustomIcon
                  src={appIcons?.bottomArrow}
                  size={size?.tiny}
                  disabled={true}
                  tintColor={colors?.white}
                />
              </TouchableOpacity> */}
              <CustomText
                text={analytics?.totalCouponRedemptions?.toString() || 'NA'}
                font={family?.Gilroy_SemiBold}
                size={size?.huge}
                color={colors?.white}
                numberOfLines={1}
              />
              <CustomText
                text={'Total coupons redeemed'}
                font={family?.Questrial_Regular}
                size={size?.large}
                color={colors?.white}
                numberOfLines={1}
              />
              {isLoading ? (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: WIDTH * 0.5,
                  }}>
                  <CustomText
                    text={'Loading...'}
                    font={family?.Gilroy_SemiBold}
                    size={size?.xxlarge}
                    color={colors?.white}
                    numberOfLines={2}
                  />
                </View>
              ) : (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: WIDTH * 0.5,
                  }}>
                  <CustomText
                    text={
                      profileData?.businessName
                        ? `Active Profile: ${profileData.businessName}`
                        : 'No active profile'
                    }
                    font={family?.Gilroy_SemiBold}
                    size={size?.xxlarge}
                    color={colors?.white}
                    numberOfLines={2}
                  />
                </View>
              )}
            </View>

            <View style={styles?.imageContainer}>
              <Image
                source={appImages?.giftBox}
                resizeMode="contain"
                style={{width: '100%', height: '100%'}}
              />
            </View>
          </View>
        </View>

        <View style={{backgroundColor: 'white', flex: 1, paddingTop: HP(11)}}>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 15,
              marginBottom: HP('13%'),
            }}>
            {/* <View style={styles?.horizontalBoxContainer1}> */}
            <View style={{paddingBottom: vh * 2, paddingHorizontal: vh * 1.5}}>
              <FlatList
                data={couponData}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2} // Set to 2 columns
                // contentContainerStyle={styles?.horizontalBoxContainer1}
                scrollEnabled={false}
                columnWrapperStyle={{justifyContent: 'space-between'}} // Adjust spacing between columns
                ItemSeparatorComponent={() => <View style={{height: 8}} />}
                renderItem={({item}) => (
                  <View
                    style={[styles?.peachBox, {backgroundColor: item?.color}]}>
                    <CustomText
                      text={item?.title.toUpperCase()}
                      font={family?.Gilroy_SemiBold}
                      size={size?.h6}
                      color={colors?.headingText}
                      numberOfLines={2}
                    />
                    <CustomText
                      text={item?.number}
                      font={family?.Gilroy_SemiBold}
                      size={size?.huge}
                      color={colors?.headingText}
                      numberOfLines={1}
                    />
                  </View>
                )}
              />
            </View>
            {/* </View> */}
            <View
              style={{
                backgroundColor: colors?.white,
                borderRadius: 10,
                ...Shadows?.shadow5,
                padding: vh * 1,
                marginHorizontal: 10,
                overflow: 'hidden',
                // paddingHorizontal: 20
              }}>
              <View style={{gap: 5}}>
                <CustomText
                  text={'Coupons Performance'}
                  font={family?.Gilroy_SemiBold}
                  size={size?.h6}
                  color={colors?.headingText}
                  numberOfLines={1}
                  style={{textTransform: 'uppercase'}}
                />
                <CustomText
                  text={'Number of coupons redeemed'}
                  font={family?.Questrial_Regular}
                  size={size?.large}
                  color={colors?.headingText}
                  numberOfLines={1}
                />
              </View>

              <View style={{marginVertical: 10, paddingVertical: 20}}>
                <LineChart
                  isAnimated
                  data={data}
                  animateOnDataChange
                  spacing={15}
                  color={colors?.lightBlueText}
                  textColor1="yellow"
                  animationDuration={1000}
                  onDataChangeAnimationDuration={300}
                  maxValue={250}
                  noOfSections={5}
                  yAxisTextStyle={{
                    color: colors.headingText,
                    fontFamily: family.Questrial_Regular,
                    fontSize: size?.medium,
                  }}
                  xAxisLabelTextStyle={{
                    color: colors.headingText,
                    fontFamily: family.Questrial_Regular,
                    fontSize: size?.small,
                  }}
                  yAxisColor={'white'}
                  thickness={2}
                  showDataPointLabelOnFocus
                />
              </View>
            </View>

            <View
              style={{
                marginTop: HP('5%'),
                backgroundColor: colors?.white,
                borderRadius: 10,
                ...Shadows?.shadow5,
                padding: vh * 1,
                marginHorizontal: 10,
                overflow: 'hidden',
              }}>
              <CustomText
                text={'Most redeemed coupons (top 3)'}
                font={family?.Gilroy_SemiBold}
                size={size?.h6}
                color={colors?.headingText}
                numberOfLines={1}
                style={{textTransform: 'uppercase', marginTop: 10}}
              />
              <View style={{marginVertical: 10, paddingVertical: 20}}>
                <BarChart
                  isAnimated
                  parentWidth
                  barWidth={22}
                  noOfSections={4}
                  barBorderRadius={5}
                  spacing={23}
                  frontColor="lightgray"
                  data={barData}
                  yAxisThickness={0}
                  xAxisThickness={0}
                  yAxisTextStyle={{
                    color: colors.headingText,
                    fontFamily: family.Questrial_Regular,
                  }}
                  maxValue={200}
                  roundedTop
                  focusBarOnPress
                  onPress={(item, index) => setSelectedBarValue(item.value)}
                />
                {renderCustomLabels()}
                {selectedBarValue !== null && (
                  <View style={{marginTop: HP('2%'), alignSelf: 'center'}}>
                    <Text
                      style={{
                        fontSize: size.large,
                        fontFamily: family.Questrial_Regular,
                        color: colors.headingText,
                      }}>
                      Selected Bar Value: {selectedBarValue}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            display="spinner"
            textColor={colors?.primary}
            date={new Date()}
            maximumDate={new Date(2100, 11)}
            headerTextIOS="Pick a date"
            locale="en"
          />
        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default Home;

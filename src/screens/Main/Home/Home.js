import React, {useEffect, useState, useRef} from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  StyleSheet,
} from 'react-native';

import AppBackground from '../../../components/AppBackground';
import CustomText from '../../../components/CustomText';
import CustomIcon from '../../../components/CustomIcon';
import {colors} from '../../../utils/Colors';
import {family, HP, WP, size, vh} from '../../../utils';
import {BarChart, LineChart} from 'react-native-gifted-charts';
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
import LinearGradient from 'react-native-linear-gradient';
import StatCard from '../../../components/ui/StatCard';
import WaveDivider from '../../../components/ui/WaveDivider';

const {width} = Dimensions.get('screen');

const PAGE_BG = '#F0F4F8';
const CHART_INNER_BG = '#F8FAFC';

const STAT_VISUAL = [
  {
    icon: appIcons.packageIcon1,
    gradient: ['#FFE8F0', '#FFF5F8'],
    trend: '↑',
    trendLabel: 'Volume',
  },
  {
    icon: appIcons.myProducts,
    gradient: ['#E8F4FF', '#F0F9FF'],
    trend: '↑',
    trendLabel: 'Catalog',
  },
  {
    icon: appIcons.couponIcon,
    gradient: ['#E0F7FA', '#F0FDFA'],
    trend: '↑',
    trendLabel: 'Redemptions',
  },
  {
    icon: appIcons.addCampaign,
    gradient: ['#ECFDF5', '#F7FEE7'],
    trend: '↑',
    trendLabel: 'Created',
  },
];

const Home = () => {
  const [selectedBarValue, setSelectedBarValue] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('July 2024');
  const userDetails = useSelector(state => state?.auth?.user || {});
  LOG('UserDetails in State: ', userDetails);

  const activeBusinessProfileId = userDetails?.activeProfile || null;
  LOG('active: ', activeBusinessProfileId);
  const isFocused = useIsFocused();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const {
    data: profileData,
    isLoading,
  } = useFetchBusinessProfileByIDQuery(
    {id: activeBusinessProfileId},
    {skip: !activeBusinessProfileId},
  );
  LOG('DATA: ', profileData);

  const {
    data: analyticsData,
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

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 420,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

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
      value: Math.floor(Math.random() * 200) + 50,
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
  ];

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
    <View style={styles.legendRow}>
      {barData.map((item, index) => (
        <View key={index} style={styles.legendPill}>
          <View
            style={[styles.legendDot, {backgroundColor: item.frontColor}]}
          />
          <Text style={styles.legendText}>{item.label}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <AppBackground
      menu={true}
      title={'DASHBOARD'}
      notification={true}
      headerCustomStyles={styles.headerCustomStyles}
      titleColor={'white'}
      isDashboard={false}>
      <Animated.View style={{flex: 1, opacity: fadeAnim}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <LinearGradient
            colors={['#0F766E', '#14B8A6', '#5EEAD4']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.heroGradient}>
            <View style={styles.heroContent}>
              <View style={styles.glassCard}>
                <View style={styles.profilePill}>
                  <CustomText
                    text={
                      profileData?.businessName
                        ? profileData.businessName
                        : userDetails?.fullName || 'Your profile'
                    }
                    font={family.Gilroy_SemiBold}
                    size={size.small}
                    color={colors.primary}
                    numberOfLines={1}
                  />
                </View>
                <CustomText
                  text={analytics?.totalCouponRedemptions?.toString() || 'NA'}
                  font={family.Gilroy_SemiBold}
                  size={size.huge}
                  color={colors.white}
                  numberOfLines={1}
                />
                <CustomText
                  text={'Total coupons redeemed'}
                  font={family.Questrial_Regular}
                  size={size.large}
                  color="rgba(255,255,255,0.92)"
                  numberOfLines={1}
                />
                {isLoading ? (
                  <View style={styles.loadingRow}>
                    <CustomText
                      text={'Loading...'}
                      font={family.Gilroy_SemiBold}
                      size={size.xxlarge}
                      color={colors.white}
                      numberOfLines={2}
                    />
                  </View>
                ) : (
                  <View style={styles.heroSubRow}>
                    <CustomText
                      text={
                        profileData?.businessName
                          ? `Active: ${profileData.businessName}`
                          : 'No active profile'
                      }
                      font={family.Gilroy_Medium}
                      size={size.medium}
                      color="rgba(255,255,255,0.95)"
                      numberOfLines={2}
                    />
                  </View>
                )}
                <Image
                  source={appImages?.giftBox}
                  resizeMode="contain"
                  style={styles.heroGift}
                />
              </View>
            </View>
            <WaveDivider fill={PAGE_BG} height={40} />
          </LinearGradient>

          <View style={[styles.contentPad, {backgroundColor: PAGE_BG}]}>
            <View style={styles.statsGrid}>
              <FlatList
                data={couponData}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                scrollEnabled={false}
                columnWrapperStyle={styles.statColumnWrap}
                ItemSeparatorComponent={() => <View style={{height: 0}} />}
                renderItem={({item, index}) => (
                  <StatCard
                    title={item.title}
                    value={item.number}
                    icon={STAT_VISUAL[index]?.icon}
                    gradientColors={STAT_VISUAL[index]?.gradient}
                    trend={STAT_VISUAL[index]?.trend}
                    trendLabel={STAT_VISUAL[index]?.trendLabel}
                  />
                )}
              />
            </View>

            <View style={styles.chartCard}>
              <View style={styles.chartHeaderRow}>
                <View>
                  <CustomText
                    text={'Coupons performance'}
                    font={family.Gilroy_SemiBold}
                    size={size.h5}
                    color={colors.headingText}
                    numberOfLines={1}
                  />
                  <CustomText
                    text={'Redemptions over time'}
                    font={family.Questrial_Regular}
                    size={size.small}
                    color={colors.lightText}
                    numberOfLines={1}
                  />
                </View>
                <TouchableOpacity
                  style={styles.filterChip}
                  onPress={showDatePicker}
                  activeOpacity={0.85}>
                  <CustomText
                    text={selectedDate}
                    font={family.Questrial_Regular}
                    size={size.small}
                    color={colors.primary}
                    numberOfLines={1}
                  />
                  <CustomIcon
                    src={appIcons.bottomArrow}
                    size={size.tiny}
                    tintColor={colors.primary}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.chartInner}>
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
                  yAxisColor={'transparent'}
                  xAxisColor={'transparent'}
                  thickness={2}
                  showDataPointLabelOnFocus
                />
              </View>
            </View>

            <View style={[styles.chartCard, {marginTop: vh * 2}]}>
              <CustomText
                text={'Most redeemed coupons (top 3)'}
                font={family.Gilroy_SemiBold}
                size={size.h5}
                color={colors?.headingText}
                numberOfLines={2}
                style={{marginBottom: 8}}
              />
              <View style={styles.barWrap}>
                <BarChart
                  isAnimated
                  parentWidth
                  barWidth={22}
                  noOfSections={4}
                  barBorderRadius={8}
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
                {selectedBarValue !== null && (
                  <View style={styles.tooltipBubble}>
                    <Text style={styles.tooltipText}>{selectedBarValue}</Text>
                    <View style={styles.tooltipCaret} />
                  </View>
                )}
                {renderCustomLabels()}
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
        </ScrollView>
      </Animated.View>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: HP('14%'),
  },
  headerCustomStyles:{
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  heroGradient: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    // top: -0,
  },
  heroContent: {
    paddingHorizontal: WP(5),
    paddingTop: HP(2),
    paddingBottom: 8,
  },
  glassCard: {
    borderRadius: 28,
    padding: 22,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    overflow: 'hidden',
  },
  profilePill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    marginBottom: 14,
    maxWidth: WIDTH * 0.85,
  },
  loadingRow: {
    marginTop: 8,
  },
  heroSubRow: {
    marginTop: 10,
    maxWidth: WIDTH * 0.88,
  },
  heroGift: {
    position: 'absolute',
    right: -8,
    bottom: -8,
    width: 100,
    height: 100,
    opacity: 0.35,
  },
  contentPad: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  statsGrid: {
    marginBottom: 8,
  },
  statColumnWrap: {
    justifyContent: 'space-between',
  },
  chartCard: {
    backgroundColor: colors.white,
    borderRadius: 28,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 8,
  },
  chartHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(2, 66, 52, 0.08)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  chartInner: {
    backgroundColor: CHART_INNER_BG,
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  barWrap: {
    position: 'relative',
    marginVertical: 18,
    paddingVertical: 8,
  },
  tooltipBubble: {
    position: 'absolute',
    top: 4,
    alignSelf: 'center',
    backgroundColor: colors.headingText,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  tooltipText: {
    color: colors.white,
    fontFamily: family.Gilroy_SemiBold,
    fontSize: size.medium,
  },
  tooltipCaret: {
    position: 'absolute',
    bottom: -6,
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.headingText,
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 4,
    marginTop: 16,
  },
  legendPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: colors.headingText,
    fontFamily: family.Questrial_Regular,
    fontSize: size.small,
  },
});

export default Home;

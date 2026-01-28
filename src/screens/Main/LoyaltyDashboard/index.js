import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../../utils/Colors';
import {family, size, vh} from '../../../utils';
import AppBackground from '../../../components/AppBackground';
import {
  dashboardItems,
  hubItems,
  JobData,
  transactionData,
} from '../../../utils/dummyData';
import LoyaltyCard from '../../../components/LoyaltyCard';
import {HEIGHT} from '../../../theme/units';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CustomText from '../../../components/CustomText';
import CustomIcon from '../../../components/CustomIcon';
import {appIcons} from '../../../assets';
import CustomCard from '../../../components/CustomCard';
import {
  useFetchChartAnalyticsQuery,
  useFetchLoyaltyAnalyticsQuery,
} from '../../../Api/businessApiSlice';
import {LOG} from '../../../utils/helperFunction';
import {BarChart} from 'react-native-gifted-charts';
import {useSelector} from 'react-redux';
import ActivityLoader from '../../../components/ActivityLoader';

const BAR_COLORS = ['#2563EB', '#1D4ED8', '#1E40AF', '#3B82F6'];

const LoyaltyDashboard = () => {
  const navigation = useNavigation();
  const userDetails = useSelector(state => state?.auth?.user || {});
  const activeBusinessProfileId = userDetails?.activeProfile || null;
  const {data, isLoading, refetch} = useFetchLoyaltyAnalyticsQuery();

  const TABS = ['campaigns', 'rewards', 'customers'];
  const [selectedTab, setSelectedTab] = React.useState('customers');

  const {
    data: ChartData,
    isLoading: ChartLoader,
    refetch: ChartRefetch,
  } = useFetchChartAnalyticsQuery({
    businessProfileId: activeBusinessProfileId,
    type: selectedTab,
  });

  const isFocused = useIsFocused();
  LOG('Chart data: ', ChartData);

  useEffect(() => {
    if (isFocused) {
      refetch();
      ChartRefetch();
    }
  }, [isFocused]);

  const dashboardData = dashboardItems.map(item => {
    if (item.title === 'Total Customers') {
      return {
        ...item,
        info: data?.totalCustomers == null ? 'N/A' : `${data.totalCustomers}`,
      };
    }

    if (item.title === 'Active Rewards') {
      return {
        ...item,
        info: data?.activeRewards == null ? 'N/A' : `${data.activeRewards}`,
      };
    }

    if (item.title === 'Active Campaigns') {
      return {
        ...item,
        info: data?.activeCampaigns == null ? 'N/A' : `${data.activeCampaigns}`,
      };
    }

    if (item.title === 'Point Issued') {
      return {
        ...item,
        info:
          data?.totalPointsIssued == null ? 'N/A' : `${data.totalPointsIssued}`,
      };
    }

    return item;
  });

  const graphData = React.useMemo(() => {
    if (!ChartData?.data || ChartData.data.length === 0) {
      return [];
    }

    return ChartData.data.map((item, index) => ({
      value: Number(item.value) || 0,
      label: item.label,
      frontColor: BAR_COLORS[index % BAR_COLORS.length],
    }));
  }, [ChartData]);

  return (
    <AppBackground
      back={true}
      title={'Dashboard'}
      notification={true}
      description={'Manage your customer loyalty program'}
      titleColor={'white'}
      isDashboard={true}
      headerCustomStyles={{backgroundColor: colors.primary}}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            paddingVertical: vh * 2,
            // paddingHorizontal: vh * 1,
            // flex: 1,
            backgroundColor: '#F0F0F0',
          }}>
          <FlatList
            data={dashboardData}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{padding: 5, paddingHorizontal: vh * 1.75}}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            renderItem={({item, index}) => (
              <LoyaltyCard
                item={item}
                navigation={navigation}
                isDashboard={true}
                disabled={true}
              />
            )}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: vh * 2,
              gap: vh * 1,
              padding: vh * 2,
            }}>
            <CustomIcon
              src={appIcons?.trophy}
              disabled
              size={HEIGHT * 0.02}
              resizeMode="contain"
              tintColor={colors?.secondary}
            />
            <CustomText
              text={`Top Performing ${selectedTab}`}
              font={family?.Gilroy_Medium}
              size={size?.h3}
              color={colors?.headingText}
              numberOfLines={2}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              backgroundColor: '#F3F4F6',
              borderRadius: 12,
              padding: 4,
              marginBottom: vh * 2,
            }}>
            {TABS.map(tab => {
              const isActive = selectedTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setSelectedTab(tab)}
                  style={{
                    flex: 1,
                    paddingVertical: vh * 1.2,
                    borderRadius: 10,
                    backgroundColor: isActive
                      ? colors.secondary
                      : 'transparent',
                    alignItems: 'center',
                  }}>
                  <CustomText
                    text={tab}
                    font={family.Gilroy_Medium}
                    size={size.medium}
                    color={isActive ? colors.white : colors.headingText}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <View
            style={{
              paddingBottom: graphData.length === 0 ? vh * 3 : vh * 3,
              borderWidth: 1,
              marginHorizontal: 20,
              borderColor: '#E8E8E8',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  justifyContent: 'center',
                  // paddingHorizontal: 8,
                }}>
                {graphData.length !== 0 && (
                  <CustomText
                    text="Points"
                    size={size.small}
                    color="#6B7280"
                    style={{transform: [{rotate: '-90deg'}]}}
                  />
                )}
              </View>

              {/* MAIN CONTENT */}
              <View style={{flex: 1, alignItems: 'center'}}>
                {ChartLoader ? (
                  <>
                    <CustomText
                      text="Loading chart..."
                      size={size.medium}
                      color="#9CA3AF"
                    />
                    <ActivityLoader />
                  </>
                ) : graphData.length === 0 ? (
                  <View
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                      marginTop: vh * 3,
                    }}>
                    <CustomText
                      text="No data available"
                      size={size.medium}
                      color="#9CA3AF"
                    />
                  </View>
                ) : (
                  <>
                    <BarChart
                      data={graphData}
                      barWidth={26}
                      spacing={30}
                      barBorderRadius={10}
                      roundedTop
                      isAnimated
                      animationDuration={800}
                      noOfSections={5}
                      maxValue={Math.max(...graphData.map(i => i.value)) || 10}
                      yAxisThickness={0}
                      xAxisThickness={0}
                      hideRules={false}
                      rulesType="dashed"
                      rulesColor="#ECECEC"
                      yAxisTextStyle={{
                        color: '#9CA3AF',
                        fontFamily: family.Gilroy_Regular,
                        fontSize: size.small,
                      }}
                      xAxisLabelTextStyle={{
                        transform: [{rotate: '-45deg'}],
                        color: '#6B7280',
                        fontFamily: family.Gilroy_Medium,
                        fontSize: size.small,
                        right: 20,
                        top: 10,
                      }}
                    />

                    {/* X AXIS LABEL */}
                    <CustomText
                      text={
                        selectedTab === 'customers'
                          ? 'Customers'
                          : selectedTab === 'rewards'
                          ? 'Rewards'
                          : 'Campaigns'
                      }
                      size={size.small}
                      color="#6B7280"
                      style={{
                        marginTop: vh * 5,
                        alignSelf: 'flex-end',
                        padding: 10,
                      }}
                    />
                  </>
                )}
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: vh * 2,
              gap: vh * 1,
              padding: vh * 2,
            }}>
            <CustomIcon
              src={appIcons?.transactions}
              disabled
              size={HEIGHT * 0.02}
              resizeMode="contain"
              tintColor={colors?.secondary}
            />
            <CustomText
              text={'Recent Transactions'}
              font={family?.Gilroy_Medium}
              size={size?.h3}
              color={colors?.headingText}
              numberOfLines={2}
            />
          </View>
          <FlatList
            data={transactionData}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: vh * 1.75,
              paddingBottom: HEIGHT * 0.15,
            }}
            renderItem={({item}) => (
              <CustomCard
                recentTransactionCard={true}
                item={item}
                disabled={true}
              />
            )}
          />
        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default LoyaltyDashboard;

const styles = StyleSheet.create({});

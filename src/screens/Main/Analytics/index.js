import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../../utils/Colors';
import {family, size, vh} from '../../../utils';
import AppBackground from '../../../components/AppBackground';
import {
  analyticsItems,
  dashboardItems,
  hubItems,
  JobData,
  transactionData,
} from '../../../utils/dummyData';
import LoyaltyCard from '../../../components/LoyaltyCard';
import {HEIGHT} from '../../../theme/units';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../../../components/CustomText';
import CustomIcon from '../../../components/CustomIcon';
import {appIcons} from '../../../assets';
import CustomCard from '../../../components/CustomCard';
import AnalyticsCard from '../../../components/AnalyticsCard';
import {BarChart} from 'react-native-gifted-charts';
import DateRangeCard from '../../../components/DateRangeCard.js';

const graphDataMap = {
  Campaigns: [
    {value: 120, label: 'Email', frontColor: '#8B5CF6'},
    {value: 180, label: 'SMS', frontColor: '#A78BFA'},
    {value: 90, label: 'Push', frontColor: '#7C3AED'},
  ],
  Rewards: [
    {value: 140, label: '10% OFF', frontColor: '#6D28D9'},
    {value: 165, label: 'Coffee', frontColor: '#5B21B6'},
    {value: 110, label: 'Gift', frontColor: '#4C1D95'},
  ],
  Customers: [
    {value: 200, label: 'Bronze', frontColor: '#2563EB'},
    {value: 130, label: 'Gold', frontColor: '#1D4ED8'},
    {value: 80, label: 'Platinum', frontColor: '#1E40AF'},
  ],
};

const Analytics = () => {
  const navigation = useNavigation();
  const TABS = ['Campaigns', 'Rewards', 'Customers'];
  const [selectedTab, setSelectedTab] = React.useState('Campaigns');

  return (
    <AppBackground
      back={true}
      title={'Analytics & Reports'}
      notification={true}
      description={'Understand your customer engagement & business performance'}
      titleColor={'white'}
      isDashboard={true}
      headerCustomStyles={{backgroundColor: colors.primary}}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
        contentContainerStyle={{
          paddingBottom: HEIGHT * 0.2, // 👈 Bottom tab ke liye space
        }}>
        <View
          style={{
            paddingVertical: vh * 2,
    
            backgroundColor: '#F0F0F0',
            gap: vh*2
          }}>
          <DateRangeCard
            onChange={({startDate, endDate}) => {
              console.log('FROM:', startDate);
              console.log('TO:', endDate);
            }}
          />

          <FlatList
            data={analyticsItems}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{padding: 5, paddingHorizontal: vh * 1.75}}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            renderItem={({item, index}) => (
              <AnalyticsCard
                item={item}
                navigation={navigation}
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
              paddingBottom: vh * 6,
              borderWidth: 1,
              marginHorizontal: 20,
              alignItems: 'center',
              borderColor: '#E8E8E8',
            }}>
            <BarChart
              data={graphDataMap[selectedTab]}
              barWidth={26}
              spacing={30}
              barBorderRadius={10}
              roundedTop
              isAnimated
              animationDuration={800}
              noOfSections={5}
              maxValue={200}
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
          </View>
        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default Analytics;

const styles = StyleSheet.create({});

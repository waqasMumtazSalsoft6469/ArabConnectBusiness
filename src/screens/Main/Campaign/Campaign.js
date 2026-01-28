import {
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppBackground from '../../../components/AppBackground';
import {family, size, vh} from '../../../utils';
import CustomText from '../../../components/CustomText';
import {colors} from '../../../utils/Colors';
import CustomButton from '../../../components/CustomButton';

import CustomBox from '../../../components/CustomBox/CustomBox';
import NavService from '../../../helpers/NavService';
import {LOG} from '../../../utils/helperFunction';
import {useSelector} from 'react-redux';
import {
  useDeleteCampaignMutation,
  useFetchCampaignByBusinessQuery,
} from '../../../Api/campaignApiSlice';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import {executeApiRequest} from '../../../Api/methods/method';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import {HEIGHT, WIDTH} from '../../../theme/units';
import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import CustomCard from '../../../components/CustomCard';
import {campaignData} from '../../../utils/dummyData';

const {width, height} = Dimensions.get('screen');
const Campaign = () => {
  const navigation = useNavigation();
  const userDetails = useSelector(state => state?.auth?.user || {});
  const businessId = userDetails?.activeProfile || null;
  const isFocused = useIsFocused();

  const {data, isLoading, refetch} = useFetchCampaignByBusinessQuery(
    {businessId: businessId},
  );

  useEffect(() => {
    if (isFocused && businessId) {
      refetch();
    }
  }, [isFocused, businessId]);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteCampaign] = useDeleteCampaignMutation();

  const renderItem = ({item}) => (


    <CustomCard
      campaignCard={true}
      item={item}
      onDeletePress={handleDeleteCoupon}
      onPress={() => {
        navigation.navigate('campaigndetails', {item});
      }}
 
    />
  );

  const handleDeleteCoupon = campaignId => {
    LOG('campaignId:', campaignId);

    if (!campaignId) {
      Alert.alert('Unable to Delete');
      return;
    }

    // 🟢 Step 1: Ask for confirmation first
    Alert.alert(
      'Delete Campaign?',
      'Your selected coupon will be deleted as well. Do you want to continue?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            const payload = {campaignId, businessId};

            try {
              setDeleteLoading(true);
              const response = await executeApiRequest({
                apiCallFunction: deleteCampaign,
                body: payload,
                toast: true,
                timeout: 30000,
              });

              if (response) {
                await refetch();
              }
            } catch (error) {
              LOG('Delete campaign error:', error);
            } finally {
              setDeleteLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <AppBackground
      back={true}
      title={'Campaign'}
      addCampaign={true}
      onCampaignPress={() => NavService?.navigate('newcampaign')}
      description={'Engage your customers with targeted campaigns'}
      titleColor={'white'}
      isDashboard={true}
      headerCustomStyles={{backgroundColor: colors.primary}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 10,
            marginTop: height * 0.03,
            height: HEIGHT / 1.3,
            backgroundColor: 'white',
            paddingBottom: HEIGHT * 0.1,
          }}>
          {isLoading ? (
            <View style={{backgroundColor: 'white', height: HEIGHT}}>
              <ActivityLoader />
            </View>
          ) : data?.length > 0 ? (
            // ✅ Show data when available
            <View>
              {deleteLoading && <ActivityLoader />}
              <PullToRefreshFlatList
                refetch={refetch}
                data={data}
                // data={campaignData}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingVertical: vh * 0.5,
                  paddingBottom: vh * 5,
                }}
              />
            </View>
          ) : (
            <PullToRefreshScrollView
              onRefresh={refetch}
              refreshingColor={colors2?.theme?.secondary}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 20,
                // marginTop: vh * 3,
              }}>
              {isLoading && (
                <ActivityLoader color={colors2?.theme?.secondary} />
              )}
              <EmptyDataComponent
                message={
                  isLoading
                    ? 'Loading! Please Wait.'
                    : 'No Data Available. \n\n Campaigns will appear here once created.'
                }
                height={height * 0.2}
              />
            </PullToRefreshScrollView>
          )}
        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default Campaign;

const styles = StyleSheet.create({
  peachBox: {
    // height: '100%',
    width: '48%',
    borderRadius: 15,
    backgroundColor: '#ffff',
    padding: vh * 3,
    paddingVertical: vh * 2,
    gap: vh * 1,
    borderWidth: 1,
    borderColor: colors2?.border?.color_1,
  },
});

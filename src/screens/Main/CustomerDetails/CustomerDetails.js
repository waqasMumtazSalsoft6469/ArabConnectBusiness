import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';

import {colors} from '../../../utils/Colors';
import {family, HP, size, vh, vw, WP} from '../../../utils';

import AppBackground from '../../../components/AppBackground';
import CustomText from '../../../components/CustomText';
import styles from './styles';
import ProfileImage from '../../../components/ProfileImage';
import CustomCard from '../../../components/CustomCard';
import {transactionData} from '../../../utils/dummyData';
import {HEIGHT} from '../../../theme/units';
import LoyaltyCard from '../../../components/LoyaltyCard';
import ManagePointsModal from '../../../components/Modals/ManagePointsModal';
import {getImageUrl, LOG} from '../../../utils/helperFunction';
import {
  useAddPointsMutation,
  useFetchCustomerTransactionQuery,
  useRedeemPointsMutation,
} from '../../../Api/businessApiSlice';
import {useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {executeApiRequest} from '../../../Api/methods/method';
import {useRedeemMutation} from '../../../Api/couponApiSlice';
import {useFetchCampaignByBusinessQuery} from '../../../Api/campaignApiSlice';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import ActivityLoader from '../../../components/ActivityLoader';
import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';
import {colors2} from '../../../theme/colors2';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import {showToast} from '../../../utils/toast';
const {width, height} = Dimensions.get('screen');

const CustomerDetails = ({route}) => {
  const {customerData} = route?.params || {};
  console.log('Customer Data:', customerData?.status);
  const userDetails = useSelector(state => state?.auth?.user || {});
  const businessId = userDetails?.activeProfile || null;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const customerCardData = {
    customerCard: true,
    customerData: customerData,
    full: true, // to make the card full width
  };
  const [addModal, setAddModal] = useState(false);

  const [addPoints, {isLoading: addLoading}] = useAddPointsMutation();
  const [redeemPoints, {isLoading: redeemLoading}] = useRedeemPointsMutation();

  const handlePoints = async payload => {
    console.log('Payload in Customer Listing: ', payload);

    const finalPayload = {
      businessProfileId: businessId,
      userId: customerData?.user?._id,
      points: payload?.points,
    };

    const isRedeem = payload?.action === 'redeem';
    LOG('Redeem: ', isRedeem);

    const response = await executeApiRequest({
      apiCallFunction: isRedeem ? redeemPoints : addPoints,
      body: finalPayload,
      toast: true,
      timeout: 30000,
    });

    if (response) {
      setAddModal(false);
      navigation.goBack();
    }
  };

  const {data, isLoading, refetch} = useFetchCustomerTransactionQuery({
    businessProfileId: businessId,
    userId: customerData?.user?._id,
  });

  LOG('DATA: ', data);

  useEffect(() => {
    if (isFocused && businessId) {
      refetch();
    }
  }, [isFocused, businessId]);

  return (
    <AppBackground
      back={true}
      title={''}
      description={''}
      titleColor={'white'}
      s
      managePoints={true}
      onPointsPress={() => {
        if (customerData?.status === 'invited') {
          showToast('You can manage points once this customer joins Shopdit');
        } else {
          setAddModal(true);
        }
      }}
      isDashboard={true}
      headerCustomStyles={{backgroundColor: colors.primary}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            position: 'relative',
            height: HP(10),
            zIndex: 999,
            paddingHorizontal: WP(5),
          }}>
          <View style={styles?.boxContainer}>
            <View style={styles.header}>
              <ProfileImage
                size={'100%'}
                innerAsset
                imageUri={getImageUrl(customerData?.user?.image)}

                // style={{borderWidth: 2, borderColor: colors.white}}
              />
            </View>
          </View>
        </View>

        {/* 🔹 HEADER */}
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingTop: HP(8),
          }}>
          <View>
            <Text style={styles?.profileName}>
              {customerData?.user?.fullName}
            </Text>
            <Text style={styles?.profileEmail}>
              {customerData?.user?.email}
            </Text>
          </View>
          <View style={{marginTop: vh * 2, alignItems: 'center'}}>
            <LoyaltyCard item={customerCardData} disabled={true} />
          </View>
          <View
            style={{
              // alignItems: 'center',
              // marginBottom: vh * 2,
              gap: vh * 1,
              left: vh * 1,
              padding: vh * 2,
            }}>
            <CustomText
              text={'Transaction History'}
              font={family?.Gilroy_Medium}
              size={size?.h3}
              color={colors?.headingText}
              numberOfLines={2}
            />
          </View>
          {isLoading ? (
            <View style={{marginBottom: vh * 25}}>
              <ActivityLoader />
            </View>
          ) : !data?.transactions?.length > 0 ? (
            <PullToRefreshFlatList
              refetch={refetch}
              data={data?.transactions}
              keyExtractor={item => item?._id}
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
          ) : (
            <PullToRefreshScrollView
              onRefresh={refetch}
              refreshingColor={colors2?.theme?.secondary}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: HEIGHT * 0.1,
                // marginTop: vh * 3,
              }}>
              {isLoading && (
                <ActivityLoader color={colors2?.theme?.secondary} />
              )}
              <EmptyDataComponent
                message={
                  isLoading
                    ? 'Loading! Please Wait.'
                    : 'No Data Available. \n\n Customer Transactions will appear here once created.'
                }
                height={height * 0.2}
              />
            </PullToRefreshScrollView>
          )}
        </View>
      </ScrollView>
      <ManagePointsModal
        visible={addModal}
        onClose={() => setAddModal(false)}
        onSubmit={handlePoints}
        loading={addLoading || redeemLoading}
      />
    </AppBackground>
  );
};
export default CustomerDetails;

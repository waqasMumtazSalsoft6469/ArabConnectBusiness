import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, FlatList, ScrollView, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import Coupon from '../../../components/Coupon';
import {couponData} from '../../../utils/dummyData';
import {SearchInput} from '../../../components/CustomTextInput';
import {useFetchMyBusinessProfilesQuery} from '../../../Api/businessApiSlice';
import {LOG} from '../../../utils/helperFunction';
import {
  useDeleteCouponMutation,
  useFetchCouponByBusinessQuery,
} from '../../../Api/couponApiSlice';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import {useIsFocused} from '@react-navigation/native';
import {executeApiRequest} from '../../../Api/methods/method';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('screen');
const MyCoupons = () => {
  const isFocused = useIsFocused();
  const [coupons, setCoupons] = useState(couponData);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteCoupon] = useDeleteCouponMutation();
  const userDetails = useSelector(state => state?.auth?.user || {});
  LOG('userDetails: ', userDetails);

  const businessId = userDetails?.activeProfile || null;

  const {
    data: couponData2,
    isLoading: couponLoading,
    refetch: couponRefetch,
  } = useFetchCouponByBusinessQuery(
    {businessProfileId: businessId},
    {skip: !businessId}, // <- this line prevents the query from running if businessId is null
  );

  LOG('Extracted Business ID:', businessId);
  LOG('Coupon Data:', couponData2);

  useEffect(() => {
    if (isFocused && businessId) {
      couponRefetch(); // safe to call once businessId is set
    }
  }, [isFocused, businessId]);

  const handleDeleteCoupon = async couponId => {
    LOG('couponID: ', couponId);
    if (!couponId) {
      Alert?.alert('Unable to Delete');
      return;
    }
    setDeleteLoading(true);
    const response = await executeApiRequest({
      apiCallFunction: deleteCoupon,
      params: {
        id: couponId,
      },
      toast: true,
      timeout: 30000,
    });
    if (response) {
      couponRefetch();
      setDeleteLoading(false);
    }
  };
  return (
    <AppBackground
      menu={true}
      title={'MY COUPONS'}
      add
      addPress={() => {
        NavService?.navigate('AddCoupon', {item: businessId});
      }}>
      <View style={{paddingHorizontal: 20, paddingVertical: 15, marginTop: 10}}>
        <SearchInput placeholder={'Search for Coupons....'} />
      </View>
      {deleteLoading && <ActivityLoader color={colors2?.theme?.secondary} />}
      {couponData2?.docs?.length > 0 ? (
        <>
          <PullToRefreshFlatList
            refetch={couponRefetch}
            contentContainerStyle={{
              paddingBottom: height * 0.15,
              backgroundColor: colors?.white,
            }}
            showsVerticalScrollIndicator={false}
            data={couponData2?.docs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <Coupon
                  couponItem={item}
                  itemIndex={index}
                  onPress={() => {
                    NavService.navigate('CouponDetails', {
                      couponDetails: item,
                      businessProfile: businessId,
                    });
                  }}
                  onDelete={handleDeleteCoupon}
                />
              );
            }}
          />
        </>
      ) : (
        <ScrollView>
          {couponLoading && <ActivityLoader color={colors2?.theme?.secondary} />}
          <EmptyDataComponent
            message={
              couponLoading
                ? 'Loading! Please Wait.'
                : 'No Data Available. Press the + icon above to create coupons!'
            }
          />
        </ScrollView>
      )}
    </AppBackground>
  );
};

export default MyCoupons;

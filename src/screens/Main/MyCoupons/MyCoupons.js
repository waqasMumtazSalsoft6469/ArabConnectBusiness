import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, View, Text, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
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
import FloatingActionButton from '../../../components/ui/FloatingActionButton';
import {appIcons} from '../../../assets';

const {height} = Dimensions.get('screen');
const MyCoupons = () => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
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
    {skip: !businessId},
  );

  LOG('Extracted Business ID:', businessId);
  LOG('Coupon Data:', couponData2);

  useEffect(() => {
    if (isFocused && businessId) {
      couponRefetch();
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

  const goAdd = () => {
    NavService?.navigate('AddCoupon', {item: businessId});
  };

  return (
    <AppBackground menu={true} title={'MY COUPONS'}>
      <View style={styles.root}>
        <View style={styles.searchWrap}>
          <SearchInput placeholder={'Search for Coupons....'} />
          <Text style={styles.hint}>Swipe on a card for delete options</Text>
        </View>
        {deleteLoading && <ActivityLoader color={colors2?.theme?.secondary} />}
        {couponData2?.docs?.length > 0 ? (
          <PullToRefreshFlatList
            refetch={couponRefetch}
            contentContainerStyle={[
              styles.listContent,
              {paddingBottom: height * 0.2 + insets.bottom},
            ]}
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
        ) : (
          <View style={styles.emptyWrap}>
            {couponLoading && (
              <ActivityLoader color={colors2?.theme?.secondary} />
            )}
            <EmptyDataComponent
              message={
                couponLoading
                  ? 'Loading! Please Wait.'
                  : 'No Data Available. Tap + to create coupons!'
              }
            />
          </View>
        )}
        <FloatingActionButton
          icon={appIcons.addIcon}
          onPress={goAdd}
          style={{bottom: 24 + insets.bottom}}
        />
      </View>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4F6FB',
  },
  searchWrap: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 6,
  },
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: colors.lightText,
    textAlign: 'center',
  },
  listContent: {
    backgroundColor: '#F4F6FB',
  },
  emptyWrap: {
    flex: 1,
    paddingTop: 24,
  },
});

export default MyCoupons;

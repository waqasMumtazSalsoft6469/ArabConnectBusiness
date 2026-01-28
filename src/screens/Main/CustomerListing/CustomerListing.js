import {
  Alert,
  Dimensions,
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AppBackground from '../../../components/AppBackground';
import {appIcons, appImages} from '../../../assets';
import CustomBox from '../../../components/CustomBox/CustomBox';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  useFetchBusinessCustomerQuery,
  useInviteCustomerMutation,
} from '../../../Api/businessApiSlice';
import {LOG} from '../../../utils/helperFunction';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';
import {colors2} from '../../../theme/colors2';
import ActivityLoader from '../../../components/ActivityLoader';
import {family, size, vh} from '../../../utils';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import AddCustomerModal from '../../../components/Modals/AddCustomerModal';
import {executeApiRequest} from '../../../Api/methods/method';
import {colors} from '../../../utils/Colors';
import CustomIcon from '../../../components/CustomIcon';
import {HEIGHT} from '../../../theme/units';
import CustomText from '../../../components/CustomText';
import {SearchInput} from '../../../components/CustomTextInput';
// ✅ YOUR MODAL IMPORT

const {height} = Dimensions.get('screen');

const CustomerListing = () => {
  const navigation = useNavigation();
  const userDetails = useSelector(state => state?.auth?.user || {});
  const businessId = userDetails?.activeProfile || null;
  const isFocused = useIsFocused();

  const [addModal, setAddModal] = useState(false);

  const {data, isLoading, refetch} = useFetchBusinessCustomerQuery(
    {businessProfileId: businessId},
    {skip: !businessId},
  );

  const [inviteCustomer, {isLoading: inviteLoading}] =
    useInviteCustomerMutation();

  useEffect(() => {
    if (isFocused && businessId) {
      refetch();
    }
  }, [isFocused, businessId]);

  const renderItem = ({item}) => (
    <CustomBox
      disabled={false}
      item={item}
      CustomerBox={true}
      onPress={() => {
        navigation?.navigate('customerDetails', {customerData: item});
      }}
    />
  );

  const handleAddCustomer = async payload => {
    const finalPayload = {
      ...payload,
      membershipTier: payload?.membershipTier?.toLowerCase(),
    };

    const response = await executeApiRequest({
      apiCallFunction: inviteCustomer,
      body: {
        businessProfileId: businessId,
        ...finalPayload,
      },
      toast: true,
      timeout: 30000,
    });

    if (response) {
      setAddModal(false);
      refetch();
    }
  };

  return (
    <AppBackground
      back={true}
      addCustomer={true}
      onCustomerPress={() => setAddModal(true)}
      title={'Customer List'}
      description={'Manage your customer loyalty program'}
      titleColor={'white'}
      isDashboard={true}
      headerCustomStyles={{backgroundColor: colors.primary}}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginTop: 10,
          backgroundColor: '#F0F0F0',
        }}>
        <SearchInput
          placeholder={'Search customer by name or email....'}
          searchStyle={{backgroundColor: 'white', marginTop: vh * 2}}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: vh * 1,
            padding: vh * 1,
            paddingTop: vh * 5,
          }}>
          <CustomIcon
            src={appIcons?.transactions}
            disabled
            size={HEIGHT * 0.02}
            resizeMode="contain"
            tintColor={colors?.secondary}
          />
          <CustomText
            text={'Top Customers'}
            font={family?.Gilroy_Medium}
            size={size?.h3}
            color={colors?.headingText}
            numberOfLines={2}
          />
        </View>
        {data?.customers?.length > 0 ? (
          <PullToRefreshFlatList
            refetch={refetch}
            data={data?.customers}
            renderItem={renderItem}
            keyExtractor={item => item.user?._id}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: height * 0.01,
              paddingBottom: height * 0.15,
            }}
          />
        ) : (
          <PullToRefreshScrollView
            onRefresh={refetch}
            refreshingColor={colors2?.theme?.secondary}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 20,
              marginTop: vh * 3,
            }}>
            {isLoading && <ActivityLoader color={colors2?.theme?.secondary} />}
            <EmptyDataComponent
              message={
                isLoading
                  ? 'Loading! Please Wait.'
                  : 'No Customers Found. Add your first customer.'
              }
            />
          </PullToRefreshScrollView>
        )}
      </View>

      <AddCustomerModal
        visible={addModal}
        onClose={() => setAddModal(false)}
        onSubmit={handleAddCustomer}
        loading={inviteLoading}
      />
    </AppBackground>
  );
};

export default CustomerListing;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 25,
    right: 20,
    backgroundColor: colors2.theme.secondary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});

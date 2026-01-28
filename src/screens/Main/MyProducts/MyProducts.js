import {
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import AppBackground from '../../../components/AppBackground';
import NavService from '../../../helpers/NavService';
import {SearchInput} from '../../../components/CustomTextInput';
import {dishes} from '../../../utils/dummyData';
import CustomCard from '../../../components/CustomCard';
import {vh} from '../../../utils';
import {useSelector} from 'react-redux';
import {LOG} from '../../../utils/helperFunction';
import {
  useDeleteProductMutation,
  useFetchBusinessProductQuery,
} from '../../../Api/productsApiSlice';
import {useIsFocused} from '@react-navigation/native';
import {executeApiRequest} from '../../../Api/methods/method';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import BottomSheet from '../../../components/BottomSheet';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';
const {width, height} = Dimensions.get('screen');
const MyProducts = () => {
  const selectedJobRef = useRef(null);
  const bottomSheetRef = useRef();
  const isFocused = useIsFocused();
  const userDetails = useSelector(state => state?.auth?.user || {});
  LOG('userDetails: ', userDetails);

  const businessId = userDetails?.activeProfile || null;

  LOG('ACTIVE: ', businessId);

  const {data, isLoading, refetch} = useFetchBusinessProductQuery(
    {businessProfileId: businessId},
    {skip: !businessId},
  );
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (isFocused && businessId) {
      refetch();
    }
  }, [isFocused]);

  const handleDelete = async () => {
    const jobToDelete = selectedJobRef.current;
    LOG('IDss: ', jobToDelete);
    if (!jobToDelete) {
      Alert?.alert('Unable to Delete');
      bottomSheetRef?.current?.close();
      return;
    }

    const response = await executeApiRequest({
      apiCallFunction: deleteProduct,
      params: {
        id: jobToDelete,
      },
      toast: true,
      timeout: 30000,
    });

    LOG('Delete Success:', response);
    if (response) {
      bottomSheetRef.current.close();
      selectedJobRef.current = null;
      refetch();
    }
  };

  LOG('Product Data: ', data);
  return (
    <AppBackground
      back={true}
      title={'My Products'.toUpperCase()}
      add
      addPress={() => {
        NavService?.navigate('addProducts');
      }}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginTop: 10,
          //   marginBottom: height * 0.03,
        }}>
        <SearchInput placeholder={'Search Products Here...'} />

        {data?.docs?.length > 0 ? (
          <>
            <PullToRefreshFlatList
              refetch={refetch}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                alignSelf: 'center',
                marginTop: vh * 3,
                paddingBottom: vh * 7,
              }}
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
              data={data?.docs}
              keyExtractor={(item, index) => index.toString()}
              // ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
              renderItem={({item, index}) => (
                <CustomCard
                  restaurantProduct={true}
                  item={item}
                  shadowCard={true}
                  index={index}
                  onRemovePress={() => {
                    selectedJobRef.current = item?._id;
                    bottomSheetRef.current.open();
                  }}
                  onPress={() => {
                    NavService?.navigate('myProductDetails', {
                      eventDetails: item,
                    });
                  }}
                />
              )}
              numColumns={2}
            />
            <BottomSheet
              remove={true}
              text={'Are you sure you want to remove this product?'}
              ref={bottomSheetRef}
              OnNoPress={() => {
                bottomSheetRef.current.close();
              }}
              OnYesPress={handleDelete}
            />
          </>
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
                  : 'No Data Available. Press the + icon above to create products'
              }
            />
          </PullToRefreshScrollView>
        )}
      </View>
    </AppBackground>
  );
};

export default MyProducts;

const styles = StyleSheet.create({});

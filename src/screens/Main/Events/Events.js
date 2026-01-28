import React, {useEffect, useRef, useState} from 'react';
import {Alert, Dimensions, FlatList, ScrollView, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import {couponData, eventData} from '../../../utils/dummyData';
import CustomCard from '../../../components/CustomCard';
import {tuple} from 'yup';
import CustomButton from '../../../components/CustomButton';
import {size} from '../../../utils';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  useDeleteEventMutation,
  useFetchEventByUserQuery,
} from '../../../Api/EventsApiSlice';
import {LOG} from '../../../utils/helperFunction';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import {executeApiRequest} from '../../../Api/methods/method';
import BottomSheet from '../../../components/BottomSheet';

const {width, height} = Dimensions.get('screen');
const Events = () => {
  const selectedJobRef = useRef(null);
  const bottomSheetRef = useRef();
  const isFocused = useIsFocused();
  const userDetails = useSelector(state => state?.auth?.user || {});
  const {data, isLoading, error, refetch} = useFetchEventByUserQuery({
    id: userDetails?._id,
  });
  const [deleteEvent, {refetch: fetchData}] = useDeleteEventMutation();

  const handleDelete = async () => {
    const jobToDelete = selectedJobRef.current;
    LOG('IDss: ', jobToDelete);
    if (!jobToDelete) {
      Alert?.alert('Unable to Delete');
      bottomSheetRef?.current?.close();
      return;
    }

    const response = await executeApiRequest({
      apiCallFunction: deleteEvent,
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

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);
  LOG('DATA: ', data);
  return (
    <AppBackground
      back
      title={'EVENTS'}
      notification
      marginHorizontal={false}>
      <View style={{position: 'relative', flex: 1}}>
        {data?.docs?.length > 0 ? (
          <>
            <PullToRefreshFlatList
              refetch={refetch}
            
              contentContainerStyle={{
                paddingBottom: height * 0.08,
                backgroundColor: colors?.white,
                paddingTop: height * 0.03,
              }}
              showsVerticalScrollIndicator={false}
              data={data?.docs}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <CustomCard
                  eventCard={true}
                  item={item}
                  onRemovePress={() => {
                    selectedJobRef.current = item?._id;
                    bottomSheetRef.current.open();
                  }}
                  onPress={() => {
                    NavService.navigate('EventDetails', {eventDetails: item});
                  }}
                />
              )}
            />
            <View
              style={{
                marginTop: height * 0.03,
                marginBottom: height * 0.005,
                position: 'absolute',
                zIndex: 999,
                bottom: 0,
                alignSelf: 'center',
              }}>
              <CustomButton
                gradientColorArr={[colors.secondary, colors.secondary]}
                title={'+ Add Event'.toUpperCase()}
                customWidth={width - 55}
                buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                textStyle={{fontSize: size.xxlarge}}
                onPress={() => {
                  NavService?.navigate('EventAdd');
                }}
              />
            </View>

            <BottomSheet
              remove={true}
              text={'Are you sure you want to remove this event?'}
              ref={bottomSheetRef}
              OnNoPress={() => {
                Alert.alert('No Pressed');
                bottomSheetRef.current.close();
              }}
              OnYesPress={handleDelete}
            />
          </>
        ) : (
          <ScrollView>
            {isLoading && <ActivityLoader color={colors2?.theme?.secondary} />}
            <EmptyDataComponent
              message={
                isLoading ? 'Loading! Please Wait.' : 'No Data Available.'
              }
            />
            <View
              style={{
                marginBottom: height * 0.005,
                position: 'absolute',
                zIndex: 999,
                bottom: 0,
                alignSelf: 'center',
              }}>
              <CustomButton
                gradientColorArr={[colors.secondary, colors.secondary]}
                title={'+ Add Event'.toUpperCase()}
                customWidth={width - 55}
                buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                textStyle={{fontSize: size.xxlarge}}
                onPress={() => {
                  NavService?.navigate('EventAdd');
                }}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </AppBackground>
  );
};

export default Events;

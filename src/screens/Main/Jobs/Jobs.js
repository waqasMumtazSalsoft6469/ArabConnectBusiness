import React, {useEffect, useRef, useState} from 'react';
import {Alert, Dimensions, FlatList, ScrollView, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import {JobData, jobType} from '../../../utils/dummyData';
import {SearchInput} from '../../../components/CustomTextInput';
import CustomCard from '../../../components/CustomCard';
import HorizontalFlatList from '../../../components/HorizontalFlatlist';
import BottomSheet from '../../../components/BottomSheet';
import {
  useDeleteJobMutation,
  useFetchJobByUserQuery,
} from '../../../Api/jobsApiSlice';
import {LOG} from '../../../utils/helperFunction';
import {useSelector} from 'react-redux';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import {executeApiRequest} from '../../../Api/methods/method';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import {useIsFocused} from '@react-navigation/native';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';

const {width, height} = Dimensions.get('screen');

const Jobs = () => {
  const selectedJobRef = useRef(null);
  const isFocused = useIsFocused();
  const userDetails = useSelector(state => state?.auth?.user || {});
  const {data, isLoading, error, refetch} = useFetchJobByUserQuery({
    businessId: userDetails?._id,
  });
  const [deleteJob, {refetch: fetchData}] = useDeleteJobMutation();

  LOG('asd: ', userDetails);

  LOG('Data: ', data?.docs);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);
  const bottomSheetRef = useRef();
  const handleTypePress = id => {
    //filter as per item name
    // Handle the selection change as needed
  };

  const handleDelete = async () => {
    const jobToDelete = selectedJobRef.current;
    LOG('IDss: ', jobToDelete);
    if (!jobToDelete) {
      Alert?.alert('Unable to Delete');
      bottomSheetRef?.current?.close();
      return;
    }

    const response = await executeApiRequest({
      apiCallFunction: deleteJob,
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

  return (
    <AppBackground
      back={true}
      title={'JOBS'}
      add
      addPress={() => {
        NavService?.navigate('AddJob');
      }}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginTop: 10,
          marginBottom: height * 0.07,
        }}>
        <SearchInput placeholder={'Search for Jobs Here...'} />
        <HorizontalFlatList data={jobType} onItemPress={handleTypePress} />

        {data?.docs?.length > 0 ? (
          <>
            <PullToRefreshFlatList
              refetch={refetch}
              contentContainerStyle={{
                paddingBottom: height * 0.15,
                backgroundColor: colors?.white,
                paddingTop: height * 0.01,
              }}
            
              showsVerticalScrollIndicator={false}
              data={data?.docs}
              keyExtractor={(item, index) => index.toString()}
              
              renderItem={({item}) => (
                <CustomCard
                  jobCard={true}
                  item={item}
                  onRemovePress={() => {
                    selectedJobRef.current = item?._id;
                    bottomSheetRef.current.open();
                  }}
                  onPress={() => {
                    NavService.navigate('JobDetails', {jobDetails: item});
                  }}
                />
              )}
            />
            <BottomSheet
              remove={true}
              text={'Are you sure you want to remove this job?'}
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
            <EmptyDataComponent message={isLoading ? "Loading! Please Wait." : "No Data Available. Press the + icon above to create job listings!"} />
          </ScrollView>
        )}
      </View>
    </AppBackground>
  );
};

export default Jobs;

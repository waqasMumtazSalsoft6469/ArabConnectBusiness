import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, FlatList, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import {dealItems} from '../../../utils/dummyData';
import {SearchInput} from '../../../components/CustomTextInput';
import CustomCard from '../../../components/CustomCard';
import {useFetchMyBusinessProfilesQuery} from '../../../Api/businessApiSlice';
import {LOG} from '../../../utils/helperFunction';
import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';
import {colors2} from '../../../theme/colors2';
import ActivityLoader from '../../../components/ActivityLoader';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import {useIsFocused} from '@react-navigation/native';
import {vh} from '../../../utils';

const {width, height} = Dimensions.get('screen');
const MyBusinesses = () => {
  const {data, isLoading, error, refetch} = useFetchMyBusinessProfilesQuery();
  const isFocused = useIsFocused();
  LOG('DATAsadas: ', data?.docs);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);
  return (
    <AppBackground menu={true} title={'MY BUSINESSES'} notification={true}>
      <View style={{paddingHorizontal: 20, paddingVertical: 15, marginTop: 10}}>
        <SearchInput placeholder={'Search for Businesses'} />
        {data?.docs?.length > 0 ? (
          <>
            <PullToRefreshFlatList
              refetch={refetch}
              contentContainerStyle={{
                paddingBottom: height * 0.18,
                backgroundColor: colors?.white,
                marginTop: height * 0.02,
              }}
              showsVerticalScrollIndicator={false}
              data={data?.docs}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <CustomCard
                  myBusinessCard={true}
                  item={item}
                  onPress={() => {
                    NavService.navigate('MyBusinessDetails', {cardItem: item});
                  }}
                />
              )}
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
                isLoading ? 'Loading! Please Wait.' : 'No Data Available.'
              }
            />
          </PullToRefreshScrollView>
        )}
      </View>
    </AppBackground>
  );
};

export default MyBusinesses;

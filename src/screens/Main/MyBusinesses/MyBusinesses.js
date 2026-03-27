import React, {useEffect} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {colors} from '../../../utils/Colors';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
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

const {height} = Dimensions.get('screen');
const MyBusinesses = () => {
  const {data, isLoading, refetch} = useFetchMyBusinessProfilesQuery();
  const isFocused = useIsFocused();
  LOG('DATAsadas: ', data?.docs);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);
  return (
    <AppBackground menu={true} title={'MY BUSINESSES'} notification={true}>
      <View style={styles.page}>
        <View style={styles.searchWrap}>
          <SearchInput placeholder={'Search for Businesses'} />
        </View>
        {data?.docs?.length > 0 ? (
          <>
            <PullToRefreshFlatList
              refetch={refetch}
              contentContainerStyle={styles.listContent}
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
            contentContainerStyle={styles.emptyScroll}>
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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchWrap: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 8,
  },
  listContent: {
    paddingBottom: height * 0.2,
    paddingHorizontal: 12,
    paddingTop: vh * 1,
    backgroundColor: '#F4F6FB',
  },
  emptyScroll: {
    flexGrow: 1,
    paddingBottom: 20,
    marginTop: vh * 3,
  },
});

export default MyBusinesses;

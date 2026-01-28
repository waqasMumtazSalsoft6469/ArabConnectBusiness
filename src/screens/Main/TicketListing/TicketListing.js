import {Alert, Dimensions, FlatList, ScrollView, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import AppBackground from '../../../components/AppBackground';
import {appIcons, appImages} from '../../../assets';
import CustomBox from '../../../components/CustomBox/CustomBox';
import BottomSheet from '../../../components/BottomSheet';
import NavService from '../../../helpers/NavService';
import {TicketListingData} from '../../../utils/dummyData';
import {LOG} from '../../../utils/helperFunction';
import {useFetchEventTicketsByUserQuery} from '../../../Api/EventsApiSlice';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import {useIsFocused} from '@react-navigation/native';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';

const {height} = Dimensions.get('screen');

const TicketListing = ({route}) => {
  const eventDetails = route?.params;
  LOG('Data: ', eventDetails?.eventDetails);
  const bottomSheetRef = useRef();
  const isFocused = useIsFocused();
  const {data, isLoading, error, refetch} = useFetchEventTicketsByUserQuery({
    eventId: eventDetails?.eventDetails,
  });

  LOG('datata: ', data?.docs);
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const renderItem = ({item}) => (
    <CustomBox
      disabled={true}
      item={item}
      ticketBox={true}
      onRefundPress={() => bottomSheetRef?.current.open()}
    />
  );

  return (
    <AppBackground
      back={true}
      title={'Ticket listing'.toUpperCase()}
      notification>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginTop: 10,
        }}>
        {data?.docs?.length > 0 ? (
          <>
            <PullToRefreshFlatList
              refetch={refetch}
              data={data?.docs}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                padding: height * 0.01,
                paddingBottom: height * 0.25,
              }} // To handle bottom padding
            />
            <BottomSheet
              successfull={true}
              text={'SYSTEM MESSAGE'}
              description={'The ticket amount has been refunded successfully!'}
              ref={bottomSheetRef}
              OnYesPress={() => {
                bottomSheetRef.current.close();
              }}
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
          </ScrollView>
        )}
      </View>
    </AppBackground>
  );
};

export default TicketListing;

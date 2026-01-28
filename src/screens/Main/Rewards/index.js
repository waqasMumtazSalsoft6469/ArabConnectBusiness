// import {Alert, Dimensions, ScrollView, StyleSheet, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import AppBackground from '../../../components/AppBackground';
// import {vh} from '../../../utils';
// import {colors} from '../../../utils/Colors';
// import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
// import {colors2} from '../../../theme/colors2';
// import {HEIGHT} from '../../../theme/units';
// import CustomCard from '../../../components/CustomCard';
// import {campaignData} from '../../../utils/dummyData';
// import AddRewardsModal from '../../../components/Modals/AddRewardsModal';
// import {useSelector} from 'react-redux';
// import {useIsFocused} from '@react-navigation/native';
// import {
//   useAddMutation,
//   useDeleteRewardMutation,
//   useFetchRewardsByBusinessQuery,
// } from '../../../Api/rewardsApiSlice';
// import {LOG} from '../../../utils/helperFunction';
// import ActivityLoader from '../../../components/ActivityLoader';
// import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';
// import EmptyDataComponent from '../../../components/EmptyDataComponent';
// import {executeApiRequest} from '../../../Api/methods/method';
// import {ref} from 'yup';

// const {height} = Dimensions.get('screen');
// const Rewards = () => {
//   const [addModal, setAddModal] = useState(false);

//   const userDetails = useSelector(state => state?.auth?.user || {});
//   const businessId = userDetails?.activeProfile || null;
//   const isFocused = useIsFocused();

//   const {data, isLoading, refetch} = useFetchRewardsByBusinessQuery({
//     businessProfileId: businessId,
//   });

//   LOG('Rewards Data: ', data);

//   useEffect(() => {
//     if (isFocused && businessId) {
//       refetch();
//     }
//   }, [isFocused, businessId]);

//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [deleteReward] = useDeleteRewardMutation();

//   const [add, {isLoading: addLoading}] = useAddMutation();

//   const renderItem = ({item}) => (
//     <CustomCard
//       rewardCard={true}
//       item={item}
//       onDeletePress={handleDeleteCoupon}
//     />
//   );
//   const handleDeleteCoupon = id => {
//     LOG('id:', id);

//     if (!id) {
//       Alert.alert('Unable to Delete');
//       return;
//     }

//     Alert.alert(
//       'Delete Reward?',
//       'Are you sure you want to delete this reward?',
//       [
//         {
//           text: 'No',
//           style: 'cancel',
//         },
//         {
//           text: 'Yes',
//           onPress: async () => {
//             try {
//               setDeleteLoading(true);
//               const response = await executeApiRequest({
//                 apiCallFunction: deleteReward,
//                 params: {
//                   id: id,
//                 },
//                 toast: true,
//                 timeout: 30000,
//               });

//               if (response) {
//                 await refetch();
//               }
//             } catch (error) {
//               LOG('Delete Reward error:', error);
//             } finally {
//               setDeleteLoading(false);
//             }
//           },
//         },
//       ],
//     );
//   };

//   const handleAddRewards = async payload => {
//     console.log('Payload in Customer Listing: ', payload);

//     const response = await executeApiRequest({
//       apiCallFunction: add,
//       body: {
//         businessProfileId: businessId,
//         ...payload,
//       },
//       formData: true,
//       toast: true,
//       timeout: 30000,
//     });

//     if (response) {
//       setAddModal(false);
//       refetch();
//     }
//   };

//   return (
//     <AppBackground
//       back={true}
//       title={'Rewards'}
//       addRewards={true}
//       onRewardsPress={() => setAddModal(true)}
//       description={'Create and manage rewards for your loyalty program'}
//       titleColor={'white'}
//       isDashboard={true}
//       headerCustomStyles={{backgroundColor: colors.primary}}>
//       {/* <ScrollView showsVerticalScrollIndicator={false}> */}
//         <View
//           style={{
//             paddingHorizontal: 10,
//             marginTop: height * 0.03,
//             height: HEIGHT / 1.3,
//             backgroundColor: 'white',
//             paddingBottom: HEIGHT * 0.1,
//           }}>
//           {isLoading ? (
//             // 🌀 Show loader while fetching data
//             <ActivityLoader />
//           ) : data?.length > 0 ? (
//             // ✅ Show data when available
//             <View>
//               {deleteLoading && <ActivityLoader />}
//               <PullToRefreshFlatList
//                 refetch={refetch}
//                 data={data}
//                 // data={campaignData}
//                 renderItem={renderItem}
//                 keyExtractor={item => item._id}
//                 scrollEnabled={true}
//                 ItemSeparatorComponent={() => <View style={{height: 10}} />}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{
//                   paddingVertical: vh * 0.5,
//                   paddingBottom: vh * 5,
//                 }}
//               />
//             </View>
//           ) : (
//             <PullToRefreshScrollView
//               onRefresh={refetch}
//               refreshingColor={colors2?.theme?.secondary}
//               contentContainerStyle={{
//                 flexGrow: 1,
//                 paddingBottom: 20,
//                 // marginTop: vh * 3,
//               }}>
//               {isLoading && (
//                 <ActivityLoader color={colors2?.theme?.secondary} />
//               )}
//               <EmptyDataComponent
//                 message={
//                   isLoading
//                     ? 'Loading! Please Wait.'
//                     : 'No Data Available. \n\n Campaigns will appear here once created.'
//                 }
//                 height={height * 0.2}
//               />
//             </PullToRefreshScrollView>
//           )}
//         </View>

//         <AddRewardsModal
//           visible={addModal}
//           onClose={() => setAddModal(false)}
//           onSubmit={handleAddRewards}
//           loading={addLoading}
//         />
//       {/* </ScrollView> */}
//     </AppBackground>
//   );
// };

// export default Rewards;

import {Alert, Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppBackground from '../../../components/AppBackground';
import {vh} from '../../../utils';
import {colors} from '../../../utils/Colors';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import {colors2} from '../../../theme/colors2';
import {HEIGHT} from '../../../theme/units';
import CustomCard from '../../../components/CustomCard';
import {campaignData} from '../../../utils/dummyData';
import AddRewardsModal from '../../../components/Modals/AddRewardsModal';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {
  useAddMutation,
  useDeleteRewardMutation,
  useEditMutation,
  useFetchRewardsByBusinessQuery,
} from '../../../Api/rewardsApiSlice';
import {LOG} from '../../../utils/helperFunction';
import ActivityLoader from '../../../components/ActivityLoader';
import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import {executeApiRequest} from '../../../Api/methods/method';
import {ref} from 'yup';

const {height} = Dimensions.get('screen');

const Rewards = () => {
  const [addModal, setAddModal] = useState(false);
  const [editItem, setEditItem] = useState(null); // New state for edit item
  const userDetails = useSelector(state => state?.auth?.user || {});
  const businessId = userDetails?.activeProfile || null;
  const isFocused = useIsFocused();
  const {data, isLoading, refetch} = useFetchRewardsByBusinessQuery({
    businessProfileId: businessId,
  });

  // LOG('Rewards Data: ', data);

  useEffect(() => {
    if (isFocused && businessId) {
      refetch();
    }
  }, [isFocused, businessId]);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteReward] = useDeleteRewardMutation();
  const [add, {isLoading: addLoading}] = useAddMutation();
  const [edit, {isLoading: editLoading}] = useEditMutation();

  const renderItem = ({item}) => (
    <CustomCard
      rewardCard={true}
      item={item}
      onDeletePress={handleDeleteCoupon}
      onEditPress={() => handleEditPress(item)} // Pass onEditPress
    />
  );

  const handleEditPress = item => {
    setEditItem(item);
    setAddModal(true);
  };

  const handleDeleteCoupon = id => {
    LOG('id:', id);
    if (!id) {
      Alert.alert('Unable to Delete');
      return;
    }
    Alert.alert(
      'Delete Reward?',
      'Are you sure you want to delete this reward?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              setDeleteLoading(true);
              const response = await executeApiRequest({
                apiCallFunction: deleteReward,
                params: {id: id},
                toast: true,
                timeout: 30000,
              });
              if (response) {
                await refetch();
              }
            } catch (error) {
              LOG('Delete Reward error:', error);
            } finally {
              setDeleteLoading(false);
            }
          },
        },
      ],
    );
  };

  const handleAddRewards = async payload => {
    console.log('Payload in Customer Listing: ', payload);
    const response = await executeApiRequest({
      apiCallFunction: add,
      body: {
        businessProfileId: businessId,
        ...payload,
      },
      formData: true,
      toast: true,
      timeout: 30000,
    });
    if (response) {
      setAddModal(false);
      setEditItem(null); // Reset edit item
      refetch();
    }
  };

  const handleUpdateRewards = async payload => {
    LOG('Update Payload: ', payload);

    const response = await executeApiRequest({
      apiCallFunction: edit,
      body: {
        businessProfileId: businessId,
        ...payload,
      },
      params: {id: payload.id},
      formData: true,
      toast: true,
      timeout: 30000,
    });
    if (response) {
      setAddModal(false);
      setEditItem(null);
      refetch();
    }
  };

  // Helper to determine if in edit mode
  const isEditMode = !!editItem;

  return (
    <AppBackground
      back={true}
      title={'Rewards'}
      addRewards={true}
      onRewardsPress={() => {
        setEditItem(null); // Reset for add
        setAddModal(true);
      }}
      description={'Create and manage rewards for your loyalty program'}
      titleColor={'white'}
      isDashboard={true}
      headerCustomStyles={{backgroundColor: colors.primary}}>
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: height * 0.03,
          height: HEIGHT / 1.3,
          backgroundColor: 'white',
          paddingBottom: HEIGHT * 0.1,
        }}>
        {isLoading ? (
          // 🌀 Show loader while fetching data
          <ActivityLoader />
        ) : data?.length > 0 ? (
          // ✅ Show data when available
          <View>
            {deleteLoading && <ActivityLoader />}
            <PullToRefreshFlatList
              refetch={refetch}
              data={data}
              // data={campaignData}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              scrollEnabled={true}
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: vh * 0.5,
                paddingBottom: vh * 5,
              }}
            />
          </View>
        ) : (
          <PullToRefreshScrollView
            onRefresh={refetch}
            refreshingColor={colors2?.theme?.secondary}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 20,
              // marginTop: vh * 3,
            }}>
            {isLoading && <ActivityLoader color={colors2?.theme?.secondary} />}
            <EmptyDataComponent
              message={
                isLoading
                  ? 'Loading! Please Wait.'
                  : 'No Data Available. \n\n Campaigns will appear here once created.'
              }
              height={height * 0.2}
            />
          </PullToRefreshScrollView>
        )}
      </View>
      <AddRewardsModal
        visible={addModal}
        onClose={() => {
          setAddModal(false);
          setEditItem(null);
        }}
        onSubmit={isEditMode ? handleUpdateRewards : handleAddRewards} // Use appropriate handler
        loading={addLoading || editLoading} // You may want separate loading for update
        editItem={editItem} // Pass edit item for prefill
        isEditMode={isEditMode} // Pass mode flag
      />
    </AppBackground>
  );
};

export default Rewards;

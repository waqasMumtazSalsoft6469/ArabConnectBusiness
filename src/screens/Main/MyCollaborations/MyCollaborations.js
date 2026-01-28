import React, {useState} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import {
  marketplaceData,
  officeData,
  restaurants,
} from '../../../utils/dummyData';
import {SearchInput} from '../../../components/CustomTextInput';
import CustomCard from '../../../components/CustomCard';
import {type} from '../../../utils/dummyData';
import HorizontalFlatList from '../../../components/HorizontalFlatlist';

const {width, height} = Dimensions.get('screen');

const MyCollaborations = ({route}) => {
  const handleTypePress = id => {
    //filter as per item name
    // Handle the selection change as needed
  };

  return (
    <AppBackground back={true} title={'My Collaborations'} notification>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginTop: 10,
          marginBottom: height * 0.03,
        }}>
        <SearchInput placeholder={'Search for Businesses'} />

        {/* Horizontal FlatList for Types */}
        <HorizontalFlatList data={type} onItemPress={handleTypePress} />

        <FlatList
          style={{marginTop: height * 0.01}}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingVertical: 20,
            paddingBottom: height * 0.16,
          }}
          showsVerticalScrollIndicator={false}
          data={officeData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          renderItem={({item, index}) => (
            <CustomCard
              product={true}
              heart={true}
              item={item}
              index={index}
              onPress={() => {
                //Deal item details
                // NavService.navigate('restaurantDetails', {cardItem: item});
              }}
            />
          )}
          numColumns={2}
        />
      </View>
    </AppBackground>
  );
};

export default MyCollaborations;

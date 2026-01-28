import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {colors} from '../../../utils/Colors';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import {dealItems} from '../../../utils/dummyData';
import {SearchInput} from '../../../components/CustomTextInput';
import CustomCard from '../../../components/CustomCard';

const {width, height} = Dimensions.get('screen');
const MyProductsHome = () => {
  return (
    <AppBackground back={true} title={'My Products'} notification>
      <View style={{paddingHorizontal: 20, paddingVertical: 15, marginTop: 10}}>
        <SearchInput placeholder={'Search for Deals'} />
        <FlatList
          contentContainerStyle={{
            paddingBottom: height * 0.08,
            backgroundColor: colors?.white,
            marginTop: height * 0.01,
          }}
          showsVerticalScrollIndicator={false}
          data={dealItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <CustomCard
              dealCard={true}
              item={item}
              onPress={() => {
                NavService.navigate('myProducts');
              }}
            />
          )}
        />
      </View>
    </AppBackground>
  );
};

export default MyProductsHome;

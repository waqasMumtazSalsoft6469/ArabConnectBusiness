import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {appIcons, appImages} from '../../../assets';
import AppBackground from '../../../components/AppBackground';
import CustomContainer from '../../../components/CustomContainer';
import {colors} from '../../../utils/Colors';
import CustomText from '../../../components/CustomText';
import {family, size, vh, vw} from '../../../utils';
import CustomIcon from '../../../components/CustomIcon';
import CustomButton from '../../../components/CustomButton';
import NavService from '../../../helpers/NavService';

import CustomRadioButton from '../../../components/CustomRadioButton';
import styles from './styles';
import {getImageUrl, LOG} from '../../../utils/helperFunction';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('screen');
export const dishSize = [
  {id: 1, label: 'Small', value: 'small'},
  {id: 2, label: 'Medium', value: 'medium'},
  {id: 3, label: 'Large', value: 'large'},
];
const MyProductDetails = ({route}) => {
  const {eventDetails} = route.params;
  LOG('PARAMS: ', eventDetails);

  const renderGalleryItem = ({item}) => (
    <View style={styles.imageContainer}>
      <FastImage
        source={getImageUrl(item)}
        style={styles.image}
        resizeMode="cover"
        defaultSource={appImages?.placeholder}
      />
    </View>
  );

  return (
    <AppBackground
      back
      title={''}
      notification
      couponDetails={true}
      editIcon={true}
      jobEditPress={() => {
        NavService?.navigate('editProduct', {eventDetails});
      }}
      marginHorizontal={true}>
      <CustomContainer
        bgImage={getImageUrl(eventDetails?.image)}
        customItemStyles={{marginTop: -height * 0.045}}>
        <View style={styles?.titleSection}>
          <View style={styles?.eventItems}>
            <View style={{gap: 3, width: '100%'}}>
              <CustomText
                text={eventDetails?.productName}
                color={colors.headingText}
                font={family?.Gilroy_SemiBold}
                size={size.title}
                numberOfLines={1}
              />

              <View
                style={{
                  flexDirection: 'row',
                  gap: vh * 5,
                  alignItems: 'center',
                  marginTop: vh * 1,

                  width: '100%',
                }}>
                <CustomText
                  text={
                    eventDetails?.variations[0]?.price
                      ? `$ ${eventDetails?.variations[0]?.price}`
                      : `$ ${eventDetails?.price}`
                  }
                  color={colors.secondary}
                  font={family?.Gilroy_Bold}
                  size={size.xtitle}
                  numberOfLines={1}
                />

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CustomIcon src={appIcons?.coin} size={height * 0.035} />

                  <CustomText
                    text={`${eventDetails?.pointsRequired} Points`}
                    color={'#E4890D'}
                    font={family?.Gilroy_Bold}
                    size={size.h1}
                    numberOfLines={1}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: vw * 0.5,
                  }}>
                  <CustomIcon
                    src={appIcons?.shopditPoint}
                    size={height * 0.03}
                  />

                  <CustomText
                    text={`${eventDetails?.requiredShopditPoints} Points`}
                    color={colors?.primary2}
                    font={family?.Gilroy_Bold}
                    size={size.h1}
                    numberOfLines={1}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{paddingVertical: 20}}>
            <CustomText
              text={'DESCRIPTION'}
              font={family?.Gilroy_SemiBold}
              size={size?.xxlarge}
              color={colors?.headingText}
              numberOfLines={1}
            />
            <CustomText
              style={{
                textAlign: 'justify',
                marginTop: height * 0.01,
                lineHeight: height * 0.03,
              }}
              text={eventDetails?.description}
              size={size?.xlarge}
              font={family?.Questrial_Regular}
              color={colors?.placeholderText}
            />
          </View>
          {eventDetails?.variations?.length > 0 && (
            <View style={styles?.variationContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <CustomText
                  text={'Variations'}
                  font={family?.Gilroy_SemiBold}
                  size={size?.xxlarge}
                  color={colors?.headingText}
                  numberOfLines={1}
                  style={{textTransform: 'uppercase'}}
                />
              </View>
              <View style={{marginTop: 15, gap: height * 0.02}}>
                {eventDetails?.variations?.map(variation => (
                  // <Text key={variation._id}>
                  //   {variation.name} --&gt; ${variation.price}
                  // </Text>
                  <CustomText
                    key={variation._id}
                    text={`${variation?.name} --> $${variation.price}`}
                    size={size?.xlarge}
                    font={family?.Questrial_Regular}
                    color={colors?.placeholderText}
                  />
                ))}
              </View>
            </View>
          )}
          <View style={{marginTop: vh * 1}}>
            <CustomText
              text={'PURCHASING REWARD'}
              font={family?.Gilroy_SemiBold}
              size={size?.xxlarge}
              color={colors?.headingText}
              numberOfLines={1}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: vh * 1,
              }}>
              <CustomIcon src={appIcons?.coin} size={height * 0.03} />

              <CustomText
                text={`${eventDetails?.rewardPoints} Points`}
                color={'#E4890D'}
                font={family?.Gilroy_SemiBold}
                size={size.h6}
                numberOfLines={1}
              />
            </View>
          </View>
          <View style={{marginTop: vh * 2}}>
            <CustomText
              text={'GALLERY'}
              font={family?.Gilroy_SemiBold}
              size={size?.xxlarge}
              color={colors?.headingText}
              numberOfLines={1}
            />
            <FlatList
              data={eventDetails?.gallery}
              scrollEnabled={false}
              renderItem={renderGalleryItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              columnWrapperStyle={styles.galleryRow}
              contentContainerStyle={styles.galleryList}
            />
          </View>
        </View>
      </CustomContainer>
    </AppBackground>
  );
};

export default MyProductDetails;

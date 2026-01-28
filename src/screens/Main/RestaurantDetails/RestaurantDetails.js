import React from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../../utils/Colors';
import AppBackground from '../../../components/AppBackground';
import {appIcons, appImages} from '../../../assets';
import CustomText from '../../../components/CustomText';
import {family, size} from '../../../utils';
import CustomContainer from '../../../components/CustomContainer';
import {
  couponData,
  dishes,
  restaurantGallery,
  restaurantTiming,
} from '../../../utils/dummyData';
import CustomIcon from '../../../components/CustomIcon';
import FastImage from 'react-native-fast-image';
import Coupon from '../../../components/Coupon';
import NavService from '../../../helpers/NavService';
import CustomCard from '../../../components/CustomCard';
import CustomButton from '../../../components/CustomButton';

const {width, height} = Dimensions.get('screen');
const RestaurantDetails = ({route}) => {
  // const {cardItem} = route.params;

  const renderGalleryItem = ({item}) => (
    <View style={styles.imageContainer}>
      <FastImage source={item?.image} style={styles.image} resizeMode="cover" />
    </View>
  );
  return (
    <AppBackground
      back
      titleColor={colors?.white}
      title={'RESTAURANT DETAILS'}
      notification
      couponDetails={true}
      marginHorizontal={true}>
      <CustomContainer bgImage={appImages?.restaurantDetailBG}>
        <View style={styles?.titleSection}>
          <CustomText
            text={'Flavorful Fare House'.toUpperCase()}
            font={family?.Gilroy_SemiBold}
            size={size?.h1}
            color={colors?.headingText}
            numberOfLines={1}
          />
          <CustomText
            text={'Flavorfullfarehouse.com'}
            numberOfLines={1}
            font={family?.Questrial_Regular}
            size={size?.xxlarge}
            color={colors?.iconColor}
          />
          <View style={[styles?.hr, {width: '100%'}]} />
          <View>
            <CustomText
              text={'WORKING HOURS'}
              font={family?.Gilroy_SemiBold}
              size={size?.h6}
              color={colors?.headingText}
              numberOfLines={1}
            />
            <View style={styles?.workItems}>
              <CustomIcon size={size?.h6} src={appIcons?.timing} />
              {restaurantTiming.map((item, index) => (
                <View key={index} style={styles.item}>
                  <CustomText
                    style={{textAlign: 'justify', marginTop: -1}}
                    text={item?.timing}
                    size={size?.large}
                    font={family?.Questrial_Regular}
                    color={colors?.placeholderText}
                  />
                </View>
              ))}
            </View>
          </View>
          <View style={[styles?.hr, {width: '100%'}]} />
          <View>
            <CustomText
              text={'ABOUT RESTAURANT'}
              font={family?.Gilroy_SemiBold}
              size={size?.h6}
              color={colors?.headingText}
              numberOfLines={1}
            />

            {restaurantTiming.map((item, index) => (
              <View key={index} style={styles.item}>
                <CustomText
                  style={{
                    textAlign: 'justify',
                    marginTop: -1,
                    lineHeight: height * 0.03,
                  }}
                  text={item?.about}
                  size={size?.large}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
              </View>
            ))}
          </View>
          <View style={[styles?.hr, {width: '100%'}]} />
          <View>
            <CustomText
              text={'ADDRESS'}
              font={family?.Gilroy_SemiBold}
              size={size?.h6}
              color={colors?.headingText}
              numberOfLines={1}
            />
            <View style={styles?.workItems}>
              <CustomIcon size={size?.h5} src={appIcons?.address} />

              {restaurantTiming.map((item, index) => (
                <View key={index} style={styles.item}>
                  <CustomText
                    style={{textAlign: 'justify', marginTop: -1}}
                    text={item?.address}
                    size={size?.large}
                    font={family?.Questrial_Regular}
                    color={colors?.placeholderText}
                  />
                </View>
              ))}
            </View>
          </View>
          <View style={[styles?.hr, {width: '100%'}]} />
          <View>
            <CustomText
              text={'GALLERY'}
              font={family?.Gilroy_SemiBold}
              size={size?.h6}
              color={colors?.headingText}
              numberOfLines={1}
            />
            <FlatList
              data={restaurantGallery}
              scrollEnabled={false}
              renderItem={renderGalleryItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              columnWrapperStyle={styles.galleryRow}
              contentContainerStyle={styles.galleryList}
            />
          </View>
          <View style={[styles?.hr, {width: '100%'}]} />
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <CustomText
                text={'Products'.toUpperCase()}
                font={family?.Gilroy_SemiBold}
                size={size?.h6}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <TouchableOpacity
                onPress={() => {
                  // NavService?.navigate('ViewAllCoupons')
                }}
                activeOpacity={0.5}>
                <CustomText
                  text={'View All'}
                  font={family?.Questrial_Regular}
                  size={size?.large}
                  color={colors?.primary}
                  numberOfLines={1}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <FlatList
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            alignSelf: 'center',
          }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          data={dishes}
          keyExtractor={(item, index) => index.toString()}
          // ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
          renderItem={({item, index}) => (
            <CustomCard
              restaurantProduct={true}
              item={item}
              //   index={index}
              heart
              onPress={() => {
                // NavService?.navigate('DishDetails', {dishItem: item});
              }}
            />
          )}
          numColumns={2}
        />
        <View style={{marginTop: height * 0.02}}>
          <CustomButton
            gradientColorArr={[colors.secondary, colors.secondary]}
            title={'Collaborate'.toUpperCase()}
            customWidth={width - 55}
            buttonStyle={{alignSelf: 'center', borderRadius: 50}}
            textStyle={{fontSize: size.xxlarge}}
            onPress={() => {
              NavService?.navigate('collaborate');
            }}
          />
        </View>
      </CustomContainer>
    </AppBackground>
  );
};

export default RestaurantDetails;

const styles = StyleSheet.create({
  titleSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
    gap: 3,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  item: {
    marginVertical: 5,
  },
  hr: {
    borderTopWidth: 1,
    borderColor: colors?.lightGrayLine,
    marginTop: 15,
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
  },
  workItems: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  imageContainer: {
    width: width / 3 - 23,
    height: width / 3 - 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 5,
  },
  galleryRow: {
    justifyContent: 'space-between',
  },
  galleryList: {
    marginTop: height * 0.015,
  },
});

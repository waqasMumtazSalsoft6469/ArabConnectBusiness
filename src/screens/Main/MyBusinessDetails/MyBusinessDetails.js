import React from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {colors} from '../../../utils/Colors';
import AppBackground from '../../../components/AppBackground';
import {appIcons, appImages} from '../../../assets';
import CustomText from '../../../components/CustomText';
import {family, size, vh} from '../../../utils';
import CustomContainer from '../../../components/CustomContainer';
import {
  couponData,
  restaurantGallery,
  restaurantTiming,
} from '../../../utils/dummyData';
import CustomIcon from '../../../components/CustomIcon';
import FastImage from 'react-native-fast-image';
import Coupon from '../../../components/Coupon';
import NavService from '../../../helpers/NavService';
import {getImageUrl, LOG} from '../../../utils/helperFunction';
import {HEIGHT} from '../../../theme/units';
import CustomButton from '../../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {executeApiRequest} from '../../../Api/methods/method';
import {useActivateProfileMutation} from '../../../Api/businessApiSlice';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import {setAuth} from '../../../redux/slices/authSlice';

const {width, height} = Dimensions.get('screen');
const MyBusinessDetails = ({route}) => {
  const [activateProfile, {isLoading}] = useActivateProfileMutation();
  const userDetails = useSelector(state => state?.auth?.user || {});
  LOG('UserDetails in State: ', userDetails);
  const dispatch = useDispatch();
  const {cardItem} = route.params;

  LOG('CARD: ', cardItem);
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

  const handleActivation = async () => {
    let payload = {
      profileId: cardItem?._id,
    };
    const response = await executeApiRequest({
      apiCallFunction: activateProfile, // RTK Query mutation function
      body: payload, // FormData payload
      toast: true, // Show toast messages
      timeout: 30000, // 30-second timeout
    });

    LOG('Profile Activate Success:', response);
    if (response) {
      dispatch(setAuth({user: {activeProfile: cardItem?._id}}));
    }
  };
  return (
    <AppBackground
      back
      titleColor={colors?.white}
      title={'BUSINESS DETAILS'}
      editIcon={true}
      notification
      jobEditPress={() => {
        NavService?.navigate('EditBusinessProfile', {cardItem});
      }}
      couponDetails={true}
      marginHorizontal={true}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomContainer
          bgImage={appImages?.officeBG}
          customBgStyles={{marginTop: height * 0.015}}
          customItemStyles={{marginTop: -height * 0.05}}>
          <View style={styles?.titleSection}>
            <CustomText
              text={cardItem?.businessName}
              font={family?.Gilroy_SemiBold}
              size={size?.h1}
              color={colors?.headingText}
              numberOfLines={1}
            />
            {cardItem?.website && (
              <CustomText
                text={`${cardItem?.website}`}
                font={family?.Questrial_Regular}
                size={size?.large}
                color={colors?.iconColor}
                numberOfLines={1}
              />
            )}
            <CustomText
              text={`By: ${cardItem?.business?.fullName}`}
              font={family?.Questrial_Regular}
              size={size?.xxlarge}
              color={colors?.secondary}
              numberOfLines={1}
            />

            <View style={{marginTop: height * 0.025}}>
              <CustomText
                text={'DESCRIPTION'}
                font={family?.Gilroy_SemiBold}
                size={size?.h6}
                color={colors?.headingText}
                numberOfLines={1}
              />

              <CustomText
                style={{
                  textAlign: 'justify',
                  marginTop: -1,
                  lineHeight: height * 0.03,
                }}
                text={cardItem?.about}
                size={size?.large}
                font={family?.Questrial_Regular}
                color={colors?.placeholderText}
              />
            </View>

            <View style={styles?.contactContainer}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <View style={styles?.iconContainer}>
                  <FastImage
                    source={appIcons?.call}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="contain"
                  />
                </View>
                <CustomText
                  style={{textAlign: 'justify'}}
                  text={cardItem?.phoneNumber}
                  size={size?.xlarge}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
              </View>
            </View>
            <View style={[styles?.hr, {width: '100%'}]} />
            <View>
              <CustomText
                text={'EMAIL'}
                font={family?.Gilroy_SemiBold}
                size={size?.h6}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <View style={styles?.workItems}>
                <CustomIcon size={size?.h5} src={appIcons?.messageIcon} />

                <CustomText
                  style={{textAlign: 'justify', marginTop: -1}}
                  text={cardItem?.business?.email}
                  size={size?.large}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
              </View>
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

                <CustomText
                  style={{textAlign: 'justify', marginTop: -1}}
                  text={cardItem?.location?.address}
                  size={size?.large}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
              </View>
            </View>
            <View style={[styles?.hr, {width: '100%'}]} />
            {cardItem?.instagram && (
              <>
                <View>
                  <CustomText
                    text={'Instagram'}
                    font={family?.Gilroy_SemiBold}
                    size={size?.h6}
                    color={colors?.headingText}
                    numberOfLines={1}
                  />
                  <View style={styles?.workItems}>
                    <CustomIcon
                      size={size?.h5}
                      src={appIcons?.instagram}
                      tintColor={colors?.iconColor}
                    />

                    <CustomText
                      style={{textAlign: 'justify', marginTop: -1}}
                      text={cardItem?.instagram}
                      size={size?.large}
                      font={family?.Questrial_Regular}
                      color={colors?.placeholderText}
                    />
                  </View>
                </View>
                <View style={[styles?.hr, {width: '100%'}]} />
              </>
            )}
            {cardItem?.facebook && (
              <>
                <View>
                  <CustomText
                    text={'Facebook'}
                    font={family?.Gilroy_SemiBold}
                    size={size?.h6}
                    color={colors?.headingText}
                    numberOfLines={1}
                  />
                  <View style={styles?.workItems}>
                    <CustomIcon
                      size={size?.h5}
                      src={appIcons?.jobFacebook}
                      tintColor={colors?.iconColor}
                    />

                    <CustomText
                      style={{textAlign: 'justify', marginTop: -1}}
                      text={cardItem?.facebook}
                      size={size?.large}
                      font={family?.Questrial_Regular}
                      color={colors?.placeholderText}
                    />
                  </View>
                </View>
                <View style={[styles?.hr, {width: '100%'}]} />
              </>
            )}
            {cardItem?.tiktok && (
              <>
                <View>
                  <CustomText
                    text={'Tiktok'}
                    font={family?.Gilroy_SemiBold}
                    size={size?.h6}
                    color={colors?.headingText}
                    numberOfLines={1}
                  />
                  <View style={styles?.workItems}>
                    <CustomIcon
                      size={size?.h5}
                      src={appIcons?.tiktok}
                      tintColor={colors?.iconColor}
                    />

                    <CustomText
                      style={{textAlign: 'justify', marginTop: -1}}
                      text={cardItem?.tiktok}
                      size={size?.large}
                      font={family?.Questrial_Regular}
                      color={colors?.placeholderText}
                    />
                  </View>
                </View>
                <View style={[styles?.hr, {width: '100%'}]} />
              </>
            )}
            <View>
              <CustomText
                text={'GALLERY'}
                font={family?.Gilroy_SemiBold}
                size={size?.h6}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <FlatList
                data={cardItem?.gallery}
                scrollEnabled={false}
                renderItem={renderGalleryItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                columnWrapperStyle={styles.galleryRow}
                contentContainerStyle={styles.galleryList}
              />
            </View>
            <View
              style={{marginTop: height * 0.03, marginBottom: height * 0.05}}>
              {isLoading ? (
                <ActivityLoader color={colors2.theme.secondary} />
              ) : (
                <CustomButton
                  gradientColorArr={[colors.secondary, colors.secondary]}
                  title={
                    userDetails?.activeProfile !== cardItem?._id
                      ? 'ACTIVATE BUSINESS PROFILE'
                      : 'ACTIVATED'
                  }
                  disabled={
                    userDetails?.activeProfile !== cardItem?._id ? false : true
                  }
                  customWidth={width - 55}
                  buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                  textStyle={{fontSize: size.large}}
                  onPress={handleActivation}
                />
              )}
            </View>
          </View>
        </CustomContainer>
      </ScrollView>
    </AppBackground>
  );
};

export default MyBusinessDetails;

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
    marginTop: vh * 1,
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
    // justifyContent: 'space-between',
  },
  galleryList: {
    marginTop: height * 0.015,
  },
  contactContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F1F1F1',
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: height * 0.01,
  },
  iconContainer: {
    width: width * 0.1,
    height: height * 0.05,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  verticalLine: {
    borderLeftWidth: 1,
    borderColor: colors?.white,
    marginTop: 15,
    marginBottom: 15,
    height: '90%',
    alignSelf: 'center',
  },
});

import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {appIcons} from '../../../assets';
import AppBackground from '../../../components/AppBackground';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import {family, size} from '../../../utils';
import {colors} from '../../../utils/Colors';
import styles from './styles';
import NavService from '../../../helpers/NavService';
import {getImageUrl, openUrlInBrowser} from '../../../utils/helperFunction';

const {width, height} = Dimensions.get('screen');

const JobDetails = ({route}) => {
  const {jobDetails} = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleHeartPress = () => {
    setIsFavorite(!isFavorite);
  };


  return (
    <AppBackground
      back={true}
      title={'JOB DETAILS'}
      notification
      editIcon={true}
      jobEditPress={() => {
        NavService.navigate('JobEdit', {jobDetails: jobDetails});
      }}>
      <ScrollView>
        <View style={styles?.container}>
          <View style={{marginTop: 10}}>
            <View style={styles?.jobBox}>
              <View style={styles?.imageContainer}>
                <FastImage
                  source={getImageUrl(jobDetails?.image)}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </View>
              <View>
                <CustomText
                  text={jobDetails?.business?.fullName}
                  color={colors?.lightBlueText}
                  font={family?.Questrial_Regular}
                  size={size.medium}
                  numberOfLines={3}
                />
                <CustomText
                  text={jobDetails?.subCategory}
                  color={colors.headingText}
                  font={family?.Gilroy_SemiBold}
                  size={size.xxxlarge}
                  numberOfLines={1}
                />
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleHeartPress}
              style={{
                padding: 15,
                position: 'absolute',
                alignjobDetailss: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: !isFavorite
                  ? 'transparent'
                  : colors?.iconColor,

                right: 7,
                top: 7,
              }}>
              <Image
                source={appIcons?.heart}
                style={{
                  width: 15,
                  height: 15,
                  resizeMode: 'contain',
                  tintColor: !isFavorite
                    ? colors?.placeholderText
                    : colors?.white,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles?.horizontalBoxContainer1}>
            <View style={styles?.peachBox}>
              <CustomText
                text={'Job Type'}
                font={family?.Gilroy_SemiBold}
                size={size?.medium}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <CustomText
                text={jobDetails?.jobType}
                font={family?.Gilroy_SemiBold}
                size={size?.xlarge}
                color={colors?.headingText}
                numberOfLines={1}
              />
            </View>
            <View style={styles?.purpleBox}>
              <CustomText
                text={'Position'}
                font={family?.Gilroy_SemiBold}
                size={size?.medium}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <CustomText
                text={jobDetails?.category}
                font={family?.Gilroy_SemiBold}
                size={size?.xlarge}
                color={colors?.headingText}
                numberOfLines={2}
                style={{textAlign: 'center'}}
              />
            </View>

            <View></View>
          </View>
          <View style={styles?.horizontalBoxContainer2}>
            <View style={styles?.salaryBox}>
              <CustomText
                text={'Salary'}
                font={family?.Gilroy_SemiBold}
                size={size?.medium}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <CustomText
                text={`$${jobDetails?.salary}/MONTHLY`}
                font={family?.Gilroy_SemiBold}
                size={size?.xlarge}
                color={colors?.headingText}
                numberOfLines={1}
              />
            </View>
            <View style={styles?.positionBox}>
              <CustomText
                text={'Location'}
                font={family?.Gilroy_SemiBold}
                size={size?.medium}
                color={colors?.headingText}
                numberOfLines={1}
              />
              <CustomText
                text={jobDetails?.location?.address}
                font={family?.Gilroy_SemiBold}
                size={size?.xlarge}
                color={colors?.headingText}
                numberOfLines={1}
              />
            </View>
            <View></View>
          </View>

          <View style={{marginTop: height * 0.04, marginBottom: height * 0.03}}>
            <CustomText
              text={'JOB DESCRIPTION'}
              font={family?.Gilroy_SemiBold}
              size={size?.h6}
              color={colors?.headingText}
              numberOfLines={1}
            />
            <CustomText
              style={{
                textAlign: 'justify',
                marginTop: 5,
                lineHeight: height * 0.03,
              }}
              text={jobDetails?.description}
              size={size?.xlarge}
              font={family?.Questrial_Regular}
              color={colors?.placeholderText}
            />
          </View>
          <View style={styles?.contactContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <View style={styles?.iconContainer}>
                <FastImage
                  source={appIcons?.call}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="contain"
                />
              </View>
              <CustomText
                style={{textAlign: 'justify'}}
                text={`+1 ${jobDetails?.contactNumber}`}
                size={size?.xlarge}
                font={family?.Questrial_Regular}
                color={colors?.placeholderText}
              />
            </View>
            <View style={styles?.verticalLine} />
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <FastImage
                source={appIcons?.facebook}
                style={{width: '13%', height: '60%'}}
                resizeMode="contain"
                tintColor={'#0265DD'}
              />
              {jobDetails?.facebookLink ? (
                <TouchableOpacity
                  onPress={() => openUrlInBrowser(jobDetails?.facebookLink)}>
                  <CustomText
                    style={{
                      textAlign: 'justify',
                      textDecorationLine: 'underline',
                    }}
                    text={jobDetails?.facebookLink}
                    size={size?.xlarge}
                    font={family?.Questrial_Regular}
                    color={colors?.lightBlueText}
                  />
                </TouchableOpacity>
              ) : (
                <CustomText
                  style={{textAlign: 'justify'}}
                  text="No Facebook link provided"
                  size={size?.medium}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
              )}
            </View>
          </View>

          <View style={{marginTop: height * 0.04, marginBottom: height * 0.11}}>
            <CustomButton
              gradientColorArr={[colors.secondary, colors.secondary]}
              title={'SUBMITTED RESUME'}
              customWidth={width - 55}
              buttonStyle={{alignSelf: 'center', borderRadius: 50}}
              textStyle={{fontSize: size.large}}
              onPress={() => {
                NavService?.navigate('JobSubmittedResumes', {
                  jobId: jobDetails?._id,
                });
              }}
            />
          </View>
        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default JobDetails;

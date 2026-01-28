import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {appIcons, appImages} from '../../../assets';
import AppBackground from '../../../components/AppBackground';
import CustomContainer from '../../../components/CustomContainer';
import {colors} from '../../../utils/Colors';
import CustomText from '../../../components/CustomText';
import {family, size, vh} from '../../../utils';
import CustomIcon from '../../../components/CustomIcon';
import CustomButton from '../../../components/CustomButton';
import NavService from '../../../helpers/NavService';
import styles from './styles';
import {
  formatDateYear,
  formattedTime,
  getImageUrl,
  LOG,
} from '../../../utils/helperFunction';

const {width, height} = Dimensions.get('screen');

const EventsDetail = ({route}) => {
  const {eventDetails} = route.params;
  LOG('PARAMS: ', eventDetails);
  return (
    <AppBackground
      back
      titleColor={colors?.white}
      title={'EVENT DETAILS'}
      notification
      editIcon
      jobEditPress={() => {
        NavService.navigate('EventEdit', {
          eventDetails: eventDetails,
        });
      }}
      couponDetails={true}
      marginHorizontal={true}>
      <CustomContainer
        bgImage={getImageUrl(eventDetails?.image)}
        customItemStyles={{marginTop: -height * 0.055}}>
        <View style={styles?.titleSection}>
          <View style={styles?.eventItems}>
            <View style={{gap: 3}}>
              <CustomText
                text={eventDetails?.eventName}
                color={colors.headingText}
                font={family?.Gilroy_SemiBold}
                size={size.h5}
                numberOfLines={1}
              />
              {/* <CustomText
                text={eventDetails?.company}
                color={colors?.lightBlueText}
                font={family?.Questrial_Regular}
                size={size.large}
                numberOfLines={3}
              /> */}
              <View
                style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
                <CustomText
                  text={'$'}
                  color={colors.headingText}
                  font={family?.Gilroy_Bold}
                  size={size.xxlarge}
                  numberOfLines={1}
                />
                <CustomText
                  text={eventDetails?.ticketPrice}
                  color={colors.headingText}
                  font={family?.Gilroy_Bold}
                  size={size.xtitle}
                  numberOfLines={1}
                />
              </View>
            </View>

            {/* <View style={{alignItems: 'flex-end', marginTop: vh * 0.5}}>
              <CustomText
                text={'Tickets Sold'.toUpperCase()}
                color={colors.headingText}
                font={family?.Gilroy_Bold}
                size={size.small}
                numberOfLines={1}
              />
              <CustomText
                text={eventDetails?.ticketSold}
                color={colors?.lightBlueText}
                font={family?.Questrial_Regular}
                size={size.small}
                numberOfLines={1}
                underline
              />
            </View> */}
          </View>
          <View style={[styles?.hr, {width: '100%'}]} />
          <View>
            <CustomText
              text={'TIMING'}
              font={family?.Gilroy_SemiBold}
              size={size?.h6}
              color={colors?.headingText}
              numberOfLines={1}
            />
            <View style={styles?.workItems}>
              <View style={{flexDirection: 'row', gap: 5}}>
                <CustomIcon size={size?.h6} src={appIcons?.calendar} />
                <CustomText
                  style={{textAlign: 'justify', marginTop: -1}}
                  text={formatDateYear(eventDetails?.date)}
                  size={size?.large}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
              </View>
              <View style={{flexDirection: 'row', gap: 4}}>
                <CustomIcon size={size?.h5} src={appIcons?.timing} />
                <CustomText
                  style={{textAlign: 'justify', marginTop: -1}}
                  text={formattedTime(eventDetails?.time)}
                  size={size?.large}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
              </View>
            </View>
          </View>
          <View style={[styles?.hr, {width: '100%'}]} />
          <View>
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
                marginTop: 5,
                lineHeight: height * 0.03,
              }}
              text={eventDetails?.description}
              size={size?.large}
              font={family?.Questrial_Regular}
              color={colors?.placeholderText}
            />
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
              <View style={{flexDirection: 'row', gap: 5}}>
                <CustomIcon size={size?.h6} src={appIcons?.address} />
                <CustomText
                  style={{textAlign: 'justify', marginTop: -1}}
                  text={eventDetails?.location.address}
                  size={size?.large}
                  font={family?.Questrial_Regular}
                  color={colors?.placeholderText}
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: height * 0.03}}>
            <CustomButton
              gradientColorArr={[colors.secondary, colors.secondary]}
              title={'VIEW TICKET LIST'}
              customWidth={width - 55}
              buttonStyle={{alignSelf: 'center', borderRadius: 50}}
              textStyle={{fontSize: size.large}}
              onPress={() => {
                NavService.navigate('ticketListing', {
                  eventDetails: eventDetails?._id,
                });
              }}
            />
          </View>
        </View>
      </CustomContainer>
    </AppBackground>
  );
};

export default EventsDetail;

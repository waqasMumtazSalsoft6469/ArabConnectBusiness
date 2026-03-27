import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../utils/Colors';
import CustomIcon from './CustomIcon';
import {family, size, vh, vw} from '../utils';
import CustomText from './CustomText';
import Shadows from '../helpers/Shadows';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {appIcons, appImages} from '../assets';
import {
  formatDate,
  formatDateShort,
  getImageUrl,
} from '../utils/helperFunction';
import {WIDTH} from '../theme/units';
import CustomFastImage from './CustomFastImage';

const {width, height} = Dimensions.get('screen');

const CustomCard = ({
  dealCard = false,
  myBusinessCard = false,
  onPress,
  disabled = false,
  product = false,
  shopMyCart = false,
  orderCardList = false,
  item,
  index,
  onRemovePress,
  myCoupon = false,
  eventCard = false,
  campaignCard = false,
  rewardCard = false,
  eventCardCheckout = false,
  jobCard = false,
  recentTransactionCard = false,
  couponCard = false,
  heart = false,
  walletCard = false,
  restaurantProduct = false,
  shadowCard = false,
  onDeletePress,
  onEditPress,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleHeartPress = () => {
    setIsFavorite(!isFavorite);
  };

  const CATEGORY_STYLES = {
    Discount: {
      bg: '#C0FBE4',
      text: '#16714D',
    },
    'Free Item': {
      bg: '#FBE2C0',
      text: '#A65F00',
    },
    'Gift Card': {
      bg: '#C0FBE4',
      text: '#16714D',
    },
  };

  const defaultStyle = {
    bg: 'yellow',
    text: colors.headingText,
  };

  const categoryStyle = CATEGORY_STYLES[item?.category] || defaultStyle;

  // console.log('forOrdersItem', item);
  return (
    <TouchableOpacity
      style={[
        !product && styles.container,
        shopMyCart && {backgroundColor: 'transparent'},
        (shopMyCart || orderCardList) && {backgroundColor: 'transparent'},
      ]}
      onPress={onPress}
      activeOpacity={0.9}
      disabled={disabled}>
      {dealCard && (
        <View style={styles.bookingContainer}>
          <View style={styles.ratingContainer}>
            <CustomText
              text={item?.title}
              color={colors?.white}
              font={family.Gilroy_Medium}
              size={size.h6}
            />
          </View>
          <CustomIcon
            src={item?.image}
            customIconWrapper={styles.bookingImg}
            resizeMode={'cover'}
            customIconStyle={{borderRadius: 10}}
            disabled={true}
            activeOpacity={1}
          />
        </View>
      )}

      {myBusinessCard && (
        <View style={styles.modernBizWrap}>
          <View style={styles.modernBizBanner}>
            <FastImage
              source={
                item?.image ? getImageUrl(item?.image) : appImages.userImage
              }
              style={styles.modernBizImage}
              resizeMode={FastImage.resizeMode.cover}
            />
            <LinearGradient
              colors={['transparent', 'rgba(15,23,42,0.88)']}
              style={styles.modernBizGradient}
            />
            <View style={styles.modernBizTitleBox}>
              <CustomText
                text={item?.businessName}
                color={colors.white}
                font={family.Gilroy_SemiBold}
                size={size.h5}
                numberOfLines={2}
              />
            </View>
          </View>
          <View style={styles.modernBizBody}>
            <Image
              source={appIcons.locationIcon}
              style={styles.modernBizLocIcon}
            />
            <View style={{flex: 1}}>
              <CustomText
                text={item?.location?.address}
                color={colors.headingText}
                font={family.Questrial_Regular}
                size={size.medium}
                numberOfLines={3}
              />
            </View>
          </View>
        </View>
      )}
      {product && (
        <View
          style={[
            styles.productCard,
            index % 2 === 0 ? styles.leftItem : styles.rightItem,
          ]}>
          {heart && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleHeartPress}
              style={{
                position: 'absolute',
                padding: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: colors?.white,
                zIndex: 999,
                top: 10,
                left: 10,
              }}>
              {myCoupon ? (
                <Image
                  source={appIcons?.heart}
                  style={{
                    width: 18,
                    height: 18,
                    resizeMode: 'contain',
                    tintColor: colors?.iconColor,
                  }}
                />
              ) : (
                <Image
                  source={appIcons?.heart}
                  style={{
                    width: 18,
                    height: 18,
                    resizeMode: 'contain',
                    tintColor: !isFavorite
                      ? colors?.placeholderText
                      : colors?.iconColor,
                  }}
                />
              )}
            </TouchableOpacity>
          )}
          <View style={styles?.productImageBg}>
            <FastImage
              style={styles?.productImg}
              source={item?.image}
              resizeMode="cover"
            />
          </View>
          <View style={{padding: 10}}>
            <CustomText
              text={item?.name}
              color={colors.headingText}
              font={family.Gilroy_Medium}
              size={size?.medium}
              numberOfLines={1}
            />
          </View>
        </View>
      )}

      {eventCard && (
        <View style={styles.bookingContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onRemovePress}
            style={{
              padding: 10,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              backgroundColor: 'transparent',
              zIndex: 999,
              right: 5,
              top: 5,
            }}>
            <Image
              source={appIcons?.remove}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
          <View style={styles.dateContainer}>
            <CustomText
              text={formatDateShort(item?.date)}
              color={colors?.white}
              font={family?.Gilroy_Bold}
              size={size.h6}
              style={{textAlign: 'center'}}
            />
          </View>
          <CustomIcon
            src={getImageUrl(item?.image)}
            disabled={true}
            customIconWrapper={styles.eventImg}
            resizeMode={'cover'}
            customIconStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />

          <View style={styles?.eventItems}>
            <View>
              <CustomText
                text={item?.eventName}
                color={colors.headingText}
                font={family?.Gilroy_Medium}
                size={size.h6}
                numberOfLines={1}
              />
              <CustomText
                text={item?.location?.address}
                color={colors.secondary}
                font={family?.Gilroy_Medium}
                size={size.large}
                numberOfLines={2}
                style={{width: vw * 50}}
              />
            </View>
            <View style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
              <CustomText
                text={'$'}
                color={colors.headingText}
                font={family?.Gilroy_Bold}
                size={size.xlarge}
                numberOfLines={1}
              />
              <CustomText
                text={item?.ticketPrice}
                color={colors.headingText}
                font={family?.Gilroy_Bold}
                size={size.h2}
                numberOfLines={1}
              />
            </View>
          </View>
        </View>
      )}
      {campaignCard && (
        <View style={styles.bookingContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => onDeletePress(item?._id)}
            style={{
              padding: 10,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              backgroundColor: 'transparent',
              zIndex: 999,
              right: 5,
              top: 5,
            }}>
            <Image
              source={appIcons?.remove}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>

          <CustomIcon
            src={getImageUrl(item?.campaignThumbnail)}
            disabled={true}
            customIconWrapper={styles.eventImg}
            resizeMode={'cover'}
            customIconStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />

          <View style={styles?.eventItems}>
            <View style={{gap: 10}}>
              <CustomText
                text={item?.title}
                color={colors.headingText}
                font={family?.Gilroy_Medium}
                size={size.h6}
                numberOfLines={1}
              />
            </View>
          </View>
        </View>
      )}
      {rewardCard && (
        <View style={styles.bookingContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => onEditPress(item?._id)} // Pass to parent onEditPress
            style={{
              padding: 10,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              backgroundColor: 'white',
              zIndex: 999,
              right: 10, // Adjust position to left of delete
              top: 5,
            }}>
            <Image
              source={appIcons?.edit} // Assume you have edit icon in appIcons
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: 'black',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => onDeletePress(item?._id)}
            style={{
              padding: 10,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              backgroundColor: 'white',
              zIndex: 999,
              right: 10,
              top: vh * 7,
            }}>
            <Image
              source={appIcons?.remove}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: 'red',
              }}
            />
          </TouchableOpacity>

          <CustomIcon
            src={getImageUrl(item?.image)}
            disabled={true}
            customIconWrapper={styles.rewardImg}
            resizeMode={'cover'}
            customIconStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />

          <View style={[styles?.eventItems, {width: '100%'}]}>
            <View style={{gap: 10, width: '70%'}}>
              <CustomText
                text={item?.title}
                color={colors.headingText}
                font={family?.Gilroy_Medium}
                size={size.h6}
                numberOfLines={1}
              />
              <CustomText
                text={item?.description}
                color={'#62748E'}
                font={family?.Questrial_Regular}
                size={size.large}
              />
            </View>
            <View
              style={{
                alignSelf: 'flex-start',
                backgroundColor: categoryStyle.bg,
                padding: 5,
                borderRadius: 10,
              }}>
              <CustomText
                text={item?.category}
                color={categoryStyle.text}
                font={family?.Gilroy_Medium}
                size={size.xsmall}
                numberOfLines={1}
              />
            </View>
          </View>
        </View>
      )}
      {couponCard && (
        <View style={styles.bookingContainer}>
          <CustomIcon
            src={item?.image}
            disabled={true}
            customIconWrapper={[styles.eventImg, {height: height * 0.232}]}
            resizeMode={'cover'}
            customIconStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />

          {heart && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleHeartPress}
              style={{
                position: 'absolute',
                padding: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: colors?.white,
                zIndex: 999,
                top: 10,
                left: 10,
              }}>
              {myCoupon ? (
                <Image
                  source={appIcons?.heart}
                  style={{
                    width: 18,
                    height: 18,
                    resizeMode: 'contain',
                    tintColor: colors?.iconColor,
                  }}
                />
              ) : (
                <Image
                  source={appIcons?.heart}
                  style={{
                    width: 18,
                    height: 18,
                    resizeMode: 'contain',
                    tintColor: !isFavorite
                      ? colors?.placeholderText
                      : colors?.iconColor,
                  }}
                />
              )}
            </TouchableOpacity>
          )}
          <View style={styles?.couponItems}>
            <CustomText
              text={item?.type}
              color={colors.headingText}
              font={family?.Gilroy_Medium}
              size={size.h4}
              numberOfLines={1}
            />
            <CustomText
              text={item?.description}
              color={colors?.placeholderText}
              font={family?.Questrial_Regular}
              size={size.large}
              numberOfLines={2}
            />
          </View>
        </View>
      )}
      {walletCard && (
        <View style={styles.wallerContainer}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              paddingVertical: 30,
              gap: 10,
            }}>
            <CustomText
              text={'AVAILABLE BALANCE'}
              color={colors.headingText}
              font={family?.Gilroy_Medium}
              size={size.xxlarge}
              numberOfLines={1}
            />
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <CustomText
                text={'$'}
                color={colors.headingText}
                font={family?.Gilroy_Bold}
                size={size.h1}
                numberOfLines={1}
                style={{marginTop: 3}}
              />
              <CustomText
                text={'590.00'}
                color={colors.headingText}
                font={family?.Gilroy_Bold}
                size={size.xxhuge}
                numberOfLines={1}
              />
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles?.walletItems}>
            <CustomText
              text={'+ ADD MONEY'}
              color={colors.white}
              font={family?.Gilroy_Medium}
              size={size.h6}
              numberOfLines={1}
            />
          </TouchableOpacity>
        </View>
      )}
      {jobCard && (
        <View style={styles.jobContainer}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 15,
              gap: height * 0.01,
            }}>
            <View
              style={{
                width: width * 0.12,
                height: height * 0.055,
                borderRadius: 50,
                overflow: 'hidden',
              }}>
              {/* <FastImage
                source={getImageUrl(item?.image)}
                style={styles.image}
                resizeMode="cover"
                defaultSource={appImages?.placeholder}
              /> */}

              <CustomFastImage
                uri={getImageUrl(item?.image)}
                style={styles.image}
                resizeMode={'cover'}
              />
            </View>
            <View style={{gap: height * 0.001}}>
              <CustomText
                text={item?.business?.fullName}
                color={colors?.lightBlueText}
                font={family?.Questrial_Regular}
                size={size.medium}
                numberOfLines={3}
              />
              <CustomText
                text={item?.subCategory}
                color={colors.headingText}
                font={family?.Gilroy_SemiBold}
                size={size.xxxlarge}
                numberOfLines={1}
              />
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onRemovePress}
            style={{
              padding: 10,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              backgroundColor: 'transparent',
              zIndex: 999,
              right: 5,
              top: 5,
            }}>
            <Image
              source={appIcons?.remove}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          <View style={[styles?.hr, {width: '95%'}]} />
          <View style={styles?.jobItems}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles?.jobDetailContainer}>
                <CustomText
                  color={colors?.headingText}
                  // text={item?.jobLevel}
                  text={item?.jobType}
                  size={size?.medium}
                  style={{width: WIDTH * 0.13}}
                />
              </View>
              <View style={styles?.jobDetailContainer}>
                <CustomText
                  color={colors?.headingText}
                  // text={item?.location?.address}
                  text={item?.category}
                  size={size?.medium}
                  style={{width: WIDTH * 0.2}}
                  numberOfLines={1}
                />
              </View>
              <View style={styles?.jobDetailContainer}>
                <CustomText
                  color={colors?.headingText}
                  text={`$${item?.salary}/month`}
                  // text={item?.jobTime}
                  size={size?.medium}
                  style={{width: WIDTH * 0.2}}
                  numberOfLines={1}
                />
              </View>
            </View>
          </View>
          <View style={{paddingHorizontal: 5, marginBottom: height * 0.02}}>
            <CustomText
              color={colors?.headingText}
              text={item?.description}
              size={size?.medium}
              style={{marginTop: -1, lineHeight: height * 0.03}}
            />
          </View>
        </View>
      )}

      {recentTransactionCard && item && (
        <View style={styles.transactionContainer}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 15,
              gap: height * 0.01,
            }}>
            <View style={{gap: height * 0.001}}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      item.type === 'earned' ? '#DCFCE7' : '#EDC8CB',
                    // width: '35%',
                    paddingHorizontal: 8,
                    borderRadius: 5,
                  }}>
                  <CustomText
                    text={item.type}
                    color={
                      item.type === 'earned' ? colors?.green : colors?.red2
                    }
                    font={family?.Questrial_Regular}
                    size={size.small}
                    numberOfLines={1}
                  />
                </View>
                <CustomText
                  text={item.date}
                  color={colors.text}
                  font={family?.Gilroy_Medium}
                  size={size.small}
                  numberOfLines={1}
                />
              </View>
              <CustomText
                text={item.title}
                color={colors.headingText}
                font={family?.Gilroy_SemiBold}
                size={size.xxxlarge}
                numberOfLines={1}
              />
            </View>
          </View>
          {/* <TouchableOpacity
            activeOpacity={0.6}
            onPress={onRemovePress}
            style={{
              padding: 10,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              backgroundColor: 'transparent',
              zIndex: 999,
              right: 5,
              top: 5,
            }}>
            <Image
              source={appIcons?.remove}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity> */}

          <View style={{marginBottom: height * 0.02}}>
            <CustomText
              color={colors?.headingText}
              text={'Customer: '}
              size={size?.medium}
            />
            <CustomText
              color={colors?.headingText}
              text={item.customer}
              size={size?.medium}
            />
          </View>
        </View>
      )}
      {eventCardCheckout && (
        <View style={styles.bookingContainer}>
          <CustomIcon
            src={item?.image}
            disabled={true}
            customIconWrapper={styles.eventImg}
            resizeMode={'cover'}
            customIconStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />

          <View style={styles?.eventItems}>
            <View>
              <CustomText
                text={item?.title}
                color={colors.headingText}
                font={family?.Gilroy_Medium}
                size={size.h6}
                numberOfLines={1}
              />
              <CustomText
                text={item?.company}
                color={colors?.lightBlueText}
                font={family?.Questrial_Regular}
                size={size.large}
                numberOfLines={3}
              />
              <CustomText
                text={item?.participants}
                color={colors?.headingText}
                font={family?.Questrial_Regular}
                size={size.large}
                numberOfLines={3}
              />
            </View>
            <View style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
              <CustomText
                text={'$'}
                color={colors.headingText}
                font={family?.Gilroy_Bold}
                size={size.xlarge}
                numberOfLines={1}
              />
              <CustomText
                text={item?.rate}
                color={colors.headingText}
                font={family?.Gilroy_Bold}
                size={size.h2}
                numberOfLines={1}
              />
            </View>
          </View>
        </View>
      )}
      {restaurantProduct && (
        <View
          style={[
            styles.restarantCard,
            index % 2 === 0 ? styles.leftItem : styles.rightItem,
            shadowCard && {...Shadows?.shadow5},
          ]}>
          {heart && (
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={true}
              style={{
                position: 'absolute',
                padding: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: colors?.white,
                zIndex: 999,
                bottom: 70,
                right: 10,
                borderWidth: 1,
                borderColor: '#D9D9D9',
              }}>
              <Image
                source={appIcons?.add}
                style={{
                  width: 12,
                  height: 12,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onRemovePress}
            style={{
              padding: 5,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              backgroundColor: 'white',
              zIndex: 999,
              right: 5,
              top: 5,
              ...Shadows?.shadow5,
            }}>
            <Image
              source={appIcons?.remove}
              style={{
                width: 17,
                height: 17,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          <View style={styles?.productImageBg}>
            <FastImage
              style={[
                styles?.restaurantImg,
                shadowCard && {
                  borderRadius: 0,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                },
              ]}
              source={getImageUrl(item?.image)}
              resizeMode="cover"
              defaultSource={appImages?.placeholder}
            />
          </View>
          <View style={{padding: 10, gap: 3}}>
            <CustomText
              text={item?.productName}
              color={colors.headingText}
              font={family?.Gilroy_SemiBold}
              size={size?.large}
              numberOfLines={1}
            />

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {item?.price ? (
                <CustomText
                  text={`$ ${item?.price}`}
                  color={colors.secondary}
                  font={family.Gilroy_Bold}
                  size={size?.large}
                  numberOfLines={1}
                />
              ) : (
                <CustomText
                  text={`$ ${item?.variations[0]?.price}`}
                  color={colors.secondary}
                  font={family.Gilroy_Bold}
                  size={size?.large}
                  numberOfLines={1}
                />
              )}

              {item?.original !== undefined && (
                <CustomText
                  text={`$ ${item?.original}`}
                  color={colors.lightText}
                  font={family.Gilroy_Medium}
                  size={size?.large}
                  numberOfLines={1}
                  style={{textDecorationLine: 'line-through'}}
                />
              )}
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    position: 'relative',
  },
  hr: {
    borderTopWidth: 1,
    borderColor: colors?.lightGrayLine,
    marginTop: 15,
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
  },
  bookingContainer: {
    // gap: 8,
  },
  wallerContainer: {
    borderWidth: 1,
    borderColor: colors?.secondary,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  jobContainer: {
    borderRadius: 10,
    backgroundColor: colors?.white,
    ...Shadows.shadow5,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  transactionContainer: {
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
    marginBottom: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  jobItems: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  jobDetailContainer: {
    paddingHorizontal: 13,
    backgroundColor: colors.lightGrayLine,
    borderRadius: 50,
    ...Shadows?.shadow1,
    marginRight: width * 0.015,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.04,
    // width: width*0.2
  },
  eventItems: {
    flexDirection: 'row',
    ...Shadows?.shadow5,
    backgroundColor: colors?.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  couponItems: {
    ...Shadows?.shadow5,
    backgroundColor: colors?.white,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    gap: 5,
  },
  walletItems: {
    ...Shadows?.shadow5,
    backgroundColor: colors?.secondary,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 10,
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContainer: {
    backgroundColor: colors.iconColor,
    borderRadius: 50,
    width: 45,
    paddingVertical: 7,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    gap: -2,
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    zIndex: 999,
    paddingVertical: 5,
  },
  bookingImg: {
    height: height * 0.155,
    width: width - 58,
    // ...Shadows?.shadow0
  },
  eventImg: {
    height: height * 0.215,
    width: '100%',
  },
  rewardImg: {
    height: height * 0.2,
    width: '100%',
  },
  productCard: {
    marginHorizontal: 5,
    backgroundColor: colors?.white,
    width: width / 2.35,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows?.shadow5,
  },
  productImageBg: {
    width: '100%',
    height: width / 2,
    borderRadius: 10,
  },
  productImg: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  rightItem: {
    marginTop: 6,
    marginBottom: -6,
  },
  leftItem: {
    marginBottom: 6,
    marginTop: -6,
  },
  restarantCard: {
    backgroundColor: colors?.white,
    width: width / 2.46,
    borderRadius: 10,
    justifyContent: 'center',
  },
  restaurantImg: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  modernBizWrap: {
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: colors.white,
    marginBottom: 20,
    marginHorizontal: 4,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modernBizBanner: {
    height: height * 0.22,
    width: '100%',
    position: 'relative',
  },
  modernBizImage: {
    width: '100%',
    height: '100%',
  },
  modernBizGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  modernBizTitleBox: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
  },
  modernBizBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 18,
    gap: 12,
  },
  modernBizLocIcon: {
    width: 20,
    height: 20,
    tintColor: colors.primary,
    resizeMode: 'contain',
    marginTop: 2,
  },
});

import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';

import CustomText from '../CustomText';
import {colors} from '../../utils/Colors';
import {family, size, WP} from '../../utils';
import {WIDTH} from '../../theme/units';
import {getCurrentLocationName} from '../../utils/helperFunction';

const {width, height} = Dimensions.get('screen');

const GooglePlaceAutocomplete = ({
  callback,
  setFieldValue,
  fieldName,
  wrapperStyles,
  placeholder,
  label,
  rightIcon,
  leftIcon,
  image,
  textInputTitle,
  staric,
  currentLocNameCallback,
  rightIconStyles,
  initialAddress,
}) => {
  const googleRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  // 👇 ADD THIS useEffect
  React.useEffect(() => {
    if (initialAddress && googleRef.current) {
      googleRef.current.setAddressText(initialAddress);
    }
  }, [initialAddress]);
  // console.log('google:isLoading', isLoading);

  // const getCurrentLocation = async () => {
  //   setIsLoading(true);
  //   try {
  //     Geolocation.getCurrentPosition(
  //       async position => {
  //         const {latitude, longitude} = position.coords;
  //         try {
  //           const locationName = await getCurrentLocationName(
  //             latitude,
  //             longitude,
  //           );
  //           googleRef.current?.setAddressText(locationName);
  //           currentLocNameCallback(locationName);
  //         } catch (e) {
  //           console.log('Error: occurred while getting location name', e);
  //         } finally {
  //           setIsLoading(false);
  //         }
  //       },
  //       error => {
  //         console.log('Error, getting current location', error);
  //         setIsLoading(false);
  //       },
  //       {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
  //     );
  //   } catch (e) {
  //     console.log('Error: occurred while getting location', e);
  //     setIsLoading(false);
  //   }
  // };

  const renderLeftButton = () => {
    if (leftIcon) {
      return (
        <View
          activeOpacity={0.8}
          style={{
            justifyContent: 'center',
          }}>
          <Image
            source={leftIcon}
            style={{
              width: 18,
              height: 18,
              tintColor: colors?.placeholder,
              resizeMode: 'contain',
            }}
          />
        </View>
      );
    }
    return null;
  };
  const renderListEmptyComponent = () => {
    return (
      <View
        style={{
          paddingVertical: 12,
          paddingLeft: 10,
        }}>
        <CustomText
          text="No location found!"
          color={colors?.black}
          size={size?.large}
        />
      </View>
    );
  };

  const renderListLoaderComponent = () => {
    return (
      <View style={styles?.loader}>
        <ActivityIndicator
          animating={true}
          color={colors?.placeholder}
          size={'small'}
        />
      </View>
    );
  };

  return (
    <>
      {textInputTitle && (
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            marginBottom: 5,
            alignItems: 'center',
          }}>
          <CustomText
            text={textInputTitle}
            font={family?.Gilroy_Medium}
            size={size?.large}
          />
          {staric && (
            <CustomText text="*" color={colors?.red} size={size?.h6} />
          )}
        </View>
      )}
      <View style={[styles.geoLocationView, wrapperStyles]}>
        <GooglePlacesAutocomplete
          keyboardShouldPersistTaps="always"
          ref={googleRef}
          enableHighAccuracyLocation
          fetchDetails
          disableScroll
          backgroundColor
          rightIcon
          enablePoweredByContainer={false}
          listViewDisplayed={false}
          placeholder={placeholder ? placeholder : 'Add Location'}
          // onPress={(data, details = null) => {
          //   console.log('data', details, data);
          //   const {formatted_address, geometry} = details;
          //   callback(formatted_address, geometry, label);
          // }}
          onPress={(data, details = null) => {
            const {formatted_address, geometry} = details;
            const coords = geometry?.location;

            // Update Formik field
            if (setFieldValue && fieldName) {
              setFieldValue(fieldName, {
                coordinates: [coords.lng, coords.lat],
                type: 'Point',
                address: formatted_address,
              });
            }

            // For your own callback use (if needed)
            callback?.(formatted_address, geometry, label);
          }}
          debounce={700}
          renderLeftButton={renderLeftButton}
          listEmptyComponent={renderListEmptyComponent}
          listLoaderComponent={renderListLoaderComponent}
          styles={{
            row: {backgroundColor: colors?.placeholderColor},
            textInput: {
              color: colors.text,
              fontSize: size.small,
              backgroundColor: colors.placeholderColor,

              borderRadius: 50,
            },
            description: {color: colors.black},
          }}
          textInputProps={{
            placeholderTextColor: colors.placeholderText,
            fontSize: size.medium,
            fontFamily: family?.Questrial_Regular,
          }}
          query={{
            // key: 'AIzaSyBmaS0B0qwokES4a_CiFNVkVJGkimXkNsk',
            key: 'AIzaSyDm55sl0sToKVbxMRE_OFyhp0JFd4ajyx4',
            language: 'en',
          }}
        />
        {image && (
          <Image
            source={image}
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
              marginHorizontal: 10,
            }}
          />
        )}
      </View>
    </>
  );
};

export default GooglePlaceAutocomplete;

const styles = StyleSheet.create({
  geoLocationView: {
    // width: WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  textInput: {
    flex: 1,

    width: width,
    fontFamily: family.Urbanist_Black,
  },

  locationIcon: {
    position: 'absolute',
    width: 18,
    height: 18,
    right: 10,
    top: 18,
  },
  loader: {
    height: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

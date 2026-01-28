import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput, {
  CustomTextAreaInput,
} from '../../../components/CustomTextInput';
import {colors} from '../../../utils/Colors';
import {family, size, vh, vw} from '../../../utils';
import styles from '../EditProfile/styles';
import CustomButton from '../../../components/CustomButton';
import {appIcons, appImages} from '../../../assets';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import CustomText from '../../../components/CustomText';
import SelectableTextInput from '../../../components/SelectableTextInput';
import Shadows from '../../../helpers/Shadows';
import ImagePicker2 from '../../../components/ImagePicker2';
import {extractFileName, getImageUrl, LOG} from '../../../utils/helperFunction';
import FastImage from 'react-native-fast-image';
import CustomDatePicker from '../../../components/CustomDatePicker';
import GooglePlaceAutocomplete from '../../../components/GooglePlace';
import {useEditMutation} from '../../../Api/couponApiSlice';
import {executeApiRequest} from '../../../Api/methods/method';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';

const {width, height} = Dimensions.get('screen');

// Updated Yup validation schema
const SignupSchema = Yup.object().shape({
  couponName: Yup.string().required('Coupon Title is required'),
  redemptionLimit: Yup.number()
    .required('Coupon Redemption Count is required')
    .typeError('Coupon Redemption Count must be a number'),
  endDate: Yup.date().required('Coupon Expiry Date is required'),
  startDate: Yup.date().required('Coupon Activation Date is required'),
  price: Yup.string().required('Coupon Price is required'),
  description: Yup.string().required('Coupon Description is required'),
  discountedPrice: Yup.string().required('Discounted Coupon Price is required'),
  location: Yup.object().shape({
    address: Yup.string().required('Location is required'),
  }),
  image: Yup.object()
    .nullable()
    .test('is-valid-image', 'Image is required', value => value !== ''), // Ensures non-empty value
});

const EditCoupon = ({route}) => {
  const {item} = route.params;
  LOG('Item: ', item);
  const [focusedField, setFocusedField] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [edit, {isLoading}] = useEditMutation();
  // Form submit handler
  const handleEdit = async values => {
    let payload = {
      ...values,
    };
    LOG('PAYLOAD: ', payload);
    const response = await executeApiRequest({
      apiCallFunction: edit,
      body: payload,
      params: {id: item?._id},
      formData: true,
      toast: true,
      timeout: 30000,
    });
    LOG('Coupon Update Success:', response);
    NavService.reset(0, [{name: 'MyCoupons'}]);
  };
  const initialLocation = {
    coordinates: item?.location?.coordinates || [],
    type: item?.location?.type || 'Point',
    address: item?.location?.address || '',
  };
  return (
    <AppBackground
      back={true}
      title={'EDIT COUPON'}
      notification
      marginHorizontal={true}>
      <Formik
        initialValues={{
          couponName: item?.couponName || '',
          redemptionLimit: item?.redemptionLimit.toString() || '',
          endDate: item?.endDate || '',
          description: item?.description || '',
          image: null,
          startDate: item?.startDate || '',
          price: item?.price.toString() || '',
          location: initialLocation,
          discountedPrice: item?.discountedPrice.toString() || '',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleEdit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={{paddingHorizontal: 15, marginTop: height * 0.03}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              {/* Upload Company Image */}
              <ImagePicker2
                onImageChange={(images, type) => {
                  console.log('imagesimages', images);
                  setSelectedImage(images);
                  let img = extractFileName(images);
                  let imageObject = {
                    uri: images,
                    type,
                    name: img,
                  };
                  console.log('imageObjectimageObject', imageObject);
                  // handleImageChange(imageObject, setFieldValue);
                  setFieldValue('image', imageObject);
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.inputTouchable, {height: vh * 22}]}
                  disabled={true}>
                  {selectedImage ? (
                    <Image
                      source={{uri: selectedImage}}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        resizeMode: 'cover',
                      }}
                    />
                  ) : (
                    <View
                      style={{flex: 1, width: '100%', position: 'relative'}}>
                      <FastImage
                        resizeMode="cover"
                        source={getImageUrl(item?.image)}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 10,
                        }}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          alignSelf: 'center',
                          top: '20%',
                        }}>
                        <View
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.6)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 20,
                            borderRadius: 10,
                            gap: height * 0.01,
                          }}>
                          <CustomText
                            text={'Change Coupon image'}
                            font={family?.Gilroy_SemiBold}
                            size={size?.medium}
                            color={colors?.headingText}
                            numberOfLines={1}
                          />
                          <CustomButton
                            gradientColorArr={[
                              'rgba(255, 255, 255, 0.6)',
                              'rgba(255, 255, 255, 0.6)',
                            ]}
                            title={'CHANGE'}
                            customWidth={width - 280}
                            buttonStyle={{
                              alignSelf: 'center',
                              borderWidth: 1,
                              borderColor: colors?.secondary,
                              height: height * 0.045,
                            }}
                            disabled={true}
                            textStyle={{
                              fontSize: size?.xxsmall,
                              color: colors?.secondary,
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </ImagePicker2>

              {/* <View
                style={{
                  marginTop: height * 0.02,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '95%',
                  alignSelf: 'center',
                  paddingLeft: 15,
                }}>
                <CustomText
                  text={'OFFER FOR'}
                  font={family?.Gilroy_SemiBold}
                  size={size?.h6}
                  color={colors?.headingText}
                  numberOfLines={1}
                />
                <SelectableTextInput
                  customStyling={{
                    backgroundColor: 'white',
                    ...Shadows?.shadow0,
                    alignItems: 'center',
                    paddingHorizontal: width * 0.015,
                    paddingVertical: 0,
                    width: '23%',
                    borderRadius: 0,
                    alignItems: 'flex-start',
                    height: height * 0.025,
                    justifyContent: 'space-around',
                    gap: -5,
                    left: height * 0.05,
                  }}
                  title="CHOOSE AUDIENCE FOR THE COUPON"
                  couponAudience={true}
                  rightIcon
                  data={jobTypeOptions}
                  placeholder="Select"
                  formik={{setFieldValue}}
                  OnYesPress={value => {
                    setFieldValue('selectOffer', value);
                    console.log('Selected Job Type:', value);
                  }}
                  field={{
                    name: 'selectOffer',
                    value: values.selectOffer,
                    onChange: handleChange('selectOffer'),
                    onBlur: handleBlur('selectOffer'),
                  }}
                />
              </View>
              <View
                style={{
                  width: '50%',
                  alignSelf: 'flex-end',
                  left: height * 0.04,
                }}>
                {errors.selectOffer && touched.selectOffer && (
                  <Text style={styles.error}>{errors.selectOffer}</Text>
                )}
              </View> */}

              <View style={[styles?.hr, {width: '100%'}]} />
              {/* Coupon Title */}
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Coupon Title'}
                  onFocus={() => setFocusedField('couponName')}
                  onBlur={() => {
                    handleBlur('couponName');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('couponName')}
                  placeholder="Enter Coupon Title"
                  placeholderTextColor={colors.placeholderText}
                  autoCapitalize="none"
                  value={values.couponName}
                  leftIcon={appIcons.jobLocationIcon}
                  containerStyle={[
                    styles.input,
                    focusedField === 'couponName' && styles.focusedInput,
                  ]}
                />
                {errors.couponName && touched.couponName && (
                  <Text style={styles.error}>{errors.couponName}</Text>
                )}
              </View>
              {/* Coupon Redemption Count */}
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Coupon Redemption Count'}
                  onFocus={() => setFocusedField('redemptionLimit')}
                  onBlur={() => {
                    handleBlur('redemptionLimit');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('redemptionLimit')}
                  placeholder="Enter Coupon Redemption Count"
                  placeholderTextColor={colors.placeholderText}
                  autoCapitalize="none"
                  value={values.redemptionLimit}
                  keyboardType="numeric"
                  leftIcon={appIcons.jobSalaryIcon}
                  containerStyle={[
                    styles.input,
                    focusedField === 'redemptionLimit' && styles.focusedInput,
                  ]}
                />
                {errors.redemptionLimit && touched.redemptionLimit && (
                  <Text style={styles.error}>{errors.redemptionLimit}</Text>
                )}
              </View>
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Coupon Price'}
                  onFocus={() => setFocusedField('price')}
                  onBlur={() => {
                    handleBlur('price');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('price')}
                  placeholder="Enter Coupon Price"
                  placeholderTextColor={colors.placeholderText}
                  autoCapitalize="none"
                  value={values.price}
                  keyboardType="numeric"
                  leftIcon={appIcons.jobSalaryIcon}
                  containerStyle={[
                    styles.input,
                    focusedField === 'price' && styles.focusedInput,
                  ]}
                />
                {errors.price && touched.price && (
                  <Text style={styles.error}>{errors.price}</Text>
                )}
              </View>
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Discounted Coupon Price'}
                  onFocus={() => setFocusedField('discountedPrice')}
                  onBlur={() => {
                    handleBlur('discountedPrice');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('discountedPrice')}
                  placeholder="Enter Discounted Coupon Price"
                  placeholderTextColor={colors.placeholderText}
                  autoCapitalize="none"
                  value={values.discountedPrice}
                  keyboardType="numeric"
                  leftIcon={appIcons.jobSalaryIcon}
                  containerStyle={[
                    styles.input,
                    focusedField === 'discountedPrice' && styles.focusedInput,
                  ]}
                />
                {errors.discountedPrice && touched.discountedPrice && (
                  <Text style={styles.error}>{errors.discountedPrice}</Text>
                )}
              </View>
              <View style={styles.field}>
                <CustomDatePicker
                  title={'Coupon Activation Date'}
                  leftIcon={appIcons.calendar2}
                  staric={true}
                  labelStyle={{marginLeft: 20}}
                  date={values.startDate ? new Date(values.startDate) : null}
                  onDateChange={date =>
                    setFieldValue('startDate', date.toISOString())
                  }
                />
                {errors.startDate && touched.startDate && (
                  <Text style={styles.error}>{errors.startDate}</Text>
                )}
              </View>
              <View style={styles.field}>
                <GooglePlaceAutocomplete
                  staric={true}
                  textInputTitle={'Location'}
                  leftIcon={appIcons?.jobLocationIcon}
                  placeholder={'Enter Location'}
                  label={'Location'}
                  wrapperStyles={[
                    styles.input2,
                    focusedField === 'location' && styles.focusedInput,
                  ]}
                  fieldName="location"
                  setFieldValue={setFieldValue}
                  initialAddress={values.location?.address}
                />
                {errors.location?.address && touched.location?.address && (
                  <Text style={styles.error}>{errors.location.address}</Text>
                )}
              </View>
              <View style={styles.field}>
                <CustomDatePicker
                  title={'Coupon Expiry Date'}
                  leftIcon={appIcons.calendar2}
                  staric={true}
                  labelStyle={{marginLeft: 20}}
                  date={values.endDate ? new Date(values.endDate) : null}
                  onDateChange={date =>
                    setFieldValue('endDate', date.toISOString())
                  }
                />
                {errors.endDate && touched.endDate && (
                  <Text style={styles.error}>{errors.endDate}</Text>
                )}
              </View>

              {/* Coupon Description */}
              <View style={styles.field}>
                <CustomTextAreaInput
                  textInputTitle={true}
                  multiline
                  label
                  staric={true}
                  labelTitle={'Coupon Description'}
                  onFocus={() => setFocusedField('description')}
                  onBlur={() => {
                    handleBlur('description');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('description')}
                  placeholder="Enter Coupon Description Here!"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.description}
                  leftIcon={appIcons?.jobDescriptionIcon}
                  containerStyle={[
                    styles.input,
                    focusedField === 'description' && styles.focusedInput,
                    {borderRadius: 15},
                  ]}
                />
                {errors.description && touched.description && (
                  <Text style={styles.error}>{errors.description}</Text>
                )}
              </View>

              {/* Add Coupon Button */}
              <View
                style={{marginTop: height * 0.04, marginBottom: height * 0.15}}>
                {isLoading ? (
                  <ActivityLoader color={colors2.theme.secondary} />
                ) : (
                  <CustomButton
                    gradientColorArr={[colors.secondary, colors.secondary]}
                    title={'UPDATE COUPON'}
                    customWidth={width - 55}
                    buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                    textStyle={{fontSize: size.large}}
                    onPress={handleSubmit}
                  />
                )}
              </View>
            </ScrollView>
          </View>
        )}
      </Formik>
    </AppBackground>
  );
};

export default EditCoupon;

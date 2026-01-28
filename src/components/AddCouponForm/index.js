import React, {useState} from 'react';
import {View, TouchableOpacity, Image, ScrollView, Text} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ImagePicker2 from '../ImagePicker2';
import {family, size, vh} from '../../utils';
import CustomText from '../CustomText';
import {HEIGHT, WIDTH} from '../../theme/units';
import CustomTextInput, {CustomTextAreaInput} from '../CustomTextInput';
import {colors} from '../../utils/Colors';
import GooglePlaceAutocomplete from '../GooglePlace';
import CustomDatePicker from '../CustomDatePicker';
import CustomButton from '../CustomButton';
import styles from '../../screens/Main/EditProfile/styles';
import {appIcons} from '../../assets';
import {extractFileName} from '../../utils/helperFunction';

// ✅ Dynamic Yup validation schema generator
const getCouponSchema = (showActivationDate, showEndDate) => {
  const schema = {
    couponName: Yup.string().required('Coupon title is required'),
    redemptionLimit: Yup.string().required('Redemption count is required'),
    price: Yup.string().required('Coupon price is required'),
    discountedPrice: Yup.string().required('Discounted price is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.mixed().required('Coupon image is required'),
    location: Yup.object().shape({
      address: Yup.string().required('Location is required'),
    }),
  };

  if (showActivationDate) {
    schema.startDate = Yup.date().required('Start date is required');
  }
  if (showEndDate) {
    schema.endDate = Yup.date().required('End date is required');
  }

  return Yup.object().shape(schema);
};

const CouponForm = ({
  onSubmit,
  onCancel,
  initialValues,
  showActivationDate = false,
  showEndDate = false,
}) => {
  const [focusedField, setFocusedField] = useState('');
  const [selectedImage, setSelectedImage] = useState(
    initialValues?.image?.uri || '',
  );

  return (
    <Formik
      initialValues={
        initialValues || {
          couponName: '',
          redemptionLimit: '',
          endDate: '',
          description: '',
          image: '',
          startDate: '',
          price: '',
          discountedPrice: '',
          location: {
            coordinates: [],
            type: 'Point',
            address: '',
          },
        }
      }
      enableReinitialize={true}
      validationSchema={getCouponSchema(showActivationDate, showEndDate)}
      onSubmit={values => {
        onSubmit?.(values);
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <View
          style={{paddingHorizontal: 15, marginTop: HEIGHT * 0.02, flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            {/* Upload Coupon Image */}
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
                style={[
                  styles.inputTouchable,
                  {height: selectedImage ? vh * 22 : vh * 17},
                ]}
                disabled={true}>
                {selectedImage ? (
                  <Image
                    source={{uri: selectedImage}}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 10,
                      resizeMode: 'contain',
                    }}
                  />
                ) : (
                  <View style={{alignItems: 'center'}}>
                    <Image
                      source={appIcons?.upload}
                      style={{
                        width: 35,
                        height: 35,
                        resizeMode: 'contain',
                      }}
                    />
                    <CustomText
                      text={'Upload Coupon Image'}
                      font={family?.Gilroy_SemiBold}
                      size={size?.xxlarge}
                      underline={true}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </ImagePicker2>
            {errors.image && touched.image && (
              <Text style={[styles.error, {marginTop: -HEIGHT * 0.005}]}>
                {errors.image}
              </Text>
            )}

            {/* Coupon Title */}
            <View style={styles.field}>
              <CustomTextInput
                textInputTitle
                staric
                labelTitle={'Coupon Title'}
                onFocus={() => setFocusedField('couponName')}
                onBlur={() => {
                  handleBlur('couponName');
                  setFocusedField('');
                }}
                onChangeText={handleChange('couponName')}
                placeholder="Enter Coupon Title"
                placeholderTextColor={colors.placeholderText}
                value={values.couponName}
                containerStyle={[
                  styles.input,
                  focusedField === 'couponName' && styles.focusedInput,
                ]}
              />
              {errors.couponName && touched.couponName && (
                <Text style={styles.error}>{errors.couponName}</Text>
              )}
            </View>

            {/* Redemption Count */}
            <View style={styles.field}>
              <CustomTextInput
                textInputTitle
                staric
                labelTitle={'Coupon Redemption Count'}
                onFocus={() => setFocusedField('redemptionLimit')}
                onBlur={() => {
                  handleBlur('redemptionLimit');
                  setFocusedField('');
                }}
                onChangeText={handleChange('redemptionLimit')}
                placeholder="Enter Redemption Count"
                placeholderTextColor={colors.placeholderText}
                value={values.redemptionLimit}
                keyboardType="numeric"
                containerStyle={[
                  styles.input,
                  focusedField === 'redemptionLimit' && styles.focusedInput,
                ]}
              />
              {errors.redemptionLimit && touched.redemptionLimit && (
                <Text style={styles.error}>{errors.redemptionLimit}</Text>
              )}
            </View>

            {/* Price */}
            <View style={styles.field}>
              <CustomTextInput
                textInputTitle
                staric
                labelTitle={'Coupon Price'}
                onFocus={() => setFocusedField('price')}
                onBlur={() => {
                  handleBlur('price');
                  setFocusedField('');
                }}
                onChangeText={handleChange('price')}
                placeholder="Enter Price"
                placeholderTextColor={colors.placeholderText}
                value={values.price}
                keyboardType="numeric"
                containerStyle={[
                  styles.input,
                  focusedField === 'price' && styles.focusedInput,
                ]}
              />
              {errors.price && touched.price && (
                <Text style={styles.error}>{errors.price}</Text>
              )}
            </View>

            {/* Discounted Price */}
            <View style={styles.field}>
              <CustomTextInput
                textInputTitle
                staric
                labelTitle={'Discounted Price'}
                onFocus={() => setFocusedField('discountedPrice')}
                onBlur={() => {
                  handleBlur('discountedPrice');
                  setFocusedField('');
                }}
                onChangeText={handleChange('discountedPrice')}
                placeholder="Enter Discounted Price"
                placeholderTextColor={colors.placeholderText}
                value={values.discountedPrice}
                keyboardType="numeric"
                containerStyle={[
                  styles.input,
                  focusedField === 'discountedPrice' && styles.focusedInput,
                ]}
              />
              {errors.discountedPrice && touched.discountedPrice && (
                <Text style={styles.error}>{errors.discountedPrice}</Text>
              )}
            </View>

            {/* Location */}
            <View style={styles.field}>
              <GooglePlaceAutocomplete
                staric
                textInputTitle={'Coupon Location'}
                placeholder={'Enter Location'}
                label={'Location'}
                wrapperStyles={[
                  styles.input2,
                  focusedField === 'location' && styles.focusedInput,
                ]}
                fieldName="location"
                setFieldValue={setFieldValue}
              />
              {errors.location?.address && touched.location?.address && (
                <Text style={styles.error}>{errors.location.address}</Text>
              )}
            </View>

            {/* ✅ Conditional Dates */}
            {showActivationDate && (
              <View style={styles.field}>
                <CustomDatePicker
                  title={'Activation Date'}
                  staric
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
            )}

            {showEndDate && (
              <View style={styles.field}>
                <CustomDatePicker
                  title={'Expiry Date'}
                  staric
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
            )}

            {/* Description */}
            <View style={styles.field}>
              <CustomTextAreaInput
                textInputTitle
                multiline
                label
                staric
                labelTitle={'Coupon Description'}
                onFocus={() => setFocusedField('description')}
                onBlur={() => {
                  handleBlur('description');
                  setFocusedField('');
                }}
                onChangeText={handleChange('description')}
                placeholder="Enter Description"
                placeholderTextColor={colors.placeholderText}
                value={values.description}
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

            {/* Buttons */}
            <View
              style={{
                marginTop: HEIGHT * 0.04,
                marginBottom: HEIGHT * 0.1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <CustomButton
                gradientColorArr={[colors.secondary, colors.secondary]}
                title={'Save Coupon'}
                customWidth={WIDTH * 0.45}
                buttonStyle={{borderRadius: 50}}
                textStyle={{fontSize: size.medium}}
                onPress={handleSubmit}
              />
              <CustomButton
                gradientColorArr={['#999', '#888']}
                title={'Cancel'}
                customWidth={WIDTH * 0.35}
                buttonStyle={{borderRadius: 50}}
                textStyle={{fontSize: size.medium}}
                onPress={onCancel}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};

export default CouponForm;

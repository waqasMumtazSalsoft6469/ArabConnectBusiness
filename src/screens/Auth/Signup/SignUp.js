import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomBackground from '../../../components/CustomBackground';
import CustomText from '../../../components/CustomText';
import CustomTextInput, {
  CustomPhoneInput,
} from '../../../components/CustomTextInput';
import { colors } from '../../../utils/Colors';
import { family, size, vh } from '../../../utils';
import styles from '../Login/styles';
import CustomButton from '../../../components/CustomButton';
import { appIcons } from '../../../assets';
import NavService from '../../../helpers/NavService';
import CustomCheckbox from '../../../components/CustomCheckbox';
import { SelectList } from 'react-native-dropdown-select-list';
import { extractFileName, LOG } from '../../../utils/helperFunction';
import { useRegisterMutation } from '../../../Api/authApiSlice';
import ImagePicker2 from '../../../components/ImagePicker2';
import FastImage from 'react-native-fast-image';
import { executeApiRequest } from '../../../Api/methods/method';
import ActivityLoader from '../../../components/ActivityLoader';
import { colors2 } from '../../../theme/colors2';

const { width, height } = Dimensions.get('screen');
const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .matches(
      passwordRules,
      'Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long',
    ),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),

  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  image: Yup.object()
    .nullable()
    .required('Image is required')
    .test('is-valid-image', 'Image is required', value => value !== ''), // Ensures non-empty value
  isChecked: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions',
  ),
  gender: Yup.string().optional('Gender is required'),
  // phoneNumber: Yup.string()
  //   .matches(/^[0-9]+$/, 'Phone number must contain only digits')
  //   .min(10, 'Phone number must be at least 10 digits')
  //   .max(15, 'Phone number must be at most 15 digits')
  //   .required('Phone number is required')
  //   .test('isValid', 'Phone number is not valid', function (value) {
  //     return value ? true : false;
  //   }),
});
const data = [
  { key: '1', value: 'MALE' },
  { key: '2', value: 'FEMALE' },
  // {key: '3', value: 'Rather Not Say'},
];

const SignUp = () => {
  const [focusedField, setFocusedField] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [register, { isLoading }] = useRegisterMutation();

  // const handleSignup = async values => {
  //   LOG('values: ', values);
  //   const payload = {...values};
  //   console.log('PAYLOAD: ', payload);
  //   // NavService?.navigate('business');

  //   const response = await executeApiRequest({
  //     apiCallFunction: register,
  //     body: payload,
  //     formData: true,
  //     toast: true,
  //     timeout: 30000,
  //   });
  //   console.log('RESPONSE: ', response);
  //   if (response?.data?.token) {
  //     NavService?.navigate('SubscriptionPlan', {token: response?.data?.token});
  //   } else {
  //     Alert.alert('Error, Please Try Again');
  //   }
  //   // NavService.reset(0, [{name: 'login'}]);
  // };

  const handleSignup = async values => {
    LOG('values: ', values);
    const payload = { ...values };
    console.log('PAYLOAD: ', payload);
    // NavService?.navigate('business');

    const response = await executeApiRequest({
      apiCallFunction: register,
      body: payload,
      formData: true,
      toast: true,
      timeout: 30000,
    });
    console.log('RESPONSE: ', response);
    NavService.reset(0, [{ name: 'login' }]);
  };

  const handlePhoneInputChange = (formatted, raw) => {
    console.log('formatted', formatted, raw);

    setPhoneNumber(raw);
  };
  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        // phoneNumber: '',
        password: '',
        confirm_password: '',
        isChecked: false,
        gender: '',
        image: '',
      }}
      //VALIDATION BELOW
      validationSchema={SignupSchema}
      onSubmit={handleSignup}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <CustomBackground
          back2={true}
          titleText={'CREATE AN ACCOUNT'}
          descriptionText={'Fill out this form to sign up'}>
          <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Full Name'}
                  onFocus={() => setFocusedField('fullName')}
                  onBlur={() => {
                    handleBlur('fullName');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('fullName')}
                  placeholder="Enter Full Name"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.fullName}
                  leftIcon={appIcons?.gender}
                  containerStyle={[
                    styles.input,
                    focusedField === 'fullName' && styles.focusedInput,
                  ]}
                />
                {errors.fullName && touched.fullName && (
                  <Text style={styles.error}>{errors.fullName}</Text>
                )}
              </View>
              <View style={styles?.field}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 20,
                    marginBottom: 5,
                    alignItems: 'center',
                  }}>
                  <CustomText
                    text={'Upload Image'}
                    font={family?.Gilroy_Medium}
                    size={size?.large}
                  />

                  <CustomText text="*" color={colors?.red} size={size?.h6} />
                </View>
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
                      { height: selectedImage ? vh * 20 : vh * 20 },
                    ]}
                    disabled={true}>
                    {selectedImage ? (
                      <FastImage
                        source={{ uri: selectedImage }}
                        resizeMode="contain"
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 10,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          alignItems: 'center',
                          paddingHorizontal: 50,
                          gap: vh * 1,
                        }}>
                        <CustomText
                          text={
                            'Browse and choose the file you want to upload from your photos'
                          }
                          color={'#B9B9B9'}
                          font={family?.Gilroy_SemiBold}
                          size={size?.medium}
                          underline={true}
                          style={{ textAlign: 'center' }}
                        />
                        <CustomButton
                          gradientColorArr={[
                            colors.secondary,
                            colors.secondary,
                          ]}
                          title={'+ Add File'}
                          disabled={true}
                          customHeight={30}
                          customWidth={width / 4.5}
                          buttonStyle={{ borderRadius: 8, alignItems: 'center' }}
                          textStyle={{ fontSize: size.medium }}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                </ImagePicker2>
                {errors.image && touched.image && (
                  <Text style={[styles.error]}>{errors.image}</Text>
                )}
              </View>
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Email Address'}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => {
                    handleBlur('email');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('email')}
                  placeholder="Enter Email Address"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={values.email}
                  leftIcon={appIcons?.email}
                  containerStyle={[
                    styles.input,
                    focusedField === 'email' && styles.focusedInput,
                  ]}
                />
                {errors.email && touched.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
              </View>
              {/* <View style={styles.field}>
                <CustomPhoneInput
                  labelTitle={'Phone Number'}
                  value={values.phoneNumber}
                  setValue={value => {
                    setFieldValue('phoneNumber', value);
                  }}
                  valid={valid}
                  staric={true}
                  showMessage={showMessage}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <Text style={styles.error}>{errors.phoneNumber}</Text>
                )}
              </View> */}

              {/* GENDER */}
              <View style={styles.field}>
                <View style={{ paddingHorizontal: 20, flexDirection: 'row' }}>
                  <CustomText
                    text={'Gender'}
                    font={family?.Questrial_Regular}
                    size={size?.large}
                  />

                </View>
                <SelectList
                  leftIcon={appIcons?.gender}
                  setSelected={value => setFieldValue('gender', value)}
                  search={false}
                  placeholder="Select"
                  data={data}
                  save="value"
                  dropdownTextStyles={{ color: colors?.text }}
                  dropdownStyles={{
                    borderWidth: 1,
                    borderColor: colors?.primary,
                  }}
                  boxStyles={[
                    styles?.input,
                    focusedField === 'gender' && styles.focusedInput,
                    { paddingVertical: 15, paddingHorizontal: 18 },
                  ]}
                  inputStyles={{
                    color: colors?.placeholderText,
                    fontSize: size?.medium,
                    fontFamily: family?.Questrial_Regular,
                  }}
                />
                {errors.gender && touched.gender && (
                  <Text style={styles.error}>{errors.gender}</Text>
                )}
              </View>

              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Password'}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => {
                    handleBlur('password');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('password')}
                  placeholder="Enter Password"
                  placeholderTextColor={colors.placeholderText}
                  autoCapitalize="none"
                  value={values.password}
                  rightIcon
                  leftIcon={appIcons?.password}
                  containerStyle={[
                    styles.input,
                    focusedField === 'password' && styles.focusedInput,
                  ]}
                />
                {errors.password && touched.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </View>
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Confirm Password'}
                  onFocus={() => setFocusedField('confirm_password')}
                  onBlur={() => {
                    handleBlur('confirm_password');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('confirm_password')}
                  placeholder="Enter Confirm Password"
                  placeholderTextColor={colors.placeholderText}
                  autoCapitalize="none"
                  value={values.confirm_password}
                  rightIcon
                  leftIcon={appIcons?.password}
                  containerStyle={[
                    styles.input,
                    focusedField === 'confirm_password' && styles.focusedInput,
                  ]}
                />
                {errors.confirm_password && touched.confirm_password && (
                  <Text style={styles.error}>{errors.confirm_password}</Text>
                )}
              </View>

              <View style={styles.agreementContainerWrap}>
                <View style={styles?.agreementContainer}>
                  <CustomCheckbox
                    checked={values.isChecked}
                    onChange={value => setFieldValue('isChecked', value)}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      width: '90%',
                    }}>
                    <CustomText
                      text={'By signing up, you are '}
                      font={family?.Questrial_Regular}
                      size={size?.medium}
                      color={colors?.placeholderText}
                    />
                    <TouchableOpacity activeOpacity={0.7} onPress={() => { }}>
                      <CustomText
                        text={'Terms and Conditions'}
                        font={family?.Questrial_Regular}
                        size={size?.medium}
                        color={colors?.secondary}
                        underline={true}
                      />
                    </TouchableOpacity>
                    <CustomText
                      text={' & '}
                      font={family?.Questrial_Regular}
                      size={size?.medium}
                      color={colors?.placeholderText}
                    />
                    <TouchableOpacity activeOpacity={0.7} onPress={() => { }}>
                      <CustomText
                        text={'Privacy Policy'}
                        font={family?.Questrial_Regular}
                        size={size?.medium}
                        color={colors?.secondary}
                        underline={true}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {errors.isChecked && touched.isChecked && (
                  <Text style={styles.error}>{errors.isChecked}</Text>
                )}
              </View>
              {isLoading ? (
                <ActivityLoader color={colors2.theme.secondary} />
              ) : (
                <CustomButton
                  gradientColorArr={[colors.secondary, colors.secondary]}
                  title={'REGISTER NOW'}
                  customWidth={width - 55}
                  buttonStyle={{ alignSelf: 'center', borderRadius: 50 }}
                  textStyle={{ fontSize: size.large }}
                  onPress={handleSubmit}
                />
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: '3%',
                }}>
                <CustomText
                  text={'Already have an account? '}
                  font={family?.Gilroy_SemiBold}
                  size={size?.medium}
                  color={colors?.blackShade}
                />
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{ padding: 2 }}
                  onPress={() => {
                    NavService.reset(0, [{ name: 'login' }]);
                  }}>
                  <CustomText
                    text={'SIGN IN'}
                    font={family?.Gilroy_SemiBold}
                    size={size?.medium}
                    color={colors?.secondary}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </CustomBackground>
      )}
    </Formik>
  );
};

export default SignUp;

import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, ScrollView, Alert} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput, {
  CustomPhoneInput,
  CustomTextAreaInput,
} from '../../../components/CustomTextInput';
import {colors} from '../../../utils/Colors';
import {family, size} from '../../../utils';
import styles from '../EditProfile/styles';
import CustomButton from '../../../components/CustomButton';
import {appIcons} from '../../../assets';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';

const {width, height} = Dimensions.get('screen');
const SignupSchema = Yup.object().shape({
  full_name: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .required('Phone number is required')
    .test('isValid', 'Phone number is not valid', function (value) {
      return value ? true : false;
    }),
  message: Yup.string().required('Message is required'),
});

const Collaborate = () => {
  const [focusedField, setFocusedField] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handlePhoneInputChange = (formatted, raw) => {
    console.log('formatted', formatted, raw);
    setFormattedPhoneNumber(formatted);
    setPhoneNumber(raw);
  };

  const handleEdit = values => {
    Alert.alert('Thank you for contacting us. We will get back to you shortly');
    NavService?.navigate('otherBusiness');
  };
  return (
    <Formik
      initialValues={{
        full_name: '',
        email: '',
        phoneNumber: '',
        formattedPhoneNumber: '',
        message: '',
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
        <AppBackground
          back={true}
          title={'Collaborate '.toUpperCase()}
          notification>
          <View style={{paddingHorizontal: 10, marginTop: height * 0.03}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Full Name'}
                  onFocus={() => setFocusedField('full_name')}
                  onBlur={() => {
                    handleBlur('full_name');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('full_name')}
                  placeholder="Enter Full Name"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.full_name}
                  leftIcon={appIcons?.gender}
                  containerStyle={[
                    styles.input,
                    focusedField === 'full_name' && styles.focusedInput,
                  ]}
                />
                {errors.full_name && touched.full_name && (
                  <Text style={styles.error}>{errors.full_name}</Text>
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

              <View style={styles.field}>
                <CustomPhoneInput
                  labelTitle={'Phone Number'}
                  value={values.phoneNumber}
                  formattedValue={values.formattedPhoneNumber}
                  setValue={value => {
                    setFieldValue('phoneNumber', value);
                  }}
                  setFormattedValue={formattedValue => {
                    setFieldValue('formattedPhoneNumber', formattedValue);
                  }}
                  valid={valid}
                  staric={true}
                  showMessage={showMessage}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <Text style={styles.error}>{errors.phoneNumber}</Text>
                )}
              </View>

              <View style={styles.field}>
                <CustomTextAreaInput
                  textInputTitle={true}
                  numberOfLines={5}
                  label
                  staric={true}
                  labelTitle={'Message'}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => {
                    handleBlur('message');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('message')}
                  placeholder="Enter Message Here!"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.message}
                  leftIcon={appIcons?.email}
                  containerStyle={[
                    styles.input,
                    focusedField === 'message' && styles.focusedInput,
                    {borderRadius: 15},
                  ]}
                />
                {errors.message && touched.message && (
                  <Text style={styles.error}>{errors.message}</Text>
                )}
              </View>

              <View style={{marginTop: height * 0.04}}>
                <CustomButton
                  gradientColorArr={[colors.secondary, colors.secondary]}
                  title={'COLLABORATE'}
                  customWidth={width - 55}
                  buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                  textStyle={{fontSize: size.large}}
                  onPress={handleSubmit}
                />
              </View>
            </ScrollView>
          </View>
        </AppBackground>
      )}
    </Formik>
  );
};

export default Collaborate;

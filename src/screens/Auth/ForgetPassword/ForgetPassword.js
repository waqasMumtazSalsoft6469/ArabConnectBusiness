import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomBackground from '../../../components/CustomBackground';
import CustomText from '../../../components/CustomText';
import CustomTextInput from '../../../components/CustomTextInput';
import {colors} from '../../../utils/Colors';
import {family, size} from '../../../utils';
import styles from '../Login/styles';
import CustomButton from '../../../components/CustomButton';
import {appIcons} from '../../../assets';
import NavService from '../../../helpers/NavService';
import {LOG} from '../../../utils/helperFunction';
import {useVerifyEmailMutation} from '../../../Api/resetPassApiSlice';
import {executeApiRequest} from '../../../Api/methods/method';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';

const {width, height} = Dimensions.get('screen');
const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgetPassword = () => {
  const [focusedField, setFocusedField] = useState('');
  const [verifyEmail, {isLoading}] = useVerifyEmailMutation();

  const handleLogin = async values => {
    LOG('values: ', values);
    const payload = {
      ...values,
    };
    const response = await executeApiRequest({
      apiCallFunction: verifyEmail,
      body: payload,
      toast: true,
      timeout: 30000,
    });
    console.log('RESPONSE: ', response);
    NavService?.navigate('otp', {item: payload});
  };
  return (
    <Formik
      initialValues={{
        email: '',
        type: 'BUSINESS',
      }}
      validationSchema={SignupSchema}
      onSubmit={handleLogin}>
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
          titleText={'FORGET PASSWORD'}
          descriptionText={'Enter your email to recover your password'}>
          <View style={{paddingHorizontal: 20, paddingTop: 30}}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
              <View style={{marginTop: height * 0.04}}>
                {isLoading ? (
                  <ActivityLoader color={colors2.theme.secondary} />
                ) : (
                  <CustomButton
                    gradientColorArr={[colors.secondary, colors.secondary]}
                    title={'CONTINUE'}
                    customWidth={width - 55}
                    buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                    textStyle={{fontSize: size.large}}
                    onPress={handleSubmit}
                  />
                )}
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  padding: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: '5%',
                }}
                onPress={() => {
                  NavService.reset(0, [{name: 'login'}]);
                }}>
                <CustomText
                  text={'BACK TO SIGN IN'}
                  font={family?.Gilroy_Medium}
                  size={size?.large}
                  color={colors?.text}
                  underline={true}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </CustomBackground>
      )}
    </Formik>
  );
};

export default ForgetPassword;

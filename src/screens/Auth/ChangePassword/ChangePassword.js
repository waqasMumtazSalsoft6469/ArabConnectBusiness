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
import {useResetPassMutation} from '../../../Api/resetPassApiSlice';
import {colors2} from '../../../theme/colors2';
import ActivityLoader from '../../../components/ActivityLoader';
import {executeApiRequest} from '../../../Api/methods/method';
const {width, height} = Dimensions.get('screen');
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
});

const ChangePassword = ({route}) => {
  const data = route?.params || {};
  LOG('DATA: ', data);
  let changeData = data?.data;
  const [focusedField, setFocusedField] = useState('');
  const [resetPass, {isLoading}] = useResetPassMutation();

  const handleSignup = async values => {
    LOG('Values: ', values);
    const payload = {
      ...values,
      email: changeData?.email,
      code: changeData?.code,
    };
    const response = await executeApiRequest({
      apiCallFunction: resetPass,
      body: payload,
      toast: true,
      timeout: 30000,
    });
    console.log('RESPONSE: ', response);
    NavService.reset(0, [{name: 'login'}]);
  };
  return (
    <Formik
      initialValues={{
        password: '',
        confirm_password: '',
        type: 'BUSINESS',
      }}
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
          titleText={'CREATE PASSWORD'}
          descriptionText={'Set new password for your account'}>
          <View style={{paddingHorizontal: 20, paddingTop: 30}}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                  labelTitle={'Password'}
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

              <View style={{marginTop: height * 0.02}}>
                {isLoading ? (
                  <ActivityLoader color={colors2.theme.secondary} />
                ) : (
                  <CustomButton
                    gradientColorArr={[colors.secondary, colors.secondary]}
                    title={'UPDATE'}
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

export default ChangePassword;

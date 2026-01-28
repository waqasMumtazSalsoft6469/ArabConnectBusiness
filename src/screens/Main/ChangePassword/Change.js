import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, ScrollView, Alert} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../../components/CustomTextInput';
import {colors} from '../../../utils/Colors';
import {size} from '../../../utils';
import styles from '../EditProfile/styles';
import CustomButton from '../../../components/CustomButton';
import {appIcons} from '../../../assets';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import {LOG} from '../../../utils/helperFunction';
import {useSelector} from 'react-redux';
import {useChangePassMutation} from '../../../Api/resetPassApiSlice';
import {executeApiRequest} from '../../../Api/methods/method';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';

const {width, height} = Dimensions.get('screen');
const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

const SignupSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Current Password is required'),
  password: Yup.string()
    .required('New Password is required')
    .matches(
      passwordRules,
      'New Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long',
    ),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

const Change = () => {
  const [focusedField, setFocusedField] = useState('');
  const userDetails = useSelector(state => state?.auth?.user || {});
  const [changePass, {isLoading}] = useChangePassMutation();
  LOG('UserDetails: ', userDetails?.email);
  const handleEdit = async values => {
    // Alert.alert('Password Changed Successfully!')

    LOG('Values: ', values);
    const payload = {
      ...values,
      email: userDetails?.email,
    };
    const response = await executeApiRequest({
      apiCallFunction: changePass,
      body: payload,
      toast: true,
      timeout: 30000,
    });
    console.log('RESPONSE: ', response);
    NavService?.navigate('DrawerStack');
  };
  return (
    <Formik
      initialValues={{
        oldPassword: '',
        password: '',
        confirm_password: '',
        type: 'BUSINESS',
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
          title={'CHANGE PASSWORD'}
          notification
          description={
            'Your new password must be different from the previous password.'
          }>
          <View style={{paddingHorizontal: 15, paddingTop: 20}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Current Password'}
                  onFocus={() => setFocusedField('oldPassword')}
                  onBlur={() => {
                    handleBlur('oldPassword');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('oldPassword')}
                  placeholder="Enter Password"
                  placeholderTextColor={colors.placeholderText}
                  autoCapitalize="none"
                  value={values.oldPassword}
                  rightIcon
                  leftIcon={appIcons?.password}
                  containerStyle={[
                    styles.input,
                    focusedField === 'oldPassword' && styles.focusedInput,
                  ]}
                />
                {errors.oldPassword && touched.oldPassword && (
                  <Text style={styles.error}>{errors.oldPassword}</Text>
                )}
              </View>
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'New Password'}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => {
                    handleBlur('password');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('password')}
                  placeholder="Enter New Password"
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

              <View style={{marginTop: height * 0.04}}>
                {isLoading ? (
                  <ActivityLoader color={colors2.theme.secondary} />
                ) : (
                  <CustomButton
                    gradientColorArr={[colors.secondary, colors.secondary]}
                    title={'RESET PASSWORD'}
                    customWidth={width - 55}
                    buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                    textStyle={{fontSize: size.large}}
                    onPress={handleSubmit}
                  />
                )}
              </View>
            </ScrollView>
          </View>
        </AppBackground>
      )}
    </Formik>
  );
};

export default Change;

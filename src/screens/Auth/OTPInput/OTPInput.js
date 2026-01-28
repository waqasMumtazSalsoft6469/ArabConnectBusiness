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
import OTPTextView from 'react-native-otp-textinput';
import {LOG} from '../../../utils/helperFunction';
import {
  useVerifyCodeMutation,
  useVerifyEmailMutation,
} from '../../../Api/resetPassApiSlice';
import {executeApiRequest} from '../../../Api/methods/method';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';

const {width, height} = Dimensions.get('screen');
const SignupSchema = Yup.object().shape({
  code: Yup.string()
    .required('OTP is required')
    .length(4, 'OTP must be exactly 4 digits'),
});

const OTPInput = ({route}) => {
  const item =  route?.params || {};
  LOG('item: ', item);
  let recallOtp = item?.item;
  LOG('recall: ', recallOtp);

  const [focusedField, setFocusedField] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [verifyEmail, {isLoading: verifyLoading}] = useVerifyEmailMutation();
  const [verifyCode, {isLoading: otpLoading}] = useVerifyCodeMutation();

  const handleVerifyAgain = async () => {
    const payload = {
      ...recallOtp,
    };
    const response = await executeApiRequest({
      apiCallFunction: verifyEmail,
      body: payload,
      toast: true,
      timeout: 30000,
    });
    console.log('RESPONSE: ', response);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResend(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async values => {
    LOG('values: ', values);
    const payload = {
      ...values,
      email: recallOtp?.email,
    };
    const response = await executeApiRequest({
      apiCallFunction: verifyCode,
      body: payload,
      toast: true,
      timeout: 30000,
    });
    console.log('RESPONSE: ', response);
    NavService?.navigate('change', {data: payload});
  };
  return (
    <Formik
      initialValues={{
        code: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}>
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
          descriptionText={'Enter the 04 digit OTP sent to your email ID'}>
          <View style={{paddingHorizontal: 20, paddingTop: 30}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.field}>
                <View style={{flexDirection: 'row', marginLeft: 20}}>
                  <CustomText
                    text={'Verification Code'}
                    font={family?.Gilroy_Medium}
                    size={size?.large}
                  />
                  <CustomText text="*" color={colors?.red} size={size?.h5} />
                </View>

                <OTPTextView
                  defaultValue=""
                  handleTextChange={handleChange('code')}
                  inputCount={4}
                  tintColor={colors?.iconColor}
                  offTintColor={colors?.placeholderColor}
                  inputCellLength={1}
                  containerStyle={{paddingHorizontal: 15}}
                  textInputStyle={{
                    backgroundColor: colors?.placeholderColor,
                    borderRadius: 6,
                  }}
                  testIDPrefix="otp_input_"
                  autoFocus={false}
                />
                {errors.code && touched.code && (
                  <Text style={styles.error}>{errors.code}</Text>
                )}
                {showResend && (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.forgotPassContainer}
                    onPress={handleVerifyAgain}>
                    {verifyLoading ? (
                      <ActivityLoader
                        color={colors?.iconColor}
                        size={'small'}
                      />
                    ) : (
                      <Text style={styles.forgotPass}>Resend Code?</Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
              <View style={{marginTop: height * 0.04}}>
                {otpLoading ? (
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

export default OTPInput;

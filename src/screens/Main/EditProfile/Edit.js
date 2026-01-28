import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Alert,
  useWindowDimensions,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput, {
  CustomPhoneInput,
} from '../../../components/CustomTextInput';
import {colors} from '../../../utils/Colors';
import {size, vh, vw} from '../../../utils';
import styles from './styles';
import CustomButton from '../../../components/CustomButton';
import {appIcons, appImages} from '../../../assets';
import AppBackground from '../../../components/AppBackground';
import NavService from '../../../helpers/NavService';
import CircularImagePicker from '../../../components/ImagePicker';
import {useSelector} from 'react-redux';
import {getImageUrl, LOG} from '../../../utils/helperFunction';
import Profile from '../../../components/ProfileImagePicker/ProfileImagePicker';
import {executeApiRequest} from '../../../Api/methods/method';
import {useUpdateMutation} from '../../../Api/profileApiSlice';
import ActivityLoader from '../../../components/ActivityLoader';

const {width, height} = Dimensions.get('screen');
const SignupSchema = Yup.object().shape({
  full_name: Yup.string().required('Full Name is required'),
  gender: Yup.string().required('Gender is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const Edit = () => {
  const [update, {isLoading}] = useUpdateMutation();

  const userDetails = useSelector(state => state?.auth?.user || {});
  let image = getImageUrl(userDetails?.image);
  const windowWidth = useWindowDimensions().width;
  const isTablet = windowWidth > 600;

  const PickerTop = isTablet ? vh - 50 : '';
  const PickerRight = isTablet ? vw * 0.5 : '';
  const IconPickerTop = isTablet ? vh - 95 : vh - 40;
  const IconPickerRight = isTablet ? vw * 10 : vw * 37;

  const [focusedField, setFocusedField] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleEdit = async values => {
    const payload = {
      fullName: values?.full_name,
      email: values?.email,
      gender: values?.gender,
      image: profileImage || '',
    };
    LOG('Values: ', payload);
    const response = await executeApiRequest({
      apiCallFunction: update, // RTK Query mutation function
      body: payload, // FormData payload
      formData: true, // Indicate this is a FormData request
      toast: true, // Show toast messages
      timeout: 30000, // 30-second timeout
    });

    LOG('Profile Update Success:', response);

    NavService?.navigate('DrawerStack');
  };

  const handleImage = imagePath => {
    setProfileImage(imagePath);
  };
  return (
    <Formik
      initialValues={{
        full_name: userDetails?.fullName || '',
        email: userDetails?.email || '',
        gender: userDetails?.gender || '',
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
        <AppBackground back={true} title={'EDIT PROFILE'} notification>
          <View style={{paddingHorizontal: 15, marginTop: height * 0.04}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* <CircularImagePicker
                isEditable={true}
                icon={appIcons?.Camera}
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  top: PickerTop,
                  left: PickerRight,
                }}
                cameraStyle={{top: IconPickerTop, left: width * 0.48}}
                userImage={userDetails?.image}
                onImageSelect={imgPath => setSelectedImage(imgPath)}
              /> */}
              <View style={{alignItems: 'center'}}>
                <Profile
                  handleImage={handleImage}
                  isEdit={true}
                  icon={appIcons?.Camera}
                  initialImage={image}
                />
              </View>

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
                  editable={false}
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
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  editable={false}
                  labelTitle={'Gender'}
                  onFocus={() => setFocusedField('gender')}
                  onBlur={() => {
                    handleBlur('gender');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('gender')}
                  placeholder="Enter Gender"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.gender}
                  leftIcon={appIcons?.gender}
                  containerStyle={[
                    styles.input,
                    focusedField === 'gender' && styles.focusedInput,
                  ]}
                />
                {errors.gender && touched.gender && (
                  <Text style={styles.error}>{errors.gender}</Text>
                )}
              </View>
              {/* <View style={styles.field}>
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
              </View> */}
              <View style={{marginTop: height * 0.04}}>
                {isLoading ? (
                  <ActivityLoader color={colors?.secondary} />
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
            </ScrollView>
          </View>
        </AppBackground>
      )}
    </Formik>
  );
};

export default Edit;

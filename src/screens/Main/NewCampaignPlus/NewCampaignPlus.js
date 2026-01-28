import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput, {
  CustomTextAreaInput,
} from '../../../components/CustomTextInput';
import {colors} from '../../../utils/Colors';
import {family, size, vh, vw} from '../../../utils';

import CustomButton from '../../../components/CustomButton';
import {appIcons} from '../../../assets';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import {SelectList} from 'react-native-dropdown-select-list';
import CustomText from '../../../components/CustomText';
import ImagePicker2 from '../../../components/ImagePicker2';
import CustomDatePicker from '../../../components/CustomDatePicker';
import CustomCheckbox from '../../../components/CustomCheckbox';
import styles from './styles';
import CustomTimePicker from '../../../components/CustomTimePicker';
import BottomSheet from '../../../components/BottomSheet';

const {width, height} = Dimensions.get('screen');
const SignupSchema = Yup.object().shape({
  full_name: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
});

const data = [
  {key: '1', value: 'Subject1'},
  {key: '2', value: 'Subject2'},
  {key: '3', value: 'Subject3'},
];
const daysOfWeek = [
  {id: '0', label: 'Sun'},
  {id: '1', label: 'Mon'},
  {id: '2', label: 'Tue'},
  {id: '3', label: 'Wed'},
  {id: '4', label: 'Thu'},
  {id: '5', label: 'Fri'},
  {id: '6', label: 'Sat'},
];

const advanceoptionsData = [
  {id: '0', label: 'Enable Sharing'},
  {id: '1', label: 'Share only for referrals'},
  {id: '2', label: 'Enable Donating'},
  {id: '3', label: 'Online only (no scanning/store level)'},
  {id: '4', label: 'In store only (not available online)'},
  {id: '5', label: 'Original user can only share'},
];
const mediaChannelsData = [
  {id: '0', label: 'Email'},
  {id: '1', label: 'SMS / MMS message'},
  {id: '2', label: 'Push Notification'},
];

const NewCampaignPlus = () => {
  const [focusedField, setFocusedField] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedAdvanceOptions, setSelectedAdvanceOptions] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const bottomSheetRef = useRef();

  const handleImageChange = (images, setFieldValue) => {
    if (images.length > 0) {
      const imageUri = images[0]; // Get the URI or path of the selected image
      setSelectedImage(imageUri); // Set selected image
      setFieldValue('selectedImage', imageUri); // Update Formik state with image URI
    }
  };
  const handleEdit = values => {
    // Alert.alert('Thank you for contacting us. We will get back to you shortly');
    // NavService?.navigate('DrawerStack');
  };
  const handleCheckboxToggle = day => {
    setSelectedDays(
      prev =>
        prev.includes(day)
          ? prev.filter(item => item !== day) // Remove if already selected
          : [...prev, day], // Add if not selected
    );
  };
  const handleCheckboxToggle2 = day => {
    setSelectedAdvanceOptions(
      prev =>
        prev.includes(day)
          ? prev.filter(item => item !== day) // Remove if already selected
          : [...prev, day], // Add if not selected
    );
  };
  return (
    <Formik
      initialValues={{
        full_name: '',
        email: '',
        subject: '',
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
        <AppBackground back={true} title={'Create New Campaign'} notification>
          <View style={{paddingHorizontal: 15, marginTop: height * 0.03}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Coupon Title'}
                  onFocus={() => setFocusedField('full_name')}
                  onBlur={() => {
                    handleBlur('full_name');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('full_name')}
                  placeholder="Enter Coupon Title"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.full_name}
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
                <CustomTextAreaInput
                  textInputTitle={true}
                  numberOfLines={5}
                  label
                  staric={true}
                  labelTitle={'Coupon Description'}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => {
                    handleBlur('message');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('message')}
                  placeholder="Enter Description Here!"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.message}
                  containerStyle={[
                    styles.input,
                    focusedField === 'message' && styles.focusedInput,
                    {borderRadius: 15},
                  ]}
                />
                {errors.message && touched.message && (
                  <Text style={styles.error}>{errors.message}</Text>
                )}

                <CustomText
                  text={
                    '(Will be displayed on the app and online ordering platform as coupon description.)'
                  }
                  font={family?.Questrial_Regular}
                  size={size?.small}
                  color={'#BD0008'}
                  style={{left: 7, marginTop: 5, width: '95%'}}
                />
              </View>

              <View
                style={[
                  styles?.field,
                  {flexDirection: 'row', paddingHorizontal: 25},
                ]}>
                <CustomText
                  text={'Background Image'}
                  font={family?.Gilroy_Medium}
                  size={size?.large}
                />
                <CustomText
                  text={'*'}
                  font={family?.Questrial_Regular}
                  size={size?.h5}
                  color={colors?.red}
                />
              </View>
              <ImagePicker2
                onImageChange={images =>
                  handleImageChange(images, setFieldValue)
                }>
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
                    <View style={{alignItems: 'center', gap: 5}}>
                      <Image
                        source={appIcons?.upload2}
                        style={{
                          width: 20,
                          height: 20,
                          resizeMode: 'contain',
                        }}
                      />
                      <CustomText
                        text={'Upload Image'}
                        font={family?.Gilroy_SemiBold}
                        size={size?.xxlarge}
                        underline={true}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </ImagePicker2>
              {errors.selectedImage && touched.selectedImage && (
                <Text style={[styles.error, {marginTop: -height * 0.005}]}>
                  {errors.selectedImage}
                </Text>
              )}
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Max Coupon User'}
                  onFocus={() => setFocusedField('full_name')}
                  onBlur={() => {
                    handleBlur('full_name');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('full_name')}
                  placeholder="Enter Max Coupon User"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.full_name}
                  containerStyle={[
                    styles.input,
                    focusedField === 'full_name' && styles.focusedInput,
                  ]}
                />
                {errors.full_name && touched.full_name && (
                  <Text style={styles.error}>{errors.full_name}</Text>
                )}
                <CustomText
                  text={`(Limit only one coupon for each user by setting this value to 1, a specific customer will not receive more coupons than the specific amount -1 is no limit)`}
                  font={family?.Questrial_Regular}
                  size={size?.small}
                  color={'#BD0008'}
                  style={{left: 7, marginTop: 5, width: '95%'}}
                />
              </View>

              <View style={styles?.field}>
                <CustomDatePicker title={'Expiration Date'} staric={true} />
              </View>

              <View style={styles.field}>
                <View
                  style={[
                    {flexDirection: 'row', paddingHorizontal: 15, marginTop: 5},
                  ]}>
                  <CustomText
                    text={'Coupon Availability Hours'}
                    font={family?.Gilroy_Medium}
                    size={size?.large}
                  />
                  <CustomText
                    text={'*'}
                    font={family?.Questrial_Regular}
                    size={size?.h5}
                    color={colors?.red}
                  />
                </View>

                <FlatList
                  data={daysOfWeek}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                  numColumns={4} // Display in two rows
                  // contentContainerStyle={{marginTop: 10}}
                  columnWrapperStyle={{gap: vh * 2.5}}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      // onPress={() => handleCheckboxToggle(item.label)}
                      disabled
                      style={styles.checkboxContainer}>
                      <CustomCheckbox
                        checked={selectedDays.includes(item.label)}
                      />
                      <CustomText
                        text={item.label}
                        font={family?.Questrial_Regular}
                        size={size?.large}
                        style={{marginLeft: 5}}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '52%',
                  alignItems: 'center',
                  gap: vh * 2,
                  paddingHorizontal: 15,
                }}>
                <CustomTimePicker
                  timeStyle={{width: width * 0.4, alignSelf: 'flex-start'}}
                  placeholder={'From'}
                />
                <CustomTimePicker
                  timeStyle={{width: width * 0.4}}
                  placeholder={'To'}
                />
              </View>

              <View style={styles.field}>
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      paddingHorizontal: 15,
                      marginTop: 10,
                    },
                  ]}>
                  <CustomText
                    text={'Advance Options'}
                    font={family?.Gilroy_Medium}
                    size={size?.large}
                  />
                  <CustomText
                    text={'*'}
                    font={family?.Questrial_Regular}
                    size={size?.h5}
                    color={colors?.red}
                  />
                </View>

                <FlatList
                  data={advanceoptionsData}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      // onPress={() => handleCheckboxToggle2(item.label)}
                      disabled
                      style={styles.checkboxContainer}>
                      <CustomCheckbox
                        checked={selectedAdvanceOptions.includes(item.label)}
                      />
                      <CustomText
                        text={item.label}
                        font={family?.Questrial_Regular}
                        size={size?.large}
                        style={{marginLeft: 5}}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>
              <View style={styles.field}>
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      paddingHorizontal: 15,
                      marginTop: 10,
                      marginBottom: 5,
                    },
                  ]}>
                  <View>
                    <CustomText
                      text={'Media Channels'}
                      font={family?.Gilroy_Medium}
                      size={size?.large}
                    />
                    <CustomText
                      text={`Media Channels in which you can meet your end user`}
                      font={family?.Questrial_Regular}
                      size={size?.small}
                      color={'#BD0008'}
                      style={{width: '100%'}}
                    />
                  </View>
                </View>

                <FlatList
                  data={mediaChannelsData}
                  scrollEnabled={false}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      // onPress={() => handleCheckboxToggle2(item.label)}
                      disabled
                      style={styles.checkboxContainer}>
                      <CustomCheckbox
                        checked={selectedMedia.includes(item.label)}
                      />
                      <CustomText
                        text={item.label}
                        font={family?.Questrial_Regular}
                        size={size?.large}
                        style={{marginLeft: 5}}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>

              <View
                style={{marginTop: height * 0.04, marginBottom: height * 0.03}}>
                <CustomButton
                  gradientColorArr={[colors.secondary, colors.secondary]}
                  title={'CREATE CAMPAIGN'}
                  customWidth={width - 55}
                  buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                  textStyle={{fontSize: size.large}}
                  onPress={() => {
                    bottomSheetRef?.current.open();
                  }}
                />
              </View>
            </ScrollView>
          </View>
          <BottomSheet
            successfull={true}
            text={'SYSTEM MESSAGE'}
            description={'Your campaign has been created successfully!'}
            // title={'Back to Campaign Management'}
            btnTitle={'Back to Campaign Management'}
            buttonStyle={{width: width / 1.25}}
            ref={bottomSheetRef}
            OnYesPress={() => {
              bottomSheetRef.current.close();
              NavService?.navigate('campaign');
            }}
          />
        </AppBackground>
      )}
    </Formik>
  );
};

export default NewCampaignPlus;

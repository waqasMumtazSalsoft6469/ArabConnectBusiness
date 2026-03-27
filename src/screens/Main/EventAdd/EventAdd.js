import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomBackground from '../../../components/CustomBackground';
import CustomText from '../../../components/CustomText';
import CustomTextInput, {
  CustomTextAreaInput,
} from '../../../components/CustomTextInput';
import SelectableTextInput from '../../../components/SelectableTextInput';
import {colors} from '../../../utils/Colors';
import {family, size, vh, vw} from '../../../utils';
import styles from '../../Auth/Login/styles';
import CustomButton from '../../../components/CustomButton';
import {appIcons} from '../../../assets';
import NavService from '../../../helpers/NavService';
import ImagePicker2 from '../../../components/ImagePicker2';
import FastImage from 'react-native-fast-image';
import BottomSheet from '../../../components/BottomSheet';
import {extractFileName, LOG} from '../../../utils/helperFunction';
import GooglePlaceAutocomplete from '../../../components/GooglePlace';
import CustomDatePicker from '../../../components/CustomDatePicker';
import CustomTimePicker from '../../../components/CustomTimePicker';
import {useAddMutation} from '../../../Api/EventsApiSlice';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import {executeApiRequest} from '../../../Api/methods/method';

const {width, height} = Dimensions.get('screen');
const zipCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

const SignupSchema = Yup.object().shape({
  eventName: Yup.string().required('Event Name is required'),

  ticketPrice: Yup.string().required('Ticket Price is required'),
  location: Yup.object().shape({
    address: Yup.string().required('Location is required'),
  }),
  date: Yup.date().required('Date is required'),
  time: Yup.string().required('Time is required'),
  description: Yup.string().required('Description is required'),
  image: Yup.object()
    .nullable()
    .required('Image is required')
    .test('is-valid-image', 'Image is required', value => value !== ''), // Ensures non-empty value
});

const EventAdd = () => {
  const [focusedField, setFocusedField] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const bottomSheetRef = useRef();
  const [add, {isLoading}] = useAddMutation();

  const handleImageChange = (images, setFieldValue) => {
    if (images.length > 0) {
      const imageUri = images[0];
      setSelectedImage(imageUri);
      setFieldValue('selectedImage', imageUri);
    }
  };

  const handleSignup = async values => {
    let payload = {
      ...values,
    };
    LOG('PAYLOAD: ', payload);

    const response = await executeApiRequest({
      apiCallFunction: add,
      body: payload,
      formData: true,
      toast: true,
      timeout: 30000,
    });

    LOG('Event Record Add Success:', response);
    NavService.goBack();
    // Alert.alert('asdsa');
  };

  return (
    <Formik
      initialValues={{
        eventName: '',
        image: '',
        ticketPrice: '',
        date: '',
        location: {
          coordinates: [],
          type: 'Point',
          address: '',
        },
        time: '',
        description: '',
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
          back={true}
          titleText={'ADD EVENT'}
          descriptionText={'Fill out this form to create event'}>
          <View style={{paddingHorizontal: 20, paddingTop: 30}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Event Name'}
                  onFocus={() => setFocusedField('eventName')}
                  onBlur={() => {
                    handleBlur('eventName');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('eventName')}
                  placeholder="Enter Event Name"
                  placeholderTextColor={colors.placeholderText}
                  autoCapitalize="none"
                  value={values.eventName}
                  leftIcon={appIcons?.businessIcon}
                  containerStyle={[
                    styles.input,
                    focusedField === 'eventName' && styles.focusedInput,
                  ]}
                />
                {errors.eventName && touched.eventName && (
                  <Text style={styles.error}>{errors.eventName}</Text>
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
                      {height: selectedImage ? vh * 20 : vh * 20},
                    ]}
                    disabled={true}>
                    {selectedImage ? (
                      <FastImage
                        source={{uri: selectedImage}}
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
                          style={{textAlign: 'center'}}
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
                          buttonStyle={{borderRadius: 8, alignItems: 'center'}}
                          textStyle={{fontSize: size.medium}}
                        />
                        {/* <FastImage
                          source={appIcons?.upload}
                          resizeMode="contain"
                          style={{
                            width: 35,
                            height: 35,
                          }}
                        /> */}
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
                  labelTitle={'Ticket Price'}
                  onFocus={() => setFocusedField('ticketPrice')}
                  onBlur={() => {
                    handleBlur('ticketPrice');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('ticketPrice')}
                  placeholder="Enter Ticket Price"
                  placeholderTextColor={colors.placeholderText}
                  keyboardType={'numeric'}
                  autoCapitalize="none"
                  value={values.ticketPrice}
                  leftIcon={appIcons.dollarIcon}
                  containerStyle={[
                    styles.input,
                    focusedField === 'ticketPrice' && styles.focusedInput,
                  ]}
                />
                {errors.ticketPrice && touched.ticketPrice && (
                  <Text style={styles.error}>{errors.ticketPrice}</Text>
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
                />
                {errors.location?.address && touched.location?.address && (
                  <Text style={styles.error}>{errors.location.address}</Text>
                )}
              </View>

              <View style={styles.field}>
                <CustomDatePicker
                  title={'Date'}
                  leftIcon={appIcons.calendar2}
                  staric={true}
                  labelStyle={{marginLeft: 20}}
                  date={values.date ? new Date(values.date) : new Date()}
                  onDateChange={date =>
                    setFieldValue('date', date.toISOString())
                  }
                />
                {errors.date && touched.date && (
                  <Text style={styles.error}>{errors.date}</Text>
                )}
              </View>
              <View style={styles.field}>
                <CustomTimePicker
                  title="Time"
                  staric={true}
                  leftIcon={appIcons.clock2}
                  time={values.time}
                  onTimeChange={newTimeISO => {
                    console.log('TIME: ', newTimeISO);
                    setFieldValue('time', newTimeISO);
                  }}
                />

                {errors.time && touched.time && (
                  <Text style={styles.error}>{errors.time}</Text>
                )}
              </View>

              <View style={styles.field}>
                <CustomTextAreaInput
                  textInputTitle={true}
                  numberOfLines={5}
                  label
                  staric={true}
                  labelTitle={'Description'}
                  onFocus={() => setFocusedField('description')}
                  onBlur={() => {
                    handleBlur('description');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('description')}
                  placeholder="Enter Description Here!"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.description}
                  leftIcon={appIcons?.email}
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
              <View
                style={{marginTop: height * 0.03, marginBottom: height * 0.05}}>
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
            </ScrollView>
            <BottomSheet
              successfull={true}
              text={'SYSTEM MESSAGE'}
              description={'Your event has been created successfully!'}
              ref={bottomSheetRef}
              OnYesPress={() => {
                bottomSheetRef.current.close();
                NavService?.goBack();
              }}
            />
          </View>
        </CustomBackground>
      )}
    </Formik>
  );
};

export default EventAdd;

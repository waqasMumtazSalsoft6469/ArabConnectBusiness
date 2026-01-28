import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
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
import SelectableTextInput from '../../../components/SelectableTextInput';
import CustomText from '../../../components/CustomText';
import ImagePicker2 from '../../../components/ImagePicker2';
import GooglePlaceAutocomplete from '../../../components/GooglePlace';
import {extractFileName, LOG} from '../../../utils/helperFunction';
import {useAddMutation} from '../../../Api/jobsApiSlice';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import {executeApiRequest} from '../../../Api/methods/method';
import {
  jobCategoryOptions,
  subCategoryOptionsMap,
} from '../../../utils/dummyData';

const {width, height} = Dimensions.get('screen');

const SignupSchema = Yup.object().shape({
  jobType: Yup.string().required('Job Type is required'),
  category: Yup.string().required('Job Type is required'),
  subCategory: Yup.string().required('Sub Category is required'),
  description: Yup.string().required('Description is required'),
  location: Yup.object().required('Location is required'),
  salary: Yup.number()
    .required('Salary is required')
    .typeError('Salary must be a number'),
  facebookLink: Yup.string().required('Link is required'),
  contactNumber: Yup.string().required('Phone Number is required'),
  image: Yup.object()
    .nullable()
    .required('Image is required')
    .test('is-valid-image', 'Image is required', value => value !== ''), // Ensures non-empty value
});

const jobTypeOptions = [
  {key: '1', value: 'Full Time'},
  {key: '2', value: 'Part Time'},
];

const AddJob = () => {
  const [focusedField, setFocusedField] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [add, {isLoading}] = useAddMutation();

  // const handleImageChange = (images, setFieldValue) => {
  //   if (images.length > 0) {
  //     const imageUri = images[0];
  //     setSelectedImage(imageUri);
  //     setFieldValue('selectedImage', imageUri);
  //   }
  // };

  const handleEdit = async values => {
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

    LOG('Job Record Add Success:', response);
    NavService.goBack();
    // NavService.reset(0, [{name: 'Jobs'}]);
    // Alert.alert('asdsa');
  };

  return (
    <AppBackground back={true} title={'ADD JOB'} notification>
      <Formik
        initialValues={{
          jobType: '',
          category: '',
          subCategory: '',
          description: '',
          location: {
            coordinates: [],
            type: 'Point',
            address: '',
          },
          facebookLink: '',
          salary: '',
          contactNumber: '',
          // formattedPhoneNumber: '',
          image: '',
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
          <View style={{paddingHorizontal: 15, marginTop: height * 0.03}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
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
                <View style={styles.inputTouchable}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    disabled={true}
                    style={{
                      padding: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      backgroundColor: '#DFDFDF',
                      width: width * 0.18,
                      height: width * 0.18,
                    }}>
                    {selectedImage ? (
                      <Image
                        source={{uri: selectedImage}}
                        style={{
                          width: '110%',
                          height: '110%',
                          borderRadius: 50,
                          resizeMode: 'cover',
                        }}
                      />
                    ) : (
                      <Image
                        source={appIcons?.addIcon}
                        style={{
                          width: 25,
                          height: 25,
                          resizeMode: 'contain',
                        }}
                      />
                    )}
                  </TouchableOpacity>
                  <CustomText
                    text={'Upload Image'}
                    font={family?.Gilroy_SemiBold}
                    size={size?.xxlarge}
                    underline={true}
                  />
                </View>
              </ImagePicker2>
              {errors.image && touched.image && (
                <Text style={styles.error}>{errors.image}</Text>
              )}

              {/* <View style={styles.field}>
                <SelectableTextInput
                  title="JOB CATEGORY"
                  jobType={true}
                  textInputTitle={true}
                  labelTitle={'Job Category'}
                  staric={true}
                  data={jobCategoryOptions}
                  leftIcon={appIcons?.jobCategoryIcon}
                  rightIcon
                  placeholder="Select"
                  formik={{setFieldValue}}
                  OnYesPress={value => {
                    setFieldValue('category', value);
                    console.log('Selected Job Type:', value);
                     setFieldValue('subCategory', '');
                  }}
                  field={{
                    name: 'category',
                    value: values.category,
                    onChange: handleChange('category'),
                    onBlur: handleBlur('category'),
                  }}
                />
                {errors.category && touched.category && (
                  <Text style={styles.error}>{errors.category}</Text>
                )}
              </View>
              <View style={styles.field}>
                <SelectableTextInput
                  title="SUB CATEGORY"
                  jobType={true}
                  textInputTitle={true}
                  labelTitle={'Sub Category'}
                  staric={true}
                  data={subCategoryOptions}
                  leftIcon={appIcons?.jobCategoryIcon}
                  rightIcon
                  placeholder="Select"
                  formik={{setFieldValue}}
                  OnYesPress={value => {
                    setFieldValue('subCategory', value);
                    console.log('Selected Job Type:', value);
                  }}
                  field={{
                    name: 'subCategory',
                    value: values.subCategory,
                    onChange: handleChange('subCategory'),
                    onBlur: handleBlur('subCategory'),
                  }}
                />
                {errors.subCategory && touched.subCategory && (
                  <Text style={styles.error}>{errors.subCategory}</Text>
                )}
              </View> */}

              <View style={styles.field}>
                <SelectableTextInput
                  title="JOB CATEGORY"
                  jobType
                  textInputTitle
                  labelTitle="Job Category"
                  staric
                  data={jobCategoryOptions}
                  leftIcon={appIcons?.jobCategoryIcon}
                  rightIcon
                  placeholder="Select"
                  formik={{setFieldValue}}
                  OnYesPress={value => {
                    setFieldValue('category', value);
                    setFieldValue('subCategory', '');
                  }}
                  field={{
                    name: 'category',
                    value: values.category,
                    onChange: handleChange('category'),
                    onBlur: handleBlur('category'),
                  }}
                />
                {errors.category && touched.category && (
                  <Text style={styles.error}>{errors.category}</Text>
                )}
              </View>

              <View style={styles.field}>
                <SelectableTextInput
                  title="SUB CATEGORY"
                  jobType
                  textInputTitle
                  labelTitle="Sub Category"
                  staric
                  data={subCategoryOptionsMap[values.category] || []}
                  leftIcon={appIcons?.jobCategoryIcon}
                  rightIcon
                  placeholder={
                    values.category ? 'Select' : 'Select category first'
                  }
                  formik={{setFieldValue}}
                  disabled={!values.category} // 🔹 disable if no category selected
                  OnYesPress={value => {
                    setFieldValue('subCategory', value);
                  }}
                  field={{
                    name: 'subCategory',
                    value: values.subCategory,
                    onChange: handleChange('subCategory'),
                    onBlur: handleBlur('subCategory'),
                  }}
                />
                {errors.subCategory && touched.subCategory && (
                  <Text style={styles.error}>{errors.subCategory}</Text>
                )}
              </View>

              {/* Description */}
              <View style={styles.field}>
                <CustomTextAreaInput
                  textInputTitle={true}
                  multiline
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
                  leftIcon={appIcons?.jobDescriptionIcon}
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

              {/* Location */}
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
              </View>

              <View style={styles.field}>
                <SelectableTextInput
                  title="JOB TYPE"
                  jobType={true}
                  textInputTitle={true}
                  labelTitle={'Job Type'}
                  staric={true}
                  data={jobTypeOptions}
                  leftIcon={appIcons?.jobCategoryIcon}
                  rightIcon
                  placeholder="Select"
                  formik={{setFieldValue}}
                  OnYesPress={value => {
                    setFieldValue('jobType', value);
                    console.log('Selected Job Type:', value);
                  }}
                  field={{
                    name: 'jobType',
                    value: values.jobType,
                    onChange: handleChange('jobType'),
                    onBlur: handleBlur('jobType'),
                  }}
                />
                {errors.jobType && touched.jobType && (
                  <Text style={styles.error}>{errors.jobType}</Text>
                )}
              </View>

              {/* Expected Salary */}
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Expected Salary'}
                  onFocus={() => setFocusedField('salary')}
                  onBlur={() => {
                    handleBlur('salary');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('salary')}
                  placeholder="Enter Expected Salary"
                  placeholderTextColor={colors.placeholderText}
                  autoCapitalize="none"
                  value={values.salary}
                  keyboardType="numeric"
                  leftIcon={appIcons.jobSalaryIcon}
                  containerStyle={[
                    styles.input,
                    focusedField === 'salary' && styles.focusedInput,
                  ]}
                />
                {errors.salary && touched.salary && (
                  <Text style={styles.error}>{errors.salary}</Text>
                )}
              </View>

              {/* Phone Number */}
              <View style={styles.field}>
                <CustomPhoneInput
                  labelTitle={'Contact Number'}
                  placeholder="Enter Contact Number"
                  value={values.contactNumber}
                  // formattedValue={values.formattedPhoneNumber}
                  setValue={value => setFieldValue('contactNumber', value)}
                  // setFormattedValue={formattedValue =>
                  //   setFieldValue('formattedPhoneNumber', formattedValue)
                  // }
                  staric={true}
                />
                {errors.contactNumber && touched.contactNumber && (
                  <Text style={styles.error}>{errors.contactNumber}</Text>
                )}
              </View>

              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Facebook Link'}
                  onFocus={() => setFocusedField('facebookLink')}
                  onBlur={() => {
                    handleBlur('facebookLink');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('facebookLink')}
                  placeholder="Enter Facebook Link"
                  placeholderTextColor={colors.placeholderText}
                  autoCapitalize="none"
                  value={values.facebookLink}
                  leftIcon={appIcons.jobFacebook}
                  containerStyle={[
                    styles.input,
                    focusedField === 'facebookLink' && styles.focusedInput,
                  ]}
                />
                {errors.facebookLink && touched.facebookLink && (
                  <Text style={styles.error}>{errors.facebookLink}</Text>
                )}
              </View>

              {/* Add Job Button */}
              <View
                style={{marginTop: height * 0.04, marginBottom: height * 0.15}}>
                {isLoading ? (
                  <ActivityLoader color={colors2.theme.secondary} />
                ) : (
                  <CustomButton
                    gradientColorArr={[colors.secondary, colors.secondary]}
                    title={'ADD JOB'}
                    customWidth={width - 55}
                    buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                    textStyle={{fontSize: size.large}}
                    onPress={handleSubmit}
                  />
                )}
              </View>
            </ScrollView>
          </View>
        )}
      </Formik>
    </AppBackground>
  );
};

export default AddJob;

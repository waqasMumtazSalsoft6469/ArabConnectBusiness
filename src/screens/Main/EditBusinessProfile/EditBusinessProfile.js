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
import CustomTextInput, {
  CustomPhoneInput,
  CustomTextAreaInput,
} from '../../../components/CustomTextInput';
import SelectableTextInput from '../../../components/SelectableTextInput';
import {colors} from '../../../utils/Colors';
import {family, size, vh} from '../../../utils';
import styles from '../../Auth/Login/styles';
import CustomButton from '../../../components/CustomButton';
import {appIcons} from '../../../assets';
import NavService from '../../../helpers/NavService';
import ImagePicker2 from '../../../components/ImagePicker2';
import {
  extractFileName,
  getImageUrl,
  LOG,
  normalizeGallery,
} from '../../../utils/helperFunction';
import FastImage from 'react-native-fast-image';
import GooglePlaceAutocomplete from '../../../components/GooglePlace';
import {
  useEditMutation,
  useFetchBusinessTypeQuery,
} from '../../../Api/businessApiSlice';
import CustomMultiImagePicker from '../../../components/CustomMultiImagePicker';
import {executeApiRequest} from '../../../Api/methods/method';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';

const {width, height} = Dimensions.get('screen');
const zipCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

const SignupSchema = Yup.object().shape({
  businessName: Yup.string().required('Business Name is required'),
  businessType: Yup.object().required('Business Type is required'),
  subCategory: Yup.array().required('Business Sub Category is required'),
  addressLineOne: Yup.string().required('Address Line 01 is required'),
  addressLineTwo: Yup.string().required('Address Line 02 is required'),
  ein: Yup.string().required('Business EIN is required'),
  zipCode: Yup.string()
    .matches(zipCodeRegex, 'Invalid ZIP code')
    .required('ZIP code is required'),
  location: Yup.object().shape({
    address: Yup.string().required('Location is required'),
  }),
  image: Yup.object()
    .nullable()
    .test('is-valid-image', 'Image is required', value => value !== ''), // Ensures non-empty value
  about: Yup.string().required('About Us is required'),
  website: Yup.string().optional(),
  instagram: Yup.string().optional(),
  tiktok: Yup.string().optional(),
  facebook: Yup.string().optional(),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .required('Phone number is required')
    .test('isValid', 'Phone number is not valid', function (value) {
      return value ? true : false;
    }),
  gallery: Yup.array()
    .min(1, 'At least one image is required')
    .required('At least one image is required'),
});

const EditBusinessProfile = ({route}) => {
  const cardItem = route?.params || '';

  LOG('CARD-->', cardItem);
  const {data = [], isLoading, error, refetch} = useFetchBusinessTypeQuery();
  const [typeData, setTypeData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [focusedField, setFocusedField] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBusinessLabel, setSelectedBusinessLabel] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [removedOldImages, setRemovedOldImages] = useState([]);

  const [edit, {isLoading: editLoading}] = useEditMutation();

  let item = cardItem?.cardItem;
  let galleryImages = item?.gallery;

  const handleImage = imageArray => {
    setImages(imageArray);
  };

  const handleSignup = async values => {
    const newImagesToUpload = values.gallery.filter(img =>
      img.uri.startsWith('file'),
    );

    const removedImageNames = removedOldImages.map(img => {
      // Split the URI and get the last part (filename)
      return img.uri.split('/').pop();
    });

    const {addressLineOne, addressLineTwo, zipCode, businessType, ...rest} =
      values;

    const payload = {
      ...rest,
      businessType: businessType?.id || '',
      address: {
        addressLineOne,
        addressLineTwo,
        zipCode,
      },
      gallery: newImagesToUpload,
      oldImages: removedImageNames,
    };

    LOG('FORMATTED VALUES: ', payload);

    const response = await executeApiRequest({
      apiCallFunction: edit,
      body: payload,
      params: {id: item?._id},
      formData: true,
      toast: true,
      timeout: 30000,
    });
    LOG('RESPONSE: ', response);
    NavService.navigateToStack('MyBusinesses');
    // NavService.navigate('EditBusinessImage', {
    //   formValues: formattedValues,
    //   gallery: item?.gallery,
    //   id: item?._id,
    // });
  };

  const initialLocation = {
    coordinates: item?.location?.coordinates || [],
    type: item?.location?.type || 'Point',
    address: item?.location?.address || '',
  };
  // useEffect(() => {
  //   if (data?.length) {
  //     const formatted = data?.map(item => ({
  //       label: item.typeName,
  //       value: item._id,
  //       subCategories: item.subCategories, // Keep for lookup later
  //     }));
  //     setTypeData(formatted);
  //   }
  // }, [data]);

  return (
    <Formik
      initialValues={{
        businessName: item?.businessName || '',
        businessType: item?.businessType || {id: '', type: ''},
        subCategory: item?.subCategory || '',
        addressLineOne: item?.address?.addressLineOne || '',
        addressLineTwo: item?.address?.addressLineTwo || '',
        ein: item?.ein || '',
        zipCode: item?.address?.zipCode || '',
        location: initialLocation,
        image: null,
        about: item?.about || '',
        website: item?.website || '',
        facebook: item?.facebook || '',
        instagram: item?.instagram || '',
        tiktok: item?.tiktok || '',
        phoneNumber: item?.phoneNumber || '',
        gallery: normalizeGallery(galleryImages),
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
      }) => {
        useEffect(() => {
          if (data?.length) {
            const formatted = data.map(item => ({
              label: item.typeName,
              value: item._id,
              subCategories: item.subCategories,
            }));
            setTypeData(formatted);

            // If editing, prefill the business type
            if (item?.businessType) {
              const foundType = formatted.find(
                t => t.value === item.businessType,
              );
              if (foundType) {
                setFieldValue('businessType', {
                  id: foundType.value,
                  type: foundType.label,
                });
                setSelectedBusinessLabel(foundType.label);

                // Pre-fill subcategories
                const formattedSub = foundType.subCategories.map(sub => ({
                  label: sub,
                  value: sub,
                }));
                setSubCategoryData(formattedSub);

                // If subCategory exists in item, make sure to set it too
                if (item?.subCategory?.length) {
                  // Assuming your component handles multi-select or shows as single value
                  setFieldValue('subCategory', item.subCategory);
                }
              }
            }
          }
        }, [data]);

        useEffect(() => {
          if (subCategoryData.length) {
            LOG('subCategoryDataUSEEFFECT:', subCategoryData);
          }
        }, [subCategoryData]);
        LOG('FORMATTED: ', typeData);
        return (
          <CustomBackground
            back={true}
            titleText={'EDIT BUSINESS PROFILE'}
            descriptionText={'Fill out this form to edit business profile'}>
            <View style={{paddingHorizontal: 20, paddingTop: 30}}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.field}>
                  <CustomTextInput
                    textInputTitle={true}
                    staric={true}
                    labelTitle={'Business Name'}
                    onFocus={() => setFocusedField('businessName')}
                    onBlur={() => {
                      handleBlur('businessName');
                      setFocusedField('');
                    }}
                    onChangeText={handleChange('businessName')}
                    placeholder="Enter Business Name"
                    placeholderTextColor={colors.placeholderText}
                    autoCapitalize="none"
                    value={values.businessName}
                    leftIcon={appIcons?.businessIcon}
                    containerStyle={[
                      styles.input,
                      focusedField === 'businessName' && styles.focusedInput,
                    ]}
                  />
                  {errors.businessName && touched.businessName && (
                    <Text style={styles.error}>{errors.businessName}</Text>
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
                        <>
                          {item?.image ? (
                            <FastImage
                              source={getImageUrl(item?.image)}
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 50,
                              }}
                              resizeMode="contain"
                            />
                          ) : (
                            <>
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
                                  buttonStyle={{
                                    borderRadius: 8,
                                    alignItems: 'center',
                                  }}
                                  textStyle={{fontSize: size.medium}}
                                />
                              </View>
                            </>
                          )}
                        </>
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
                    labelTitle={'EIN'}
                    onFocus={() => setFocusedField('ein')}
                    onBlur={() => {
                      handleBlur('ein');
                      setFocusedField('');
                    }}
                    onChangeText={handleChange('ein')}
                    placeholder="Enter EIN"
                    placeholderTextColor={colors.placeholderText}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    value={values.ein}
                    leftIcon={appIcons?.businessIcon}
                    containerStyle={[
                      styles.input,
                      focusedField === 'ein' && styles.focusedInput,
                    ]}
                  />
                  {errors.ein && touched.ein && (
                    <Text style={styles.error}>{errors.ein}</Text>
                  )}
                </View>
                <View style={styles.field}>
                  <SelectableTextInput
                    title="BUSINESS TYPE"
                    businessType={true}
                    textInputTitle={true}
                    labelTitle={'Business Type'}
                    staric={true}
                    data={typeData}
                    leftIcon={appIcons?.businessIcon}
                    rightIcon
                    placeholder="Select"
                    formik={{setFieldValue}}
                    field={{
                      name: 'businessType',
                      value: values.businessType.type,
                      onChange: handleChange('businessType'),
                      onBlur: () => handleBlur('businessType'),
                    }}
                    formValues={values?.businessType}
                    onContinuePress={(selectedId, selectedLabel) => {
                      console.log('SelectedID: ', selectedId);
                      console.log('selectedValue: ', selectedLabel);
                      setFieldValue('businessType', {
                        id: selectedId,
                        type: selectedLabel,
                      });
                      setSelectedBusinessLabel(selectedLabel);
                      console.log('label: ', selectedLabel);

                      const selectedType = typeData.find(
                        item => item.value === selectedId,
                      );

                      if (selectedType) {
                        const formattedSub = selectedType.subCategories.map(
                          sub => ({
                            label: sub,
                            value: sub,
                          }),
                        );
                        setSubCategoryData(formattedSub);
                        setFieldValue('subCategory', ''); // Clear previous sub-category
                      }
                    }}
                  />
                  {errors.businessType && touched.businessType && (
                    <Text style={styles.error}>{errors.businessType}</Text>
                  )}
                </View>

                <View style={styles.field}>
                  <SelectableTextInput
                    title="BUSINESS SUB CATEGORY"
                    subCategory={true}
                    textInputTitle={true}
                    labelTitle={'Business Sub Category'}
                    staric={true}
                    disabled={!values.businessType}
                    data={subCategoryData}
                    leftIcon={appIcons?.businessIcon}
                    rightIcon
                    placeholder="Select"
                    formik={{setFieldValue}}
                    field={{
                      name: 'subCategory',
                      value: values.subCategory,
                      onChange: handleChange('subCategory'),
                      onBlur: handleBlur('subCategory'),
                    }}
                    onContinuePress={value => {
                      setFieldValue('subCategory', value);
                      console.log('subCategory:', value);
                    }}
                  />
                  {!values?.businessType && (
                    <Text style={styles.error}>
                      You must select a 'Business Type' to access Sub-categories
                    </Text>
                  )}
                  {errors.subCategory && touched.subCategory && (
                    <Text style={styles.error}>{errors.subCategory}</Text>
                  )}
                </View>

                <View style={styles.field}>
                  <CustomTextAreaInput
                    textInputTitle={true}
                    multiline
                    label
                    staric={true}
                    labelTitle={'About Us'}
                    onFocus={() => setFocusedField('about')}
                    onBlur={() => {
                      handleBlur('about');
                      setFocusedField('');
                    }}
                    onChangeText={handleChange('about')}
                    placeholder="Enter About Us"
                    placeholderTextColor={colors?.placeholderText}
                    autoCapitalize="none"
                    value={values.about}
                    leftIcon={appIcons?.jobDescriptionIcon}
                    containerStyle={[
                      styles.input,
                      focusedField === 'about' && styles.focusedInput,
                      {borderRadius: 15},
                    ]}
                  />
                  {errors.about && touched.about && (
                    <Text style={styles.error}>{errors.about}</Text>
                  )}
                </View>

                <View style={styles.field}>
                  <CustomPhoneInput
                    textInputTitle={true}
                    staric={true}
                    labelTitle={'Phone Number'}
                    setValue={value => setFieldValue('phoneNumber', value)}
                    placeholder="Enter Phone Number"
                    placeholderTextColor={colors.placeholderText}
                    valid={valid}
                    showMessage={showMessage}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    value={values.phoneNumber}
                    containerStyle={[
                      styles.input,
                      focusedField === 'phoneNumber' && styles.focusedInput,
                    ]}
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <Text style={styles.error}>{errors.phoneNumber}</Text>
                  )}
                </View>

                <View style={styles.field}>
                  <CustomTextInput
                    textInputTitle={true}
                    labelTitle={'Website'}
                    onFocus={() => setFocusedField('website')}
                    onBlur={() => {
                      handleBlur('website');
                      setFocusedField('');
                    }}
                    onChangeText={handleChange('website')}
                    placeholder="Enter Website"
                    placeholderTextColor={colors.placeholderText}
                    autoCapitalize="none"
                    value={values.website}
                    leftIcon={appIcons?.businessIcon}
                    containerStyle={[
                      styles.input,
                      focusedField === 'website' && styles.focusedInput,
                    ]}
                  />
                  {errors.website && touched.website && (
                    <Text style={styles.error}>{errors.website}</Text>
                  )}
                </View>
                <View style={styles.field}>
                  <CustomTextInput
                    textInputTitle={true}
                    labelTitle={'Tiktok'}
                    onFocus={() => setFocusedField('tiktok')}
                    onBlur={() => {
                      handleBlur('tiktok');
                      setFocusedField('');
                    }}
                    onChangeText={handleChange('tiktok')}
                    placeholder="Enter Tiktok"
                    placeholderTextColor={colors.placeholderText}
                    autoCapitalize="none"
                    value={values.tiktok}
                    Iconcolor={colors?.iconColor}
                    leftIcon={appIcons?.tiktok}
                    containerStyle={[
                      styles.input,
                      focusedField === 'tiktok' && styles.focusedInput,
                    ]}
                  />
                  {errors.tiktok && touched.tiktok && (
                    <Text style={styles.error}>{errors.tiktok}</Text>
                  )}
                </View>
                <View style={styles.field}>
                  <CustomTextInput
                    textInputTitle={true}
                    labelTitle={'Facebook'}
                    onFocus={() => setFocusedField('facebook')}
                    onBlur={() => {
                      handleBlur('facebook');
                      setFocusedField('');
                    }}
                    onChangeText={handleChange('facebook')}
                    placeholder="Enter Facebook Link"
                    placeholderTextColor={colors.placeholderText}
                    autoCapitalize="none"
                    value={values.facebook}
                    leftIcon={appIcons?.jobFacebook}
                    containerStyle={[
                      styles.input,
                      focusedField === 'facebook' && styles.focusedInput,
                    ]}
                  />
                  {errors.facebook && touched.facebook && (
                    <Text style={styles.error}>{errors.facebook}</Text>
                  )}
                </View>

                <View style={styles.field}>
                  <CustomTextInput
                    textInputTitle={true}
                    labelTitle={'Instagram'}
                    onFocus={() => setFocusedField('instagram')}
                    onBlur={() => {
                      handleBlur('instagram');
                      setFocusedField('');
                    }}
                    onChangeText={handleChange('instagram')}
                    placeholder="Enter Instagram Link"
                    placeholderTextColor={colors.placeholderText}
                    autoCapitalize="none"
                    leftIcon={appIcons?.instagram}
                    Iconcolor={colors?.iconColor}
                    value={values.instagram}
                    containerStyle={[
                      styles.input,
                      focusedField === 'instagram' && styles.focusedInput,
                    ]}
                  />
                  {errors.instagram && touched.instagram && (
                    <Text style={styles.error}>{errors.instagram}</Text>
                  )}
                </View>

                <View style={[styles?.hr, {width: '100%'}]} />
                <View style={{marginTop: 5, marginBottom: 10}}>
                  <CustomText
                    text={'BUSINESS ADDRESS'}
                    font={family?.Gilroy_SemiBold}
                    size={size?.h6}
                    color={colors?.headingText}
                    numberOfLines={1}
                  />
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
                    initialAddress={values.location?.address}
                  />
                  {errors.location?.address && touched.location?.address && (
                    <Text style={styles.error}>{errors.location.address}</Text>
                  )}
                </View>
                <View style={styles.field}>
                  <CustomTextInput
                    textInputTitle={true}
                    staric={true}
                    labelTitle={'Address 01'}
                    onFocus={() => setFocusedField('addressLineOne')}
                    onBlur={() => {
                      handleBlur('addressLineOne');
                      setFocusedField('');
                    }}
                    onChangeText={handleChange('addressLineOne')}
                    placeholder="Enter Address Line 01"
                    placeholderTextColor={colors.placeholderText}
                    autoCapitalize="none"
                    value={values.addressLineOne}
                    leftIcon={appIcons.gender}
                    containerStyle={[
                      styles.input,
                      focusedField === 'addressLineOne' && styles.focusedInput,
                    ]}
                  />
                  {errors.addressLineOne && touched.addressLineOne && (
                    <Text style={styles.error}>{errors.addressLineOne}</Text>
                  )}
                </View>
                <View style={styles.field}>
                  <CustomTextInput
                    textInputTitle={true}
                    staric={true}
                    labelTitle={'Address 02'}
                    onFocus={() => setFocusedField('addressLineTwo')}
                    onBlur={() => {
                      handleBlur('addressLineTwo');
                      setFocusedField('');
                    }}
                    onChangeText={handleChange('addressLineTwo')}
                    placeholder="Enter Address Line 02"
                    placeholderTextColor={colors.placeholderText}
                    autoCapitalize="none"
                    value={values.addressLineTwo}
                    leftIcon={appIcons.gender}
                    containerStyle={[
                      styles.input,
                      focusedField === 'addressLineTwo' && styles.focusedInput,
                    ]}
                  />
                  {errors.addressLineTwo && touched.addressLineTwo && (
                    <Text style={styles.error}>{errors.addressLineTwo}</Text>
                  )}
                </View>
                <View style={styles.field}>
                  <CustomTextInput
                    textInputTitle={true}
                    staric={true}
                    labelTitle={'Zip Code'}
                    onFocus={() => setFocusedField('zipCode')}
                    onBlur={() => {
                      handleBlur('zipCode');
                      setFocusedField('');
                    }}
                    onChangeText={handleChange('zipCode')}
                    placeholder="Enter Zip Code"
                    placeholderTextColor={colors.placeholderText}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    value={values.zipCode}
                    leftIcon={appIcons.gender}
                    containerStyle={[
                      styles.input,
                      focusedField === 'zipCode' && styles.focusedInput,
                    ]}
                  />
                  {errors.zipCode && touched.zipCode && (
                    <Text style={styles.error}>{errors.zipCode}</Text>
                  )}
                </View>

                <View style={styles.field}>
                  <CustomMultiImagePicker
                    handleImage={imageArray => {
                      handleImage(imageArray);
                      setFieldValue('gallery', imageArray);
                    }}
                    labelTitle="Upload Images"
                    staric={true}
                    title="Add Image"
                    initialImages={values?.gallery}
                    onRemoveOldImage={removed => {
                      setRemovedOldImages(removed);
                      LOG('Removed Old Images: ', removed);
                    }}
                  />
                  {errors.gallery && touched.gallery && (
                    <Text style={styles.error}>{errors.gallery}</Text>
                  )}
                </View>
                <View
                  style={{
                    marginTop: height * 0.03,
                    marginBottom: height * 0.16,
                  }}>
                  {editLoading ? (
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
            </View>
          </CustomBackground>
        );
      }}
    </Formik>
  );
};

export default EditBusinessProfile;

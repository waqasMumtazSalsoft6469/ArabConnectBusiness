// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   Dimensions,
//   ScrollView,
//   Alert,
//   TouchableOpacity,
// } from 'react-native';
// import {Formik} from 'formik';
// import * as Yup from 'yup';
// import CustomTextInput, {
//   CustomTextAreaInput,
// } from '../../../components/CustomTextInput';
// import {colors} from '../../../utils/Colors';
// import {family, size, vh} from '../../../utils';
// import styles from '../EditProfile/styles';
// import CustomButton from '../../../components/CustomButton';
// import {appIcons} from '../../../assets';
// import NavService from '../../../helpers/NavService';
// import AppBackground from '../../../components/AppBackground';
// import {SelectList} from 'react-native-dropdown-select-list';
// import CustomText from '../../../components/CustomText';
// import CustomMultiImagePicker from '../../../components/CustomMultiImagePicker';

// const {width, height} = Dimensions.get('screen');
// const SignupSchema = Yup.object().shape({
//   product_name: Yup.string().required('Product Name is required'),
//   images: Yup.array()
//     .min(1, 'At least one image is required')
//     .required('At least one image is required'),
//   price: Yup.string().required('Price is required'),
//   variation: Yup.string().required('Variation is required'),
//   //   variation: Yup.string().required('Variation is required'),
//   quantity: Yup.string().required('Quantity is required'),
//   description: Yup.string().required('Description is required'),
//   rewardPoints: Yup.string().required('Reward Points are required'),
// });

// const data = [
//   {key: '1', value: 'Small'},
//   {key: '2', value: 'Medium'},
//   {key: '3', value: 'Large'},
// ];
// const quantityData = [
//   {key: '1', value: '10'},
//   {key: '2', value: '20'},
//   {key: '3', value: '30'},
// ];

// const EditProduct = () => {
//   const [focusedField, setFocusedField] = useState('');
//   const [images, setImages] = useState([]);
//   //   const [showCustomVariation, setShowCustomVariation] = useState(false);

//   const handleImage = imageArray => {
//     setImages(imageArray);
//   };

//   const handleEdit = values => {
//     Alert.alert('Thank you for contacting us. We will get back to you shortly');
//     // NavService?.navigate('DrawerStack');
//   };
//   return (
//     <Formik
//       initialValues={{
//         product_name: '',
//         images: '',
//         price: '',
//         variation: '',
//         customVariation: '',
//         quantity: '',
//         description: '',
//         rewardPoints: '',
//       }}
//       validationSchema={SignupSchema}
//       onSubmit={handleEdit}>
//       {({
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         values,
//         errors,
//         touched,
//         setFieldValue,
//       }) => (
//         <AppBackground back={true} title={'ADD PRODUCT'} notification>
//           <View style={{paddingHorizontal: 15, marginTop: height * 0.03}}>
//             <ScrollView showsVerticalScrollIndicator={false}>
//               <View style={styles.field}>
//                 <CustomTextInput
//                   textInputTitle={true}
//                   staric={true}
//                   labelTitle={'Product Name'}
//                   onFocus={() => setFocusedField('product_name')}
//                   onBlur={() => {
//                     handleBlur('product_name');
//                     setFocusedField('');
//                   }}
//                   onChangeText={handleChange('product_name')}
//                   placeholder="Enter Product Name"
//                   placeholderTextColor={colors?.placeholderText}
//                   autoCapitalize="none"
//                   value={values.product_name}
//                   containerStyle={[
//                     styles.input,
//                     focusedField === 'product_name' && styles.focusedInput,
//                   ]}
//                 />
//                 {errors.product_name && touched.product_name && (
//                   <Text style={styles.error}>{errors.product_name}</Text>
//                 )}
//               </View>

//               <View style={styles.field}>
//                 <CustomMultiImagePicker
//                   handleImage={imageArray => {
//                     handleImage(imageArray);
//                     setFieldValue('images', imageArray);
//                   }}
//                   labelTitle="Images"
//                   staric={true}
//                   title="Add Image"
//                 />
//                 {errors.images && touched.images && (
//                   <Text style={styles.error}>{errors.images}</Text>
//                 )}
//               </View>
//               <View style={styles.field}>
//                 <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
//                   <CustomText
//                     text={'Variation'}
//                     font={family?.Questrial_Regular}
//                     size={size?.large}
//                   />
//                   <CustomText
//                     text={'*'}
//                     font={family?.Questrial_Regular}
//                     size={size?.h5}
//                     color={colors?.red}
//                   />
//                 </View>
//                 <SelectList
//                   setSelected={value => setFieldValue('variation', value)}
//                   search={false}
//                   placeholder="Select"
//                   data={data}
//                   save="value"
//                   dropdownTextStyles={{color: colors?.text}}
//                   dropdownStyles={{
//                     borderWidth: 1,
//                     borderColor: colors?.primary,
//                   }}
//                   boxStyles={[
//                     styles?.input,
//                     focusedField === 'variation' && styles.focusedInput,
//                     {paddingVertical: 15, paddingHorizontal: 18},
//                   ]}
//                   inputStyles={{
//                     color: colors?.placeholderText,
//                     fontSize: size?.medium,
//                     fontFamily: family?.Questrial_Regular,
//                   }}
//                 />
//                 {errors.variation && touched.variation && (
//                   <Text style={styles.error}>{errors.variation}</Text>
//                 )}

//                 {/* <TouchableOpacity
//                   onPress={() => setShowCustomVariation(!showCustomVariation)}
//                   style={{
//                     alignSelf: 'flex-end',
//                     padding: 5,
//                   }}>
//                   <CustomText
//                     text={
//                       showCustomVariation
//                         ? 'Cancel'
//                         : '+ ADD Variation'.toUpperCase()
//                     }
//                     font={family?.Gilroy_SemiBold}
//                     size={showCustomVariation ? size?.large : size?.small}
//                     color={colors?.secondary}
//                     underline
//                   />
//                 </TouchableOpacity>
//                 {showCustomVariation && (
//                   <>
//                     <CustomTextInput
//                       textInputTitle={true}
//                     //   staric={true}
//                       labelTitle={'Custom Variation'}
//                       onFocus={() => setFocusedField('customVariation')}
//                       onBlur={() => {
//                         handleBlur('customVariation');
//                         setFocusedField('');
//                       }}
//                       onChangeText={handleChange('customVariation')}
//                       placeholder="Enter Custom Variation"
//                       placeholderTextColor={colors?.placeholderText}
//                       autoCapitalize="none"
//                       value={values.customVariation}
//                       containerStyle={[
//                         styles.input,
//                         focusedField === 'customVariation' &&
//                           styles.focusedInput,
//                       ]}
//                     />
//                     {errors.customVariation && touched.customVariation && (
//                       <Text style={styles.error}>{errors.customVariation}</Text>
//                     )}
//                   </>
//                 )} */}
//               </View>
//               <View style={styles.field}>
//                 <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
//                   <CustomText
//                     text={'Quantity'}
//                     font={family?.Questrial_Regular}
//                     size={size?.large}
//                   />
//                   <CustomText
//                     text={'*'}
//                     font={family?.Questrial_Regular}
//                     size={size?.h5}
//                     color={colors?.red}
//                   />
//                 </View>
//                 <SelectList
//                   setSelected={value => setFieldValue('quantity', value)}
//                   search={false}
//                   placeholder="Select"
//                   data={quantityData}
//                   save="value"
//                   dropdownTextStyles={{color: colors?.text}}
//                   dropdownStyles={{
//                     borderWidth: 1,
//                     borderColor: colors?.primary,
//                   }}
//                   boxStyles={[
//                     styles?.input,
//                     focusedField === 'quantity' && styles.focusedInput,
//                     {paddingVertical: 15, paddingHorizontal: 18},
//                   ]}
//                   inputStyles={{
//                     color: colors?.placeholderText,
//                     fontSize: size?.medium,
//                     fontFamily: family?.Questrial_Regular,
//                   }}
//                 />
//                 {errors.quantity && touched.quantity && (
//                   <Text style={styles.error}>{errors.quantity}</Text>
//                 )}
//               </View>

//               <View style={styles.field}>
//                 <CustomTextInput
//                   textInputTitle={true}
//                   staric={true}
//                   labelTitle={'Price'}
//                   onFocus={() => setFocusedField('price')}
//                   onBlur={() => {
//                     handleBlur('price');
//                     setFocusedField('');
//                   }}
//                   onChangeText={handleChange('price')}
//                   placeholder="Enter Price"
//                   placeholderTextColor={colors?.placeholderText}
//                   autoCapitalize="none"
//                   value={values.price}
//                   containerStyle={[
//                     styles.input,
//                     focusedField === 'price' && styles.focusedInput,
//                   ]}
//                 />
//                 {errors.price && touched.price && (
//                   <Text style={styles.error}>{errors.price}</Text>
//                 )}
//               </View>

//               <View style={styles.field}>
//                 <CustomTextAreaInput
//                   textInputTitle={true}
//                   numberOfLines={5}
//                   label
//                   staric={true}
//                   labelTitle={'Description'}
//                   onFocus={() => setFocusedField('description')}
//                   onBlur={() => {
//                     handleBlur('description');
//                     setFocusedField('');
//                   }}
//                   onChangeText={handleChange('description')}
//                   placeholder="Enter Description Here!"
//                   placeholderTextColor={colors?.placeholderText}
//                   autoCapitalize="none"
//                   value={values.description}
//                   containerStyle={[
//                     styles.input,
//                     focusedField === 'description' && styles.focusedInput,
//                     {borderRadius: 15},
//                   ]}
//                 />
//                 {errors.description && touched.description && (
//                   <Text style={styles.error}>{errors.description}</Text>
//                 )}
//               </View>
//               <View style={styles.field}>
//                 <CustomTextInput
//                   textInputTitle={true}
//                   staric={true}
//                   labelTitle={'Reward Points (Product Purchase)'}
//                   onFocus={() => setFocusedField('rewardPoints')}
//                   onBlur={() => {
//                     handleBlur('rewardPoints');
//                     setFocusedField('');
//                   }}
//                   onChangeText={handleChange('rewardPoints')}
//                   placeholder="Reward Points used to purchase product"
//                   placeholderTextColor={colors?.placeholderText}
//                   autoCapitalize="none"
//                   value={values.rewardPoints}
//                   containerStyle={[
//                     styles.input,
//                     focusedField === 'rewardPoints' && styles.focusedInput,
//                   ]}
//                 />
//                 {errors.rewardPoints && touched.rewardPoints && (
//                   <Text style={styles.error}>{errors.rewardPoints}</Text>
//                 )}
//               </View>
//               <View style={{marginTop: height * 0.02}}>
//                 <CustomButton
//                   gradientColorArr={[colors.secondary, colors.secondary]}
//                   title={'SEND NOW'}
//                   customWidth={width - 55}
//                   buttonStyle={{alignSelf: 'center', borderRadius: 50}}
//                   textStyle={{fontSize: size.large}}
//                   onPress={handleSubmit}
//                 />
//               </View>
//             </ScrollView>
//           </View>
//         </AppBackground>
//       )}
//     </Formik>
//   );
// };

// export default EditProduct;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {FieldArray, Formik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput, {
  CustomTextAreaInput,
} from '../../../components/CustomTextInput';
import {colors} from '../../../utils/Colors';
import {family, size, vh} from '../../../utils';
import styles from '../EditProfile/styles';
import CustomButton from '../../../components/CustomButton';
import {appIcons, appImages} from '../../../assets';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import {SelectList} from 'react-native-dropdown-select-list';
import CustomText from '../../../components/CustomText';
import CustomMultiImagePicker from '../../../components/CustomMultiImagePicker';
import ImagePicker2 from '../../../components/ImagePicker2';
import {
  extractFileName,
  getImageUrl,
  LOG,
  normalizeGallery,
} from '../../../utils/helperFunction';
import CustomRadioButton from '../../../components/CustomRadioButton';
import {useAddMutation, useEditMutation} from '../../../Api/productsApiSlice';
import {executeApiRequest} from '../../../Api/methods/method';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';

const {width, height} = Dimensions.get('screen');
const SignupSchema = Yup.object().shape({
  productName: Yup.string().required('Product Name is required'),
  gallery: Yup.array()
    .min(1, 'At least one image is required')
    .required('At least one image is required'),
  addVariations: Yup.string().required('Please select an option'),
  price: Yup.string().nullable(),
  variations: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Variation name is required'),
      price: Yup.string().required('Price is required'),
    }),
  ),
  conditionalField: Yup.mixed().test(
    'required-based-on-radio',
    'Required field missing',
    function (_, context) {
      const {addVariations, price, variations} = this.parent;

      if (addVariations === 'yes' && (!variations || variations.length === 0)) {
        return this.createError({
          path: 'variations',
          message: 'Please add at least one variation',
        });
      }
      if (addVariations === 'no' && !price) {
        return this.createError({
          path: 'price',
          message: 'Please enter price',
        });
      }

      return true;
    },
  ),

  description: Yup.string().required('Description is required'),
  rewardPoints: Yup.string().required('Reward Points are required'),
  pointsRequired: Yup.string().required(
    'Points required to purchase are required',
  ),
  requiredShopditPoints: Yup.string().optional(),
  // requiredShopditPoints: Yup.string().required(
  //   'Shopdit Points required to purchase are required',
  // ),
  image: Yup.object()
    .nullable()
    .test('is-valid-image', 'Image is required', value => value !== ''),
});

const EditProduct = ({route}) => {
  const eventDetails = route?.params;
  LOG('EDIT PARAMS: ', eventDetails?.eventDetails);
  const [selectedImage, setSelectedImage] = useState(null);
  const [removedOldImages, setRemovedOldImages] = useState([]);
  const [focusedField, setFocusedField] = useState('');
  const [images, setImages] = useState([]);
  const [edit, {isLoading}] = useEditMutation();
  const userDetails = useSelector(state => state?.auth?.user || {});
  const businessId = userDetails?.activeProfile || null;
  let item = eventDetails?.eventDetails;
  const handleImage = imageArray => {
    setImages(imageArray);
  };

  const handleEdit = async values => {
    const safeTrim = val =>
      typeof val === 'string' ? val.trim() : String(val || '').trim();

    const removedImageNames = removedOldImages.map(img => {
      // Split the URI and get the last part (filename)
      return img.uri.split('/').pop();
    });

    // Construct base payload
    let payload = {
      ...values,
      businessProfile: businessId,
      oldImages: removedImageNames,
    };

    // Remove fields not needed in API payload
    delete payload.addVariations;
    delete payload.conditionalField;

    // Clean variations: remove `_id` from each variation
    if (Array.isArray(payload.variations)) {
      payload.variations = payload.variations.map(({_id, ...rest}) => rest);
    }

    // Check if price is valid
    const hasPrice = !!safeTrim(payload.price);

    // Check if variations are valid
    const hasValidVariations =
      Array.isArray(payload.variations) &&
      payload.variations.some(
        item => safeTrim(item?.name) && safeTrim(item?.price),
      );

    // Apply conditional inclusion
    if (hasPrice) {
      delete payload.variations;
    } else if (hasValidVariations) {
      delete payload.price;
    } else {
      Alert.alert(
        'Error',
        'Please enter either a product price or valid variations.',
      );
      return; // Stop further execution
    }
    LOG('PAYLOAD: ', payload);
    const response = await executeApiRequest({
      apiCallFunction: edit,
      body: payload,
      params: {id: item?._id},
      formData: true,
      toast: true,
      timeout: 30000,
    });

    LOG('Product Add Success:', response);
    NavService.navigate('myProducts');
  };
  return (
    <Formik
      initialValues={{
        productName: item?.productName || '',
        image: null,
        pointsRequired: item?.pointsRequired.toString() || '',
        gallery: normalizeGallery(item?.gallery),
        addVariations: item?.price ? 'no' : 'yes',
        variations: item?.variations || [],
        price: item?.price?.toString() || '',
        conditionalField: '',
        description: item?.description || '',
        rewardPoints: item?.rewardPoints.toString() || '',
        requiredShopditPoints: item?.requiredShopditPoints.toString() || '',
      }}
      validationSchema={SignupSchema}
      onSubmit={handleEdit}
      validateOnChange={true}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
      }) => (
        <AppBackground back={true} title={'EDIT PRODUCT'} notification>
          <View style={{paddingHorizontal: 15, marginTop: height * 0.03}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Product Name'}
                  onFocus={() => setFocusedField('productName')}
                  onBlur={() => {
                    handleBlur('productName');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('productName')}
                  placeholder="Enter Product Name"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.productName}
                  containerStyle={[
                    styles.input,
                    focusedField === 'productName' && styles.focusedInput,
                  ]}
                />
                {errors.productName && touched.productName && (
                  <Text style={styles.error}>{errors.productName}</Text>
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
                          resizeMode: 'cover',
                        }}
                      />
                    ) : (
                      <>
                        {item.image ? (
                          <FastImage
                            source={getImageUrl(item?.image)}
                            style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: 50,
                            }}
                            resizeMode="contain"
                            defaultSource={appImages?.placeholder}
                          />
                        ) : (
                          <View style={{alignItems: 'center'}}>
                            <Image
                              source={appIcons?.upload}
                              style={{
                                width: 35,
                                height: 35,
                                resizeMode: 'contain',
                              }}
                            />
                            <CustomText
                              text={'Upload Product Image'}
                              font={family?.Gilroy_SemiBold}
                              size={size?.xxlarge}
                              underline={true}
                            />
                          </View>
                        )}
                      </>
                    )}
                  </TouchableOpacity>
                </ImagePicker2>
                {errors.image && touched.image && (
                  <Text style={[styles.error, {marginTop: -height * 0.005}]}>
                    {errors.image}
                  </Text>
                )}
              </View>

              <View style={styles.field}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 20,
                    alignItems: 'center',
                  }}>
                  <CustomText
                    text={'Do you want to add variations?'}
                    font={family?.Gilroy_Medium}
                    size={size?.large}
                  />

                  <CustomText text="*" color={colors?.red} size={size?.h6} />
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <CustomRadioButton
                    label="Yes"
                    selected={values.addVariations === 'yes'}
                    onPress={() => {
                      setFieldValue('addVariations', 'yes');
                      setFieldTouched('addVariations', true);
                      setFieldValue('price', ''); // reset price
                      setFieldValue('variations', [
                        {name: '', price: ''}, // initialize one variation row
                      ]);
                    }}
                  />
                  <CustomRadioButton
                    label="No"
                    selected={values.addVariations === 'no'}
                    onPress={() => {
                      setFieldValue('addVariations', 'no');
                      setFieldTouched('addVariations', true);
                      setFieldValue('variations', []); // just clear variations array (not a string!)
                      setFieldValue('variationPrice', ''); // reset variation price field too if needed
                    }}
                  />
                </View>
                {errors.addVariations && touched.addVariations && (
                  <Text style={styles.error}>{errors.addVariations}</Text>
                )}
              </View>
              {values.addVariations === 'yes' &&
                Array.isArray(values.variations) && (
                  <View style={styles?.field}>
                    {values.variations.map((variation, index) => (
                      <View key={index}>
                        <CustomTextInput
                          textInputTitle={true}
                          labelTitle={`Variation ${index + 1}`}
                          staric
                          placeholder="Enter variation name"
                          placeholderTextColor={colors?.placeholderText}
                          value={variation.name}
                          onChangeText={text => {
                            const updated = [...values.variations];
                            updated[index].name = text;
                            setFieldValue('variations', updated);
                          }}
                          onBlur={() => handleBlur(`variations[${index}].name`)}
                          containerStyle={[
                            styles.input,
                            errors.variations?.[index]?.name &&
                            touched.variations?.[index]?.name
                              ? {marginBottom: 0}
                              : {marginBottom: 10},
                          ]}
                        />
                        {errors.variations?.[index]?.name &&
                          touched.variations?.[index]?.name && (
                            <Text style={[styles.error, {marginBottom: 10}]}>
                              {errors.variations[index].name}
                            </Text>
                          )}

                        <CustomTextInput
                          textInputTitle={true}
                          labelTitle="Variation Price"
                          staric
                          placeholder="Enter price"
                          placeholderTextColor={colors?.placeholderText}
                          keyboardType="numeric"
                          value={variation.price.toString()}
                          onChangeText={text => {
                            const updated = [...values.variations];
                            updated[index].price = text;
                            setFieldValue('variations', updated);
                          }}
                          onBlur={() =>
                            handleBlur(`variations[${index}].price`)
                          }
                          containerStyle={styles.input}
                        />
                        {errors.variations?.[index]?.price &&
                          touched.variations?.[index]?.price && (
                            <Text style={[styles.error, {marginBottom: 10}]}>
                              {errors.variations[index].price}
                            </Text>
                          )}

                        <TouchableOpacity
                          onPress={() => {
                            const updated = values.variations.filter(
                              (_, i) => i !== index,
                            );
                            setFieldValue('variations', updated);
                          }}
                          style={styles.removeButton}>
                          <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    ))}

                    <TouchableOpacity
                      onPress={() =>
                        setFieldValue('variations', [
                          ...values.variations,
                          {name: '', price: ''},
                        ])
                      }
                      style={styles.addButton}>
                      <Text style={styles.addButtonText}>+ Add Variation</Text>
                    </TouchableOpacity>
                  </View>
                )}

              {values.addVariations === 'no' && (
                <View style={styles.field}>
                  <CustomTextInput
                    textInputTitle
                    staric
                    labelTitle="Price"
                    onFocus={() => setFocusedField('price')}
                    onBlur={() => {
                      handleBlur('price');
                      setFocusedField('');
                    }}
                    onChangeText={handleChange('price')}
                    placeholder="Enter Price"
                    placeholderTextColor={colors.placeholderText}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    value={values.price}
                    containerStyle={[
                      styles.input,
                      focusedField === 'price' && styles.focusedInput,
                    ]}
                  />
                  {errors.price && touched.price && (
                    <Text style={styles.error}>{errors.price}</Text>
                  )}
                </View>
              )}

              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Points Required (Product Purchase)'}
                  onFocus={() => setFocusedField('pointsRequired')}
                  onBlur={() => {
                    handleBlur('pointsRequired');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('pointsRequired')}
                  placeholder="Points used to purchase product"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.pointsRequired}
                  keyboardType="numeric"
                  containerStyle={[
                    styles.input,
                    focusedField === 'pointsRequired' && styles.focusedInput,
                  ]}
                />
                {errors.pointsRequired && touched.pointsRequired && (
                  <Text style={styles.error}>{errors.pointsRequired}</Text>
                )}
              </View>

              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={false}
                  labelTitle={'Shopdit Points Required (Product Purchase)'}
                  onFocus={() => setFocusedField('requiredShopditPoints')}
                  onBlur={() => {
                    handleBlur('requiredShopditPoints');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('requiredShopditPoints')}
                  placeholder="Shopdit Points used to purchase product"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  keyboardType="numeric"
                  value={values.requiredShopditPoints}
                  containerStyle={[
                    styles.input,
                    focusedField === 'requiredShopditPoints' &&
                      styles.focusedInput,
                  ]}
                />
                {errors.requiredShopditPoints &&
                  touched.requiredShopditPoints && (
                    <Text style={styles.error}>
                      {errors.requiredShopditPoints}
                    </Text>
                  )}
              </View>

              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Reward Points Earned'}
                  onFocus={() => setFocusedField('rewardPoints')}
                  onBlur={() => {
                    handleBlur('rewardPoints');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('rewardPoints')}
                  placeholder="Reward Points earned when purchased product"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  keyboardType="numeric"
                  value={values.rewardPoints}
                  containerStyle={[
                    styles.input,
                    focusedField === 'rewardPoints' && styles.focusedInput,
                  ]}
                />
                {errors.rewardPoints && touched.rewardPoints && (
                  <Text style={styles.error}>{errors.rewardPoints}</Text>
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
              <View style={styles.field}>
                <CustomMultiImagePicker
                  handleImage={imageArray => {
                    handleImage(imageArray);
                    setFieldValue('gallery', imageArray);
                  }}
                  labelTitle="Gallery"
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

              <View style={{marginTop: height * 0.02}}>
                {isLoading ? (
                  <ActivityLoader color={colors2.theme.secondary} />
                ) : (
                  <CustomButton
                    gradientColorArr={[colors.secondary, colors.secondary]}
                    title={'UPDATE PRODUCT'}
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

export default EditProduct;

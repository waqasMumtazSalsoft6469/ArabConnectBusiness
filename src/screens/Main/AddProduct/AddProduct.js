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
import {appIcons} from '../../../assets';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import {SelectList} from 'react-native-dropdown-select-list';
import CustomText from '../../../components/CustomText';
import CustomMultiImagePicker from '../../../components/CustomMultiImagePicker';
import ImagePicker2 from '../../../components/ImagePicker2';
import {extractFileName, LOG} from '../../../utils/helperFunction';
import CustomRadioButton from '../../../components/CustomRadioButton';
import {useAddMutation} from '../../../Api/productsApiSlice';
import {executeApiRequest} from '../../../Api/methods/method';
import {useSelector} from 'react-redux';
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
    .required('Image is required')
    .test('is-valid-image', 'Image is required', value => value !== ''),
});

const AddProduct = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [focusedField, setFocusedField] = useState('');
  const [images, setImages] = useState([]);
  const [add, {isLoading}] = useAddMutation();
  const userDetails = useSelector(state => state?.auth?.user || {});
  const businessId = userDetails?.activeProfile || null;

  const handleImage = imageArray => {
    setImages(imageArray);
  };

  const handleEdit = async values => {
    let payload = {
      ...values,
      businessProfile: businessId,
    };

    // Remove fields not needed in payload
    delete payload.addVariations;
    delete payload.conditionalField;

    // Handle conditional inclusion of price or variations
    const hasPrice = !!payload.price?.trim();
    const hasValidVariations =
      Array.isArray(payload.variations) &&
      payload.variations.some(
        item => item?.name?.trim() && item?.price?.trim(),
      );

    if (hasPrice) {
      delete payload.variations;
    } else if (hasValidVariations) {
      delete payload.price;
    } else {
      Alert.alert('Variations or Product price missing!');
    }

    LOG('PAYLOAD:', payload);

    const response = await executeApiRequest({
      apiCallFunction: add,
      body: payload,
      formData: true,
      toast: true,
      timeout: 30000,
    });

    LOG('Product Add Success:', response);
    NavService.goBack();
    // Alert.alert('asdsa');
  };
  return (
    <Formik
      initialValues={{
        productName: '',
        image: '',
        pointsRequired: '',
        gallery: '',
        addVariations: 'no',
        variations: [],
        price: '',
        conditionalField: '',
        description: '',
        rewardPoints: '',
        requiredShopditPoints: '',
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
        <AppBackground back={true} title={'ADD PRODUCT'} notification>
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
                          resizeMode: 'contain',
                        }}
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
                          value={variation.price}
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
                />
                {errors.gallery && touched.gallery && (
                  <Text style={styles.error}>{errors.gallery}</Text>
                )}
              </View>

              <View
                style={{marginTop: height * 0.02, marginBottom: height * 0.02}}>
                {isLoading ? (
                  <ActivityLoader color={colors2.theme.secondary} />
                ) : (
                  <CustomButton
                    gradientColorArr={[colors.secondary, colors.secondary]}
                    title={'ADD PRODUCT'}
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

export default AddProduct;

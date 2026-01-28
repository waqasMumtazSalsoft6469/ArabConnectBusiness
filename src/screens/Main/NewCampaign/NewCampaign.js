import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import AppBackground from '../../../components/AppBackground';
import CustomText from '../../../components/CustomText';
import CustomDatePicker from '../../../components/CustomDatePicker';
import {colors} from '../../../utils/Colors';
import {family, size, vh, vw} from '../../../utils';
import styles from '../EditProfile/styles';
import ActivityLoader from '../../../components/ActivityLoader';
import CouponForm from '../../../components/AddCouponForm';
import {executeApiRequest} from '../../../Api/methods/method';
import {useAddMutation} from '../../../Api/campaignApiSlice';
import NavService from '../../../helpers/NavService';
import {extractFileName, LOG} from '../../../utils/helperFunction';
import {useSelector} from 'react-redux';
import {SelectList} from 'react-native-dropdown-select-list';
import ImagePicker2 from '../../../components/ImagePicker2';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('screen');

const CampaignSchema = Yup.object().shape({
  title: Yup.string().required('Campaign Name is required'),
  membershipTier: Yup.string().required('Membership Tier is required'),
  startDate: Yup.string().required('Activation Date is required'),
  endDate: Yup.string().required('Expiry Date is required'),
  campaignThumbnail: Yup.object()
    .nullable()
    .required('Campaign Thumbnail is required')
    .test('is-valid-image', 'Image is required', value => value !== ''),
});

const NewCampaign = () => {
  const [isCouponModalVisible, setCouponModalVisible] = useState(false);

  const [couponList, setCouponList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // ✅ null = ADD mode

  const [add, {isLoading}] = useAddMutation();
  const [focusedField, setFocusedField] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const userDetails = useSelector(state => state?.auth?.user || {});
  const businessId = userDetails?.activeProfile || null;
  LOG('User Business ID:', businessId);

  const handleSubmitCampaign = async values => {
    if (couponList.length === 0) {
      Alert.alert('Missing Coupons', 'Please add at least one coupon.');
      return;
    }

    // // ✅ Step 1: Prepare coupons WITHOUT image (because images must be FormData files)
    const couponsForJson = couponList.map((c, i) => {
      const {image, ...rest} = c;
      return {
        ...rest,
        imageIndex: i, // let backend know this coupon's image index
      };
    });

    // ✅ Step 2: Build base payload
    const payload = {
      ...values,
      membershipTier: values?.membershipTier?.toLowerCase(),
      coupons: JSON.stringify(couponsForJson),
      businessId,
    };

    // ✅ Step 3: Add images separately because your jsonToFormdata won't catch them inside JSON
    couponList.forEach((c, index) => {
      payload[`couponImage_${index}`] = {
        uri: c.image.uri,
        name: c.image.name,
        type: c.image.type,
      };
    });

    LOG('✅ Final Campaign Payload:', payload);

    const response = await executeApiRequest({
      apiCallFunction: add,
      body: payload,
      formData: true,
      toast: true,
      timeout: 30000,
    });

    if (response) {
      NavService.goBack();
      // NavService.reset(0, [{name: 'campaign'}]);
    }
  };

  const openAddCoupon = () => {
    setEditingIndex(null);
    setCouponModalVisible(true);
  };

  const openEditCoupon = index => {
    setEditingIndex(index);
    setCouponModalVisible(true);
  };

  return (
    <Formik
      initialValues={{
        title: '',
        membershipTier: '',
        startDate: '',
        endDate: '',
        campaignThumbnail: null,
      }}
      validationSchema={CampaignSchema}
      onSubmit={handleSubmitCampaign}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <AppBackground back title={'Create New Campaign'}>
          <View style={{paddingHorizontal: 15, marginTop: height * 0.03}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles?.field}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 20,
                    marginBottom: 5,
                    alignItems: 'center',
                  }}>
                  <CustomText
                    text={'Campaign Thumbnail'}
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
                    setFieldValue('campaignThumbnail', imageObject);
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
                      </View>
                    )}
                  </TouchableOpacity>
                </ImagePicker2>
                {errors.campaignThumbnail && touched.campaignThumbnail && (
                  <Text style={[styles.error]}>{errors.campaignThumbnail}</Text>
                )}
              </View>
              {/* Campaign Name */}
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Campaign Name'}
                  onFocus={() => setFocusedField('title')}
                  onBlur={() => {
                    handleBlur('title');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('title')}
                  placeholder="Enter Campaign Name"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.title}
                  containerStyle={[
                    styles.input,
                    focusedField === 'title' && styles.focusedInput,
                  ]}
                />
                {errors.title && touched.title && (
                  <Text style={styles.error}>{errors.title}</Text>
                )}
              </View>

              <View style={styles.field}>
                <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
                  <CustomText
                    text={'Select Membership Tier'}
                    font={family?.Gilroy_Medium}
                    size={size?.large}
                  />
                  <CustomText
                    text={'*'}
                    font={family?.Gilroy_Medium}
                    size={size?.h5}
                    color={colors?.red}
                  />
                </View>

                {/* ✅ Static Dummy Segment Data */}
                <SelectList
                  setSelected={val => {
                    setFieldValue('membershipTier', val);
                  }}
                  data={[
                    {key: '1', value: 'Bronze'},
                    {key: '2', value: 'Silver'},
                    {key: '3', value: 'Gold'},
                    {key: '4', value: 'Platinum'},
                  ]}
                  placeholder="Choose a tier"
                  search={false}
                  save="value"
                  boxStyles={[
                    styles.input,
                    focusedField === 'membershipTier' && styles.focusedInput,
                    {paddingVertical: 15, paddingHorizontal: 18},
                  ]}
                  dropdownStyles={{
                    borderWidth: 1,
                    borderColor: colors.primary,
                    backgroundColor: colors.background,
                  }}
                  inputStyles={{
                    color: colors.text,
                    fontSize: size.medium,
                    fontFamily: family.Questrial_Regular,
                  }}
                  dropdownTextStyles={{
                    color: colors.text,
                    fontSize: size.medium,
                  }}
                  onFocus={() => setFocusedField('membershipTier')}
                  onBlur={() => {
                    setFocusedField('');
                    handleBlur('membershipTier');
                  }}
                />

                {errors.membershipTier && touched.membershipTier && (
                  <Text style={styles.error}>{errors.membershipTier}</Text>
                )}
              </View>

              <View style={styles.field}>
                <CustomDatePicker
                  title="Activation Date"
                  staric // Assuming this is 'starred' or similar
                  labelStyle={{marginLeft: 20}}
                  captureTime={true} // NEW: Enable time capture for this use case
                  date={values.startDate ? new Date(values.startDate) : null} // Works with full ISO
                  onDateChange={date =>
                    setFieldValue('startDate', date.toISOString())
                  } // NEW: Send full ISO, no split
                />
                {errors.startDate && touched.startDate && (
                  <Text style={styles.error}>{errors.startDate}</Text>
                )}
              </View>

              {/* Expiry Date */}
              <View style={styles.field}>
                <CustomDatePicker
                  title="Expiry Date"
                  staric
                  captureTime={true}
                  labelStyle={{marginLeft: 20}}
                  date={values.endDate ? new Date(values.endDate) : null}
                  onDateChange={date =>
                    setFieldValue('endDate', date.toISOString())
                  }
                />

                {errors.endDate && touched.endDate && (
                  <Text style={styles.error}>{errors.endDate}</Text>
                )}
              </View>

              {/* ✅ Show Coupons + Add/More Button */}
              <View style={{marginTop: 25, alignItems: 'center'}}>
                {couponList.length > 0 && (
                  <View style={{marginBottom: 15, width: width - 55}}>
                    {couponList.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => openEditCoupon(index)}
                        style={{
                          marginBottom: vh * 2,
                          backgroundColor: '#ffffff',
                          borderRadius: vw * 3,

                          // Ticket border left strip
                          borderLeftWidth: vw * 2,
                          borderLeftColor: '#1BC47D',

                          paddingVertical: vh * 2,
                          paddingHorizontal: vw * 4,

                          shadowColor: '#000',
                          shadowOpacity: 0.08,
                          shadowRadius: 6,
                          elevation: 3,
                        }}>
                        {/* TOP ROW */}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              fontSize: size.xlarge,
                              color: '#1BC47D',
                              fontFamily: family.Gilroy_Bold,
                            }}>
                            Coupon {index + 1}
                          </Text>

                          <Text
                            style={{
                              fontSize: size.default,
                              color: colors.primary,
                              fontFamily: family.Gilroy_Medium,
                            }}>
                            Tap to edit
                          </Text>
                        </View>

                        {/* DIVIDER WITH DASh (dotted perforation) */}
                        <View
                          style={{
                            borderBottomWidth: 1,
                            marginVertical: vh * 1.8,
                            borderStyle: 'dashed',
                            borderColor: 'rgba(0,0,0,0.15)',
                          }}
                        />

                        {/* BODY */}
                        <Text
                          style={{
                            fontSize: size.large,
                            color: '#222',
                            fontFamily: family.Gilroy_SemiBold,
                            marginBottom: vh * 1,
                          }}>
                          {item.couponName}
                        </Text>

                        {/* CHIP */}
                        <View
                          style={{
                            alignSelf: 'flex-start',
                            backgroundColor: '#EFFFF5',
                            paddingVertical: vh * 0.7,
                            paddingHorizontal: vw * 3,
                            borderRadius: vw * 3,
                            borderWidth: 1,
                            borderColor: 'rgba(27,196,125,0.3)',
                          }}>
                          <Text
                            style={{
                              fontSize: size.small,
                              color: '#1BC47D',
                              fontFamily: family.Gilroy_Medium,
                            }}>
                            Redemption Limit: {item.redemptionLimit}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                <CustomButton
                  title={
                    couponList.length > 0 ? 'Add Another Coupon' : 'Add Coupon'
                  }
                  gradientColorArr={[colors.primary, colors.primary]}
                  customWidth={width - 55}
                  onPress={openAddCoupon}
                />
              </View>

              {/* Submit Campaign Button */}
              <View
                style={{
                  marginTop: height * 0.01,
                  marginBottom: height * 0.02,
                  alignItems: 'center',
                }}>
                {isLoading ? (
                  <ActivityLoader />
                ) : (
                  <CustomButton
                    gradientColorArr={[colors.secondary, colors.secondary]}
                    title={'Create Campaign'}
                    customWidth={width - 55}
                    onPress={handleSubmit}
                  />
                )}
              </View>
            </ScrollView>

            {/* ✅ Coupon Modal */}
            <Modal visible={isCouponModalVisible} animationType="slide">
              <AppBackground
                back
                title={editingIndex === null ? 'Add Coupon' : 'Edit Coupon'}
                description={'This coupon will be part of the Campaign'}
                onBackPress={() => setCouponModalVisible(false)}>
                <CouponForm
                  initialValues={
                    editingIndex !== null ? couponList[editingIndex] : null
                  }
                  onSubmit={data => {
                    const cleaned = {...data};
                    delete cleaned.startDate;
                    delete cleaned.endDate;

                    if (editingIndex !== null) {
                      // ✅ UPDATE existing coupon
                      const updated = [...couponList];
                      updated[editingIndex] = cleaned;
                      setCouponList(updated);
                    } else {
                      // ✅ ADD new coupon
                      setCouponList(prev => [...prev, cleaned]);
                    }

                    setEditingIndex(null);
                    setCouponModalVisible(false);
                  }}
                  onCancel={() => {
                    setEditingIndex(null);
                    setCouponModalVisible(false);
                  }}
                />
              </AppBackground>
            </Modal>
          </View>
        </AppBackground>
      )}
    </Formik>
  );
};

export default NewCampaign;

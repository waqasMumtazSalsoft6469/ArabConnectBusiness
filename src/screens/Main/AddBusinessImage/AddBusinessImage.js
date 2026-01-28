import React, {useRef, useState} from 'react';
import {View, Dimensions, ScrollView, Text, Alert} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomBackground from '../../../components/CustomBackground';
import {colors} from '../../../utils/Colors';
import {family, size} from '../../../utils';

import CustomButton from '../../../components/CustomButton';

import NavService from '../../../helpers/NavService';
import CustomMultiImagePicker from '../../../components/CustomMultiImagePicker';
import styles from '../AddBusinessProfile/styles';
import {LOG} from '../../../utils/helperFunction';
import {
  useAddMutation,
  useFetchBusinessProfileIDQuery,
} from '../../../Api/businessApiSlice';
import {executeApiRequest} from '../../../Api/methods/method';
import BottomSheet from '../../../components/BottomSheet';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import {useDispatch, useSelector} from 'react-redux';
import {setAuth} from '../../../redux/slices/authSlice';

const {width, height} = Dimensions.get('screen');

const SignupSchema = Yup.object().shape({
  gallery: Yup.array()
    .min(1, 'At least one image is required')
    .required('At least one image is required'),
});

const AddBusinessImage = ({route}) => {
  const bottomSheetRef = useRef();
  const formValues = route?.params;
  const userDetails = useSelector(state => state?.auth?.user || {});
  LOG('UserDetails in State: ', userDetails);

  const [add, {isLoading}] = useAddMutation();
  // LOG('Form Values: ', formValues?.formValues);

  const dispatch = useDispatch();

  const {
    data,
    refetch,
    isLoading: businessLoad,
  } = useFetchBusinessProfileIDQuery({id: userDetails?._id});
  LOG('DATA: ', data);
  const handleSignup = async values => {
    LOG('Values: ', values);
    let otherData = formValues?.formValues;
    const payload = {...otherData, gallery: values?.gallery};
    LOG('PAYLOAD: ', payload);
    const response = await executeApiRequest({
      apiCallFunction: add,
      body: payload,
      formData: true,
      toast: true,
      timeout: 30000,
    });
    if (response) {
      if (!userDetails?.activeProfile) {
        const updated = await refetch();
        if (updated?.data?.activeProfile) {
          dispatch(
            setAuth({user: {activeProfile: updated.data.activeProfile}}),
          );
        }
      }
      bottomSheetRef.current.open();
    }
  };
  const [images, setImages] = useState([]);
  const handleImage = imageArray => {
    setImages(imageArray);
  };

  return (
    <Formik
      initialValues={{
        gallery: '',
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
          titleText={'BUSINESS IMAGE'}
          descriptionText={'You can upload maximum 10 photos'}>
          <View style={{paddingHorizontal: 20, paddingTop: 30}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.field}>
                <CustomMultiImagePicker
                  handleImage={imageArray => {
                    handleImage(imageArray);
                    setFieldValue('gallery', imageArray);
                  }}
                  labelTitle="Upload Images"
                  staric={true}
                  title="Add Image"
                />
                {errors.gallery && touched.gallery && (
                  <Text style={styles.error}>{errors.gallery}</Text>
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
              description={'Business Profile has been created successfully!'}
              ref={bottomSheetRef}
              OnYesPress={() => {
                bottomSheetRef.current.close();
                NavService?.navigate('DrawerStack');
              }}
            />
          </View>
        </CustomBackground>
      )}
    </Formik>
  );
};

export default AddBusinessImage;

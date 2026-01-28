import React, {useState} from 'react';
import {View, Dimensions, ScrollView, Text, Alert} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomBackground from '../../../components/CustomBackground';
import {colors} from '../../../utils/Colors';
import {family, size} from '../../../utils';
import styles from '../../Auth/Login/styles';
import CustomButton from '../../../components/CustomButton';

import NavService from '../../../helpers/NavService';
import CustomMultiImagePicker from '../../../components/CustomMultiImagePicker';
import {appImages} from '../../../assets';
import {LOG, normalizeGallery} from '../../../utils/helperFunction';
import {useEditMutation} from '../../../Api/businessApiSlice';
import {executeApiRequest} from '../../../Api/methods/method';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';

const {width, height} = Dimensions.get('screen');

const SignupSchema = Yup.object().shape({
  gallery: Yup.array()
    .min(1, 'At least one image is required')
    .required('At least one image is required'),
});

const EditBusinessImage = ({route}) => {
  const formValues = route?.params || {};
  //   LOG('FormValues: ', formValues?.formValues);
  //   LOG('ID: ', formValues?.id);
  //   LOG('Gallery: ', formValues?.gallery);

  const [edit, {isLoading}] = useEditMutation();

  let galleryImages = formValues?.gallery;

  const handleSignup = async values => {
    const newImagesToUpload = values.gallery.filter(img =>
      img.uri.startsWith('file'),
    );

    const removedImageNames = removedOldImages.map(img => {
      // Split the URI and get the last part (filename)
      return img.uri.split('/').pop();
    });

    // LOG('✅ New Images to Upload:', newImagesToUpload);
    // LOG('❌ Removed Old Images:', removedOldImages);

    let otherData = formValues?.formValues;
    let payload = {
      ...otherData,
      gallery: newImagesToUpload,
      oldImages: removedImageNames,
    };

    // LOG('PAYLOAD: ', payload);
    const response = await executeApiRequest({
      apiCallFunction: edit,
      body: payload,
      params: {id: formValues?.id},
      formData: true,
      toast: true,
      timeout: 30000,
    });
    LOG('RESPONSE: ', response);
    NavService.navigateToStack('MyBusinesses');
    // Alert.alert('Profile Edited');
  };
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [removedOldImages, setRemovedOldImages] = useState([]);

  const handleImage = imageArray => {
    setImages(imageArray);
  };

  const handleRemoveImage = removedImage => {
    // Only track old images that were in the initial gallery
    if (formValues?.gallery?.some(img => img?.uri === removedImage?.uri)) {
      setOldImages(prev => [...prev, removedImage]);
    }
  };

  return (
    <Formik
      initialValues={{
        gallery: normalizeGallery(galleryImages),
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSignup}>
      {({handleSubmit, values, errors, touched, setFieldValue}) => (
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
          </View>
        </CustomBackground>
      )}
    </Formik>
  );
};

export default EditBusinessImage;

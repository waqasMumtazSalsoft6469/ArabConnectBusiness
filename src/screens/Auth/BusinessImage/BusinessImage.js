import React, { useState } from 'react';
import {
    View,
    Dimensions,
    ScrollView,
    Text,
    Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomBackground from '../../../components/CustomBackground';
import { colors } from '../../../utils/Colors';
import { family, size } from '../../../utils';
import styles from '../Login/styles';
import CustomButton from '../../../components/CustomButton';

import NavService from '../../../helpers/NavService';
import CustomMultiImagePicker from '../../../components/CustomMultiImagePicker';


const { width, height } = Dimensions.get('screen');

const SignupSchema = Yup.object().shape({
    images: Yup.array()
        .min(1, 'At least one image is required')
        .required('At least one image is required'),
});

const BusinessImage = () => {
    const handleSignup = values => {
        NavService.navigate('SubscriptionPlan');
    };
    const [images, setImages] = useState([]);
    const handleImage = imageArray => {
        setImages(imageArray);
    };

    return (
        <Formik
            initialValues={{
                images: '',
            }}
             validationSchema={SignupSchema}
            onSubmit={handleSignup}
        >
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
                    descriptionText={'You can upload maximum 10 photos'}
                >
                    <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.field}>
                                <CustomMultiImagePicker
                                    handleImage={imageArray => {
                                        handleImage(imageArray);
                                        setFieldValue('images', imageArray);
                                    }}
                                    labelTitle="Upload Images"
                                    staric={true}
                                    title="Add Image"
                                    
                                />
                                {errors.images && touched.images && (
                                    <Text style={styles.error}>{errors.images}</Text>
                                )}
                            </View>

                            <View style={{ marginTop: height * 0.03, marginBottom: height * 0.05 }}>
                                <CustomButton
                                    gradientColorArr={[colors.secondary, colors.secondary]}
                                    title={'CONTINUE'}
                                    customWidth={width - 55}
                                    buttonStyle={{ alignSelf: 'center', borderRadius: 50 }}
                                    textStyle={{ fontSize: size.large }}
                                    onPress={handleSubmit}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </CustomBackground>
            )}
        </Formik>
    );
};

export default BusinessImage;

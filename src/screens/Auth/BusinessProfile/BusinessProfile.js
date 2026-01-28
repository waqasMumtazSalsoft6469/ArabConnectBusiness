import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomBackground from '../../../components/CustomBackground';
import CustomText from '../../../components/CustomText';
import CustomTextInput from '../../../components/CustomTextInput';
import SelectableTextInput from '../../../components/SelectableTextInput';
import { colors } from '../../../utils/Colors';
import { family, size } from '../../../utils';
import styles from '../Login/styles';
import CustomButton from '../../../components/CustomButton';
import { appIcons } from '../../../assets';
import NavService from '../../../helpers/NavService';

const { width, height } = Dimensions.get('screen');
const zipCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

const SignupSchema = Yup.object().shape({
    business_name: Yup.string().required('Business Name is required'),
    business_type: Yup.string().nullable().required('Business Type is required'),
    business_sub_category: Yup.array().required('Business Sub Category is required'),
    address_01: Yup.string().required('Address Line 01 is required'),
    address_02: Yup.string().required('Address Line 02 is required'),
    zip_code: Yup.string()
        .matches(zipCodeRegex, 'Invalid ZIP code')
        .required('ZIP code is required'),
});

const data = [
    {
        id: 1,
        name: 'Business Type 01',
        image: appIcons?.businessTypeIcon,
    },
    {
        id: 2,
        name: 'Business Type 02',
        image: appIcons?.businessTypeIcon,
    },
    {
        id: 3,
        name: 'Business Type 03',
        image: appIcons?.businessTypeIcon,
    },
    {
        id: 4,
        name: 'Business Type 04',
        image: appIcons?.businessTypeIcon,
    },
];

const SubCategoryData = [
    {
        id: 1,
        name: 'Business Sub Category 01',
    },
    {
        id: 2,
        name: 'Business Sub Category 02',
    },
    {
        id: 3,
        name: 'Business Sub Category 03',
    },
    {
        id: 4,
        name: 'Business Sub Category 04',
    },
    {
        id: 5,
        name: 'Business Sub Category 05',
    },
];

const BusinessProfile = () => {
    const [focusedField, setFocusedField] = useState('');

    const handleSignup = values => {
        NavService.navigate('BusinessImage');
    };

    return (
        <Formik
            initialValues={{
                business_name: '',
                business_type: '',
                business_sub_category: '',
                address_01: '',
                address_02: '',
                zip_code: '',
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
                    titleText={'BUSINESS PROFILE'}
                    descriptionText={'Fill out this form to create business profile'}
                >
                    <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.field}>
                                <CustomTextInput
                                    textInputTitle={true}
                                    staric={true}
                                    labelTitle={'Business Name'}
                                    onFocus={() => setFocusedField('business_name')}
                                    onBlur={() => {
                                        handleBlur('business_name');
                                        setFocusedField('');
                                    }}
                                    onChangeText={handleChange('business_name')}
                                    placeholder="Enter Business Name"
                                    placeholderTextColor={colors.placeholderText}
                                    autoCapitalize="none"
                                    value={values.business_name}
                                    leftIcon={appIcons?.businessIcon}
                                    containerStyle={[
                                        styles.input,
                                        focusedField === 'business_name' && styles.focusedInput,
                                    ]}
                                />
                                {errors.business_name && touched.business_name && (
                                    <Text style={styles.error}>{errors.business_name}</Text>
                                )}
                            </View>
                            <View style={styles.field}>
                                <SelectableTextInput
                                    title="BUSINESS TYPE"
                                    businessType={true}
                                    textInputTitle={true}
                                    labelTitle={'Business Type'}
                                    staric={true}
                                    data={data}
                                    leftIcon={appIcons?.businessIcon}
                                    rightIcon
                                    placeholder="Select"
                                    formik={{ setFieldValue }}
                                    field={{
                                        name: 'business_type',
                                        value: values.business_type,
                                        onChange: handleChange('business_type'),
                                        onBlur: () => handleBlur('business_type'),
                                    }}
                                    // onValueChange={(selectedValue) => {
                                    //     setFieldValue('business_type', selectedValue);
                                    //     handleBlur('business_type'); // Manually triggering blur to force validation
                                    // }}
                                    onContinuePress={(value) => {
                                        setFieldValue('business_type', value);
                                        console.log('business_type:', value);
                                    }}
                                />
                                {errors.business_type && touched.business_type && (
                                    <Text style={styles.error}>{errors.business_type}</Text>
                                )}
                            </View>

                            <View style={styles.field}>
                                <SelectableTextInput
                                    title="BUSINESS SUB CATEGORY"
                                    subCategory={true}
                                    textInputTitle={true}
                                    labelTitle={'Business Sub Category'}
                                    staric={true}
                                    data={SubCategoryData}
                                    leftIcon={appIcons?.businessIcon}
                                    rightIcon
                                    placeholder="Select"
                                    formik={{ setFieldValue }}
                                    field={{
                                        name: 'business_sub_category',
                                        value: values.business_sub_category,
                                        onChange: handleChange('business_sub_category'),
                                        onBlur: handleBlur('business_sub_category'),
                                    }}
                                    onContinuePress={(value) => {
                                        setFieldValue('business_sub_category', value);
                                        console.log('business_sub_category:', value);
                                    }}
                                />
                                {errors.business_sub_category && touched.business_sub_category && (
                                    <Text style={styles.error}>{errors.business_sub_category}</Text>
                                    
                                )}
                            </View>
                            <View style={[styles?.hr, { width: '100%' }]} />
                            <View style={{ marginTop: 5, marginBottom: 10 }}>
                                <CustomText
                                    text={"BUSINESS ADDRESS"}
                                    font={family?.Gilroy_SemiBold}
                                    size={size?.h6}
                                    color={colors?.headingText}
                                    numberOfLines={1}
                                />
                            </View>
                            <View style={styles.field}>
                                <CustomTextInput
                                    textInputTitle={true}
                                    staric={true}
                                    labelTitle={'Address 01'}
                                    onFocus={() => setFocusedField('address_01')}
                                    onBlur={() => {
                                        handleBlur('address_01');
                                        setFocusedField('');
                                    }}
                                    onChangeText={handleChange('address_01')}
                                    placeholder="Enter Address Line 01"
                                    placeholderTextColor={colors.placeholderText}
                                    autoCapitalize="none"
                                    value={values.address_01}
                                    leftIcon={appIcons.gender}
                                    containerStyle={[
                                        styles.input,
                                        focusedField === 'address_01' && styles.focusedInput,
                                    ]}
                                />
                                {errors.address_01 && touched.address_01 && (
                                    <Text style={styles.error}>{errors.address_01}</Text>
                                )}
                            </View>
                            <View style={styles.field}>
                                <CustomTextInput
                                    textInputTitle={true}
                                    staric={true}
                                    labelTitle={'Address 02'}
                                    onFocus={() => setFocusedField('address_02')}
                                    onBlur={() => {
                                        handleBlur('address_02');
                                        setFocusedField('');
                                    }}
                                    onChangeText={handleChange('address_02')}
                                    placeholder="Enter Address Line 02"
                                    placeholderTextColor={colors.placeholderText}
                                    autoCapitalize="none"
                                    value={values.address_02}
                                    leftIcon={appIcons.gender}
                                    containerStyle={[
                                        styles.input,
                                        focusedField === 'address_02' && styles.focusedInput,
                                    ]}
                                />
                                {errors.address_02 && touched.address_02 && (
                                    <Text style={styles.error}>{errors.address_02}</Text>
                                )}
                            </View>
                            <View style={styles.field}>
                                <CustomTextInput
                                    textInputTitle={true}
                                    staric={true}
                                    labelTitle={'Zip Code'}
                                    onFocus={() => setFocusedField('zip_code')}
                                    onBlur={() => {
                                        handleBlur('zip_code');
                                        setFocusedField('');
                                    }}
                                    onChangeText={handleChange('zip_code')}
                                    placeholder="Enter Zip Code"
                                    placeholderTextColor={colors.placeholderText}
                                    autoCapitalize="none"
                                    keyboardType='numeric'
                                    value={values.zip_code}
                                    leftIcon={appIcons.gender}
                                    containerStyle={[
                                        styles.input,
                                        focusedField === 'zip_code' && styles.focusedInput,
                                    ]}
                                />
                                {errors.zip_code && touched.zip_code && (
                                    <Text style={styles.error}>{errors.zip_code}</Text>
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

export default BusinessProfile;

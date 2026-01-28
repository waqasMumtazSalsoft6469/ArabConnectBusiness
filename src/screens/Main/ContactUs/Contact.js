// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Dimensions,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import CustomTextInput, { CustomTextAreaInput } from '../../../components/CustomTextInput';
// import { colors } from '../../../utils/Colors';
// import { family, size } from '../../../utils';
// import styles from '../EditProfile/styles';
// import CustomButton from '../../../components/CustomButton';
// import { appIcons } from '../../../assets';
// import NavService from '../../../helpers/NavService';
// import AppBackground from '../../../components/AppBackground';
// import { SelectList } from 'react-native-dropdown-select-list';
// import CustomText from '../../../components/CustomText';

// const { width, height } = Dimensions.get('screen');
// const SignupSchema = Yup.object().shape({
//   full_name: Yup.string().required('Full Name is required'),
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   subject: Yup.string().required('Subject is required'),
//   message: Yup.string().required('Message is required'),
// });

// const data = [
//   { key: '1', value: 'Subject1' },
//   { key: '2', value: 'Subject2' },
//   { key: '3', value: 'Subject3' },
// ];

// const Contact = () => {
//   const [focusedField, setFocusedField] = useState('');

//   const handleEdit = values => {
//     Alert.alert('Thank you for contacting us. We will get back to you shortly')
//     NavService?.navigate('DrawerStack')
//   };
//   return (
//     <Formik
//       initialValues={{
//         full_name: '',
//         email: '',
//         subject: '',
//         message: '',
//       }}
//       validationSchema={SignupSchema}
//       onSubmit={handleEdit}
//     >
//       {({
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         values,
//         errors,
//         touched,
//         setFieldValue,
//       }) => (
//         <AppBackground
//           back={true}
//           title={'CONTACT US'}
//           notification
//         >
//           <View style={{ paddingHorizontal: 15, marginTop: height*0.03 }}>

//             <ScrollView showsVerticalScrollIndicator={false}>
//               <View style={styles.field}>

//                 <CustomTextInput
//                   textInputTitle={true}
//                   staric={true}
//                   labelTitle={'Full Name'}
//                   onFocus={() => setFocusedField('full_name')}
//                   onBlur={() => {
//                     handleBlur('full_name');
//                     setFocusedField('');
//                   }}
//                   onChangeText={handleChange('full_name')}
//                   placeholder="Enter Full Name"
//                   placeholderTextColor={colors?.placeholderText}
//                   autoCapitalize="none"
//                   value={values.full_name}
//                   leftIcon={appIcons?.gender}
//                   containerStyle={[
//                     styles.input,
//                     focusedField === 'full_name' && styles.focusedInput,
//                   ]}
//                 />
//                 {errors.full_name && touched.full_name && (
//                   <Text style={styles.error}>{errors.full_name}</Text>
//                 )}
//               </View>
//               <View style={styles.field}>
//                 <CustomTextInput
//                   textInputTitle={true}
//                   staric={true}
//                   labelTitle={'Email Address'}
//                   onFocus={() => setFocusedField('email')}
//                   onBlur={() => {
//                     handleBlur('email');
//                     setFocusedField('');
//                   }}
//                   onChangeText={handleChange('email')}
//                   placeholder="Enter Email Address"
//                   placeholderTextColor={colors?.placeholderText}
//                   autoCapitalize="none"
//                   value={values.email}
//                   leftIcon={appIcons?.email}
//                   containerStyle={[
//                     styles.input,
//                     focusedField === 'email' && styles.focusedInput,
//                   ]}
//                 />
//                 {errors.email && touched.email && (
//                   <Text style={styles.error}>{errors.email}</Text>
//                 )}
//               </View>

//               <View style={styles.field}>
//                 <View style={{ paddingHorizontal: 20, flexDirection: 'row' }}>
//                   <CustomText
//                     text={'Subject'}
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
//                   leftIcon={appIcons?.gender}
//                   setSelected={value => setFieldValue('subject', value)}
//                   search={false}
//                   placeholder='Select'
//                   data={data}
//                   save="value"
//                   dropdownTextStyles={{ color: colors?.text }}
//                   dropdownStyles={{
//                     borderWidth: 1,
//                     borderColor: colors?.primary,
//                   }}
//                   boxStyles={[styles?.input,
//                   focusedField === 'subject' && styles.focusedInput,
//                   { paddingVertical: 15, paddingHorizontal: 18 }
//                   ]}
//                   inputStyles={{ color: colors?.placeholderText, fontSize: size?.medium, fontFamily: family?.Questrial_Regular }}
//                 />
//                 {errors.subject && touched.subject && (
//                   <Text style={styles.error}>{errors.subject}</Text>
//                 )}
//               </View>

//               <View style={styles.field}>
//                 <CustomTextAreaInput
//                   textInputTitle={true}
//                   numberOfLines={5}
//                   label
//                   staric={true}
//                   labelTitle={'Message'}
//                   onFocus={() => setFocusedField('message')}
//                   onBlur={() => {
//                     handleBlur('message');
//                     setFocusedField('');
//                   }}
//                   onChangeText={handleChange('message')}
//                   placeholder="Enter Message Here!"
//                   placeholderTextColor={colors?.placeholderText}
//                   autoCapitalize="none"
//                   value={values.message}
//                   leftIcon={appIcons?.email}
//                   containerStyle={[
//                     styles.input,
//                     focusedField === 'message' && styles.focusedInput,
//                     {borderRadius: 15}
//                   ]}
//                 />
//                 {errors.message && touched.message && (
//                   <Text style={styles.error}>{errors.message}</Text>
//                 )}
//               </View>

//               <View style={{ marginTop: height * 0.04 }}>
//                 <CustomButton
//                   gradientColorArr={[colors.secondary, colors.secondary]}
//                   title={'SEND NOW'}
//                   customWidth={width - 55}
//                   buttonStyle={{ alignSelf: 'center', borderRadius: 50 }}
//                   textStyle={{ fontSize: size.large }}
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

// export default Contact;

import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, ScrollView, Alert} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput, {
  CustomTextAreaInput,
} from '../../../components/CustomTextInput';
import {colors} from '../../../utils/Colors';
import {family, size} from '../../../utils';
import styles from '../EditProfile/styles';
import CustomButton from '../../../components/CustomButton';
import {appIcons} from '../../../assets';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import {SelectList} from 'react-native-dropdown-select-list';
import CustomText from '../../../components/CustomText';

import {LOG} from '../../../utils/helperFunction';
import {useContactUsMutation} from '../../../Api/feedbackApiSlice';
import {useSelector} from 'react-redux';
import {executeApiRequest} from '../../../Api/methods/method';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';

const {width, height} = Dimensions.get('screen');
const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
});

const Contact = () => {
  const [focusedField, setFocusedField] = useState('');
  const [contactUs, {isLoading}] = useContactUsMutation();

  const userDetails = useSelector(state => state?.auth?.user || {});

  const handleEdit = async values => {
    LOG('Values: ', values);
    const payload = {
      ...values,
      user: userDetails?._id,
    };
    const response = await executeApiRequest({
      apiCallFunction: contactUs,
      body: payload,
      toast: true,
      timeout: 30000,
    });
    console.log('RESPONSE: ', response);
    NavService?.navigate('DrawerStack');
  };
  return (
    <Formik
      initialValues={{
        fullName: userDetails?.fullName || '',
        email: userDetails?.email || '',
        subject: '',
        message: '',
        type: 'BUSINESS',
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
        <AppBackground back={true} title={'CONTACT US'} notification>
          <View style={{paddingHorizontal: 15, marginTop: height * 0.03}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Full Name'}
                  editable={false}
                  onFocus={() => setFocusedField('fullName')}
                  onBlur={() => {
                    handleBlur('fullName');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('fullName')}
                  placeholder="Enter Full Name"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.fullName}
                  leftIcon={appIcons?.gender}
                  containerStyle={[
                    styles.input,
                    focusedField === 'fullName' && styles.focusedInput,
                  ]}
                />
                {errors.fullName && touched.fullName && (
                  <Text style={styles.error}>{errors.fullName}</Text>
                )}
              </View>
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Email Address'}
                  onFocus={() => setFocusedField('email')}
                  editable={false}
                  onBlur={() => {
                    handleBlur('email');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('email')}
                  placeholder="Enter Email Address"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.email}
                  leftIcon={appIcons?.email}
                  containerStyle={[
                    styles.input,
                    focusedField === 'email' && styles.focusedInput,
                  ]}
                />
                {errors.email && touched.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Subject'}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => {
                    handleBlur('subject');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('subject')}
                  placeholder="Enter Subject"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.subject}
                  leftIcon={appIcons?.help}
                  Iconcolor={colors?.iconColor}
                  containerStyle={[
                    styles.input,
                    focusedField === 'subject' && styles.focusedInput,
                  ]}
                />
                {errors.subject && touched.subject && (
                  <Text style={styles.error}>{errors.subject}</Text>
                )}
              </View>

              <View style={styles.field}>
                <CustomTextAreaInput
                  textInputTitle={true}
                  numberOfLines={5}
                  label
                  staric={true}
                  labelTitle={'Message'}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => {
                    handleBlur('message');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('message')}
                  placeholder="Enter Message Here!"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.message}
                  leftIcon={appIcons?.email}
                  containerStyle={[
                    styles.input,
                    focusedField === 'message' && styles.focusedInput,
                    {borderRadius: 15},
                  ]}
                />
                {errors.message && touched.message && (
                  <Text style={styles.error}>{errors.message}</Text>
                )}
              </View>

              <View style={{marginTop: height * 0.04}}>
                {isLoading ? (
                  <ActivityLoader color={colors2?.theme?.secondary} />
                ) : (
                  <CustomButton
                    gradientColorArr={[colors.secondary, colors.secondary]}
                    title={'SEND NOW'}
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

export default Contact;

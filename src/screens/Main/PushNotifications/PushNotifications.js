import {Alert, Dimensions, ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import {family, size} from '../../../utils';
import {colors} from '../../../utils/Colors';
import CustomButton from '../../../components/CustomButton';
import {appIcons} from '../../../assets';
import CustomTextInput, {
  CustomTextAreaInput,
} from '../../../components/CustomTextInput';
import {SelectList} from 'react-native-dropdown-select-list';
import CustomText from '../../../components/CustomText';
import {Formik} from 'formik';
import * as Yup from 'yup';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import styles from './styles';

const {width, height} = Dimensions.get('screen');
const SignupSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  notification_Type: Yup.string().required('Notification Type is required'),
  description: Yup.string().required('Description is required'),
});

const data = [
  {key: '1', value: 'Type1'},
  {key: '2', value: 'Type2'},
  {key: '3', value: 'Type3'},
];

const PushNotifications = () => {
  const [focusedField, setFocusedField] = useState('');
  const handleEdit = values => {
    Alert.alert('New Notification Pushed');
    NavService?.navigate('Notification');
  };
  return (
    <Formik
      initialValues={{
        title: '',
        email: '',
        notification_Type: '',
        description: '',
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
        <AppBackground back={true} title={'PUSH NOTIFICATIONS'}>
          <View style={{paddingHorizontal: 10, marginTop: height * 0.03}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Title'}
                  onFocus={() => setFocusedField('title')}
                  onBlur={() => {
                    handleBlur('title');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('title')}
                  placeholder="Enter Title"
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
                    text={'Notification Type'}
                    font={family?.Questrial_Regular}
                    size={size?.large}
                  />
                  <CustomText
                    text={'*'}
                    font={family?.Questrial_Regular}
                    size={size?.h5}
                    color={colors?.red}
                  />
                </View>
                <SelectList
                  setSelected={value =>
                    setFieldValue('notification_Type', value)
                  }
                  search={false}
                  placeholder="Select"
                  data={data}
                  save="value"
                  dropdownTextStyles={{color: colors?.text}}
                  dropdownStyles={{
                    borderWidth: 1,
                    borderColor: colors?.primary,
                  }}
                  boxStyles={[
                    styles?.input,
                    focusedField === 'notification_Type' && styles.focusedInput,
                    {paddingVertical: 15, paddingHorizontal: 18},
                  ]}
                  inputStyles={{
                    color: colors?.placeholderText,
                    fontSize: size?.medium,
                    fontFamily: family?.Questrial_Regular,
                  }}
                />
                {errors.notification_Type && touched.notification_Type && (
                  <Text style={styles.error}>{errors.notification_Type}</Text>
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
                  placeholder="Enter description Here!"
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

              <View style={{marginTop: height * 0.04}}>
                <CustomButton
                  gradientColorArr={[colors.secondary, colors.secondary]}
                  title={'SEND NOW'}
                  customWidth={width - 55}
                  buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                  textStyle={{fontSize: size.large}}
                  onPress={handleSubmit}
                />
              </View>
            </ScrollView>
          </View>
        </AppBackground>
      )}
    </Formik>
  );
};

export default PushNotifications;

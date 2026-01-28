import React, {useState} from 'react';
import {
  Modal,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../CustomTextInput';
import CustomText from '../../CustomText';
import CustomButton from '../../CustomButton';
import {colors} from '../../../utils/Colors';
import {appIcons} from '../../../assets';
import {colors2} from '../../../theme/colors2';
import {size, family, vh} from '../../../utils';
import ActivityLoader from '../../ActivityLoader';
import {SelectList} from 'react-native-dropdown-select-list';
import CustomIcon from '../../CustomIcon';
import {HEIGHT, WIDTH} from '../../../theme/units';

const AddCustomerModal = ({visible, onClose, onSubmit, loading}) => {
  const [focusedField, setFocusedField] = useState('');

  const ValidationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    membershipTier: Yup.string().required('Membership Tier is required'),
    rewardPoints: Yup.string().required('Points are required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}>
        <View style={styles.modalView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 30}}>
            <CustomText
              text={'Send Invite'.toUpperCase()}
              font={family.Gilroy_SemiBold}
              size={size.h6}
              color={colors2.theme.textDark}
              style={{marginBottom: 20, alignSelf: 'center'}}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onClose}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: 10,
              }}>
              <CustomIcon
                src={appIcons?.cross}
                size={HEIGHT * 0.015}
                resizeMode="cover"
                disabled
              />
            </TouchableOpacity>

            <Formik
              initialValues={{fullName: '', email: '', membershipTier: ''}}
              validationSchema={ValidationSchema}
              onSubmit={values => {
                const payload = {
                  fullName: values.fullName.trim(),
                  email: values.email.trim(),
                  membershipTier: values.membershipTier.trim(),
                  rewardPoints: values.rewardPoints.trim(),
                };

                onSubmit(payload);
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                errors,
                touched,
                values,
              }) => (
                <>
                  {/* FULL NAME */}
                  <View style={styles.field}>
                    <CustomTextInput
                      textInputTitle={true}
                      staric={true}
                      labelTitle={'Full Name'}
                      onFocus={() => setFocusedField('fullName')}
                      onBlur={() => {
                        handleBlur('fullName');
                        setFocusedField('');
                      }}
                      onChangeText={handleChange('fullName')}
                      placeholder="Enter Full Name"
                      placeholderTextColor={colors.placeholderText}
                      value={values.fullName}
                      containerStyle={[
                        styles.input,
                        focusedField === 'fullName' && styles.focusedInput,
                      ]}
                    />

                    {errors.fullName && touched.fullName && (
                      <CustomText
                        text={errors.fullName}
                        size={size.small}
                        color={'red'}
                        style={{marginTop: 3, left: 20}}
                      />
                    )}
                  </View>

                  {/* EMAIL */}
                  <View style={styles.field}>
                    <CustomTextInput
                      textInputTitle={true}
                      staric={true}
                      labelTitle={'Email Address'}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => {
                        handleBlur('email');
                        setFocusedField('');
                      }}
                      onChangeText={handleChange('email')}
                      placeholder="Enter Email Address"
                      placeholderTextColor={colors.placeholderText}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      value={values.email}
                      containerStyle={[
                        styles.input,
                        focusedField === 'email' && styles.focusedInput,
                      ]}
                    />

                    {errors.email && touched.email && (
                      <CustomText
                        text={errors.email}
                        size={size.small}
                        color={'red'}
                        style={{marginTop: 3, left: 20}}
                      />
                    )}
                  </View>

                  <View style={styles.field}>
                    <View
                      style={{
                        paddingHorizontal: 20,
                        flexDirection: 'row',
                        marginTop: vh * 1,
                      }}>
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
                      placeholder="Choose a Membership Tier"
                      search={false}
                      save="value"
                      boxStyles={[
                        styles.input,
                        focusedField === 'segment' && styles.focusedInput,
                        {paddingVertical: 15, paddingHorizontal: 18},
                      ]}
                      dropdownStyles={{
                        borderWidth: 1,
                        borderColor: colors.primary,
                        backgroundColor: colors?.background,
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
                      onFocus={() => setFocusedField('segment')}
                      onBlur={() => {
                        setFocusedField('');
                        handleBlur('membershipTier');
                      }}
                    />

                    {errors.membershipTier && touched.membershipTier && (
                      <CustomText
                        text={errors.membershipTier}
                        size={size.small}
                        color={'red'}
                        style={{marginTop: 3, left: 20}}
                      />
                    )}
                  </View>

                  <View style={styles.field}>
                    <CustomTextInput
                      textInputTitle={true}
                      staric={true}
                      labelTitle={'Number of Points'}
                      onFocus={() => setFocusedField('rewardPoints')}
                      onBlur={() => {
                        handleBlur('rewardPoints');
                        setFocusedField('');
                      }}
                      onChangeText={handleChange('rewardPoints')}
                      placeholder="Enter Points"
                      keyboardType="numeric"
                      placeholderTextColor={colors.placeholderText}
                      value={values.rewardPoints}
                      containerStyle={[
                        styles.input,
                        focusedField === 'rewardPoints' && styles.focusedInput,
                      ]}
                    />

                    {errors.rewardPoints && touched.rewardPoints && (
                      <CustomText
                        text={errors.rewardPoints}
                        size={size.small}
                        color={'red'}
                        style={{marginTop: 3, left: 20}}
                      />
                    )}
                  </View>

                  {/* BUTTONS */}

                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: HEIGHT * 0.02,
                      marginBottom: HEIGHT * 0.02,
                      alignItems: 'center',
                    }}>
                    {loading ? (
                      <ActivityLoader
                        color={colors?.secondary} // or white depending on background
                        style={{marginLeft: 10}}
                        size={'small'}
                      />
                    ) : (
                      <CustomButton
                        title={'Add Customer'}
                        gradientColorArr={[
                          colors2.theme.secondary,
                          colors2.theme.secondary,
                        ]}
                        customWidth={WIDTH - 55}
                        buttonStyle={{
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        textStyle={{fontSize: size.medium}}
                        onPress={handleSubmit}
                      />
                    )}
                  </View>
                </>
              )}
            </Formik>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddCustomerModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: '60%',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#EDEDED',
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 50,
    backgroundColor: colors.placeholderColor,
  },
  focusedInput: {
    borderColor: colors?.iconColor,
  },
  field: {marginBottom: vh * 2},
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
});

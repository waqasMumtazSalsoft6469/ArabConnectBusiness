import React, {forwardRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {useFormik} from 'formik';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SelectList} from 'react-native-dropdown-select-list';
import {appIcons} from '../assets';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import CustomTextInput from './CustomTextInput';
import {colors} from '../utils/Colors';
import {family, size, vh, vw} from '../utils';
import CustomRadioButton from './CustomRadioButton';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('screen');

const BottomSheet = forwardRef(
  (
    {
      payment,
      carFilter,
      remove,
      onlinePress,
      walletPress,
      OnNoPress,
      OnYesPress,
      text,
      title,
      successfull,
      description,
      btnTitle,
      buttonStyle,
      ...props
    },
    ref,
  ) => {
    const initialValues = {
      company: '', // to store selected company
      lowest: '', // to store lowest price
      highest: '', // to store highest price
      from: '', // to store lowest price
      to: '', // to store highest price
      location: '', // to store location
    };

    const formik = useFormik({
      initialValues,
      onSubmit: values => {
        Alert.alert('Filter Applied');
      },
    });

    const data = [
      {key: '1', value: 'BMW'},
      {key: '2', value: 'MERCEDES'},
      {key: '3', value: 'AUDI'},
    ];

    return (
      <View style={{flex: 1}}>
        <RBSheet
          ref={ref}
          animationType="slide"
          closeOnDragDown={false}
          closeOnPressMask={false}
          closeOnPressBack={false}
          draggable={carFilter ? true : false}
          customStyles={{
            wrapper: {
              backgroundColor: props.backdropColor || 'rgba(0,0,0,0.5)',
            },
            container: {
              backgroundColor: colors?.white,
              borderTopEndRadius: vh * 3,
              borderTopLeftRadius: vh * 3,
              height: carFilter ? '90%' : '37%',
            },
          }}
          {...props}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: vh * 3,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <CustomText
                text={!remove ? title : null}
                size={size?.h3}
                font={family?.Gilroy_SemiBold}
              />
            </View>
          </View>

          {payment && (
            <View style={{marginTop: vh * 1.5, marginBottom: vh * 3}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <CustomButton
                  gradientColorArr={[colors?.secondary, colors.secondary]}
                  title={'ONLINE'}
                  customWidth={width - 150}
                  buttonStyle={{alignSelf: 'center', marginTop: height * 0.045}}
                  onPress={onlinePress}
                  textStyle={{fontSize: size?.xxlarge}}
                />
                <CustomButton
                  gradientColorArr={[colors?.iconColor, colors.iconColor]}
                  title={'WALLET'}
                  customWidth={width - 150}
                  buttonStyle={{alignSelf: 'center', marginTop: height * 0.03}}
                  onPress={walletPress}
                  textStyle={{fontSize: size?.xxlarge}}
                />
              </View>
            </View>
          )}
          {successfull && (
            <View
              style={{
                marginBottom: vh * 3,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -height * 0.02,
              }}>
              <View
                style={{
                  width: vw * 15,
                  height: vw * 15,
                  padding: 2,
                  borderRadius: 50,
                }}>
                <FastImage
                  source={appIcons?.sheetIcon}
                  style={{width: '100%', height: '100%', alignSelf: 'center'}}
                  resizeMode="cover"
                />
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  width: '67%',
                  marginTop: height * 0.02,
                  gap: height * 0.005,
                  marginBottom: height * 0.03,
                }}>
                <CustomText
                  text={text}
                  font={family?.Gilroy_SemiBold}
                  size={size?.h2}
                  style={{textAlign: 'center'}}
                  color={colors?.headingText}
                />
                <CustomText
                  text={description}
                  font={family?.Questrial_Regular}
                  size={size?.xxlarge}
                  style={{textAlign: 'center'}}
                  color={colors?.placeholderText}
                />
              </View>

              <View style={{flexDirection: 'row', gap: 10}}>
                {/* <CustomButton
                                gradientColorArr={[colors?.white, colors.white]}
                                title={'NO'}
                                customWidth={width - 240}
                                buttonStyle={{ alignSelf: 'center', borderWidth: 1, borderColor: colors?.secondary }}
                                onPress={OnNoPress}
                                textStyle={{ fontSize: size?.xxlarge, color: colors?.secondary }}
                            /> */}
                <CustomButton
                  gradientColorArr={[colors?.secondary, colors.secondary]}
                  title={btnTitle ? btnTitle : 'Okay, Thanks'.toUpperCase()}
                  customWidth={width - 180}
                  buttonStyle={[
                    buttonStyle,
                    {
                      alignSelf: 'center',
                      borderWidth: 1,
                      borderColor: colors?.secondary,
                    },
                  ]}
                  onPress={OnYesPress}
                  textStyle={{fontSize: size?.xxlarge}}
                />
              </View>
            </View>
          )}
          {remove && (
            <View
              style={{
                marginBottom: vh * 3,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -height * 0.02,
              }}>
              <Image
                source={appIcons.warning}
                style={{
                  resizeMode: 'contain',
                  width: vw * 15,
                  height: vh * 8,
                  alignSelf: 'center',
                }}
              />
              <View
                style={{
                  alignSelf: 'center',
                  width: '67%',
                  marginTop: height * 0.01,
                  gap: height * 0.007,
                  marginBottom: height * 0.03,
                }}>
                <CustomText
                  text={text}
                  font={family?.Questrial_Regular}
                  size={size?.h4}
                  style={{textAlign: 'center'}}
                />
                <CustomText
                  text={'This action cannot be undone!'}
                  font={family?.Questrial_Regular}
                  size={size?.xxlarge}
                  style={{textAlign: 'center'}}
                  color={colors?.red}
                />
              </View>

              <View style={{flexDirection: 'row', gap: 10}}>
                <CustomButton
                  gradientColorArr={[colors?.white, colors.white]}
                  title={'NO'}
                  customWidth={width - 240}
                  buttonStyle={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: colors?.secondary,
                  }}
                  onPress={OnNoPress}
                  textStyle={{
                    fontSize: size?.xxlarge,
                    color: colors?.secondary,
                  }}
                />
                <CustomButton
                  gradientColorArr={[colors?.secondary, colors.secondary]}
                  title={'YES'}
                  customWidth={width - 240}
                  buttonStyle={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: colors?.secondary,
                  }}
                  onPress={OnYesPress}
                  textStyle={{fontSize: size?.xxlarge}}
                />
              </View>
            </View>
          )}

          {carFilter && (
            <ScrollView>
              <View style={{marginTop: vh * 1.5, marginBottom: vh * 3}}>
                <View style={styles.field}>
                  <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
                    <CustomText
                      text={'Company'}
                      font={family?.Questrial_Regular}
                      size={size?.large}
                    />
                  </View>
                  <SelectList
                    leftIcon={appIcons?.carCompany}
                    setSelected={value =>
                      formik.setFieldValue('company', value)
                    }
                    search={false}
                    placeholder="Select Car Company"
                    data={data}
                    save="value"
                    dropdownTextStyles={{color: colors?.text}}
                    dropdownStyles={{
                      borderWidth: 1,
                      borderColor: colors?.primary,
                    }}
                    boxStyles={[styles?.input]}
                    inputStyles={{
                      color: colors?.placeholderText,
                      fontSize: size?.medium,
                      fontFamily: family?.Questrial_Regular,
                    }}
                  />
                </View>

                <View style={styles.field}>
                  <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
                    <CustomText
                      text={'Select Condition'}
                      font={family?.Questrial_Regular}
                      size={size?.large}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <CustomRadioButton
                      selected={formik.values.company === 'option1'}
                      onPress={() => formik.setFieldValue('company', 'option1')}
                      label="Used Car"
                      colors={colors}
                    />
                    <CustomRadioButton
                      selected={formik.values.company === 'option2'}
                      onPress={() => formik.setFieldValue('company', 'option2')}
                      label="New Car"
                      colors={colors}
                    />
                  </View>
                </View>

                <View style={styles.field}>
                  <CustomTextInput
                    textInputTitle={true}
                    labelTitle={'Select Year'}
                    onChangeText={formik.handleChange('from')}
                    onBlur={formik.handleBlur('from')}
                    placeholder="From"
                    placeholderTextColor={colors?.placeholderText}
                    value={formik.values.from}
                    leftIcon={appIcons?.calendar}
                    containerStyle={[
                      styles.input,
                      formik.touched.from &&
                        formik.errors.from &&
                        styles.focusedInput,
                    ]}
                  />
                  {formik.errors.from && formik.touched.from && (
                    <Text style={styles.error}>{formik.errors.from}</Text>
                  )}
                </View>

                <View style={styles.field}>
                  <CustomTextInput
                    onChangeText={formik.handleChange('to')}
                    onBlur={formik.handleBlur('to')}
                    placeholder="To"
                    placeholderTextColor={colors?.placeholderText}
                    value={formik.values.to}
                    leftIcon={appIcons?.calendar}
                    containerStyle={[
                      styles.input,
                      formik.touched.to &&
                        formik.errors.to &&
                        styles.focusedInput,
                    ]}
                  />
                  {formik.errors.to && formik.touched.to && (
                    <Text style={styles.error}>{formik.errors.to}</Text>
                  )}
                </View>
                <View style={styles.field}>
                  <CustomTextInput
                    textInputTitle={true}
                    labelTitle={'Car Price'}
                    onChangeText={formik.handleChange('lowest')}
                    onBlur={formik.handleBlur('lowest')}
                    placeholder="Lowest"
                    placeholderTextColor={colors?.placeholderText}
                    value={formik.values.lowest}
                    leftIcon={appIcons?.dollar}
                    containerStyle={[
                      styles.input,
                      formik.touched.lowest &&
                        formik.errors.lowest &&
                        styles.focusedInput,
                    ]}
                  />
                  {formik.errors.lowest && formik.touched.lowest && (
                    <Text style={styles.error}>{formik.errors.lowest}</Text>
                  )}
                </View>

                <View style={styles.field}>
                  <CustomTextInput
                    onChangeText={formik.handleChange('highest')}
                    onBlur={formik.handleBlur('highest')}
                    placeholder="Highest"
                    placeholderTextColor={colors?.placeholderText}
                    value={formik.values.highest}
                    leftIcon={appIcons?.dollar}
                    containerStyle={[
                      styles.input,
                      formik.touched.highest &&
                        formik.errors.highest &&
                        styles.focusedInput,
                    ]}
                  />
                  {formik.errors.highest && formik.touched.highest && (
                    <Text style={styles.error}>{formik.errors.highest}</Text>
                  )}
                </View>

                <View style={styles.field}>
                  <CustomTextInput
                    textInputTitle={true}
                    labelTitle={'Location'}
                    onChangeText={formik.handleChange('location')}
                    onBlur={formik.handleBlur('location')}
                    placeholder="Location"
                    placeholderTextColor={colors?.placeholderText}
                    value={formik.values.location}
                    leftIcon={appIcons?.locationIcon}
                    containerStyle={[
                      styles.input,
                      formik.touched.location &&
                        formik.errors.location &&
                        styles.focusedInput,
                    ]}
                  />
                  {formik.errors.location && formik.touched.location && (
                    <Text style={styles.error}>{formik.errors.location}</Text>
                  )}
                </View>

                <View style={{alignItems: 'center'}}>
                  <CustomButton
                    gradientColorArr={[colors?.secondary, colors.secondary]}
                    title={'APPLY FILTER'}
                    customWidth={width - 150}
                    buttonStyle={{
                      alignSelf: 'center',
                      marginTop: height * 0.03,
                    }}
                    onPress={formik.handleSubmit}
                    textStyle={{fontSize: size?.xxlarge}}
                  />

                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.forgotPassContainer}
                    onPress={() => {}}>
                    <Text style={styles.forgotPass}>CLEAR</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </RBSheet>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  field: {
    padding: 10,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#EDEDED',
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 50,
    backgroundColor: colors?.placeholderColor,
    fontSize: size.medium,
    fontFamily: family?.Gilroy_SemiBold,
    marginBottom: 10,
  },
  focusedInput: {
    borderColor: colors?.iconColor,
  },
  error: {
    color: 'red',
    marginTop: 5,
    fontSize: size?.normal,
    fontFamily: family?.Gilroy_SemiBold,
  },
  forgotPass: {
    color: colors?.iconColor,
    fontSize: size?.medium,
    fontFamily: family?.Gilroy_Medium,
    textDecorationLine: 'underline',
  },

  forgotPassContainer: {
    alignItems: 'center',
    width: width * 0.4,
    paddingVertical: 2,
    marginTop: 10,
  },
});

export default BottomSheet;

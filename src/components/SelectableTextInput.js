import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {appIcons} from '../assets';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import {colors} from '../utils/Colors';
import {family, size, vh} from '../utils';
import CustomCheckbox from './CustomCheckbox';
import {jobType} from '../utils/dummyData';
import CustomRadioButton from './CustomRadioButton';
import {LOG} from '../utils/helperFunction';

const {width, height} = Dimensions.get('screen');
const SelectableTextInput = ({
  title,
  data,
  placeholder,
  Iconcolor,
  textInputTitle,
  labelTitle,
  staric,
  field, // Formik field
  form, // Formik form
  meta, // Formik meta
  OnYesPress,
  onContinuePress,
  businessType = false,
  subCategory = false,
  couponAudience = false,
  jobType = false,
  customStyling,
  disabled,
  formValues,
  ...props
}) => {
  // LOG('fieldfield', field);
  const bottomSheetRef = useRef();
  const [selectedValue, setSelectedValue] = useState(field?.value || '');
  const [selectedValues, setSelectedValues] = useState(field?.value || []);
  const [initialValue, setInitialValue] = useState(field?.value || '');
  const [initialValues, setInitialValues] = useState(field?.value || []);
  const [inputHeight, setInputHeight] = useState(height * 0.063); // Default height
  const [selectedRadioValue, setSelectedRadioValue] = useState(
    field?.value || '',
  ); // State for selected radio button


  useEffect(() => {
    if (subCategory) {
      setInputHeight(selectedValues.length > 0 ? 80 : height * 0.063); // Change height based on selection
    }
  }, [selectedValues]);

  useEffect(() => {
    // Update the displayed value when the Formik field value changes
    if (jobType) {
      setSelectedRadioValue(field?.value);
    } else if (subCategory) {
      setSelectedValues(field?.value);
    } else {
      setSelectedValue(field?.value);
    }
  }, [field?.value]);

  // const handleSelect = value => {
  //   setSelectedValue(value);
  //   if (form && field) {
  //     form.setFieldValue(field.name, value);
  //   }
  // };
  const handleSelect = (value, label) => {
    LOG('label&vakye', value + label);
    setSelectedValue(value); // Optional: for selection styling
    if (form && field) {
      form.setFieldValue(field.name, value); // Send ID to Formik
    }
    if (onContinuePress) {
      onContinuePress(value, label); // Pass both ID and label
    }
  };

  const handleSelection = value => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter(item => item !== value)
      : [...selectedValues, value];

    setSelectedValues(updatedValues);
    if (form && field) {
      form.setFieldValue(field.name, updatedValues);
    }
  };

  const handleBlur = () => {
    if (form && field) {
      form.setFieldTouched(field.name, true);
    }
  };

  const handleRadioSelect = radioValue => {
    setSelectedRadioValue(radioValue);
    if (form && field) {
      form.setFieldValue(field.name, radioValue);
    }
  };

  const handleContinue = abc => {
    console.log('abc,xyz', abc);
    if (businessType) {
      setInitialValue(selectedValue);
      onContinuePress(formValues?.id, formValues.type);
    } else if (subCategory) {
      setInitialValues(selectedValues);
      onContinuePress(selectedValues);
    }
    bottomSheetRef.current.close();
  };

  const handleCancel = () => {
    if (businessType) {
      setSelectedValue(initialValue);
    } else if (subCategory) {
      setSelectedValues(initialValues);
    }
    bottomSheetRef.current.close();
  };
  const handleYesPress = () => {
    if (jobType || (couponAudience && OnYesPress)) {
      OnYesPress(selectedRadioValue); // Pass the selected radio value back to the parent
    }
    bottomSheetRef.current.close();
  };
  return (
    <View style={{width: '100%'}}>
      {textInputTitle && (
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            marginBottom: 5,
            alignItems: 'center',
          }}>
          <CustomText
            text={labelTitle}
            font={family?.Gilroy_Medium}
            size={size?.large}
          />
          {staric && (
            <CustomText text="*" color={colors?.red} size={size?.h6} />
          )}
        </View>
      )}
      <TouchableOpacity
        style={[styles.touchableOpacity, {height: inputHeight}, customStyling]} // Use dynamic height
        onPress={() => {
          if (businessType) {
            setInitialValue(selectedValue);
          } else if (subCategory) {
            setInitialValues(selectedValues);
          }
          bottomSheetRef.current.open();
        }}
        onBlur={handleBlur}
        disabled={disabled}>
        <View
          style={{
            flexDirection: 'row',
            gap: 3,
            width: '95%',
            alignItems: 'center',
          }}>
          {props?.leftIcon ? (
            <Image
              source={props?.leftIcon}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: Iconcolor,
                marginHorizontal: 5,
              }}
            />
          ) : null}
          <View style={{width: '90%'}}>
            <Text style={styles.text}>
              {businessType
                ? selectedValue || placeholder
                : couponAudience
                ? selectedRadioValue || placeholder
                : subCategory
                ? selectedValues.length > 0
                  ? selectedValues.join(', ')
                  : placeholder
                : jobType
                ? selectedRadioValue || placeholder
                : placeholder}
            </Text>
          </View>
        </View>
        {props?.rightIcon && (
          <TouchableOpacity style={{padding: 3}} disabled={true}>
            <Image
              source={appIcons?.bottomArrow}
              style={{
                height: 10,
                width: 10,
                resizeMode: 'contain',
                tintColor: '#798A99',
              }}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {meta && meta.touched && meta.error ? (
        <Text style={{color: colors?.red, marginLeft: 20, marginTop: 5}}>
          {meta.error}
        </Text>
      ) : null}
      <RBSheet
        ref={bottomSheetRef}
        animationType="slide"
        closeOnDragDown={false}
        closeOnPressMask={true}
        closeOnPressBack={true}
        draggable={true}
        customStyles={{
          wrapper: {backgroundColor: props.backdropColor || 'rgba(0,0,0,0.5)'},
          container: {
            backgroundColor: colors?.white,
            borderTopEndRadius: vh * 3,
            borderTopLeftRadius: vh * 3,
            height: jobType || couponAudience ? '62%' : '70%',
          },
          draggableIcon: {
            backgroundColor: colors?.text,
            width: width * 0.2,
            height: '10%',
          },
        }}
        {...props}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 25,
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <CustomText
              text={title}
              size={size?.h5}
              font={family?.Gilroy_SemiBold}
            />
          </View>
          <View style={[styles?.hr, {width: '100%'}]} />
        </View>
        {businessType && (
          <ScrollView style={{flex: 1, paddingHorizontal: 20}}>
            <FlatList
              style={{marginTop: height * 0.01, width: '100%', flex: 1}}
              contentContainerStyle={{
                flexGrow: 1.5,
                alignItems: 'center',
                paddingVertical: 10,
              }}
              showsVerticalScrollIndicator={false}
              data={data}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={{height: 15}} />}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item.value, item.label)}>
                  <View
                    style={[
                      styles.itemContainer,
                      selectedValue === item.label &&
                        styles.selectedItemContainer,
                    ]}>
                    <View style={styles.itemContent}>
                      <Image
                        source={appIcons?.businessTypeIcon}
                        resizeMode="contain"
                        style={styles.itemImage}
                      />
                      <CustomText
                        text={item?.label}
                        font={family?.Questrial_Regular}
                        size={size?.large}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              numColumns={2}
            />
            <View
              style={{
                alignItems: 'center',
                marginBottom: height * 0.03,
                gap: 10,
                marginTop: height * 0.01,
              }}>
              <CustomButton
                gradientColorArr={[colors?.secondary, colors.secondary]}
                title={'CONTINUE'}
                customWidth={width - 150}
                buttonStyle={{alignSelf: 'center', marginTop: height * 0.02}}
                onPress={handleContinue}
                textStyle={{fontSize: size?.xxlarge}}
              />
              <TouchableOpacity onPress={handleCancel}>
                <CustomText
                  text={'Cancel'}
                  underline={true}
                  font={family?.Gilroy_Medium}
                  size={size?.xlarge}
                  color={colors?.red}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
        {subCategory && (
          <ScrollView style={{flex: 1, paddingHorizontal: 20}}>
            <FlatList
              style={{marginTop: height * 0.01, width: '100%', flex: 1}}
              contentContainerStyle={{
                flexGrow: 1.5,
                paddingVertical: 10,
              }}
              showsVerticalScrollIndicator={false}
              data={data}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={styles.agreementContainerWrap}>
                  <View style={[styles.agreementContainer]}>
                    <CustomCheckbox
                      checked={selectedValues.includes(item.label)}
                      onChange={() => handleSelection(item.label)}
                    />
                    <CustomText
                      text={item?.label}
                      font={family?.Questrial_Regular}
                      size={size?.xxlarge}
                    />
                  </View>
                </View>
              )}
            />
            <View
              style={{
                alignItems: 'center',
                marginBottom: height * 0.03,
                gap: 10,
                marginTop: height * 0.01,
              }}>
              <CustomButton
                gradientColorArr={[colors?.secondary, colors.secondary]}
                title={'CONTINUE'}
                customWidth={width - 150}
                buttonStyle={{alignSelf: 'center', marginTop: height * 0.02}}
                onPress={handleContinue}
                textStyle={{fontSize: size?.xxlarge}}
              />
              <TouchableOpacity onPress={handleCancel}>
                <CustomText
                  text={'Cancel'}
                  underline={true}
                  font={family?.Gilroy_Medium}
                  size={size?.xlarge}
                  color={colors?.red}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
        {jobType && (
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <FlatList
              style={{marginTop: height * 0.01, width: '100%', flex: 1}}
              contentContainerStyle={{
                flexGrow: 1.5,
                paddingVertical: 5,
                paddingBottom: height * 0.08,
              }}
              showsVerticalScrollIndicator={false}
              data={data}
              scrollEnabled={true}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={styles.agreementContainerWrap}>
                  <View
                    style={[
                      styles?.touchableOpacity,
                      {height: height * 0.063},
                    ]}>
                    <CustomRadioButton
                      selected={selectedRadioValue === item.value}
                      onPress={() => handleRadioSelect(item.value)}
                      label={item?.value}
                      colors={colors}
                    />
                  </View>
                </View>
              )}
            />
            <View
              style={{
                alignItems: 'center',
                marginBottom: height * 0.03,
                gap: 10,
                marginTop: height * 0.01,
                position: 'absolute',
                alignSelf: 'center',
                bottom: 0,
              }}>
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
                  onPress={() => {
                    setSelectedRadioValue('');
                    bottomSheetRef.current.close();
                  }}
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
                  onPress={handleYesPress} // Call handleYesPress on press
                  textStyle={{fontSize: size?.xxlarge}}
                />
              </View>
            </View>
          </View>
        )}
        {couponAudience && (
          <ScrollView style={{flex: 1, paddingHorizontal: 20}}>
            <FlatList
              style={{marginTop: height * 0.01, width: '100%', flex: 1}}
              contentContainerStyle={{
                flexGrow: 1.5,
                paddingVertical: 5,
              }}
              showsVerticalScrollIndicator={false}
              data={data}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={styles.agreementContainerWrap}>
                  <View
                    style={[
                      styles?.touchableOpacity,
                      {height: height * 0.063},
                    ]}>
                    <CustomRadioButton
                      selected={selectedRadioValue === item.value}
                      onPress={() => handleRadioSelect(item.value)}
                      label={item?.value}
                      colors={colors}
                    />
                  </View>
                </View>
              )}
            />
            <View
              style={{
                alignItems: 'center',
                marginBottom: height * 0.03,
                gap: 10,
                marginTop: height * 0.01,
              }}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <CustomButton
                  gradientColorArr={[colors?.secondary, colors.secondary]}
                  title={'DONE'}
                  customWidth={width - 50}
                  buttonStyle={{
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: colors?.secondary,
                  }}
                  onPress={handleYesPress} // Call handleYesPress on press
                  textStyle={{fontSize: size?.xxlarge}}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 3,
    paddingVertical: 2,
    borderRadius: 50,
    backgroundColor: colors?.placeholderColor,
    fontSize: size.medium,
    fontFamily: family?.Gilroy_SemiBold,
    justifyContent: 'space-between',
  },
  text: {
    color: colors?.text,
    fontSize: size.medium,
    fontFamily: family?.Questrial_Regular,
    flexWrap: 'wrap',
  },
  hr: {
    borderTopWidth: 1,
    borderColor: colors?.lightGrayLine,
    marginTop: 15,
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
  },
  itemContainer: {
    backgroundColor: colors?.placeholderColor,
    borderRadius: 20,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedItemContainer: {
    borderColor: colors?.iconColor,
  },
  itemContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 2.5,
    height: width / 2.5,
  },
  itemImage: {
    width: width * 0.1,
    height: height * 0.1,
  },
  agreementContainerWrap: {
    paddingBottom: height * 0.03,
    width: '100%',
    paddingHorizontal: 20,
  },
  agreementContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
});

export default SelectableTextInput;

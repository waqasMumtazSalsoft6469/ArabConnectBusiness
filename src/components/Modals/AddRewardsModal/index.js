// import React, {useState} from 'react';
// import {
//   Modal,
//   View,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import {Formik} from 'formik';
// import * as Yup from 'yup';
// import CustomTextInput from '../../CustomTextInput';
// import CustomText from '../../CustomText';
// import CustomButton from '../../CustomButton';
// import {colors} from '../../../utils/Colors';
// import {appIcons} from '../../../assets';
// import {colors2} from '../../../theme/colors2';
// import {size, family, vh, vw} from '../../../utils';
// import ActivityLoader from '../../ActivityLoader';
// import {SelectList} from 'react-native-dropdown-select-list';
// import CustomIcon from '../../CustomIcon';
// import {HEIGHT, WIDTH} from '../../../theme/units';
// import ImagePicker2 from '../../ImagePicker2';
// import FastImage from 'react-native-fast-image';

// const AddRewardsModal = ({visible, onClose, onSubmit, loading}) => {
//   const [focusedField, setFocusedField] = useState('');

//   const ValidationSchema = Yup.object().shape({
//     title: Yup.string().required('Title is required'),
//     description: Yup.string().required('Description is required'),
//     category: Yup.string().required('Category is required'),
//     pointsCost: Yup.string().required('Points are required'),

//     image: Yup.mixed()
//       .required('Image is required')
//       .test('fileExists', 'Image is required', value => value != null),
//   });

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         style={styles.overlay}>
//         <View style={styles.modalView}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{paddingBottom: 30}}>
//             <CustomText
//               text={'New Reward'.toUpperCase()}
//               font={family.Gilroy_SemiBold}
//               size={size.h6}
//               color={colors2.theme.textDark}
//               style={{marginBottom: 20, alignSelf: 'center'}}
//             />
//             <TouchableOpacity
//               activeOpacity={0.7}
//               onPress={onClose}
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 right: 0,
//                 padding: 10,
//               }}>
//               <CustomIcon
//                 src={appIcons?.cross}
//                 size={HEIGHT * 0.015}
//                 resizeMode="cover"
//                 disabled
//               />
//             </TouchableOpacity>

//             <Formik
//               initialValues={{
//                 title: '',
//                 description: '',
//                 category: '',
//                 pointsCost: '',
//                 image: null,
//               }}
//               validationSchema={ValidationSchema}
//               onSubmit={values => {
//                 const payload = {
//                   title: values.title.trim(),
//                   description: values.description.trim(),
//                   category: values.category.trim(),
//                   pointsCost: values.pointsCost.trim(),
//                   image: values.image,
//                 };

//                 onSubmit(payload);
//               }}>
//               {({
//                 handleChange,
//                 handleBlur,
//                 handleSubmit,
//                 setFieldValue,
//                 errors,
//                 touched,
//                 values,
//               }) => (
//                 <>
//                   <View style={styles.field}>
//                     <View
//                       style={{
//                         marginLeft: 20,
//                         marginBottom: 5,
//                         flexDirection: 'row',
//                       }}>
//                       <CustomText
//                         text="Reward Image"
//                         font={family.Gilroy_Medium}
//                         size={size.large}
//                       />
//                       <CustomText text=" *" color={colors.red} />
//                     </View>

//                     <ImagePicker2
//                       onImageChange={(uri, type) => {
//                         const fileName = uri.split('/').pop();

//                         const imageObject = {
//                           uri,
//                           type,
//                           name: fileName,
//                         };

//                         setFieldValue('image', imageObject);
//                       }}>
//                       <TouchableOpacity
//                         activeOpacity={0.7}
//                         style={[
//                           styles.inputTouchable,
//                           {height: values.image ? vh * 20 : vh * 20},
//                         ]}
//                         disabled={true}>
//                         {values.image ? (
//                           <FastImage
//                             source={{uri: values.image.uri}}
//                             style={{
//                               width: '100%',
//                               height: '100%',
//                               borderRadius: 15,
//                             }}
//                             resizeMode="contain"
//                           />
//                         ) : (
//                           <CustomText
//                             text="+ Add Image"
//                             color={colors.placeholderText}
//                             size={size.medium}
//                           />
//                         )}
//                       </TouchableOpacity>
//                     </ImagePicker2>

//                     {errors.image && touched.image && (
//                       <CustomText
//                         text={errors.image}
//                         size={size.small}
//                         color="red"
//                         style={{marginTop: 5, left: 20}}
//                       />
//                     )}
//                   </View>

//                   {/* FULL NAME */}
//                   <View style={styles.field}>
//                     <CustomTextInput
//                       textInputTitle={true}
//                       staric={true}
//                       labelTitle={'Reward Title'}
//                       onFocus={() => setFocusedField('title')}
//                       onBlur={() => {
//                         handleBlur('title');
//                         setFocusedField('');
//                       }}
//                       onChangeText={handleChange('title')}
//                       placeholder="Enter Reward Title"
//                       placeholderTextColor={colors.placeholderText}
//                       value={values.title}
//                       containerStyle={[
//                         styles.input,
//                         focusedField === 'title' && styles.focusedInput,
//                       ]}
//                     />

//                     {errors.title && touched.title && (
//                       <CustomText
//                         text={errors.title}
//                         size={size.small}
//                         color={'red'}
//                         style={{marginTop: 3, left: 20}}
//                       />
//                     )}
//                   </View>
//                   <View style={styles.field}>
//                     <CustomTextInput
//                       textInputTitle={true}
//                       staric={true}
//                       labelTitle={'Description'}
//                       onFocus={() => setFocusedField('description')}
//                       onBlur={() => {
//                         handleBlur('description');
//                         setFocusedField('');
//                       }}
//                       onChangeText={handleChange('description')}
//                       placeholder="Enter Description"
//                       placeholderTextColor={colors.placeholderText}
//                       value={values.description}
//                       multiline
//                       containerStyle={[
//                         styles.input,
//                         focusedField === 'description' && styles.focusedInput,
//                       ]}
//                     />

//                     {errors.description && touched.description && (
//                       <CustomText
//                         text={errors.description}
//                         size={size.small}
//                         color={'red'}
//                         style={{marginTop: 3, left: 20}}
//                       />
//                     )}
//                   </View>

//                   <View style={styles.field}>
//                     <CustomTextInput
//                       textInputTitle={true}
//                       staric={true}
//                       labelTitle={'Points Cost'}
//                       onFocus={() => setFocusedField('pointsCost')}
//                       onBlur={() => {
//                         handleBlur('pointsCost');
//                         setFocusedField('');
//                       }}
//                       onChangeText={handleChange('pointsCost')}
//                       placeholder="Enter Points"
//                       keyboardType="numeric"
//                       placeholderTextColor={colors.placeholderText}
//                       value={values.pointsCost}
//                       containerStyle={[
//                         styles.input,
//                         focusedField === 'pointsCost' && styles.focusedInput,
//                       ]}
//                     />

//                     {errors.pointsCost && touched.pointsCost && (
//                       <CustomText
//                         text={errors.pointsCost}
//                         size={size.small}
//                         color={'red'}
//                         style={{marginTop: 3, left: 20}}
//                       />
//                     )}
//                   </View>

//                   <View style={styles.field}>
//                     <View
//                       style={{
//                         paddingHorizontal: 20,
//                         flexDirection: 'row',
//                         marginTop: vh * 1,
//                       }}>
//                       <CustomText
//                         text={'Select Category'}
//                         font={family?.Gilroy_Medium}
//                         size={size?.large}
//                       />
//                       <CustomText
//                         text={'*'}
//                         font={family?.Gilroy_Medium}
//                         size={size?.h5}
//                         color={colors?.red}
//                       />
//                     </View>

//                     {/* ✅ Static Dummy Segment Data */}
//                     <SelectList
//                       setSelected={val => {
//                         setFieldValue('category', val);
//                       }}
//                       data={[
//                         {key: '1', value: 'Discount'},
//                         {key: '2', value: 'Free Item'},
//                         {key: '3', value: 'Gift Card'},
//                         {key: '4', value: 'Exclusive Access'},
//                       ]}
//                       placeholder="Choose a category"
//                       search={false}
//                       save="value"
//                       boxStyles={[
//                         styles.input,
//                         focusedField === 'category' && styles.focusedInput,
//                         {paddingVertical: 15, paddingHorizontal: 18},
//                       ]}
//                       dropdownStyles={{
//                         borderWidth: 1,
//                         borderColor: colors.primary,
//                         backgroundColor: colors?.background,
//                       }}
//                       inputStyles={{
//                         color: colors.text,
//                         fontSize: size.medium,
//                         fontFamily: family.Questrial_Regular,
//                       }}
//                       dropdownTextStyles={{
//                         color: colors.text,
//                         fontSize: size.medium,
//                       }}
//                       onFocus={() => setFocusedField('category')}
//                       onBlur={() => {
//                         setFocusedField('');
//                         handleBlur('category');
//                       }}
//                     />

//                     {errors.category && touched.category && (
//                       <CustomText
//                         text={errors.category}
//                         size={size.small}
//                         color={'red'}
//                         style={{marginTop: 3, left: 20}}
//                       />
//                     )}
//                   </View>

//                   {/* BUTTONS */}

//                   <View
//                     style={{
//                       alignItems: 'center',
//                       marginTop: HEIGHT * 0.02,
//                       marginBottom: HEIGHT * 0.02,
//                       alignItems: 'center',
//                     }}>
//                     {loading ? (
//                       <ActivityLoader
//                         color={colors?.secondary} // or white depending on background
//                         style={{marginLeft: 10}}
//                         size={'small'}
//                       />
//                     ) : (
//                       <CustomButton
//                         title={'Add Reward'}
//                         gradientColorArr={[
//                           colors2.theme.secondary,
//                           colors2.theme.secondary,
//                         ]}
//                         customWidth={WIDTH - 55}
//                         buttonStyle={{
//                           borderRadius: 50,
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                         }}
//                         textStyle={{fontSize: size.medium}}
//                         onPress={handleSubmit}
//                       />
//                     )}
//                   </View>
//                 </>
//               )}
//             </Formik>
//           </ScrollView>
//         </View>
//       </KeyboardAvoidingView>
//     </Modal>
//   );
// };

// export default AddRewardsModal;

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.45)',
//     justifyContent: 'flex-end',
//   },
//   modalView: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     height: '75%',
//   },
//   input: {
//     borderWidth: 1.5,
//     borderColor: '#EDEDED',
//     padding: 10,
//     paddingHorizontal: 12,
//     borderRadius: 50,
//     backgroundColor: colors.placeholderColor,
//   },
//   focusedInput: {
//     borderColor: colors?.iconColor,
//   },
//   field: {marginBottom: vh * 2},
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 30,
//   },
//   inputTouchable: {
//     borderRadius: vw * 2,
//     height: vh * 18,
//     width: '98%',
//     color: 'black',
//     fontFamily: family.Gilroy_Medium,
//     borderWidth: vh * 0.1,
//     borderColor: '#F1F1F1',
//     backgroundColor: '#EDEDED',
//     // borderStyle: 'dashed',
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     // marginBottom: height * 0.02,
//     gap: 5,
//   },
// });

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
import {size, family, vh, vw} from '../../../utils';
import ActivityLoader from '../../ActivityLoader';
import {SelectList} from 'react-native-dropdown-select-list';
import CustomIcon from '../../CustomIcon';
import {HEIGHT, WIDTH} from '../../../theme/units';
import ImagePicker2 from '../../ImagePicker2';
import FastImage from 'react-native-fast-image';
import {getImageUrl} from '../../../utils/helperFunction';

const AddRewardsModal = ({
  visible,
  onClose,
  onSubmit,
  loading,
  editItem,
  isEditMode,
}) => {
  const [focusedField, setFocusedField] = useState('');

  const ValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    pointsCost: Yup.string().required('Points are required'),
    image: Yup.mixed()
      .required('Image is required')
      .test('fileExists', 'Image is required', value => value != null),
  });

  // Category options - make dynamic if needed from API
  const categoryOptions = [
    {key: '1', value: 'Discount'},
    {key: '2', value: 'Free Item'},
    {key: '3', value: 'Gift Card'},
    {key: '4', value: 'Exclusive Access'},
  ];

  // Helper to get key from value
  const getKeyForValue = value => {
    const option = categoryOptions.find(opt => opt.value === value);
    return option ? option.key : null;
  };

  // Prefill initial values if editing
  const initialValues = isEditMode
    ? {
        title: editItem?.title || '',
        description: editItem?.description || '',
        category: editItem?.category || '',
        pointsCost: editItem?.pointsCost?.toString() || '',
        image: editItem?.image || null, // Existing image URL or null
      }
    : {
        title: '',
        description: '',
        category: '',
        pointsCost: '',
        image: null,
      };

  const initialSelectedKey = isEditMode
    ? getKeyForValue(editItem?.category)
    : null;

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
              text={(isEditMode ? 'Edit' : 'New') + ' Reward'.toUpperCase()}
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
              initialValues={initialValues}
              validationSchema={ValidationSchema}
              onSubmit={values => {
                let payload = {
                  title: values.title.trim(),
                  description: values.description.trim(),
                  category: values.category.trim(),
                  pointsCost: values.pointsCost.trim(),
                  image: values.image,
                };
                if (isEditMode) {
                  payload.id = editItem._id; // Add ID for update
                  // If image not changed (still URL), keep as is; if new file, it's object
                }
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
                  <View style={styles.field}>
                    <View
                      style={{
                        marginLeft: 20,
                        marginBottom: 5,
                        flexDirection: 'row',
                      }}>
                      <CustomText
                        text="Reward Image"
                        font={family.Gilroy_Medium}
                        size={size.large}
                      />
                      <CustomText text=" *" color={colors.red} />
                    </View>
                    <ImagePicker2
                      onImageChange={(uri, type) => {
                        const fileName = uri.split('/').pop();
                        const imageObject = {
                          uri,
                          type,
                          name: fileName,
                        };
                        setFieldValue('image', imageObject);
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={[
                          styles.inputTouchable,
                          {height: values.image ? vh * 20 : vh * 20},
                        ]}
                        disabled={true}>
                        {values.image ? (
                          <FastImage
                            source={
                              typeof values.image === 'string'
                                ? getImageUrl(values.image)
                                : {uri: values.image.uri}
                            }
                            style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: 15,
                            }}
                            resizeMode="contain"
                          />
                        ) : (
                          <CustomText
                            text="+ Add Image"
                            color={colors.placeholderText}
                            size={size.medium}
                          />
                        )}
                      </TouchableOpacity>
                    </ImagePicker2>
                    {errors.image && touched.image && (
                      <CustomText
                        text={errors.image}
                        size={size.small}
                        color="red"
                        style={{marginTop: 5, left: 20}}
                      />
                    )}
                  </View>
                  {/* FULL NAME */}
                  <View style={styles.field}>
                    <CustomTextInput
                      textInputTitle={true}
                      staric={true}
                      labelTitle={'Reward Title'}
                      onFocus={() => setFocusedField('title')}
                      onBlur={() => {
                        handleBlur('title');
                        setFocusedField('');
                      }}
                      onChangeText={handleChange('title')}
                      placeholder="Enter Reward Title"
                      placeholderTextColor={colors.placeholderText}
                      value={values.title}
                      containerStyle={[
                        styles.input,
                        focusedField === 'title' && styles.focusedInput,
                      ]}
                    />
                    {errors.title && touched.title && (
                      <CustomText
                        text={errors.title}
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
                      labelTitle={'Description'}
                      onFocus={() => setFocusedField('description')}
                      onBlur={() => {
                        handleBlur('description');
                        setFocusedField('');
                      }}
                      onChangeText={handleChange('description')}
                      placeholder="Enter Description"
                      placeholderTextColor={colors.placeholderText}
                      value={values.description}
                      multiline
                      containerStyle={[
                        styles.input,
                        focusedField === 'description' && styles.focusedInput,
                      ]}
                    />
                    {errors.description && touched.description && (
                      <CustomText
                        text={errors.description}
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
                      labelTitle={'Points Cost'}
                      onFocus={() => setFocusedField('pointsCost')}
                      onBlur={() => {
                        handleBlur('pointsCost');
                        setFocusedField('');
                      }}
                      onChangeText={handleChange('pointsCost')}
                      placeholder="Enter Points"
                      keyboardType="numeric"
                      placeholderTextColor={colors.placeholderText}
                      value={values.pointsCost}
                      containerStyle={[
                        styles.input,
                        focusedField === 'pointsCost' && styles.focusedInput,
                      ]}
                    />
                    {errors.pointsCost && touched.pointsCost && (
                      <CustomText
                        text={errors.pointsCost}
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
                        text={'Select Category'}
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
                        setFieldValue('category', val);
                      }}
                      data={categoryOptions}
                      placeholder={editItem?.category}
                      search={false}
                      save="value"
                      boxStyles={[
                        styles.input,
                        focusedField === 'category' && styles.focusedInput,
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
                      onFocus={() => setFocusedField('category')}
                      onBlur={() => {
                        setFocusedField('');
                        handleBlur('category');
                      }}
                    />
                    {errors.category && touched.category && (
                      <CustomText
                        text={errors.category}
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
                        color={colors?.secondary}
                        // or white depending on background
                        style={{marginLeft: 10}}
                        size={'small'}
                      />
                    ) : (
                      <CustomButton
                        title={isEditMode ? 'Update Reward' : 'Add Reward'}
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

export default AddRewardsModal;

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
    height: '75%',
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
  field: {
    marginBottom: vh * 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  inputTouchable: {
    borderRadius: vw * 2,
    height: vh * 18,
    width: '98%',
    color: 'black',
    fontFamily: family.Gilroy_Medium,
    borderWidth: vh * 0.1,
    borderColor: '#F1F1F1',
    backgroundColor: '#EDEDED',
    // borderStyle: 'dashed',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: height * 0.02,
    gap: 5,
  },
});

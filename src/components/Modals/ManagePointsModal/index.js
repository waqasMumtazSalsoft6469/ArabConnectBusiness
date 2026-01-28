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
import CustomIcon from '../../CustomIcon';
import {HEIGHT, WIDTH} from '../../../theme/units';
import {LOG} from '../../../utils/helperFunction';

const ManagePointsModal = ({visible, onClose, onSubmit, loading}) => {
  const [focusedField, setFocusedField] = useState('');
  const [actionType, setActionType] = useState('add'); // default selected

  const ValidationSchema = Yup.object().shape({
    points: Yup.number().required('Points are required'),
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
            {/* HEADER */}
            <CustomText
              text={'Adjust Points'.toUpperCase()}
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

            {/* SELECTABLE ACTION BUTTONS */}
            <View
              style={{marginBottom: vh * 1, left: vh * 1, marginTop: vh * 3}}>
              <CustomText
                text={'Actions'.toUpperCase()}
                font={family.Gilroy_SemiBold}
                size={size.h6}
                color={colors2.theme.textDark}
              />
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  actionType === 'add' && styles.actionButtonSelected,
                ]}
                onPress={() => setActionType('add')}>
                <CustomText
                  text="Add Points"
                  size={size.medium}
                  font={family.Gilroy_SemiBold}
                  color={
                    actionType === 'add' ? 'white' : colors2.theme.textDark
                  }
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  actionType === 'redeem' && styles.actionButtonSelected,
                ]}
                onPress={() => setActionType('redeem')}>
                <CustomText
                  text="Redeem Points"
                  size={size.medium}
                  font={family.Gilroy_SemiBold}
                  color={
                    actionType === 'redeem' ? 'white' : colors2.theme.textDark
                  }
                />
              </TouchableOpacity>
            </View>

            {/* FORM */}
            <Formik
              initialValues={{points: ''}}
              validationSchema={ValidationSchema}
              onSubmit={values => {
                const payload = {
                  action: actionType, // add or redeem
                  points: values.points.trim(),
                };
                LOG('ManagePointsModal payload:', payload);
                onSubmit(payload);
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                touched,
                values,
              }) => (
                <>
                  <View style={styles.field}>
                    <CustomTextInput
                      textInputTitle={true}
                      staric={true}
                      labelTitle={'Points'}
                      onFocus={() => setFocusedField('points')}
                      onBlur={() => {
                        handleBlur('points');
                        setFocusedField('');
                      }}
                      onChangeText={handleChange('points')}
                      placeholder="Enter Points"
                      placeholderTextColor={colors.placeholderText}
                      value={values.points}
                      containerStyle={[
                        styles.input,
                        focusedField === 'points' && styles.focusedInput,
                      ]}
                    />

                    {errors.points && touched.points && (
                      <CustomText
                        text={errors.points}
                        size={size.small}
                        color={'red'}
                        style={{marginTop: 3, left: 20}}
                      />
                    )}
                  </View>

                  {/* BUTTON */}
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: HEIGHT * 0.02,
                      marginBottom: HEIGHT * 0.02,
                    }}>
                    {loading ? (
                      <ActivityLoader
                        color={colors?.secondary}
                        style={{marginLeft: 10}}
                        size={'small'}
                      />
                    ) : (
                      <CustomButton
                        title={'Confirm'}
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

export default ManagePointsModal;

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
    height: '50%',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vh * 2,
    // paddingHorizontal: 10
  },
  actionButton: {
    flex: 1,
    paddingVertical: vh * 1.5,
    marginHorizontal: vh * 0.5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors2.theme.textDark,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  actionButtonSelected: {
    backgroundColor: colors2.theme.primary,
    borderColor: colors2.theme.primary,
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
});

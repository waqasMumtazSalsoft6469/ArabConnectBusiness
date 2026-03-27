import React, {useState, useMemo} from 'react';
import {ScrollView, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useSelector} from 'react-redux';
import AppBackground from '../../../components/AppBackground';
import CustomText from '../../../components/CustomText';
import CustomTextInput, {
  CustomTextAreaInput,
} from '../../../components/CustomTextInput';
import CustomDatePicker from '../../../components/CustomDatePicker';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/Colors';
import styles from './styles';
import {useCreateFlyerMutation, useUpdateFlyerMutation} from '../../../Api/flyerApiSlice';
import {executeApiRequest} from '../../../Api/methods/method';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import NavService from '../../../helpers/NavService';

const toDateOnly = isoOrDate => {
  if (!isoOrDate) return '';
  const d = new Date(isoOrDate);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const FlyyerSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  zip_code: Yup.string().required('Zip code is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date()
    .required('End date is required')
    .min(Yup.ref('startDate'), 'End date cannot be before start date'),
});

const StepIndicator = ({activeStep = 2}) => {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepRow}>
        <View
          style={[
            styles.stepCircle,
            activeStep === 1 ? styles.stepCircleActive : styles.stepCircleInactive,
          ]}>
          <CustomText
            text="1"
            style={[
              styles.stepNumber,
              activeStep !== 1 ? styles.stepNumberInactive : null,
            ]}
          />
        </View>
        <CustomText
          text="Pick a template"
          style={[
            styles.stepLabel,
            activeStep !== 1 ? styles.stepLabelInactive : null,
          ]}
        />
      </View>
      <View style={styles.stepRow}>
        <View
          style={[
            styles.stepCircle,
            activeStep === 2 ? styles.stepCircleActive : styles.stepCircleInactive,
          ]}>
          <CustomText
            text="2"
            style={[
              styles.stepNumber,
              activeStep !== 2 ? styles.stepNumberInactive : null,
            ]}
          />
        </View>
        <CustomText text="Flyyer details" style={styles.stepLabel} />
      </View>
    </View>
  );
};

const getInitialValuesFromFlyer = editFlyer => {
  if (!editFlyer) {
    return {
      title: '',
      description: '',
      zip_code: '',
      startDate: '',
      endDate: '',
    };
  }
  const startDate = editFlyer.start_date
    ? (editFlyer.start_date.includes('T') ? editFlyer.start_date : `${editFlyer.start_date}T12:00:00.000Z`)
    : '';
  const endDate = editFlyer.end_date
    ? (editFlyer.end_date.includes('T') ? editFlyer.end_date : `${editFlyer.end_date}T12:00:00.000Z`)
    : '';
  return {
    title: editFlyer.title ?? '',
    description: editFlyer.description ?? '',
    zip_code: editFlyer.zip_code ?? '',
    startDate: startDate || '',
    endDate: endDate || '',
  };
};

const CreateFlyyerStepTwo = ({navigation, route}) => {
  const [focusedField, setFocusedField] = useState('');
  const selectedTemplate = route?.params?.selectedTemplate;
  const editFlyer = route?.params?.editFlyer;
  const flyerId = route?.params?.flyerId;
  const isEditMode = Boolean(flyerId && editFlyer);
  const user = useSelector(state => state?.auth?.user || {});
  const businessProfileId = user?.activeProfile || null;
  const [createFlyer, {isLoading: isCreating}] = useCreateFlyerMutation();
  const [updateFlyer, {isLoading: isUpdating}] = useUpdateFlyerMutation();
  const isLoading = isCreating || isUpdating;

  const initialValues = useMemo(
    () => getInitialValuesFromFlyer(editFlyer),
    [editFlyer],
  );

  const onSaveDraft = async values => {
    if (isEditMode && flyerId) {
      const body = {
        title: values.title ?? '',
        description: values.description ?? '',
        start_date: toDateOnly(values.startDate) || '',
        end_date: toDateOnly(values.endDate) || '',
        zip_code: values.zip_code ?? '',
      };
      const response = await executeApiRequest({
        apiCallFunction: updateFlyer,
        body,
        params: {id: flyerId},
        toast: true,
        timeout: 30000,
      });
      if (response) {
        NavService.goBack();
      }
      return;
    }
    if (!selectedTemplate?.id || !businessProfileId) {
      return;
    }
    const body = {
      flyer_template_id: selectedTemplate.id,
      businessProfile_id: businessProfileId,
      title: values.title,
      description: values.description,
      start_date: toDateOnly(values.startDate),
      end_date: toDateOnly(values.endDate),
      zip_code: values.zip_code,
    };
    const response = await executeApiRequest({
      apiCallFunction: createFlyer,
      body,
      toast: true,
      timeout: 30000,
    });
    if (response) {
      NavService.navigate('flyyerList');
    }
  };

  const templateForPreview = selectedTemplate || (isEditMode && editFlyer
    ? {
        name: editFlyer.template_name || 'Template',
        slots: 0,
        columns: editFlyer.layout_config?.columns ?? 7,
        rows: editFlyer.layout_config?.rows ?? 4,
      }
    : null);

  return (
    <AppBackground
      back={true}
      title={isEditMode ? 'Edit Flyer Details' : 'Create Flyyer'}
      marginHorizontal={false}>
      <Formik
        initialValues={initialValues}
        validationSchema={FlyyerSchema}
        onSubmit={onSaveDraft}
        enableReinitialize>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StepIndicator activeStep={2} />

            {templateForPreview ? (
              <View style={styles.selectedTemplateCard}>
                <CustomText
                  text={`Template: ${templateForPreview.name}`}
                  style={styles.selectedTemplateTitle}
                />
                <CustomText
                  text={`${templateForPreview.slots || 0} slots   ${templateForPreview.columns} columns x ${templateForPreview.rows} rows`}
                  style={styles.selectedTemplateMeta}
                />
              </View>
            ) : null}

            <View style={styles.formGroup}>
              <CustomTextInput
                textInputTitle={true}
                staric={true}
                labelTitle={'Title'}
                placeholder="Enter flyyer title"
                value={values.title}
                onFocus={() => setFocusedField('title')}
                onBlur={() => {
                  handleBlur('title');
                  setFocusedField('');
                }}
                onChangeText={handleChange('title')}
                containerStyle={[
                  styles.input,
                  focusedField === 'title' ? styles.focusedInput : null,
                ]}
              />
              {errors.title && touched.title ? (
                <CustomText text={errors.title} style={styles.errorText} />
              ) : null}
            </View>

            <View style={styles.formGroup}>
              <CustomTextInput
                textInputTitle={true}
                staric={true}
                labelTitle="Zip code"
                placeholder="Enter zip code"
                value={values.zip_code}
                onFocus={() => setFocusedField('zip_code')}
                onBlur={() => {
                  handleBlur('zip_code');
                  setFocusedField('');
                }}
                onChangeText={handleChange('zip_code')}
                keyboardType="numeric"
                containerStyle={[
                  styles.input,
                  focusedField === 'zip_code' ? styles.focusedInput : null,
                ]}
              />
              {errors.zip_code && touched.zip_code ? (
                <CustomText text={errors.zip_code} style={styles.errorText} />
              ) : null}
            </View>

            <View style={styles.formGroup}>
              <CustomTextAreaInput
                textInputTitle={true}
                staric={true}
                labelTitle={'Description'}
                placeholder="Enter flyyer description"
                value={values.description}
                numberOfLines={5}
                onFocus={() => setFocusedField('description')}
                onBlur={() => {
                  handleBlur('description');
                  setFocusedField('');
                }}
                onChangeText={handleChange('description')}
                containerStyle={[
                  styles.input,
                  styles.textAreaInput,
                  focusedField === 'description' ? styles.focusedInput : null,
                ]}
              />
              {errors.description && touched.description ? (
                <CustomText text={errors.description} style={styles.errorText} />
              ) : null}
            </View>

            <View style={styles.formGroup}>
              <CustomDatePicker
                title={'Start date'}
                staric={true}
                
                date={values.startDate ? new Date(values.startDate) : new Date()} // fallback
                onDateChange={date =>
                  setFieldValue('startDate', date.toISOString())
                }
              />
              {errors.startDate && touched.startDate ? (
                <CustomText text={errors.startDate} style={styles.errorText} />
              ) : null}
            </View>

            <View style={styles.formGroup}>
              <CustomDatePicker
                title={'End date'}
                staric={true}
                date={values.endDate ? new Date(values.endDate) : new Date()}
                onDateChange={date => setFieldValue('endDate', date.toISOString())}
              />
              {errors.endDate && touched.endDate ? (
                <CustomText text={errors.endDate} style={styles.errorText} />
              ) : null}
            </View>

            <View style={styles.actionButtonWrap}>
              {isLoading ? (
                <ActivityLoader color={colors2?.theme?.secondary} />
              ) : (
                <CustomButton
                  gradientColorArr={[colors.secondary, colors.secondary]}
                  title={isEditMode ? 'Save changes' : 'Save as draft'}
                  customWidth="100%"
                  buttonStyle={styles.btnRound}
                  textStyle={styles.btnTextLarge}
                  onPress={handleSubmit}
                />
              )}
            </View>
          </ScrollView>
        )}
      </Formik>
    </AppBackground>
  );
};

export default CreateFlyyerStepTwo;

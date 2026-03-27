import React, {useMemo, useState, useEffect} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import AppBackground from '../../../components/AppBackground';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/CustomButton';
import {useFetchFlyerTemplatesQuery} from '../../../Api/flyerApiSlice';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import {colors} from '../../../utils/Colors';
import NavService from '../../../helpers/NavService';
import styles from './styles';
import CustomFastImage from '../../../components/CustomFastImage';

const StepIndicator = ({activeStep = 1}) => {
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
        <CustomText text="Pick a template" style={styles.stepLabel} />
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
        <CustomText
          text="Flyyer details"
          style={[
            styles.stepLabel,
            activeStep !== 2 ? styles.stepLabelInactive : null,
          ]}
        />
      </View>
    </View>
  );
};

const TemplateCard = ({item, selected, onPress}) => {
  const columns = item.layout_config?.columns ?? 0;
  const rows = item.layout_config?.rows ?? 0;
  const slotCount = Array.isArray(item.slots) ? item.slots.length : 0;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.card, selected ? styles.cardSelected : null]}>
            <View style={styles.imagePlaceholder}>
     {item?.image ? 
     
     <CustomFastImage source={getImageUrl(item.image)} style={styles.cardImage} /> : 
  
      <CustomText text="No image" style={styles.noImageText} />
     }
    </View>

     
      <View style={styles.cardBody}>
        <CustomText text={item.name} style={styles.cardTitle} />
        <CustomText text={item.description} style={styles.cardDescription} />
        <CustomText
          text={`${slotCount} slots   ${columns} columns x ${rows} rows`}
          style={styles.cardMeta}
        />
      </View>
    </TouchableOpacity>
  );
};

const CreateFlyyerStepOne = ({navigation}) => {
  const {data: templatesData, isLoading} = useFetchFlyerTemplatesQuery();
  const templateList = Array.isArray(templatesData) ? templatesData : [];
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  useEffect(() => {
    if (templateList.length > 0 && !selectedTemplateId) {
      setSelectedTemplateId(templateList[0].id);
    }
  }, [templateList, selectedTemplateId]);

  const selectedTemplate = useMemo(
    () => templateList.find(t => t.id === selectedTemplateId),
    [templateList, selectedTemplateId],
  );

  const previewItems = useMemo(() => {
    if (!selectedTemplate || !Array.isArray(selectedTemplate.slots)) return [];
    return selectedTemplate.slots;
  }, [selectedTemplate]);

  const selectedTemplateForStep2 = useMemo(() => {
    if (!selectedTemplate) return null;
    const cols = selectedTemplate.layout_config?.columns ?? 0;
    const rows = selectedTemplate.layout_config?.rows ?? 0;
    const slotCount = Array.isArray(selectedTemplate.slots) ? selectedTemplate.slots.length : 0;
    return {
      id: selectedTemplate.id,
      name: selectedTemplate.name,
      description: selectedTemplate.description,
      columns: cols,
      rows,
      slots: slotCount,
    };
  }, [selectedTemplate]);

  const goToStep2 = () => {
    if (selectedTemplateForStep2) {
      NavService.navigate('createFlyyerStep2', {selectedTemplate: selectedTemplateForStep2});
    }
  };

  if (isLoading) {
    return (
      <AppBackground back title="Create Flyyer">
        <ActivityLoader color={colors2?.theme?.secondary} />
      </AppBackground>
    );
  }

  return (
    <AppBackground back title="Create Flyyer" marginHorizontal={false}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <StepIndicator activeStep={1} />

        {templateList.map(template => (
          <TemplateCard
            key={template.id}
            item={template}
            selected={selectedTemplateId === template.id}
            onPress={() => setSelectedTemplateId(template.id)}
          />
        ))}

        {selectedTemplate && previewItems.length > 0 ? (
          <View style={styles.previewCard}>
            <CustomText text="Layout preview" style={styles.previewTitle} />
            <View style={styles.layoutPreviewSection}>
                  <View style={styles.layoutPreviewGrid}>
                    {Array.from(
                      {length: (selectedTemplate.rows || 4) * (selectedTemplate.columns || 7)},
                      (_, i) => {
                        const row = Math.floor(i / (selectedTemplate.columns || 7));
                        const col = i % (selectedTemplate.columns || 7);
                        return (
                          <View key={`slot_${row}_${col}`} style={styles.layoutPreviewCell}>
                            <CustomText
                              text={`slot_${row}_${col}`}
                              style={styles.layoutPreviewCellLabel}
                              // numberOfLines={1}
                            />
                          </View>
                        );
                      },
                    )}
                  </View>
                </View>
          </View>
        ) : null}

        <View style={styles.actionButtonWrap}>
          <CustomButton
            gradientColorArr={[colors.secondary, colors.secondary]}
            title="Next"
            customWidth="100%"
            buttonStyle={styles.btnRound}
            textStyle={styles.btnTextLarge}
            onPress={goToStep2}
            disabled={!selectedTemplateForStep2}
          />
        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default CreateFlyyerStepOne;

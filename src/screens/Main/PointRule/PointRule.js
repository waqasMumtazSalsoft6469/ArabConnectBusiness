import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, TextInput, Alert} from 'react-native';
import AppBackground from '../../../components/AppBackground';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/CustomButton';
import {
  useFetchPointRuleQuery,
  useCreateOrUpdatePointRuleMutation,
  useTogglePointRuleMutation,
} from '../../../Api/pointRuleApiSlice';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors} from '../../../utils/Colors';
import {colors2} from '../../../theme/colors2';
import {executeApiRequest} from '../../../Api/methods/method';
import styles from './styles';

const RULE_TYPES = [
  {key: 'per_spend', label: 'Per spend (auto from receipt amount)'},
  {key: 'manual', label: 'Manual (enter points when approving)'},
];

const PointRule = () => {
  const [ruleType, setRuleType] = useState('per_spend');
  const [spendThreshold, setSpendThreshold] = useState('');
  const [pointsPerUnit, setPointsPerUnit] = useState('');

  const {data: rule, isLoading, refetch} = useFetchPointRuleQuery();
  const [createOrUpdate, {isLoading: isSaving}] = useCreateOrUpdatePointRuleMutation();
  const [toggle, {isLoading: isToggling}] = useTogglePointRuleMutation();

  const hasRule = rule != null;
  const isPerSpend = ruleType === 'per_spend';

  const loadExistingRule = () => {
    if (rule) {
      setRuleType(rule.rule_type || 'per_spend');
      setSpendThreshold(rule.spend_threshold != null ? String(rule.spend_threshold) : '');
      setPointsPerUnit(rule.points_per_unit != null ? String(rule.points_per_unit) : '');
    }
  };

  React.useEffect(() => {
    if (rule) loadExistingRule();
  }, [rule?._id]);

  const handleSave = async () => {
    if (isPerSpend) {
      const threshold = Number(spendThreshold);
      const points = Number(pointsPerUnit);
      if (!(threshold > 0 && points > 0)) {
        Alert.alert('Invalid values', 'Spend threshold and points per unit must be positive numbers.');
        return;
      }
    }
    await executeApiRequest({
      apiCallFunction: () =>
        createOrUpdate({
          rule_type: ruleType,
          ...(isPerSpend && {
            spend_threshold: Number(spendThreshold),
            points_per_unit: Number(pointsPerUnit),
          }),
        }),
      toast: true,
    });
    refetch();
  };

  const handleToggle = async () => {
    try {
      await toggle().unwrap();
      refetch();
    } catch (e) {
      if (e?.status === 404) {
        Alert.alert('No rule', 'Create and save a rule first, then you can toggle it.');
      }
    }
  };

  if (isLoading && !rule) {
    return (
      <AppBackground back title="Point Rule">
        <ActivityLoader color={colors2?.theme?.secondary} />
      </AppBackground>
    );
  }

  return (
    <AppBackground back title="Point Rule">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {!hasRule ? (
          <View style={styles.card}>
            <CustomText text="Set up point rule" style={styles.sectionTitle} />
            <CustomText
              text="Choose how points are awarded when you approve receipts."
              style={styles.hint}
            />
            <View style={styles.ruleTypeRow}>
              {RULE_TYPES.map(opt => (
                <TouchableOpacity
                  key={opt.key}
                  style={[styles.ruleTypeChip, ruleType === opt.key && styles.ruleTypeChipActive]}
                  onPress={() => setRuleType(opt.key)}>
                  <CustomText
                    text={opt.label}
                    style={[styles.ruleTypeChipText]}
                    color={ruleType === opt.key ? colors.white : colors.placeholderText}
                    // numberOfLines={2}
                  />
                </TouchableOpacity>
              ))}
            </View>
            {isPerSpend && (
              <>
                <CustomText text="Spend threshold ($)" style={styles.label} />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 10"
                  placeholderTextColor={colors.placeholderText}
                  value={spendThreshold}
                  onChangeText={setSpendThreshold}
                  keyboardType="decimal-pad"
                />
                <CustomText text="Points per unit" style={styles.label} />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 1"
                  placeholderTextColor={colors.placeholderText}
                  value={pointsPerUnit}
                  onChangeText={setPointsPerUnit}
                  keyboardType="number-pad"
                />
              </>
            )}
            <CustomButton
              title={isSaving ? 'Saving…' : 'Save rule'}
              onPress={handleSave}
              buttonStyle={styles.saveBtn}
              disabled={isSaving}
              gradientColorArr={[colors.secondary, colors.secondary]}
            />
          </View>
        ) : (
          <View style={styles.card}>
            <CustomText text="Current rule" style={styles.sectionTitle} />
            <View style={styles.fieldRow}>
              <CustomText text="Type" style={styles.label} />
              <CustomText text={rule.rule_type === 'per_spend' ? 'Per spend' : 'Manual'} style={styles.value}
              // color={rule.rule_type === 'per_spend' ? colors.green : colors.placeholderText}
              />
            </View>
            {rule.rule_type === 'per_spend' && (
              <>
                <View style={styles.fieldRow}>
                  <CustomText text="Spend threshold" style={styles.label} />
                  <CustomText text={`$${rule.spend_threshold ?? '—'}`} style={styles.value} />
                </View>
                <View style={styles.fieldRow}>
                  <CustomText text="Points per unit" style={styles.label} />
                  <CustomText text={String(rule.points_per_unit ?? '—')} style={styles.value} />
                </View>
              </>
            )}
            <View style={styles.fieldRow}>
              <CustomText text="Active" style={styles.label} />
              <CustomText text={rule.is_active ? 'Yes' : 'No'} style={styles.value} />
            </View>
            {/* <CustomButton
              title={isToggling ? '…' : rule.is_active ? 'Turn off rule' : 'Turn on rule'}
              onPress={handleToggle}
              buttonStyle={[styles.saveBtn, !rule.is_active && styles.saveBtnGreen]}
              disabled={isToggling}
              gradientColorArr={[rule?.is_active ? colors.placeholderText : colors.green, rule?.is_active ? colors.placeholderText : colors.green]}
            /> */}
            <CustomText text="Edit rule" style={[styles.label, styles.editLabel]} />
            <View style={styles.ruleTypeRow}>
              {RULE_TYPES.map(opt => (
                <TouchableOpacity
                  key={opt.key}
                  style={[styles.ruleTypeChip, ruleType === opt.key && styles.ruleTypeChipActive]}
                  onPress={() => setRuleType(opt.key)}>
                  <CustomText
                    text={opt.label}
                    style={[styles.ruleTypeChipText, ruleType === opt.key && styles.ruleTypeChipTextActive]}
                    numberOfLines={2}
                  />
                </TouchableOpacity>
              ))}
            </View>
            {isPerSpend && (
              <>
                <CustomText text="Spend threshold ($)" style={styles.label} />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 10"
                  placeholderTextColor={colors.placeholderText}
                  value={spendThreshold}
                  onChangeText={setSpendThreshold}
                  keyboardType="decimal-pad"
                />
                <CustomText text="Points per unit" style={styles.label} />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 1"
                  placeholderTextColor={colors.placeholderText}
                  value={pointsPerUnit}
                  onChangeText={setPointsPerUnit}
                  keyboardType="number-pad"
                />
              </>
            )}
            <CustomButton
              title={isSaving ? 'Updating…' : 'Update rule'}
              onPress={handleSave}
              buttonStyle={styles.saveBtn}
              disabled={isSaving}
              gradientColorArr={[colors.secondary, colors.secondary]}
            />
          </View>
        )}
      </ScrollView>
    </AppBackground>
  );
};

export default PointRule;

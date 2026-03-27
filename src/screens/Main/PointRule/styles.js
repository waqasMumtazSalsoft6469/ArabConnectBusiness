import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/Colors';
import {family} from '../../../utils';
import {spacing, font} from '../../../theme/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.mediumh,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: spacing.small,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.medium,
    marginBottom: spacing.medium,
  },
  sectionTitle: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.xlarge,
    color: colors.black,
    marginBottom: spacing.small,
  },
  hint: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.medium,
    color: colors.placeholderText,
    marginBottom: spacing.small,
  },
  label: {
    fontFamily: family?.Gilroy_Medium,
    fontSize: font.small,
    color: colors.placeholderText,
    marginBottom: spacing.xxsmall,
  },
  value: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.medium,
    color: colors.text,
  },
  fieldRow: {
    marginBottom: spacing.small,
  },
  ruleTypeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.small,
    gap: spacing.xsmall,
  },
  ruleTypeChip: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
    borderRadius: spacing.xsmall,
    backgroundColor: colors.grayBgDarker,
    minWidth: 140,
  },
  ruleTypeChipActive: {
    backgroundColor: colors.secondary,
  },
  ruleTypeChipText: {
    fontFamily: family?.Gilroy_Medium,
    fontSize: font.small,
    color: colors.placeholderText,
  },
  // ruleTypeChipTextActive: {
  //   color: colors.white,
  // },
  input: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: spacing.xsmallh,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.small,
    fontFamily: family?.Questrial_Regular,
    fontSize: font.medium,
    color: colors.text,
    marginBottom: spacing.small,
  },
  saveBtn: {
    marginTop: spacing.small,
  },
  saveBtnGreen: {
    backgroundColor: colors.green,
  },
  editLabel: {
    marginTop: spacing.medium,
  },
});

export default styles;

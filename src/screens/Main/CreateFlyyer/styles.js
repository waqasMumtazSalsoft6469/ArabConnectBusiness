import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../utils/Colors';
import {family, vh} from '../../../utils';
import {spacing, font} from '../../../theme/styles';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.small,
    paddingTop: spacing.xsmall,
  },
  stepContainer: {
    marginTop: spacing.xxsmall,
    marginBottom: spacing.medium,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.small,
  },
  stepCircleActive: {
    backgroundColor: colors.blueAccent,
  },
  stepCircleInactive: {
    backgroundColor: colors.stepCircleInactive,
  },
  stepNumber: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.small,
    color: colors.white,
  },
  stepNumberInactive: {
    color: colors.placeholderText,
  },
  stepLabel: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.large,
    color: colors.text,
  },
  stepLabelInactive: {
    color: colors.stepInactive,
  },
  card: {
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    borderRadius: spacing.small,
    backgroundColor: colors.white,
    marginBottom: spacing.small,
    overflow: 'hidden',
  },
  cardSelected: {
    borderColor: colors.orangeBorder,
  },
  imagePlaceholder: {
    margin: spacing.small,
    borderRadius: spacing.small,
    height: height * 0.17,
    backgroundColor: colors.placeholderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  noImageText: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.large,
    color: colors.placeholderGray,
  },
  cardBody: {
    paddingHorizontal: spacing.small,
    paddingBottom: spacing.small,
  },
  cardTitle: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.h6,
    color: colors.black,
    marginBottom: spacing.xxsmall,
  },
  cardDescription: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.large,
    color: colors.placeholderText,
    marginBottom: spacing.xsmall,
  },
  cardMeta: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.medium,
    color: colors.text,
  },
  previewCard: {
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: spacing.small,
    backgroundColor: colors.grayBg,
    padding: spacing.small,
    marginBottom: spacing.medium,
  },
  previewTitle: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.large,
    color: colors.text,
    marginBottom: spacing.small,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.xxsmall,
  },
  gridItem: {
    width: '13%',
    aspectRatio: 1,
    borderRadius: spacing.xxsmall,
    backgroundColor: colors.blueAccent,
  },
  actionButtonWrap: {
    marginTop: spacing.xxsmall,
    marginBottom: spacing.medium,
    alignItems: 'center',
  },
  btnRound: {
    borderRadius: 50,
  },
  btnTextLarge: {
    fontSize: font.large,
  },
  formGroup: {
    marginBottom: spacing.small,
  },
  input: {
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    borderRadius: 50,
    backgroundColor: colors.placeholderColor,
    paddingHorizontal: spacing.small,
  },
  focusedInput: {
    borderColor: colors.iconColor,
  },
  textAreaInput: {
    borderRadius: spacing.small,
  },
  errorText: {
    fontFamily: family?.Gilroy_Medium,
    fontSize: font.small,
    color: colors.red,
    marginTop: spacing.xxsmall,
    marginLeft: spacing.small,
  },
  selectedTemplateCard: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: spacing.small,
    padding: spacing.small,
    marginBottom: spacing.small,
    backgroundColor: colors.grayBg,
  },
  selectedTemplateTitle: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.large,
    color: colors.black,
    marginBottom: spacing.xxsmall,
  },
  selectedTemplateMeta: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.medium,
    color: colors.placeholderText,
  },
  layoutPreviewSection: {
    // marginBottom: spacing.medium,
  },
  layoutPreviewTitle: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.large,
    color: colors.text,
    marginBottom: spacing.small,
  },
  layoutPreviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.xxsmall,
  },
  layoutPreviewCell: {
    width: '22%',
    height: vh*3,
    borderRadius: spacing.xsmallh,
    backgroundColor: colors.blueAccentBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  layoutPreviewCellLabel: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.xxxsmall,
    color: colors.blueAccent,
  },
});

export default styles;

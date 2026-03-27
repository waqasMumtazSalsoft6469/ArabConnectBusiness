import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../utils/Colors';
import {family} from '../../../utils';
import {spacing, font} from '../../../theme/styles';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.mediumh,
    paddingBottom: spacing.medium,
  },
  gridWrap: {
    marginTop: spacing.small,
    marginBottom: spacing.medium,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.xsmall,
  },
  slotCell: {
    width: (width - spacing.mediumh * 2 - spacing.largeh) / 7,
    aspectRatio: 0.7,
    borderRadius: spacing.xsmallh,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderMuted,
    backgroundColor: colors.grayBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxsmall,
  },
  slotCellSelected: {
    borderColor: colors.blueAccent,
    borderStyle: 'solid',
    backgroundColor: colors.blueAccentBg,
  },
  slotCellFilled: {
    backgroundColor: colors.blueAccentBg,
  },
  slotIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    marginBottom: spacing.xxsmall,
    tintColor: colors.placeholderText,
  },
  slotLabel: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.xsmall,
    color: colors.placeholderText,
    textAlign: 'center',
  },
  slotLabelPlus: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.medium,
    color: colors.placeholderText,
    textAlign: 'center',
  },
  slotThumb: {
    width: '100%',
    height: '100%',
    borderRadius: spacing.xsmall,
    resizeMode: 'cover',
    backgroundColor:"red"
  },
  footerBar: {
    // flexDirection: 'row',
    // alignItems: 'center',
    gap: spacing.small,
    justifyContent: 'space-between',
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.xsmallh,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    backgroundColor: colors.white,
    marginTop: spacing.xsmallh,
  },
  footerHint: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.medium,
    color: colors.placeholderText,
  },
  footerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.small,
  },
  btnDraft: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: spacing.xsmallh,
    backgroundColor: colors.secondary,
  },
  btnOutline: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: spacing.xsmallh,
    borderWidth: 1.5,
    borderColor: colors.borderMuted,
  },
  btnPublish: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: spacing.xsmallh,
    backgroundColor: colors.secondary,
  },
  btnTextSolid: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.medium,
    color: colors.white,
  },
  btnTextOutline: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.medium,
    color: colors.text,
  },
  panel: {
    backgroundColor: colors.white,
    borderRadius: spacing.small,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.small,
    marginBottom: spacing.small,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.small,
    gap: spacing.xsmallh,
  },
  slotKeyText: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.large,
    color: colors.black,
  },
  typeBadge: {
    paddingHorizontal: spacing.xsmallh,
    paddingVertical: spacing.xxsmall,
    borderRadius: spacing.xsmallh,
    backgroundColor: colors.blueAccentBg,
  },
  typeBadgeText: {
    fontFamily: family?.Gilroy_Medium,
    fontSize: font.small,
    color: colors.blueAccent,
  },
  searchWrap: {
    marginBottom: spacing.small,
  },
  productList: {
    marginBottom: spacing.small,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.xsmallh,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayBgDark,
  },
  productThumb: {
    width: 48,
    height: 48,
    borderRadius: spacing.xsmallh,
    backgroundColor: colors.grayBgDarker,
    marginRight: spacing.small,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.medium,
    color: colors.black,
  },
  productPrice: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.small,
    color: colors.placeholderText,
    marginTop: spacing.xxsmall,
  },
  slotFields: {
    marginTop: spacing.xsmallh,
    marginBottom: spacing.small,
  },
  fieldRow: {
    marginBottom: spacing.small,
  },
  fieldLabel: {
    fontFamily: family?.Gilroy_Medium,
    fontSize: font.small,
    color: colors.text,
    marginBottom: spacing.xxsmall,
  },
  inputField: {
    backgroundColor: colors.inputBg,
    borderRadius: spacing.xsmallh,
    paddingHorizontal: spacing.small,
  },
  slotActions: {
    flexDirection: 'row',
    gap: spacing.small,
    marginTop: spacing.xsmallh,
  },
  btnSlotSave: {
    flex: 1,
    borderRadius: spacing.xsmallh,
  },
  heroUploadArea: {
    height: 120,
    borderRadius: spacing.small,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderMuted,
    backgroundColor: colors.grayBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.small,
  },
  heroUploadInner: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  heroPreviewThumb: {
    width: 80,
    height: 80,
    borderRadius: spacing.xsmallh,
    resizeMode: 'cover',
  },
  createProductLink: {
    marginBottom: spacing.small,
  },
  createProductLinkText: {
    color: colors.blueAccent,
    textDecorationLine: 'underline',
    fontSize: font.small,
    fontFamily: family?.Gilroy_Medium,
  },
  btnDisabled: {
    opacity: 0.7,
  },
  slotActionLoader: {
    flex: 1,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;

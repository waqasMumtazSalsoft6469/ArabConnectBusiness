import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../utils/Colors';
import {family, vh} from '../../../utils';
import {spacing, font} from '../../../theme/styles';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.mediumh,
    paddingBottom: spacing.xxlarge,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: spacing.small,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.small,
    marginBottom: spacing.medium,
  },
  receiptImage: {
    width: width - spacing.mediumh * 2 - spacing.small * 2,
    height: 220,
    borderRadius: spacing.xsmallh,
    backgroundColor: colors.grayBgDark,
    marginBottom: spacing.small,
  },
  fieldRow: {
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
  amount: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.xlarge,
    color: colors.secondary,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.xxsmall,
    borderRadius: spacing.xsmall,
    backgroundColor: colors.grayBgDarker,
  },
  statusApproved: { backgroundColor: colors.greenBadgeBg },
  statusRejected: { backgroundColor: colors.redBadgeBg },
  statusText: {
    fontFamily: family?.Gilroy_Medium,
    fontSize: font.small,
    color: colors.text,
  },
  metaText: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.medium,
    color: colors.placeholderText,
  },
  actions: {
    // flexDirection: 'row',
    gap: spacing.medium,
    marginTop: spacing.xsmall,
  },
  btnApprove: {
    height: vh*5,
    borderRadius: spacing.xsmallh,
  },
  btnReject: {
    flex: 1,
    borderRadius: spacing.xsmallh,
    borderWidth: 1.5,
    borderColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.small,
  },
  btnText: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.medium,
    color: colors.white,
  },
  btnRejectText: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.medium,
    color: colors.red,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: spacing.medium,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: spacing.small,
    padding: spacing.medium,
  },
  modalTitle: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.large,
    color: colors.black,
    marginBottom: spacing.small,
  },
  modalHint: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.small,
    color: colors.placeholderText,
    marginBottom: spacing.small,
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: spacing.xsmallh,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.small,
    fontFamily: family?.Questrial_Regular,
    fontSize: font.medium,
    color: colors.text,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: spacing.small,
  },
  modalActions: {
    flexDirection: 'row',
    gap: spacing.small,
  },
  modalBtnCancel: {
    flex: 1,
    paddingVertical: spacing.small,
    alignItems: 'center',
  },
  modalCancelText: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.medium,
    color: colors.placeholderText,
  },
  modalBtnReject: {
    flex: 1,
    paddingVertical: spacing.small,
    alignItems: 'center',
    borderRadius: spacing.xsmallh,
    backgroundColor: colors.red,
  },
  modalRejectBtnText: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.medium,
    color: colors.white,
  },
  modalBtnApprove: {
    flex: 1,
    paddingVertical: spacing.small,
    alignItems: 'center',
    borderRadius: spacing.xsmallh,
    backgroundColor: colors.green,
  },
  modalApproveBtnText: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.medium,
    color: colors.white,
  },
  modalBtnDisabled: {
    opacity: 0.5,
  },
});

export default styles;

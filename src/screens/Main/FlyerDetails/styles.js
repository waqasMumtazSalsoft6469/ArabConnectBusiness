import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../utils/Colors';
import {family, vh} from '../../../utils';
import {spacing, font} from '../../../theme/styles';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.mediumh,
    paddingBottom: spacing.medium,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: spacing.xsmallh,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.small,
    marginBottom: spacing.small,
  },
  title: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.xlarge,
    color: colors.black,
    marginBottom: spacing.xsmall,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.xsmall,
    marginBottom: spacing.xxsmall,
  },
  statusBadge: {
    paddingHorizontal: spacing.xsmall,
    paddingVertical: spacing.xxsmall,
    borderRadius: spacing.xsmall,
    backgroundColor: colors.grayBgDarker,
  },
  statusBadgePublished: {
    backgroundColor: colors.greenBadgeBg,
  },
  statusText: {
    fontFamily: family?.Gilroy_Medium,
    fontSize: font.small,
    color: colors.placeholderText,
  },
  statusTextPublished: {
    color: colors.green,
  },
  metaText: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.medium,
    color: colors.placeholderText,
  },
  templateLabel: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.medium,
    color: colors.placeholderText,
    marginBottom: spacing.small,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.small,
    marginTop: spacing.xxsmall,
  },
  btnOutline: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
    borderRadius: spacing.xsmall,
    borderWidth: 1.5,
    borderColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xsmall,
  },
  btnSolid: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
    borderRadius: spacing.xsmall,
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxsmall,
  },
  btnDisabled: {
    opacity: 0.7,
  },
  loaderOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIcon: {
    width: vh*1.5,
    height: vh*1.5,
    resizeMode: 'contain',
  },
  btnIconSolid: {
    width: vh*1.5,
    height: vh*1.5,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  btnTextOutline: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.small,
    color: colors.secondary,
  },
  btnTextSolid: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.small,
    color: colors.white,
  },
  sectionTitle: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.large,
    color: colors.black,
    marginBottom: spacing.xsmall,
    marginTop: spacing.xxsmall,
  },
  slotsFilledText: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.medium,
    color: colors.placeholderText,
    marginBottom: spacing.small,
  },
  previewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.medium,
  },
  previewCell: {
    width: (width - 52) / 7 - 4,
    aspectRatio: 1,
    borderRadius: spacing.xxsmall,
    backgroundColor: colors.grayBgDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxsmall,
  },
  previewCellFilled: {
    backgroundColor: colors.blueAccentBg,
  },
  previewCellImage: {
    width: '100%',
    height: '100%',
    borderRadius: spacing.xxsmall,
    resizeMode: 'cover',
  },
  previewCellText: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.xxxsmall,
    color: colors.stepInactive,
  },
  tableWrap: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: spacing.xsmall,
    overflow: 'hidden',
    marginBottom: spacing.medium,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.xsmall,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.grayBg,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.xsmall,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayBgDark,
  },
  colSlotKey: { width: '18%' },
  colType: { width: '14%' },
  colProduct: { width: '22%' },
  colPrice: { width: '14%' },
  colBadge: { width: '14%' },
  colStatus: { width: '18%' },
  tableHeaderText: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.small,
    color: colors.black,
  },
  tableCellText: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.small,
    color: colors.text,
  },
  tableCellEmpty: {
    color: colors.stepInactive,
  },
  badgeEmpty: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.xxsmall,
    paddingVertical: spacing.xxsmall,
    borderRadius: spacing.xxsmall,
    backgroundColor: colors.blueAccentBg,
  },
  badgeEmptyText: {
    fontFamily: family?.Gilroy_Medium,
    fontSize: font.xsmall,
    color: colors.blueAccent,
  },
});

export default styles;

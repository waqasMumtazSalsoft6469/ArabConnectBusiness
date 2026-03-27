import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../utils/Colors';
import {family} from '../../../utils';
import {spacing, font} from '../../../theme/styles';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.mediumh,
    paddingTop: spacing.small,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.small,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.small,
  },
  statCard: {
    width: (width - 80) / 2,
    borderRadius: spacing.small,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.white,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
    marginBottom: spacing.small,
  },
  statLabel: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.medium,
    color: colors.placeholderText,
    marginBottom: spacing.xxsmall,
  },
  statValue: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.h5,
    color: colors.black,
  },
  statValueGreen: {
    color: colors.green,
  },
  statValueRed: {
    color: colors.red,
  },
  searchWrap: {
    marginBottom: spacing.small,
  },
  filterWrap: {
    marginBottom: spacing.small,
  },
  filterTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    borderRadius: spacing.small,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.placeholderColor,
    paddingHorizontal: spacing.small,
  },
  filterSelectBox: {
    height: 48,
    borderRadius: spacing.small,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.placeholderColor,
    paddingHorizontal: spacing.small,
  },
  filterSelectInput: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.large,
    color: colors.placeholderText,
  },
  filterDropdownText: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.large,
    color: colors.text,
  },
  filterDropdown: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: spacing.small,
  },
  filterArrow: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  filterText: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.large,
    color: colors.placeholderText,
  },
  listCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.small,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.small,
    marginBottom: spacing.small,
  },
  listCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xsmall,
  },
  listCardTitle: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.large,
    color: colors.black,
    flex: 1,
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
  statusBadgeExpired: {
    backgroundColor: colors.redBadgeBg,
  },
  statusText: {
    fontFamily: family?.Gilroy_Medium,
    fontSize: font.small,
    color: colors.placeholderText,
  },
  statusTextPublished: {
    color: colors.green,
  },
  statusTextExpired: {
    color: colors.red,
  },
  listCardMeta: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.medium,
    color: colors.placeholderText,
    marginBottom: spacing.xxsmall,
  },
  listCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.small,
    gap: spacing.small,
  },
  actionIconWrap: {
    padding: spacing.xxsmall,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.medium,
    right: spacing.mediumh,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default styles;

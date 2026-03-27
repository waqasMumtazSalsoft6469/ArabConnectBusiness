import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../utils/Colors';
import {family} from '../../../utils';
import {spacing, font} from '../../../theme/styles';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.mediumh,
    paddingTop: spacing.small,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.small,
  },
  statCard: {
    width: (width - spacing.mediumh * 2 - spacing.small) / 2,
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
  statValueGreen: { color: colors.green },
  statValueRed: { color: colors.red },
  statValuePending: { color: colors.pendingColor },
  listContent: { paddingBottom: spacing.xxlarge },
  listCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.small,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.small,
    marginBottom: spacing.small,
  },
  listCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  receiptThumb: {
    width: 64,
    height: 64,
    borderRadius: spacing.xsmallh,
    backgroundColor: colors.grayBgDark,
    marginRight: spacing.small,
  },
  listCardBody: { flex: 1 },
  listCardTitle: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.large,
    color: colors.black,
    marginBottom: spacing.xxsmall,
  },
  listCardMeta: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.medium,
    color: colors.placeholderText,
    marginBottom: spacing.xxsmall,
  },
  amountText: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: font.large,
    color: colors.secondary,
    marginBottom: spacing.xxsmall,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.xsmall,
    paddingVertical: spacing.xxsmall,
    borderRadius: spacing.xsmall,
    backgroundColor: colors.grayBgDarker,
  },
  statusBadgeApproved: { backgroundColor: colors.greenBadgeBg },
  statusBadgeRejected: { backgroundColor: colors.redBadgeBg },
  statusText: {
    fontFamily: family?.Gilroy_Medium,
    fontSize: font.small,
    color: colors.placeholderText,
  },
  statusTextApproved: { color: colors.green },
  statusTextRejected: { color: colors.red },
  emptyText: { textAlign: 'center', marginTop: spacing.xxlarge },
  emptyWrap: { paddingVertical: spacing.xxlarge, alignItems: 'center' },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  searchWrap: { flex: 1, marginRight: spacing.small },
  searchBtn: {
    // flex:1,
    paddingVertical: spacing.xsmall,
    paddingHorizontal: spacing.small,
    backgroundColor: colors.secondary,
    borderRadius: spacing.xsmall,
    justifyContent: 'center',
  },
  searchBtnText: {
    fontFamily: family?.Gilroy_Medium,
    fontSize: font.medium,
    color: colors.white,
  },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.small,
    gap: spacing.xsmall,
  },
  statusChip: {
    paddingVertical: spacing.xsmall,
    paddingHorizontal: spacing.small,
    borderRadius: spacing.xsmall,
    backgroundColor: colors.grayBgDarker,
  },
  statusChipActive: {
    backgroundColor: colors.secondary,
  },
  statusChipText: {
    fontFamily: family?.Gilroy_Medium,
    fontSize: font.small,
    color: colors.placeholderText,
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  paginationBtn: {
    paddingVertical: spacing.xsmall,
    paddingHorizontal: spacing.small,
    backgroundColor: colors.secondary,
    borderRadius: spacing.xsmall,
  },
  paginationBtnDisabled: {
    opacity: 0.5,
  },
  paginationBtnText: {
    fontFamily: family?.Gilroy_Medium,
    fontSize: font.medium,
    color: colors.white,
  },
  paginationLabel: {
    fontFamily: family?.Questrial_Regular,
    fontSize: font.medium,
    color: colors.placeholderText,
  },
  searchInput:{
    // paddingVertical: spacing.xxsmall,
    height: height * 0.055,
  }
});

export default styles;

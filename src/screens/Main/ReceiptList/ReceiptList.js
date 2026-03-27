import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, FlatList, Image} from 'react-native';
import AppBackground from '../../../components/AppBackground';
import CustomText from '../../../components/CustomText';
import {SearchInput} from '../../../components/CustomTextInput';
import {useFetchReceiptsQuery} from '../../../Api/receiptApiSlice';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import NavService from '../../../helpers/NavService';
import {getImageUrl} from '../../../utils/helperFunction';
import styles from './styles';
import { STATUS_OPTIONS } from '../../../utils/dummyData';
import { colors } from '../../../utils/Colors';



const formatDate = dateStr => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

const StatCard = ({label, value, valueStyle}) => (
  <View style={styles.statCard}>
    <CustomText text={label} style={styles.statLabel} />
    <CustomText text={String(value)} style={[styles.statValue, valueStyle]} />
  </View>
);

const ReceiptCard = ({item, onPress}) => {
  const statusStyle =
    item.status === 'approved'
      ? styles.statusBadgeApproved
      : item.status === 'rejected'
      ? styles.statusBadgeRejected
      : null;
  const statusTextStyle =
    item.status === 'approved'
      ? styles.statusTextApproved
      : item.status === 'rejected'
      ? styles.statusTextRejected
      : null;
  const userName = item.user_id?.fullName || item.user_id?.email || '—';
  return (
    <TouchableOpacity
      style={styles.listCard}
      onPress={() => onPress(item)}
      activeOpacity={0.8}>
      <View style={styles.listCardRow}>
        <Image
          source={getImageUrl(item?.receipt_image_url)}
          style={styles.receiptThumb}
          resizeMode="cover"
        />
        <View style={styles.listCardBody}>
          <CustomText text={item.extracted_business_name || '—'} style={styles.listCardTitle} numberOfLines={1} />
          <CustomText text={userName} style={styles.listCardMeta} numberOfLines={1} />
          <CustomText text={`$${item.amount ?? '0'}`} style={styles.amountText} />
          <CustomText text={formatDate(item.receipt_date)} style={styles.listCardMeta} />
          <View style={[styles.statusBadge, statusStyle]}>
            <CustomText text={item.status} style={[styles.statusText, statusTextStyle]} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ReceiptList = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [searchDebounced, setSearchDebounced] = useState('');
  const {data, isLoading, isFetching, refetch} = useFetchReceiptsQuery({
    page,
    limit: 10,
    status: statusFilter === 'all' ? undefined : statusFilter,
    search: searchDebounced || undefined,
  });

  const receipts = data?.receipts ?? [];
  const summary = data?.summary ?? {total: 0, pending: 0, approved: 0, rejected: 0};
  const pagination = data?.pagination ?? {page: 1, totalPages: 1, total: 0};
  const totalPages = Math.max(1, Number(pagination.totalPages) || 1);
  const currentPage = Math.min(pagination.page ?? page, totalPages);

  useEffect(() => {
    if (page > totalPages && totalPages >= 1) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  const onReceiptPress = item => {
    NavService.navigate('receiptDetail', {receiptId: item._id});
  };

  const handleSearchSubmit = () => {
    setSearchDebounced(search);
    setPage(1);
  };
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const goNext = () => setPage(p => Math.min(p + 1, totalPages));
  const goPrev = () => setPage(p => Math.max(1, p - 1));

  if (isLoading && receipts.length === 0) {
    return (
      <AppBackground back title="Approve/Reject Receipt">
        <ActivityLoader color={colors2?.theme?.secondary} />
      </AppBackground>
    );
  }

  return (
    <AppBackground back title="Approve/Reject Receipt">
      <View style={styles.content}>
        <View style={styles.statsGrid}>
          <StatCard label="Total" value={summary.total} />
          <StatCard label="Pending" value={summary.pending} valueStyle={styles.statValuePending} />
          <StatCard label="Approved" value={summary.approved} valueStyle={styles.statValueGreen} />
          <StatCard label="Rejected" value={summary.rejected} valueStyle={styles.statValueRed} />
        </View>
        <View style={styles.filterRow}>
          <View style={styles.searchWrap}>
            <SearchInput
              placeholder="Search"
              value={search}
              onChangeText={setSearch}
              searchStyle={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearchSubmit}>
            <CustomText text="Search" style={styles.searchBtnText} />
          </TouchableOpacity>
        </View>
        <View style={styles.statusRow}>
          {STATUS_OPTIONS.map(opt => (
            <TouchableOpacity
              key={opt.key}
              style={[styles.statusChip, statusFilter === opt.key && styles.statusChipActive]}
              onPress={() => {
                setStatusFilter(opt.key);
                setPage(1);
              }}>
              <CustomText
                text={opt.label}
                style={[styles.statusChipText]}
                color={statusFilter === opt.key ? colors.white : colors.placeholderText}
              />
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={receipts}
          keyExtractor={item => item._id}
          onRefresh={refetch}
          refreshing={isFetching}
          renderItem={({item}) => <ReceiptCard item={item} onPress={onReceiptPress} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            isFetching ? (
              <View style={styles.emptyWrap}>
                <ActivityLoader color={colors2?.theme?.secondary} />
              </View>
            ) : (
              <CustomText
                text="No receipts yet."
                style={[styles.listCardMeta, styles.emptyText]}
              />
            )
          }
        />
        {totalPages > 1 && (
          <View style={styles.paginationRow}>
            <TouchableOpacity
              style={[styles.paginationBtn, !canPrev && styles.paginationBtnDisabled]}
              onPress={goPrev}
              disabled={!canPrev}>
              <CustomText text="Previous" style={styles.paginationBtnText} />
            </TouchableOpacity>
            <CustomText text={`Page ${currentPage} of ${totalPages}`} style={styles.paginationLabel} />
            <TouchableOpacity
              style={[styles.paginationBtn, !canNext && styles.paginationBtnDisabled]}
              onPress={goNext}
              disabled={!canNext}>
              <CustomText text="Next" style={styles.paginationBtnText} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </AppBackground>
  );
};

export default ReceiptList;

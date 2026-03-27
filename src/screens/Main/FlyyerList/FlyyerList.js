import React, {useState, useMemo} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import AppBackground from '../../../components/AppBackground';
import CustomText from '../../../components/CustomText';
import {SearchInput} from '../../../components/CustomTextInput';
import {appIcons} from '../../../assets';
import {colors} from '../../../utils/Colors';
import {family} from '../../../utils';
import {font} from '../../../theme/styles';
import NavService from '../../../helpers/NavService';
import {
  useFetchFlyersQuery,
  usePublishFlyerMutation,
  useUnpublishFlyerMutation,
} from '../../../Api/flyerApiSlice';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import {executeApiRequest} from '../../../Api/methods/method';
import styles from './styles';

const {width} = Dimensions.get('screen');

const STATUS_OPTIONS = [
  {key: 'all', value: 'All'},
  {key: 'draft', value: 'Draft'},
  {key: 'published', value: 'Published'},
  {key: 'expired', value: 'Expired'},
];

const formatDate = dateStr => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const computeStats = docs => {
  if (!Array.isArray(docs)) return { total: 0, published: 0, drafts: 0, expired: 0 };
  const now = new Date();
  let published = 0;
  let drafts = 0;
  let expired = 0;
  docs.forEach(f => {
    if (f.status === 'published') {
      const end = new Date(f.end_date);
      if (end < now) expired += 1;
      else published += 1;
    } else if (f.status === 'draft') drafts += 1;
    else if (f.status === 'expired') expired += 1;
  });
  return {
    total: docs.length,
    published,
    drafts,
    expired,
  };
};

const StatCard = ({label, value, valueStyle}) => (
  <View style={styles.statCard}>
    <CustomText text={label} style={styles.statLabel} />
    <CustomText
      text={String(value)}
      style={[styles.statValue, valueStyle]}
    />
  </View>
);

const FlyerCard = ({item, onPress, onEdit, onPublishUnpublish}) => {
  const statusStyle =
    item.status === 'published'
      ? styles.statusBadgePublished
      : item.status === 'expired'
      ? styles.statusBadgeExpired
      : null;
  const statusTextStyle =
    item.status === 'published'
      ? styles.statusTextPublished
      : item.status === 'expired'
      ? styles.statusTextExpired
      : null;

  return (
    <View
      style={styles.listCard}
  >
      <View style={styles.listCardHeader}>
        <CustomText text={item.title} style={styles.listCardTitle} numberOfLines={1} />
        <View style={[styles.statusBadge, statusStyle]}>
          <CustomText
            text={item.status}
            style={[styles.statusText, statusTextStyle]}
          />
        </View>
      </View>
      <CustomText
        text={`Template: ${item.template_name || ''}`}
        style={styles.listCardMeta}
      />
      <CustomText
        text={`${formatDate(item.start_date)} → ${formatDate(item.end_date)}`}
        style={styles.listCardMeta}
      />
      <CustomText text={item.zip_code || ''} style={styles.listCardMeta} numberOfLines={1} />
      <View style={styles.listCardActions}>
        <TouchableOpacity
          style={styles.actionIconWrap}
          onPress={e => {
            e?.stopPropagation?.();
            onEdit(item);
          }}
          activeOpacity={0.7}>
          <Image
            source={appIcons?.edit}
            style={{width: 20, height: 20, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionIconWrap}
          onPress={e => {
            e?.stopPropagation?.();
            onPublishUnpublish(item);
          }}
          activeOpacity={0.7}>
          <Image
            source={appIcons?.upload}
            style={{width: 20, height: 20, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FlyyerList = () => {
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const {data: flyersData, isLoading, refetch} = useFetchFlyersQuery(undefined, {
    skip: !isFocused,
  });
  const [publishFlyer] = usePublishFlyerMutation();
  const [unpublishFlyer] = useUnpublishFlyerMutation();
  const docs = flyersData?.docs ?? [];
  const stats = useMemo(() => computeStats(docs), [docs]);

  const filteredFlyers = useMemo(() => {
    return docs.filter(f => {
      const matchSearch = !search || (f.title || '').toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || f.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [docs, search, statusFilter]);

  const goToCreateFlyyer = () => {
    NavService.navigate('createFlyyerStep1');
  };

  const onFlyerPress = item => {
    NavService.navigate('flyerDetails', {flyerId: item._id});
  };

  const onEditFlyer = item => {
    NavService.navigate('createFlyyerStep1', {editFlyer: item});
  };

  const onPublishUnpublish = async item => {
    const isPublished = item.status === 'published';
    const mutation = isPublished ? unpublishFlyer : publishFlyer;
    await executeApiRequest({
      apiCallFunction: () => mutation(item._id),
      toast: true,
    });
    refetch();
  };

  return (
    <AppBackground back title={'My Flyers'}     marginHorizontal={false} >
      {isLoading && <ActivityLoader color={colors2?.theme?.secondary} />}
      <View style={styles.content}>
        <View style={styles.statsGrid}>
          <StatCard label="Total Flyers" value={stats.total} />
          <StatCard
            label="Published"
            value={stats.published}
            valueStyle={styles.statValueGreen}
          />
          <StatCard label="Drafts" value={stats.drafts} />
          <StatCard
            label="Expired"
            value={stats.expired}
            valueStyle={styles.statValueRed}
          />
        </View>

        <View style={styles.searchWrap}>
          <SearchInput
            placeholder="Search by title"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.filterWrap}>
          <SelectList
            setSelected={val => setStatusFilter(val)}
            data={STATUS_OPTIONS}
            save="key"
            search={false}
            placeholder="Status"
            defaultOption={STATUS_OPTIONS.find(o => o.key === statusFilter) || STATUS_OPTIONS[0]}
            boxStyles={styles.filterSelectBox}
            inputStyles={styles.filterSelectInput}
            dropdownTextStyles={styles.filterDropdownText}
            dropdownStyles={styles.filterDropdown}
            arrowicon={<Image source={appIcons?.bottomArrow} style={styles.filterArrow} />}
          />
        </View>

        <FlatList
          data={filteredFlyers}
          keyExtractor={item => item._id}
          onRefresh={refetch}
          refreshing={isLoading}
          renderItem={({item}) => (
            <FlyerCard
              item={item}
              onPress={onFlyerPress}
              onEdit={onFlyerPress}
              onPublishUnpublish={onPublishUnpublish}
            />
          )}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{paddingBottom: 20}}
          ListEmptyComponent={
            <CustomText
              text="No flyers yet. Tap + to create one."
              style={[styles.listCardMeta, {textAlign: 'center', marginTop: 24}]}
            />
          }
        />
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={goToCreateFlyyer}
        activeOpacity={0.85}>
        <Image
          source={appIcons?.addIcon}
          style={{
            width: 24,
            height: 24,
            resizeMode: 'contain',
            tintColor: colors.white,
          }}
        />
      </TouchableOpacity>
    </AppBackground>
  );
};

export default FlyyerList;

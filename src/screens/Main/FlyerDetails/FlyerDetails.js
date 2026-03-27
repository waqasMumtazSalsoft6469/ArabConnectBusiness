import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AppBackground from '../../../components/AppBackground';
import CustomText from '../../../components/CustomText';
import {useSelector} from 'react-redux';
import {useFetchFlyerByIdQuery, usePublishFlyerMutation, useUnpublishFlyerMutation} from '../../../Api/flyerApiSlice';
import {useFetchBusinessProductQuery} from '../../../Api/productsApiSlice';
import {appIcons} from '../../../assets';
import NavService from '../../../helpers/NavService';
import {getImageUrl} from '../../../utils/helperFunction';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import {executeApiRequest} from '../../../Api/methods/method';
import styles from './styles';

const {width} = Dimensions.get('screen');

const formatDateRange = (startStr, endStr) => {
  if (!startStr || !endStr) return '';
  const format = d => {
    const date = new Date(d);
    const months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };
  return `${format(startStr)} - ${format(endStr)}`;
};

const FlyerDetails = ({route}) => {
  const flyerId = route?.params?.flyerId;
  const user = useSelector(state => state?.auth?.user || {});
  const businessProfileId = user?.activeProfile || null;
  const {data: flyer, isLoading, isFetching, refetch} = useFetchFlyerByIdQuery(flyerId, {skip: !flyerId});
  const {data: productsData} = useFetchBusinessProductQuery(
    {businessProfileId},
    {skip: !businessProfileId},
  );
  const [publishFlyer, {isLoading: isPublishing}] = usePublishFlyerMutation();
  const [unpublishFlyer, {isLoading: isUnpublishing}] = useUnpublishFlyerMutation();
  const isPublishUnpublishLoading = isPublishing || isUnpublishing;

  const products = productsData?.docs ?? [];
  const productById = React.useMemo(() => {
    const m = {};
    products.forEach(p => {
      if (p?._id) m[p._id] = p;
    });
    return m;
  }, [products]);

  const slotAssignments = flyer?.slot_assignments ?? [];
  let columns = flyer?.layout_config?.columns ?? 0;
  let rows = flyer?.layout_config?.rows ?? 0;
  if ((!columns || !rows) && slotAssignments.length > 0) {
    const maxPos = slotAssignments.reduce(
      (acc, s) => {
        const p = s.template_slot_id?.position;
        if (p) {
          acc.maxRow = Math.max(acc.maxRow, p.row);
          acc.maxCol = Math.max(acc.maxCol, p.col);
        }
        return acc;
      },
      {maxRow: 0, maxCol: 0},
    );
    rows = maxPos.maxRow + 1;
    columns = maxPos.maxCol + 1;
  }
  if (!columns) columns = 7;
  if (!rows) rows = 4;
  const totalSlots = columns * rows;
  const slotCount = slotAssignments.length || totalSlots;
  const filledCount = slotAssignments.filter(
    s => s.product_id || s.image_url,
  ).length;
  const isPublished = flyer?.status === 'published';

  const sortedSlots = [...slotAssignments].sort((a, b) => {
    const posA = a.template_slot_id?.position;
    const posB = b.template_slot_id?.position;
    if (!posA || !posB) return 0;
    return posA.row !== posB.row ? posA.row - posB.row : posA.col - posB.col;
  });

  useFocusEffect(
    React.useCallback(() => {
      if (flyerId) refetch();
    }, [flyerId, refetch]),
  );

  const handlePublishUnpublish = async () => {
    const mutation = isPublished ? unpublishFlyer : publishFlyer;
    await executeApiRequest({
      apiCallFunction: () => mutation(flyerId),
      toast: true,
    });
    refetch();
  };

  if (!flyerId) {
    return (
      <AppBackground back title="Flyer Details">
        <CustomText text="No flyer selected" style={styles.metaText} />
      </AppBackground>
    );
  }

  const showFullLoader = isLoading || !flyer;
  const showRefreshLoader = isFetching && flyer;

  if (showFullLoader) {
    return (
      <AppBackground back title="Flyer Details">
        <ActivityLoader color={colors2?.theme?.secondary} />
      </AppBackground>
    );
  }

  const statusStyle = isPublished ? styles.statusBadgePublished : null;
  const statusTextStyle = isPublished ? styles.statusTextPublished : null;

  const gridCells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const slot = slotAssignments.find(
        s => s.template_slot_id?.position?.row === r && s.template_slot_id?.position?.col === c,
      ) || slotAssignments[r * columns + c];
      const filled = slot && (slot.product_id || slot.image_url);
      gridCells.push({
        key: `${r}_${c}`,
        slot,
        filled,
        slotKey: slot?.template_slot_id?.slot_key || `slot_${r}_${c}`,
      });
    }
  }

  return (
    <AppBackground back title="Flyer Details" marginHorizontal={false}>
      {showRefreshLoader ? (
        <View style={styles.loaderOverlay}>
          <ActivityLoader color={colors2?.theme?.secondary} />
        </View>
      ) : null}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <CustomText text={flyer.title} style={styles.title} />
          <View style={styles.metaRow}>
            <View style={[styles.statusBadge, statusStyle]}>
              <CustomText text={flyer.status} style={[styles.statusText, statusTextStyle]} />
            </View>
            <CustomText text={flyer.zip_code || '-'} style={styles.metaText} />
          </View>
          <CustomText
            text={formatDateRange(flyer.start_date, flyer.end_date)}
            style={styles.metaText}
          />
          <CustomText
            text={`Template: ${flyer.template_name || 'Weekly Promo'}`}
            style={styles.templateLabel}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.btnOutline}
              onPress={() => NavService.navigate('createFlyyerStep2', {editFlyer: flyer, flyerId})}
              activeOpacity={0.8}>
              <Image source={appIcons?.edit} style={styles.btnIcon} />
              <CustomText text="Edit Details" style={styles.btnTextOutline} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnSolid}
              activeOpacity={0.8}
              onPress={() => NavService.navigate('flyerBuilder', {flyerId})}>
              {/* <Image source={appIcons?.sheetIcon} style={styles.btnIconSolid} /> */}
              <CustomText text="Open Builder" style={styles.btnTextSolid} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnSolid, isPublishUnpublishLoading && styles.btnDisabled]}
              onPress={handlePublishUnpublish}
              disabled={isPublishUnpublishLoading}
              activeOpacity={0.8}>
              {isPublishUnpublishLoading ? (
                <ActivityLoader color={colors2?.theme?.white}  size="small"/>
              ) : (
                <Image source={appIcons?.upload} style={styles.btnIconSolid} />
              )}
              <CustomText text={isPublished ? 'Unpublish' : 'Publish'} style={styles.btnTextSolid} />
            </TouchableOpacity>
          </View>
        </View>

        <CustomText text="Slots completion" style={styles.sectionTitle} />
        <CustomText
          text={`${filledCount} of ${slotCount} slots filled`}
          style={styles.slotsFilledText}
        />

        <CustomText text="Flyer preview" style={styles.sectionTitle} />
        <View style={styles.previewGrid}>
          {gridCells.length > 0
            ? gridCells.map(cell => (
                <View
                  key={cell.key}
                  style={[styles.previewCell, cell.filled && styles.previewCellFilled]}>
                  {cell.filled && cell.slot?.image_url ? (
                    <Image
                      source={getImageUrl(cell.slot.image_url)}
                      style={styles.previewCellImage}
                      resizeMode="cover"
                    />
                  ) :  cell.filled && cell.slot?.product_id ? (
                    <Image
                      source={getImageUrl(
                        productById[cell.slot.product_id?._id || cell.slot.product_id]?.image
                      )}
                      style={styles.previewCellImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <CustomText text="Empty" style={styles.previewCellText} />
                  )}
                </View>
              ))
            : Array.from({length: totalSlots}, (_, i) => (
                <View key={i} style={styles.previewCell}>
                  <CustomText text="Empty" style={styles.previewCellText} />
                </View>
              ))}
        </View>

        <CustomText text="Slot summary" style={styles.sectionTitle} />
        <View style={styles.tableWrap}>
          <View style={styles.tableHeader}>
            <View style={styles.colSlotKey}><CustomText text="Slot key" style={styles.tableHeaderText} /></View>
            <View style={styles.colType}><CustomText text="Type" style={styles.tableHeaderText} /></View>
            <View style={styles.colProduct}><CustomText text="Product / Image" style={styles.tableHeaderText} /></View>
            <View style={styles.colPrice}><CustomText text="Override price" style={styles.tableHeaderText} /></View>
            <View style={styles.colBadge}><CustomText text="Badge" style={styles.tableHeaderText} /></View>
            <View style={styles.colStatus}><CustomText text="Status" style={styles.tableHeaderText} /></View>
          </View>
          {sortedSlots.length > 0
            ? sortedSlots.map((sa, idx) => {
                const filled = !!(sa.product_id || sa.image_url);
                const slotKey = sa.template_slot_id?.slot_key ?? `slot_${idx}`;
                const slotType = sa.slot_type ?? sa.template_slot_id?.slot_type ?? '-';
                return (
                  <View key={sa._id || idx} style={styles.tableRow}>
                    <View style={styles.colSlotKey}><CustomText text={slotKey} style={styles.tableCellText} numberOfLines={1} /></View>
                    <View style={styles.colType}><CustomText text={slotType} style={styles.tableCellText} /></View>
                    <View style={styles.colProduct}><CustomText text={filled ? 'Yes' : '-'} style={[styles.tableCellText, !filled && styles.tableCellEmpty]} /></View>
                    <View style={styles.colPrice}><CustomText text={sa.override_price ?? '-'} style={[styles.tableCellText, styles.tableCellEmpty]} /></View>
                    <View style={styles.colBadge}><CustomText text={sa.badge_label ?? '-'} style={[styles.tableCellText, styles.tableCellEmpty]} /></View>
                    <View style={styles.colStatus}>
                      <View style={styles.badgeEmpty}>
                        <CustomText text={filled ? 'Filled' : 'Empty'} style={styles.badgeEmptyText} />
                      </View>
                    </View>
                  </View>
                );
              })
            : gridCells.map((cell, idx) => (
                <View key={idx} style={styles.tableRow}>
                  <View style={styles.colSlotKey}><CustomText text={cell.slotKey} style={styles.tableCellText} numberOfLines={1} /></View>
                  <View style={styles.colType}><CustomText text={cell.slot?.slot_type || '-'} style={[styles.tableCellText, styles.tableCellEmpty]} /></View>
                  <View style={styles.colProduct}><CustomText text="-" style={[styles.tableCellText, styles.tableCellEmpty]} /></View>
                  <View style={styles.colPrice}><CustomText text="-" style={[styles.tableCellText, styles.tableCellEmpty]} /></View>
                  <View style={styles.colBadge}><CustomText text="-" style={[styles.tableCellText, styles.tableCellEmpty]} /></View>
                  <View style={styles.colStatus}>
                    <View style={styles.badgeEmpty}>
                      <CustomText text="Empty" style={styles.badgeEmptyText} />
                    </View>
                  </View>
                </View>
              ))}
        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default FlyerDetails;

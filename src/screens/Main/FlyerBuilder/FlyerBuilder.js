import React, {useMemo, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import AppBackground from '../../../components/AppBackground';
import CustomText from '../../../components/CustomText';
import CustomTextInput from '../../../components/CustomTextInput';
import {SearchInput} from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import ImagePicker2 from '../../../components/ImagePicker2';
import {
  useFetchFlyerByIdQuery,
  useUpdateFlyerSlotMutation,
  usePublishFlyerMutation,
} from '../../../Api/flyerApiSlice';
import {useFetchBusinessProductQuery} from '../../../Api/productsApiSlice';
import {appIcons} from '../../../assets';
import {colors} from '../../../utils/Colors';
import NavService from '../../../helpers/NavService';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import {executeApiRequest} from '../../../Api/methods/method';
import {getImageUrl, extractFileName} from '../../../utils/helperFunction';
import styles from './styles';

const SlotCell = ({slot, isSelected, onPress, product}) => {
  const isHero = slot?.slot_type === 'hero';
  const filled = !!(slot?.product_id || slot?.image_url);

  return (
    <TouchableOpacity
      style={[
        styles.slotCell,
        isSelected && styles.slotCellSelected,
        filled && styles.slotCellFilled,
      ]}
      onPress={() => onPress(slot)}
      activeOpacity={0.8}>
      {filled && slot?.image_url ? (
        <Image
          source={getImageUrl(slot.image_url)}
          style={styles.slotThumb}
          resizeMode="cover"
        />
      ) : filled && slot?.product_id && product ? (
        <Image
          source={getImageUrl(product?.image)}
          style={styles.slotThumb}
          resizeMode="cover"
        />
      ) : isHero ? (
        <>
          <Image source={appIcons?.upload} style={styles.slotIcon} />
          <CustomText text="Upload Image" style={styles.slotLabel} />
        </>
      ) : (
        <>
          <CustomText text="+" style={styles.slotLabelPlus} />
          <CustomText text="Add Product" style={styles.slotLabel} />
        </>
      )}
    </TouchableOpacity>
  );
};

const FlyerBuilder = ({route}) => {
  const flyerId = route?.params?.flyerId;
  const user = useSelector(state => state?.auth?.user || {});
  const businessProfileId = user?.activeProfile || null;


  const {data: flyer, isLoading, refetch} = useFetchFlyerByIdQuery(flyerId, {
    skip: !flyerId,
  });
  const {data: productsData} = useFetchBusinessProductQuery(
    {businessProfileId},
    {skip: !businessProfileId},
  );
  const [updateSlot, {isLoading: updatingSlot}] = useUpdateFlyerSlotMutation();
  const [publishFlyer, {isLoading: isPublishing}] = usePublishFlyerMutation();

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [productSearch, setProductSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [overridePrice, setOverridePrice] = useState('');
  const [badgeLabel, setBadgeLabel] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [heroImage, setHeroImage] = useState(null);

  const slotAssignments = flyer?.slot_assignments ?? [];
  const sortedSlots = useMemo(() => {
    return [...slotAssignments].sort((a, b) => {
      const posA = a.template_slot_id?.position || {};
      const posB = b.template_slot_id?.position || {};
      return posA.row !== posB.row
        ? posA.row - posB.row
        : (posA.col ?? 0) - (posB.col ?? 0);
    });
  }, [slotAssignments]);

  const products = productsData?.docs ?? [];
  const productById = useMemo(() => {
    const m = {};
    products.forEach(p => {
      if (p?._id) m[p._id] = p;
    });
    return m;
  }, [products]);
  const filteredProducts = useMemo(() => {
    if (!productSearch.trim()) return products;
    const q = productSearch.toLowerCase();
    return products.filter(p =>
      (p.productName || '').toLowerCase().includes(q),
    );
  }, [products, productSearch]);

  const handleSelectSlot = slot => {
    setSelectedSlot(slot);
    setSelectedProduct(null);
    setOverridePrice(slot?.override_price?.toString() ?? '');
    setBadgeLabel(slot?.badge_label ?? '');
    setCustomNote(slot?.custom_note ?? '');
    setHeroImage(null);
  };

  const handleSaveSlot = async () => {
    if (!selectedSlot || !flyerId) return;
    const isHero = selectedSlot.slot_type === 'hero';
    let body = {};
    if (isHero && heroImage) {
      body = {
        image: {
          uri: heroImage.uri || heroImage.path,
          type: heroImage.mime || 'image/jpeg',
          name: heroImage.name || extractFileName(heroImage.uri || heroImage.path || 'image.jpg'),
        },
      };
    } else if (!isHero && selectedProduct) {
      body = {
        product_id: selectedProduct._id,
        override_price: overridePrice ? String(overridePrice) : '',
        badge_label: badgeLabel || '',
        custom_note: customNote || '',
      };
    } else {
      return;
    }
    await executeApiRequest({
      apiCallFunction: updateSlot,
      body: {flyerId, slotAssignmentId: selectedSlot._id, body},
      formData: false,
      toast: true,
    });
    refetch();
    setSelectedSlot(null);
    setHeroImage(null);
    setSelectedProduct(null);
  };

  const handleClearSlot = async () => {
    if (!selectedSlot || !flyerId) return;
    await executeApiRequest({
      apiCallFunction: updateSlot,
      body: {
        flyerId,
        slotAssignmentId: selectedSlot._id,
        body: {
          product_id: '',
          override_price: '',
          badge_label: '',
          custom_note: '',
        },
      },
      formData: false,
      toast: true,
    });
    refetch();
    setSelectedSlot(null);
    setSelectedProduct(null);
    setOverridePrice('');
    setBadgeLabel('');
    setCustomNote('');
    setHeroImage(null);
  };

  const handlePublish = async () => {
    await executeApiRequest({
      apiCallFunction: () => publishFlyer(flyerId),
      toast: true,
    });
    refetch();
  };

  if (!flyerId) {
    return (
      <AppBackground back title="Flyer Builder">
        <CustomText text="No flyer selected" style={styles.footerHint} />
      </AppBackground>
    );
  }

  if (isLoading || !flyer) {
    return (
      <AppBackground back title="Flyer Builder">
        <ActivityLoader color={colors2?.theme?.secondary} />
      </AppBackground>
    );
  }

  const columns = 7;
  const rows = 4;
  const gridSlots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const slot =
        sortedSlots.find(
          s =>
            s.template_slot_id?.position?.row === r &&
            s.template_slot_id?.position?.col === c,
        ) || sortedSlots[r * columns + c];
      if (slot) {
        gridSlots.push({...slot, _row: r, _col: c});
      } else {
        gridSlots.push({
          _id: `placeholder_${r}_${c}`,
          template_slot_id: {
            position: {row: r, col: c},
            slot_key: `slot_${r}_${c}`,
            slot_type: r === 0 && c < 2 ? 'hero' : 'product',
          },
          slot_type: r === 0 && c < 2 ? 'hero' : 'product',
          _row: r,
          _col: c,
        });
      }
    }
  }

  return (
    <AppBackground back title="Flyer Builder" >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.gridWrap}>
          {Array.from({length: rows}, (_, r) => (
            <View key={r} style={styles.gridRow}>
              {gridSlots.slice(r * columns, (r + 1) * columns).map(slot => (
                <SlotCell
                  key={slot._id}
                  slot={slot}
                  product={
                    slot?.product_id
                      ? productById[slot.product_id?._id || slot.product_id]
                      : null
                  }
                  isSelected={selectedSlot?._id === slot._id}
                  onPress={slot._id?.startsWith('placeholder_') ? undefined : () => handleSelectSlot(slot)}
                />
              ))}
            </View>
          ))}
        </View>

        {selectedSlot && !selectedSlot._id?.startsWith('placeholder_') && (
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <CustomText
                text={selectedSlot.template_slot_id?.slot_key || 'slot'}
                style={styles.slotKeyText}
              />
              <View style={styles.typeBadge}>
                <CustomText
                  text={selectedSlot.slot_type || 'product'}
                  style={styles.typeBadgeText}
                />
              </View>
            </View>

            {selectedSlot.slot_type === 'hero' ? (
              <>
                <View style={styles.heroUploadArea}>
                  <ImagePicker2
                    style={styles.heroUploadInner}
                    onImageChange={(img, mime) => {
                      const path = typeof img === 'string' ? img : (img?.path ?? img?.uri);
                      const uri = path ? (path.startsWith('file://') ? path : `file://${path}`) : null;
                      if (uri) {
                        setHeroImage({
                          uri,
                          type: mime || 'image/jpeg',
                          name: extractFileName(path),
                        });
                      }
                    }}>
                    {heroImage ? (
                      <Image
                        source={{uri: heroImage.uri}}
                        style={styles.heroPreviewThumb}
                        resizeMode="cover"
                      />
                    ) : (
                      <>
                        <Image source={appIcons?.upload} style={styles.slotIcon} />
                        <CustomText text="Upload Image" style={styles.slotLabel} />
                      </>
                    )}
                  </ImagePicker2>
                </View>
                <View style={styles.slotActions}>
                  {updatingSlot ? (
                    <View style={styles.slotActionLoader}>
                      <ActivityLoader color={colors2?.theme?.secondary} />
                    </View>
                  ) : (
                    <>
                      <CustomButton
                        gradientColorArr={[colors.secondary, colors.secondary]}
                        title="Save Slot"
                        onPress={handleSaveSlot}
                        disabled={!heroImage}
                        buttonStyle={styles.btnSlotSave}
                        textStyle={styles.btnTextSolid}
                      />
                      <TouchableOpacity
                        style={styles.btnOutline}
                        onPress={handleClearSlot}
                        activeOpacity={0.8}>
                        <CustomText text="Clear Slot" style={styles.btnTextOutline} />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </>
            ) : (
              <>
                <View style={styles.searchWrap}>
                  <SearchInput
                    placeholder="Search by name"
                    value={productSearch}
                    onChangeText={setProductSearch}
                  />
                </View>
                <View style={styles.productList}>
                  {filteredProducts.length === 0 ? (
                    <CustomText text="No products found" style={styles.productPrice} />
                  ) : (
                    filteredProducts.map(item => (
                      <TouchableOpacity
                        key={item._id}
                        style={styles.productItem}
                        onPress={() => setSelectedProduct(item)}
                        activeOpacity={0.7}>
                        <Image
                          source={getImageUrl(item.image)}
                          style={styles.productThumb}
                          resizeMode="cover"
                        />
                        <View style={styles.productInfo}>
                          <CustomText text={item.productName} style={styles.productName} numberOfLines={1} />
                          <CustomText
                            text={`$${item.variations?.[0]?.price ?? item.price ?? '0'}`}
                            style={styles.productPrice}
                          />
                        </View>
                        {selectedProduct?._id === item._id && (
                          <CustomText text="✓" style={styles.productPrice} />
                        )}
                      </TouchableOpacity>
                    ))
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => NavService.navigate('addProducts')}
                  style={styles.createProductLink}
                  activeOpacity={0.8}>
                  <CustomText
                    text="Create New Product"
                    style={styles.createProductLinkText}
                  />
                </TouchableOpacity>
                <View style={styles.slotFields}>
                  <View style={styles.fieldRow}>
                    <CustomText text="Override price" style={styles.fieldLabel} />
                    <CustomTextInput
                      placeholder="Optional"
                      value={overridePrice}
                      onChangeText={setOverridePrice}
                      keyboardType="numeric"
                      containerStyle={styles.inputField}
                    />
                  </View>
                  <View style={styles.fieldRow}>
                    <CustomText text="Badge label" style={styles.fieldLabel} />
                    <CustomTextInput
                      placeholder="e.g. 30% off"
                      value={badgeLabel}
                      onChangeText={setBadgeLabel}
                      containerStyle={styles.inputField}
                    />
                  </View>
                  <View style={styles.fieldRow}>
                    <CustomText text="Custom note" style={styles.fieldLabel} />
                    <CustomTextInput
                      placeholder="Optional"
                      value={customNote}
                      onChangeText={setCustomNote}
                      containerStyle={styles.inputField}
                    />
                  </View>
                </View>
                <View style={styles.slotActions}>
                  {updatingSlot ? (
                    <ActivityLoader color={colors2?.theme?.secondary} />
                  ) : (
                    <>
                      <CustomButton
                        gradientColorArr={[colors.secondary, colors.secondary]}
                        title="Save Slot"
                        onPress={handleSaveSlot}
                        disabled={!selectedProduct}
                        buttonStyle={styles.btnSlotSave}
                        textStyle={styles.btnTextSolid}
                      />
                      <TouchableOpacity
                        style={styles.btnOutline}
                        onPress={handleClearSlot}
                        activeOpacity={0.8}>
                        <CustomText text="Clear Slot" style={styles.btnTextOutline} />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </>
            )}
          </View>
        )}

        <View style={styles.footerBar}>
          <CustomText
            text={selectedSlot ? '' : 'Select a slot to edit'}
            style={styles.footerHint}
          />
          <View style={styles.footerButtons}>
            <TouchableOpacity
              style={styles.btnDraft}
              onPress={() => NavService.goBack()}
              activeOpacity={0.8}>
              <CustomText text="Save Draft" style={styles.btnTextSolid} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnPublish, isPublishing && styles.btnDisabled]}
              onPress={handlePublish}
              disabled={isPublishing}
              activeOpacity={0.8}>
              {isPublishing ? (
                <ActivityLoader color={colors2?.theme?.white}  size="small"/>
              ) : (
                <CustomText text="Publish Flyer" style={styles.btnTextSolid} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default FlyerBuilder;

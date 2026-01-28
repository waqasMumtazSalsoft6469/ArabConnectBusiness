import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../utils/Colors';
import AppBackground from '../../../components/AppBackground';
import {LogData} from '../../../utils/dummyData';
import {family, size, vh} from '../../../utils';
import CustomText from '../../../components/CustomText';
import FastImage from 'react-native-fast-image';
import {appIcons} from '../../../assets';
import CustomToggleButton from '../../../components/CustomToggleButton/CustomToggleButton';
import styles from './styles';
import CustomIcon from '../../../components/CustomIcon';
import {useFetchAllOrderQuery} from '../../../Api/orderApiSlice';
import {getImageUrl, LOG} from '../../../utils/helperFunction';
import {useSelector} from 'react-redux';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import PullToRefreshScrollView from '../../../components/PullToRefreshScroll';
import {colors2} from '../../../theme/colors2';
import ActivityLoader from '../../../components/ActivityLoader';
import EmptyDataComponent from '../../../components/EmptyDataComponent';

const {width, height} = Dimensions.get('screen');
const Delivery = () => {
  const [openPackage, setOpenPackage] = useState(null);
  const [selectedTab, setSelectedTab] = useState('PENDING');

  const userDetails = useSelector(state => state?.auth?.user || {});
  const businessProfileId = userDetails?.activeProfile || null;
  const {data, isLoading, error, refetch} = useFetchAllOrderQuery({
    businessProfileId,
  });
  // LOG('DATA: ', data?.docs);

  // const filteredPackages = (data?.docs || []).filter(
  //   item => item?.status?.toUpperCase() === selectedTab.toUpperCase(),
  // );

  const flattenedProducts = (data?.docs || [])
    .filter(order => order?.status?.toUpperCase() === selectedTab)
    .flatMap(order =>
      order.products.map(product => ({
        ...product,
        orderId: order._id,
        personName: order.personName,
        deliveryAddress: order.deliveryAddress,
        subTotal: order.subTotal,
        status: order.status,
        key: `${order._id}-${product._id}`,
      })),
    );

  LOG('PRODUCTS: ', flattenedProducts);

  const animatedHeightsRef = useRef([]);
  const animatedRotationsRef = useRef([]);

  // Initialize only once, or when data changes (optional deep cleanup)
  useEffect(() => {
    if (flattenedProducts.length) {
      animatedHeightsRef.current = flattenedProducts.map(
        () => new Animated.Value(0),
      );
      animatedRotationsRef.current = flattenedProducts.map(
        () => new Animated.Value(0),
      );
    }
  }, [flattenedProducts]);

  const togglePackage = index => {
    animatedHeightsRef.current.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: 0,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();

      Animated.timing(animatedRotationsRef.current[i], {
        toValue: 0,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();
    });

    if (openPackage === index) {
      setOpenPackage(null);
    } else {
      Animated.timing(animatedHeightsRef.current[index], {
        toValue: height * 0.13,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();

      Animated.timing(animatedRotationsRef.current[index], {
        toValue: 1,
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      setOpenPackage(index);
    }
  };

  const rotateIcon = index => {
    const rotation = animatedRotationsRef.current[index];
    if (!rotation) return '0deg'; // fallback

    return rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
  };

  const renderItem = ({item: pkg, index}) => {
    const isLastItem = index === flattenedProducts.length - 1;
    const heightAnim =
      animatedHeightsRef.current[index] ?? new Animated.Value(0);
    const rotateAnim =
      animatedRotationsRef.current[index] ?? new Animated.Value(0);

    return (
      <View
        style={[
          styles.cardContainer,
          {marginBottom: isLastItem ? height * 0.06 : height * 0.02},
        ]}>
        {pkg?.status && (
          <View
            style={[
              styles?.statusFlag,
              {
                backgroundColor:
                  pkg?.status === 'DELIVERED'
                    ? colors?.greenIcon
                    : pkg?.status === 'PENDING'
                    ? colors?.pendingColor
                    : pkg?.status === 'CANCELLED'
                    ? '#FF0000'
                    : 'transparent',
              },
            ]}>
            <CustomText
              text={pkg?.status}
              font={family?.Gilroy_SemiBold}
              size={size?.small}
              color={colors?.white}
              style={{textTransform: 'uppercase'}}
            />
          </View>
        )}
        <View style={{padding: 10, gap: 5, marginTop: 5}}>
          <CustomText
            text={pkg?.orderId}
            font={family?.Gilroy_SemiBold}
            size={size?.xxsmall}
            style={{alignSelf: 'flex-end'}}
            color={colors?.headingText}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: width * 0.03,
            }}>
            <View style={styles?.imageContainer}>
              <FastImage
                source={getImageUrl(pkg?.productDetails?.image)}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
              />
            </View>
            <View style={{gap: 2, width: '75%', paddingHorizontal: 5}}>
              <CustomText
                text={`Customer: ${pkg?.personName || 'N/A'}`}
                font={family?.Questrial_Regular}
                size={size?.xlarge}
                color={colors?.lightBlueText}
              />
              <CustomText
                text={`Product: ${pkg?.name || 'N/A'}`}
                font={family?.Gilroy_SemiBold}
                size={size?.large}
                color={colors?.headingText}
              />
              <CustomText
                text={
                  pkg?.selectedVariation
                    ? `Base Price: $${pkg?.selectedVariation?.price}`
                    : `Base Price: $${pkg?.basePrice}`
                }
                font={family?.Gilroy_SemiBold}
                size={size?.large}
                color={colors?.headingText}
              />
              <CustomText
                text={`SubTotal: $${pkg?.subTotal}`}
                font={family?.Gilroy_SemiBold}
                size={size?.large}
                color={colors?.headingText}
              />
              <CustomText
                text={`Deliver To: ${pkg?.deliveryAddress?.address}`}
                font={family?.Gilroy_SemiBold}
                size={size?.medium}
                color={colors?.headingText}
                style={{
                  marginBottom: pkg?.selectedVariation ? 0 : 10,
                }}
              />
            </View>
          </View>

          {pkg?.selectedVariation && pkg?.status && (
            <>
              <View style={[styles?.hr, {width: '95%'}]} />
              <TouchableOpacity
                style={styles.touchableButton}
                onPress={() => togglePackage(index)}>
                <Animated.View
                  style={{
                    transform: [
                      {
                        rotate: rotateAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '180deg'],
                        }),
                      },
                    ],
                  }}>
                  <CustomIcon
                    src={appIcons?.bottomArrow}
                    size={size?.tiny}
                    disabled={true}
                  />
                </Animated.View>
              </TouchableOpacity>

              <Animated.View
                style={[styles.packageContainer, {height: heightAnim}]}>
                <View
                  style={{
                    marginTop: height * 0.025,
                    paddingHorizontal: 15,
                  }}>
                  <View style={{gap: vh * 1}}>
                    <CustomText
                      text={`Variation Purchased: `}
                      font={family?.Gilroy_SemiBold}
                      size={size?.medium}
                      color={colors?.headingText}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: '#F7F8FA',
                        padding: vh * 1.5,
                        borderRadius: 10,
                        marginBottom: vh * 1,
                      }}>
                      <CustomText
                        text={pkg?.selectedVariation?.name}
                        font={family?.Gilroy_SemiBold}
                        size={size?.medium}
                        color={colors?.headingText}
                      />
                      <CustomText
                        text={`$${pkg?.selectedVariation?.price}`}
                        font={family?.Gilroy_SemiBold}
                        size={size?.medium}
                        color={colors?.lightBlueText}
                      />
                    </View>
                  </View>
                </View>
              </Animated.View>
            </>
          )}
        </View>
      </View>
    );
  };
  return (
    <AppBackground
      menu={false}
      title={'Order History'.toUpperCase()}
      notification
      cart
      back>
      <View
        style={{
          paddingTop: vh * 2,
          paddingHorizontal: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        {/* <View style={{alignSelf: 'center', marginBottom: vh * 3}}>
          <CustomToggleButton
            tabs={['PENDING', 'DELIVERED', 'CANCELLED']}
            onTabChange={setSelectedTab}
          />
        </View> */}

        {data?.docs?.length > 0 ? (
          <PullToRefreshFlatList
            refetch={refetch}
            data={flattenedProducts}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: vh * 10,
              paddingHorizontal: 10,
            }}
          />
        ) : (
          <PullToRefreshScrollView
            onRefresh={refetch}
            refreshingColor={colors2?.theme?.secondary}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 20,
              marginTop: vh * 3,
            }}>
            {isLoading && <ActivityLoader color={colors2?.theme?.secondary} />}
            <EmptyDataComponent
              message={
                isLoading ? 'Loading! Please Wait.' : 'No Data Available.'
              }
            />
          </PullToRefreshScrollView>
        )}
      </View>
    </AppBackground>
  );
};

export default Delivery;

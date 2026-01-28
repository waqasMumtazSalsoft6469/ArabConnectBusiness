
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   TouchableOpacity,
//   Animated,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   Easing,
//   Alert,
//   Platform,
//   Text,
//   Linking,
// } from 'react-native';
// import CustomBackground from '../../../components/CustomBackground';
// import Shadows from '../../../helpers/Shadows';
// import CustomText from '../../../components/CustomText';
// import { family, HP, size, vh } from '../../../utils';
// import { colors } from '../../../utils/Colors';
// import CustomIcon from '../../../components/CustomIcon';
// import CustomButton from '../../../components/CustomButton';
// import { appIcons } from '../../../assets';
// import NavService from '../../../helpers/NavService';
// import { executeApiRequest } from '../../../Api/methods/method'; // Assuming you have this for backend calls
// import { LOG } from '../../../utils/helperFunction'; // Assuming you have LOG
// import { HEIGHT } from '../../../theme/units';

// // IAP Integration
// import * as RNIap from 'react-native-iap';
// import ActivityLoader from '../../../components/ActivityLoader';

// const { width, height } = Dimensions.get('screen');

// // Product IDs from App Store Connect (replace with yours)
// const productIds = Platform.select({
//   ios: ['shopdit_monthly', 'shopdit_yearly'], // Your actual product IDs
//   android: ['monthly_subscription', 'yearly_subscription'],
// });

// // Features unlocked by subscription
// const subscriptionFeatures = [
//   'Create & manage multiple business profiles, campaigns, coupons, products, rewards, and track engagement.',
//   'Design coupons/deals with USD, Business Points, or Shopdit Points; redeemable via QR codes in-store.',
//   'Post events & jobs from main profile; customers view/book/apply via Shopdit User App.',
//   'Offer redeemable rewards with Business/Shopdit Points to build customer loyalty.',
//   'Launch marketing campaigns to attract/re-engage customers; track & optimize performance.',
//   'Manage customer points, award Business Points, and invite via email to grow your base.',
//   'Access dashboards, graphs, and reports for engagement, sales, and data-driven insights.',
//   'Secure, easy management of promotions, points, and transactions. (Points: loyalty only, no cash value.)',
// ];

// const SubscriptionPlan = () => {
//   const [availableProducts, setAvailableProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [purchaseLoading, setPurchaseLoading] = useState({});
//   const [restoreLoading, setRestoreLoading] = useState(false);

//   const [openPackage, setOpenPackage] = useState(null);
//   const [animatedHeights, setAnimatedHeights] = useState([]);
//   const [animatedRotations, setAnimatedRotations] = useState([]);

//   const [isPurchaseInitiated, setIsPurchaseInitiated] = useState(false);
//   const processedTransactions = React.useRef(new Set());
//   const [activeSubscription, setActiveSubscription] = useState(null);

//   useEffect(() => {
//     let purchaseUpdateSub;
//     let purchaseErrorSub;

//     const init = async () => {
//       try {
//         await RNIap.initConnection();

//         // 🔔 LISTENERS FIRST
//         purchaseUpdateSub = RNIap.purchaseUpdatedListener(async purchase => {
//           const transactionId =
//             purchase.transactionId ||
//             purchase.originalTransactionIdentifierIOS ||
//             purchase.purchaseToken;

//           if (processedTransactions.current.has(transactionId)) {
//             return;
//           }

//           processedTransactions.current.add(transactionId);

//           // 🚫 NO RECEIPT → EXISTING / RESTORED → IGNORE
//           if (!purchase.transactionReceipt) {
//             LOG('🔁 Existing subscription (no receipt) – ignoring');
//             setActiveSubscription(purchase.productId);
//             return;
//           }

//           // ✅ RECEIPT EXISTS → REAL NEW PURCHASE
//           if (!isPurchaseInitiated) {
//             LOG('⚠️ Receipt received but user did not initiate purchase');
//             return;
//           }

//           await handlePurchaseSuccess(purchase);

//           await RNIap.finishTransaction({
//             purchase,
//             isConsumable: false,
//           });

//           setIsPurchaseInitiated(false);
//           setPurchaseLoading({});
//         });


//         purchaseErrorSub = RNIap.purchaseErrorListener(error => {
//           setIsPurchaseInitiated(false);
//           setPurchaseLoading({});
//           Alert.alert('Purchase Failed', error.message);
//         });

//         // 🔔 FETCH PRODUCTS
//         const products = await RNIap.getSubscriptions({ skus: productIds });
//         setAvailableProducts(products);

//         // 🔔 CHECK ACTIVE SUB ONCE
//         const purchases = await RNIap.getAvailablePurchases();
//         const active = purchases.find(p =>
//           productIds.ios.includes(p.productId)
//         );

//         if (active) {
//           setActiveSubscription(active.productId);
//           LOG('✅ Active subscription:', active.productId);
//         }

//       } catch (e) {
//         LOG('IAP init failed', e);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     init();

//     return () => {
//       purchaseUpdateSub?.remove();
//       purchaseErrorSub?.remove();
//       // RNIap.endConnection();
//     };
//   }, []);



//   useEffect(() => {
//     if (availableProducts.length > 0) {
//       setAnimatedHeights(availableProducts.map(() => new Animated.Value(0)));
//       setAnimatedRotations(availableProducts.map(() => new Animated.Value(0)));
//     }
//   }, [availableProducts]);

//   const togglePackage = index => {
//     if (!animatedHeights[index] || !animatedRotations[index]) return;

//     if (openPackage === index) {
//       // Close the current open package
//       Animated.timing(animatedHeights[index], {
//         toValue: 0,
//         duration: 400,
//         easing: Easing.inOut(Easing.ease),
//         useNativeDriver: false,
//       }).start();

//       Animated.timing(animatedRotations[index], {
//         toValue: 0,
//         duration: 400,
//         easing: Easing.inOut(Easing.ease),
//         useNativeDriver: false,
//       }).start();

//       setOpenPackage(null);
//     } else {
//       // Close previous open package if exists
//       if (openPackage !== null) {
//         const prevIndex = openPackage;
//         Animated.timing(animatedHeights[prevIndex], {
//           toValue: 0,
//           duration: 400,
//           easing: Easing.inOut(Easing.ease),
//           useNativeDriver: false,
//         }).start();

//         Animated.timing(animatedRotations[prevIndex], {
//           toValue: 0,
//           duration: 400,
//           easing: Easing.inOut(Easing.ease),
//           useNativeDriver: false,
//         }).start();
//       }

//       // Open the new package
//       Animated.timing(animatedHeights[index], {
//         toValue: height * 0.6, // Increased height to accommodate features list
//         duration: 400,
//         easing: Easing.inOut(Easing.ease),
//         useNativeDriver: false,
//       }).start();

//       Animated.timing(animatedRotations[index], {
//         toValue: 1,
//         duration: 400,
//         easing: Easing.linear,
//         useNativeDriver: false,
//       }).start();

//       setOpenPackage(index);
//     }
//   };

//   const rotateIcon = index =>
//     animatedRotations[index]?.interpolate({
//       inputRange: [0, 1],
//       outputRange: ['0deg', '180deg'],
//     });

//   const handleSubscribe = async (product) => {
//     if (activeSubscription === product.productId) {
//       Alert.alert(
//         'Already Subscribed',
//         'You already have an active subscription for this plan.'
//       );
//       return;
//     }

//     try {
//       setIsPurchaseInitiated(true);
//       setPurchaseLoading({ [product.productId]: true });

//       await RNIap.requestSubscription({
//         sku: product.productId,
//         andDangerouslyFinishTransactionAutomaticallyIOS: false,
//       });

//     } catch (e) {
//       setIsPurchaseInitiated(false);
//       setPurchaseLoading({});
//     }
//   };

//   const handleRestorePurchases = async () => {
//     try {
//       setRestoreLoading(true);

//       if (Platform.OS === 'ios') {
//         Alert.alert(
//           'Restore Started',
//           'Previous subscriptions will be restored automatically. You will be notified when done.'
//         );

//         // iOS: triggers purchaseUpdatedListener for each restored purchase
//         await RNIap.restorePurchases();

//       } else {
//         // Android: get all active purchases
//         const purchases = await RNIap.getAvailablePurchases();
//         LOG('Restored purchases on Android:', purchases);

//         if (purchases.length > 0) {
//           for (const purchase of purchases) {
//             await handlePurchaseSuccess(purchase);
//           }
//           Alert.alert('Success', 'Subscriptions restored!');
//         } else {
//           Alert.alert('No Purchases', 'No previous subscriptions found.');
//         }
//       }
//     } catch (err) {
//       LOG('Restore Purchases Error:', err);
//       Alert.alert('Error', 'Failed to restore purchases. Please try again.');
//     } finally {
//       setRestoreLoading(false);
//     }
//   };

//   const handlePurchaseSuccess = async (purchase) => {
//     if (!purchase.transactionReceipt) {
//       LOG('❌ No receipt, skipping success');
//       return;
//     }
//     try {
//       const receiptData = {
//         receipt: purchase.transactionReceipt,
//         productId: purchase.productId,
//         transactionId:
//           purchase.transactionId ||
//           purchase.originalTransactionIdentifierIOS ||
//           purchase.purchaseToken,
//         platform: Platform.OS,
//         type: 'subscription',
//       };

//       LOG('✅ PURCHASE SUCCESS — SEND TO BACKEND:', receiptData);

//       Alert.alert('Success', 'Subscription activated successfully!');

//       // TODO: Send receiptData to your backend to validate
//       // Example:
//       // const response = await executeApiRequest({
//       //   apiCallFunction: validateSubscriptionAPI,
//       //   body: receiptData,
//       //   toast: true,
//       // });

//       // if (response?.success) {
//       //   Alert.alert('Success', 'Subscription activated!');
//       //   NavService.navigate('DrawerStack');
//       // } else {
//       //   Alert.alert('Error', 'Subscription validation failed.');
//       // }

//     } catch (err) {
//       LOG('❌ Purchase Validation Error:', err);
//       Alert.alert('Error', 'Subscription activation failed.');
//     } finally {
//       // 🔥 THIS FIXES YOUR "PURCHASING..." BUG
//       setPurchaseLoading({});
//       setRestoreLoading(false);
//     }
//   };
//   if (isLoading) {
//     return (
//       <CustomBackground
//         back
//         titleText={'SUBSCRIPTION PLANS'}
//         descriptionText={'Choose your subscription plan'}>
//         {/* Add your GlobalShimmer or ActivityLoader here */}
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityLoader />
//         </View>
//       </CustomBackground>
//     );
//   }

//   return (
//     <CustomBackground
//       back
//       titleText={'SUBSCRIPTION PLANS'}
//       descriptionText={'Choose your subscription plan'}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={{ paddingHorizontal: width * 0.06, paddingTop: 30 }}>
//           {availableProducts.length === 0 ? (
//             <CustomText text="No subscriptions available. Please try again later." color={colors?.secondary} />
//           ) : (
//             availableProducts.map((product, index) => (
//               <View
//                 key={product.productId}
//                 style={[
//                   styles.cardContainer,
//                   index === availableProducts.length - 1
//                     ? { marginBottom: height * 0.05 }
//                     : { marginBottom: height * 0.02 },
//                 ]}>
//                 <View style={{ padding: 10, gap: HP('0.2%'), marginTop: 10 }}>
//                   <CustomText
//                     text={product.title || product.productId.toUpperCase()}
//                     font={family?.Gilroy_SemiBold}
//                     size={size?.h6}
//                     style={{ textTransform: 'uppercase' }}
//                     color={colors?.headingText}
//                   />
//                   <CustomText
//                     text={
//                       product.productId.includes('monthly')
//                         ? 'Monthly access to favourite nearby business coupons.'
//                         : 'Annual plan with big savings and full-year access.'
//                     }
//                     font={family?.Questrial_Regular}
//                     size={size?.large}
//                     color={colors?.secondary}
//                   />
//                 </View>

//                 <TouchableOpacity
//                   style={styles.touchableButton}
//                   onPress={() => togglePackage(index)}>
//                   <Animated.View
//                     style={{
//                       transform: [{ rotate: rotateIcon(index) || '0deg' }],
//                     }}>
//                     <CustomIcon
//                       src={appIcons?.bottomArrow}
//                       size={size?.tiny}
//                       disabled
//                     />
//                   </Animated.View>
//                 </TouchableOpacity>

//                 <Animated.View
//                   style={[
//                     styles.packageContainer,
//                     { height: animatedHeights[index] || 0 },
//                   ]}>
//                   <View style={{ marginTop: height * 0.03, paddingHorizontal: 20 }}>
//                     {/* Price */}
//                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
//                       <CustomText
//                         text={product.localizedPrice || product.price}
//                         font={family?.Gilroy_SemiBold}
//                         size={size?.h2}
//                         color={colors?.headingText}
//                       />
//                     </View>

//                     {/* Duration & Auto-renewal */}
//                     <CustomText
//                       text={
//                         product.productId.includes('monthly')
//                           ? 'Duration: 1 Month • Auto-renews monthly until cancelled.'
//                           : 'Duration: 1 Year • Auto-renews yearly until cancelled.'
//                       }
//                       font={family?.Questrial_Regular}
//                       size={size?.medium}
//                       color={colors?.secondary}
//                       style={{ marginTop: 8 }}
//                     />

//                     {/* Features Unlocked */}
//                     <View style={{ marginTop: 16 }}>
//                       <CustomText
//                         text="What you'll get:"
//                         font={family?.Gilroy_SemiBold}
//                         size={size?.medium}
//                         color={colors?.headingText}
//                         style={{ marginBottom: 8 }}
//                       />
//                       {subscriptionFeatures.map((feature, featureIndex) => (
//                         <View key={featureIndex} style={{ flexDirection: 'row', marginBottom: 4 }}>
//                           <CustomText
//                             text="• "
//                             font={family?.Questrial_Regular}
//                             size={size?.medium}
//                             color={colors?.secondary}
//                           />
//                           <CustomText
//                             text={feature}
//                             font={family?.Questrial_Regular}
//                             size={size?.small}
//                             color={colors?.secondary}
//                           // numberOfLines={3}
//                           />
//                         </View>
//                       ))}
//                     </View>

//                     {/* BUTTON SECTION */}
//                     <View
//                       style={{
//                         marginTop: height * 0.02,
//                         marginBottom: height * 0.015,
//                         alignItems: 'center',
//                       }}>
//                       <CustomButton
//                         gradientColorArr={[colors.secondary, colors.secondary]}
//                         title={purchaseLoading[product.productId] ? 'Purchasing...' : 'SUBSCRIBE NOW'}
//                         customWidth={width - 150}
//                         customHeight={HEIGHT * 0.06}
//                         buttonStyle={{ alignSelf: 'center', borderRadius: 50 }}
//                         textStyle={{ fontSize: size.large }}
//                         disabled={purchaseLoading[product.productId]}
//                         onPress={() => handleSubscribe(product)}
//                       />
//                     </View>

//                     {/* LEGAL LINKS */}
//                     <View style={{ marginTop: 10, alignItems: 'center' }}>
//                       <Text style={{ fontSize: 12, color: colors.secondary, textAlign: 'center' }}>
//                         By subscribing, you agree to our{' '}
//                         <Text
//                           style={{ textDecorationLine: 'underline', color: colors.secondary }}
//                           onPress={() =>
//                             Linking.openURL('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/')
//                           }>
//                           Terms of Use
//                         </Text>{' '}
//                         and{' '}
//                         <Text
//                           style={{ textDecorationLine: 'underline', color: colors.secondary }}
//                           onPress={() =>
//                             Linking.openURL('https://frontend2.customdev.solutions/privacy_policy/local-plus-pp.html')
//                           }>
//                           Privacy Policy
//                         </Text>.
//                       </Text>
//                     </View>
//                   </View>
//                 </Animated.View>

//               </View>
//             ))
//           )}
//           {/* Restore Purchases Button */}
//           <View style={{ paddingHorizontal: 20, paddingVertical: 20, alignItems: 'center' }}>
//             <CustomButton
//               gradientColorArr={[colors.secondary, colors.secondary]}
//               title={restoreLoading ? 'Restoring...' : 'Restore Purchases'}
//               customWidth={width - 150}
//               customHeight={HEIGHT * 0.06}
//               buttonStyle={{ alignSelf: 'center', borderRadius: 50 }}
//               textStyle={{ fontSize: size.large }}
//               disabled={restoreLoading}
//               onPress={handleRestorePurchases}
//             />
//             <CustomText
//               text="Tap to restore previously purchased subscriptions on this device."
//               font={family?.Questrial_Regular}
//               size={size?.small}
//               color={colors?.secondary}
//               style={{ textAlign: 'center', marginTop: 8 }}
//             />
//           </View>
//         </View>
//       </ScrollView>
//     </CustomBackground>
//   );
// };

// const styles = StyleSheet.create({
//   cardContainer: {
//     ...Shadows?.shadow5,
//     marginVertical: 10,
//     backgroundColor: 'white',
//     borderRadius: 10,
//   },
//   packageContainer: {
//     overflow: 'hidden',
//     backgroundColor: '#D4F1FF',
//     borderBottomRightRadius: 10,
//     borderBottomLeftRadius: 10,
//   },
//   touchableButton: {
//     alignItems: 'center',
//     width: height * 0.028,
//     alignSelf: 'center',
//     height: height * 0.028,
//     justifyContent: 'center',
//     top: 10,
//     zIndex: 999,
//     backgroundColor: 'white',
//     borderRadius: 50,
//     ...Shadows?.shadow5,
//   },
// });

// export default SubscriptionPlan;





import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  ScrollView,
  Easing,
  Alert,
  Platform,
  Text,
  Linking,
} from 'react-native';
import CustomBackground from '../../../components/CustomBackground';
import Shadows from '../../../helpers/Shadows';
import CustomText from '../../../components/CustomText';
import { family, HP, size, vh } from '../../../utils';
import { colors } from '../../../utils/Colors';
import CustomIcon from '../../../components/CustomIcon';
import CustomButton from '../../../components/CustomButton';
import { appIcons } from '../../../assets';
import NavService from '../../../helpers/NavService';
import { executeApiRequest } from '../../../Api/methods/method'; // Assuming you have this for backend calls
import { LOG } from '../../../utils/helperFunction'; // Assuming you have LOG
import { HEIGHT } from '../../../theme/units';

// IAP Integration
import * as RNIap from 'react-native-iap';
import ActivityLoader from '../../../components/ActivityLoader';

const { width, height } = Dimensions.get('screen');

// Product IDs from App Store Connect (replace with yours)
const skus = Platform.select({
  ios: ['shopdit_monthly', 'shopdit_yearly'], // Your actual product IDs
  android: ['monthly_subscription', 'yearly_subscription'],
});

// Features unlocked by subscription
const subscriptionFeatures = [
  'Create & manage multiple business profiles, campaigns, coupons, products, rewards, and track engagement.',
  'Design coupons/deals with USD, Business Points, or Shopdit Points; redeemable via QR codes in-store.',
  'Post events & jobs from main profile; customers view/book/apply via Shopdit User App.',
  'Offer redeemable rewards with Business/Shopdit Points to build customer loyalty.',
  'Launch marketing campaigns to attract/re-engage customers; track & optimize performance.',
  'Manage customer points, award Business Points, and invite via email to grow your base.',
  'Access dashboards, graphs, and reports for engagement, sales, and data-driven insights.',
  'Secure, easy management of promotions, points, and transactions. (Points: loyalty only, no cash value.)',
];

const SubscriptionPlan = () => {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState({});
  const [restoreLoading, setRestoreLoading] = useState(false);

  const [openPackage, setOpenPackage] = useState(null);
  const [animatedHeights, setAnimatedHeights] = useState([]);
  const [animatedRotations, setAnimatedRotations] = useState([]);

  const [isPurchaseInitiated, setIsPurchaseInitiated] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const processedTransactions = React.useRef(new Set());
  const isRestoringRef = React.useRef(false);
  const [activeSubscription, setActiveSubscription] = useState(null);

  useEffect(() => {
    let purchaseUpdateSub;
    let purchaseErrorSub;

    const init = async () => {
      try {
        LOG('🔄 Initializing IAP...');
        await RNIap.initConnection();
        LOG('✅ IAP Connection Established');

        // 🔔 LISTENERS FIRST
        purchaseUpdateSub = RNIap.purchaseUpdatedListener(async purchase => {
          const transactionId =
            purchase.transactionId ||
            purchase.originalTransactionIdentifierIOS ||
            purchase.purchaseToken;

          LOG('🔔 Purchase Updated:', { 
            productId: purchase.productId, 
            transactionId, 
            hasReceipt: !!purchase.transactionReceipt,
            isRestoring: isRestoringRef.current,
            isPurchaseInitiated 
          });

          if (processedTransactions.current.has(transactionId)) {
            LOG('🔄 Duplicate transaction, skipping:', transactionId);
            return;
          }

          processedTransactions.current.add(transactionId);

          // ✅ RECEIPT EXISTS → NEW PURCHASE OR RESTORED WITH RECEIPT
          if (purchase.transactionReceipt) {
            // Check if this is a user-initiated purchase or a restore
            if (isPurchaseInitiated || isRestoringRef.current) {
              await handlePurchaseSuccess(purchase, isRestoringRef.current);
            } else {
              LOG('⚠️ Receipt received but no purchase/restore initiated - treating as restore');
              // This might be a background purchase update, handle it as restore
              await handlePurchaseSuccess(purchase, true);
            }
          } else {
            // 🚫 NO RECEIPT → EXISTING / RESTORED SUBSCRIPTION (iOS restore scenario)
            LOG('🔁 Existing subscription (no receipt) - setting as active');
            setActiveSubscription(purchase.productId);
            
            // Still need to finish the transaction
            try {
              await RNIap.finishTransaction({
                purchase,
                isConsumable: false,
              });
            } catch (finishError) {
              LOG('⚠️ Error finishing transaction without receipt:', finishError);
            }
            
            // Don't show alert here if restoring - handleRestorePurchases will show final alert
            return;
          }

          // Finish transaction after handling
          try {
            await RNIap.finishTransaction({
              purchase,
              isConsumable: false,
            });
            LOG('✅ Transaction finished successfully');
          } catch (finishError) {
            LOG('❌ Error finishing transaction:', finishError);
          }

          setIsPurchaseInitiated(false);
          setPurchaseLoading({});
        });


        purchaseErrorSub = RNIap.purchaseErrorListener(error => {
          LOG('❌ Purchase error:', JSON.stringify(error, null, 2));
          
          // Don't show alert for user cancellation
          if (error.code === 'E_USER_CANCELLED' || error.code === 'userCancelled') {
            LOG('ℹ️ User cancelled the purchase');
            setIsPurchaseInitiated(false);
            setPurchaseLoading({});
            return;
          }

          setIsPurchaseInitiated(false);
          setPurchaseLoading({});
          setIsRestoring(false);
          
          const errorMsg = error.message || error.description || 'Unknown error occurred. Please try again.';
          Alert.alert('Purchase Failed', errorMsg);
        });

        // 🔔 FETCH PRODUCTS
        LOG('🔍 Fetching products with SKUs:', skus);
        const products = await RNIap.getSubscriptions({ skus });
        LOG('📦 Fetched products:', JSON.stringify(products, null, 2));
        
        if (products.length === 0) {
          LOG('⚠️ No products found. Check SKUs and App Store Connect configuration.');
        }
        
        setAvailableProducts(products);

        // 🔔 CHECK ACTIVE SUB ONCE
        try {
          const purchases = await RNIap.getAvailablePurchases();
          LOG('🔍 Available purchases:', JSON.stringify(purchases, null, 2));
          
          if (purchases.length > 0) {
            const active = purchases.find(p =>
              skus.includes(p.productId)
            );

            if (active) {
              setActiveSubscription(active.productId);
              LOG('✅ Active subscription found:', active.productId);
            } else {
              LOG('ℹ️ No active subscription found in available purchases');
            }
          } else {
            LOG('ℹ️ No available purchases found');
          }
        } catch (purchaseError) {
          LOG('⚠️ Error checking available purchases:', purchaseError);
          // Don't fail initialization if this check fails
        }

      } catch (e) {
        LOG('❌ IAP init failed', JSON.stringify(e, null, 2));
        if (e.code) {
          LOG('Error code:', e.code);
        }
        
        let errorMessage = 'IAP initialization failed. Please try again.';
        if (Platform.OS === 'ios') {
          errorMessage = 'IAP initialization failed. Ensure sandbox account is signed in (Settings > App Store > Sandbox Account) and try again.';
        }
        
        Alert.alert('IAP Setup Issue', errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    init();

    return () => {
      purchaseUpdateSub?.remove();
      purchaseErrorSub?.remove();
      // RNIap.endConnection();
    };
  }, []);



  useEffect(() => {
    if (availableProducts.length > 0) {
      setAnimatedHeights(availableProducts.map(() => new Animated.Value(0)));
      setAnimatedRotations(availableProducts.map(() => new Animated.Value(0)));
    }
  }, [availableProducts]);

  const togglePackage = index => {
    if (!animatedHeights[index] || !animatedRotations[index]) return;

    if (openPackage === index) {
      // Close the current open package
      Animated.timing(animatedHeights[index], {
        toValue: 0,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();

      Animated.timing(animatedRotations[index], {
        toValue: 0,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();

      setOpenPackage(null);
    } else {
      // Close previous open package if exists
      if (openPackage !== null) {
        const prevIndex = openPackage;
        Animated.timing(animatedHeights[prevIndex], {
          toValue: 0,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }).start();

        Animated.timing(animatedRotations[prevIndex], {
          toValue: 0,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }).start();
      }

      // Open the new package
      Animated.timing(animatedHeights[index], {
        toValue: height * 0.6, // Increased height to accommodate features list
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();

      Animated.timing(animatedRotations[index], {
        toValue: 1,
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      setOpenPackage(index);
    }
  };

  const rotateIcon = index =>
    animatedRotations[index]?.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

  const handleSubscribe = async (product) => {
    // Check if user already has this subscription active
    if (activeSubscription === product.productId) {
      Alert.alert(
        'Already Subscribed',
        'You already have an active subscription for this plan.'
      );  
      return;
    }

    // Check if another purchase is in progress
    if (isPurchaseInitiated || Object.values(purchaseLoading).some(loading => loading)) {
      Alert.alert(
        'Purchase In Progress',
        'Please wait for the current purchase to complete.'
      );
      return;
    }

    try {
      setIsPurchaseInitiated(true);
      setPurchaseLoading({ [product.productId]: true });
      LOG('🛒 Initiating purchase for:', product.productId);

      await RNIap.requestSubscription({
        sku: product.productId,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });

      // Note: The purchase flow continues in purchaseUpdatedListener
      // We don't reset loading here as it will be handled in the listener

    } catch (e) {
      LOG('❌ Purchase initiation error:', JSON.stringify(e, null, 2));
      setIsPurchaseInitiated(false);
      setPurchaseLoading({});
      
      let errorMessage = 'Failed to start purchase. Please try again.';
      if (e.code === 'E_USER_CANCELLED' || e.code === 'userCancelled') {
        errorMessage = 'Purchase was cancelled.';
      } else if (e.message) {
        errorMessage = e.message;
      }
      
      Alert.alert('Purchase Start Failed', errorMessage);
    }
  };

  const handleRestorePurchases = async () => {
    if (restoreLoading || isPurchaseInitiated) {
      Alert.alert('Please Wait', 'Another operation is in progress. Please wait.');
      return;
    }

    try {
      setRestoreLoading(true);
      setIsRestoring(true);
      isRestoringRef.current = true;
      LOG('🔄 Restoring purchases...');

      if (Platform.OS === 'ios') {
        // iOS: restorePurchases() triggers purchaseUpdatedListener for each restored purchase
        // It may also return purchases, but listener is more reliable
        try {
          const restoredPurchases = await RNIap.restorePurchases();
          LOG('📦 Restored purchases result:', JSON.stringify(restoredPurchases, null, 2));
          
          // Give the listener a moment to process (iOS listeners are async)
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check available purchases as the source of truth
          const purchases = await RNIap.getAvailablePurchases();
          LOG('📦 Available purchases after restore:', JSON.stringify(purchases, null, 2));
          
          if (purchases.length > 0) {
            const active = purchases.find(p => skus.includes(p.productId));
            if (active) {
              setActiveSubscription(active.productId);
              Alert.alert('Success', 'Your subscription has been restored successfully!');
            } else {
              Alert.alert('No Active Subscriptions', 'No active subscriptions found to restore.');
            }
          } else {
            Alert.alert('No Purchases', 'No previous subscriptions found on this device.');
          }
        } catch (restoreError) {
          LOG('⚠️ Error during restore:', restoreError);
          // Still check available purchases
          const purchases = await RNIap.getAvailablePurchases();
          if (purchases.length > 0) {
            const active = purchases.find(p => skus.includes(p.productId));
            if (active) {
              setActiveSubscription(active.productId);
              Alert.alert('Success', 'Your subscription has been restored successfully!');
            } else {
              Alert.alert('No Active Subscriptions', 'No active subscriptions found to restore.');
            }
          } else {
            Alert.alert('No Purchases', 'No previous subscriptions found on this device.');
          }
        }
      } else {
        // Android: get all active purchases
        const purchases = await RNIap.getAvailablePurchases();
        LOG('📦 Available purchases on Android:', JSON.stringify(purchases, null, 2));

        if (purchases.length > 0) {
          let foundActive = false;
          for (const purchase of purchases) {
            if (skus.includes(purchase.productId)) {
              foundActive = true;
              setActiveSubscription(purchase.productId);
              // Only call handlePurchaseSuccess if there's a receipt
              if (purchase.transactionReceipt) {
                await handlePurchaseSuccess(purchase, true);
              } else {
                LOG('✅ Restored subscription (no receipt):', purchase.productId);
              }
            }
          }
          
          if (foundActive) {
            Alert.alert('Success', 'Your subscriptions have been restored successfully!');
          } else {
            Alert.alert('No Active Subscriptions', 'No active subscriptions found to restore.');
          }
        } else {
          Alert.alert('No Purchases', 'No previous subscriptions found on this device.');
        }
      }
    } catch (err) {
      LOG('❌ Restore Purchases Error:', JSON.stringify(err, null, 2));
      
      let errorMessage = 'Failed to restore purchases. Please try again.';
      if (err.message) {
        errorMessage = err.message;
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setRestoreLoading(false);
      setIsRestoring(false);
      isRestoringRef.current = false;
    }
  };

  const handlePurchaseSuccess = async (purchase, isRestore = false) => {
    if (!purchase.transactionReceipt) {
      LOG('⚠️ No receipt in purchase, setting as active subscription anyway');
      // Even without receipt, set as active if it's a valid product
      if (skus.includes(purchase.productId)) {
        setActiveSubscription(purchase.productId);
      }
      return;
    }

    try {
      const receiptData = {
        receipt: purchase.transactionReceipt,
        productId: purchase.productId,
        transactionId:
          purchase.transactionId ||
          purchase.originalTransactionIdentifierIOS ||
          purchase.purchaseToken,
        platform: Platform.OS,
        type: 'subscription',
      };

      LOG('✅ PURCHASE SUCCESS — SEND TO BACKEND:', receiptData);

      // Set active subscription immediately
      setActiveSubscription(purchase.productId);

      // Show success message (only for new purchases, not restores)
      // Restores will show a final alert in handleRestorePurchases
      if (!isRestore) {
        Alert.alert('Success', 'Subscription activated successfully!');
      } else {
        LOG('✅ Subscription restored:', purchase.productId);
      }

      // TODO: Send receiptData to your backend to validate
      // Example:
      // const response = await executeApiRequest({
      //   apiCallFunction: validateSubscriptionAPI,
      //   body: receiptData,
      //   toast: true,
      // });

      // if (response?.success) {
      //   Alert.alert('Success', 'Subscription activated!');
      //   NavService.navigate('DrawerStack');
      // } else {
      //   Alert.alert('Error', 'Subscription validation failed.');
      // }

    } catch (err) {
      LOG('❌ Purchase Validation Error:', JSON.stringify(err, null, 2));
      
      // Even if validation fails, set as active if we have the purchase
      if (skus.includes(purchase.productId)) {
        setActiveSubscription(purchase.productId);
      }
      
      Alert.alert('Error', 'Subscription activation failed. Please contact support if the issue persists.');
    } finally {
      // Reset loading states
      setPurchaseLoading({});
      setRestoreLoading(false);
    }
  };
  if (isLoading) {
    return (
      <CustomBackground
        back
        titleText={'SUBSCRIPTION PLANS'}
        descriptionText={'Choose your subscription plan'}>
        {/* Add your GlobalShimmer or ActivityLoader here */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityLoader />
        </View>
      </CustomBackground>
    );
  }

  return (
    <CustomBackground
      back
      titleText={'SUBSCRIPTION PLANS'}
      descriptionText={'Choose your subscription plan'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: width * 0.06, paddingTop: 30 }}>
          {availableProducts.length === 0 ? (
            <CustomText text="No subscriptions available. Please try again later." color={colors?.secondary} />
          ) : (
            availableProducts.map((product, index) => (
              <View
                key={product.productId}
                style={[
                  styles.cardContainer,
                  index === availableProducts.length - 1
                    ? { marginBottom: height * 0.05 }
                    : { marginBottom: height * 0.02 },
                ]}>
                <View style={{ padding: 10, gap: HP('0.2%'), marginTop: 10 }}>
                  <CustomText
                    text={product.title || product.productId.toUpperCase()}
                    font={family?.Gilroy_SemiBold}
                    size={size?.h6}
                    style={{ textTransform: 'uppercase' }}
                    color={colors?.headingText}
                  />
                  <CustomText
                    text={
                      product.productId.includes('monthly')
                        ? 'Monthly access to favourite nearby business coupons.'
                        : 'Annual plan with big savings and full-year access.'
                    }
                    font={family?.Questrial_Regular}
                    size={size?.large}
                    color={colors?.secondary}
                  />
                </View>

                <TouchableOpacity
                  style={styles.touchableButton}
                  onPress={() => togglePackage(index)}>
                  <Animated.View
                    style={{
                      transform: [{ rotate: rotateIcon(index) || '0deg' }],
                    }}>
                    <CustomIcon
                      src={appIcons?.bottomArrow}
                      size={size?.tiny}
                      disabled
                    />
                  </Animated.View>
                </TouchableOpacity>

                <Animated.View
                  style={[
                    styles.packageContainer,
                    { height: animatedHeights[index] || 0 },
                  ]}>
                  <View style={{ marginTop: height * 0.03, paddingHorizontal: 20 }}>
                    {/* Price */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                      <CustomText
                        text={product.localizedPrice || product.price}
                        font={family?.Gilroy_SemiBold}
                        size={size?.h2}
                        color={colors?.headingText}
                      />
                    </View>

                    {/* Duration & Auto-renewal */}
                    <CustomText
                      text={
                        product.productId.includes('monthly')
                          ? 'Duration: 1 Month • Auto-renews monthly until cancelled.'
                          : 'Duration: 1 Year • Auto-renews yearly until cancelled.'
                      }
                      font={family?.Questrial_Regular}
                      size={size?.medium}
                      color={colors?.secondary}
                      style={{ marginTop: 8 }}
                    />

                    {/* Features Unlocked */}
                    <View style={{ marginTop: 16 }}>
                      <CustomText
                        text="What you'll get:"
                        font={family?.Gilroy_SemiBold}
                        size={size?.medium}
                        color={colors?.headingText}
                        style={{ marginBottom: 8 }}
                      />
                      {subscriptionFeatures.map((feature, featureIndex) => (
                        <View key={featureIndex} style={{ flexDirection: 'row', marginBottom: 4 }}>
                          <CustomText
                            text="• "
                            font={family?.Questrial_Regular}
                            size={size?.medium}
                            color={colors?.secondary}
                          />
                          <CustomText
                            text={feature}
                            font={family?.Questrial_Regular}
                            size={size?.small}
                            color={colors?.secondary}
                          // numberOfLines={3}
                          />
                        </View>
                      ))}
                    </View>

                    {/* BUTTON SECTION */}
                    <View
                      style={{
                        marginTop: height * 0.02,
                        marginBottom: height * 0.015,
                        alignItems: 'center',
                      }}>
                      <CustomButton
                        gradientColorArr={[colors.secondary, colors.secondary]}
                        title={
                          activeSubscription === product.productId
                            ? 'ACTIVE SUBSCRIPTION'
                            : purchaseLoading[product.productId]
                            ? 'Purchasing...'
                            : 'SUBSCRIBE NOW'
                        }
                        customWidth={width - 150}
                        customHeight={HEIGHT * 0.06}
                        buttonStyle={{ alignSelf: 'center', borderRadius: 50 }}
                        textStyle={{ fontSize: size.large }}
                        disabled={purchaseLoading[product.productId] || activeSubscription === product.productId || restoreLoading}
                        onPress={() => handleSubscribe(product)}
                      />
                      {activeSubscription === product.productId && (
                        <CustomText
                          text="✓ You are currently subscribed to this plan"
                          font={family?.Questrial_Regular}
                          size={size?.small}
                          color={colors?.secondary}
                          style={{ textAlign: 'center', marginTop: 8, fontStyle: 'italic' }}
                        />
                      )}
                    </View>

                    {/* LEGAL LINKS */}
                    <View style={{ marginTop: 10, alignItems: 'center' }}>
                      <Text style={{ fontSize: 12, color: colors.secondary, textAlign: 'center' }}>
                        By subscribing, you agree to our{' '}
                        <Text
                          style={{ textDecorationLine: 'underline', color: colors.secondary }}
                          onPress={() =>
                            Linking.openURL('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/')
                          }>
                          Terms of Use
                        </Text>{' '}
                        and{' '}
                        <Text
                          style={{ textDecorationLine: 'underline', color: colors.secondary }}
                          onPress={() =>
                            Linking.openURL('https://frontend2.customdev.solutions/privacy_policy/local-plus-pp.html')
                          }>
                          Privacy Policy
                        </Text>.
                      </Text>
                    </View>
                  </View>
                </Animated.View>

              </View>
            ))
          )}
          {/* Restore Purchases Button */}
          <View style={{ paddingHorizontal: 20, paddingVertical: 20, alignItems: 'center' }}>
            <CustomButton
              gradientColorArr={[colors.secondary, colors.secondary]}
              title={restoreLoading ? 'Restoring...' : 'Restore Purchases'}
              customWidth={width - 150}
              customHeight={HEIGHT * 0.06}
              buttonStyle={{ alignSelf: 'center', borderRadius: 50 }}
              textStyle={{ fontSize: size.large }}
              disabled={restoreLoading}
              onPress={handleRestorePurchases}
            />
            <CustomText
              text="Tap to restore previously purchased subscriptions on this device."
              font={family?.Questrial_Regular}
              size={size?.small}
              color={colors?.secondary}
              style={{ textAlign: 'center', marginTop: 8 }}
            />
          </View>
        </View>
      </ScrollView>
    </CustomBackground>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    ...Shadows?.shadow5,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  packageContainer: {
    overflow: 'hidden',
    backgroundColor: '#D4F1FF',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  touchableButton: {
    alignItems: 'center',
    width: height * 0.028,
    alignSelf: 'center',
    height: height * 0.028,
    justifyContent: 'center',
    top: 10,
    zIndex: 999,
    backgroundColor: 'white',
    borderRadius: 50,
    ...Shadows?.shadow5,
  },
});

export default SubscriptionPlan;
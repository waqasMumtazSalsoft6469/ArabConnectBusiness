// import React, { useState } from 'react';
// import { View, TouchableOpacity, Animated, StyleSheet, Dimensions, ScrollView, Easing, Alert } from 'react-native';
// import CustomBackground from '../../../components/CustomBackground';
// import Shadows from '../../../helpers/Shadows';
// import CustomText from '../../../components/CustomText';
// import { family, HP, size } from '../../../utils';
// import { colors } from '../../../utils/Colors';
// import CustomCheckbox from '../../../components/CustomCheckbox';
// import CustomIcon from '../../../components/CustomIcon';
// import CustomButton from '../../../components/CustomButton';
// import { appIcons } from '../../../assets';
// import NavService from '../../../helpers/NavService';

// const { width, height } = Dimensions.get('screen');
// const packagesData = [
//   {
//     name: 'Premium Package',
//     description: 'For building personal business profile',
//     price: '164.00',
//     features: ['Lorem Ipsum is simply dummy.', 'Lorem Ipsum is simply.', 'Lorem Ipsum is simply dummy.'],
//     color: '#D4F0FF'
//   },
//   {
//     name: 'Basic Package',
//     description: 'For building personal business profile',
//     price: '90.00',
//     features: ['Lorem Ipsum is simply dummy.', 'Lorem Ipsum is simply.', 'Lorem Ipsum is simply dummy.'],
//     color: '#FFD4D4'
//   },
//   {
//     name: 'Standard Package',
//     description: 'For building personal business profile',
//     price: '120.00',
//     features: ['Lorem Ipsum is simply dummy.', 'Lorem Ipsum is simply.', 'Lorem Ipsum is simply dummy.'],
//     color: '#D4D8FF'
//   },
// ];

// const SubscriptionPlan = () => {
//   const [openPackage, setOpenPackage] = useState(null);

//   const animatedHeights = packagesData.map(() => useState(new Animated.Value(0))[0]);
//   const animatedRotations = packagesData.map(() => useState(new Animated.Value(0))[0]);

//   const togglePackage = (index) => {
//     // Asghar -->  This closes all packages first
//     animatedHeights.forEach((anim, i) => {
//       Animated.timing(anim, {
//         toValue: 0,
//         duration: 400,
//         easing: Easing.inOut(Easing.ease),
//         useNativeDriver: false,
//       }).start();
//       // Asghar --> This used to reset rotation for my icon
//       Animated.timing(animatedRotations[i], {
//         toValue: 0,
//         duration: 400,
//         easing: Easing.inOut(Easing.ease),
//         useNativeDriver: false,
//       }).start();
//     });
//     // Asghar --> closes clicked package if open
//     if (openPackage === index) {
//       setOpenPackage(null);
//     } else {
//       // Asghar --> Opens package and rotates my icon
//       Animated.timing(animatedHeights[index], {
//         toValue: height * 0.30,
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

//   const rotateIcon = (index) => {
//     return animatedRotations[index].interpolate({
//       inputRange: [0, 1],
//       outputRange: ['0deg', '180deg'],
//     });
//   };
//   return (
//     <CustomBackground
//       back={true}
//       titleText={'SUBSCRIPTION PLAN'}
//       descriptionText={'Choose your package plan'}
//     >
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={{ paddingHorizontal: width * 0.08, paddingTop: 30 }}>
//           {packagesData.map((pkg, index) => (
//             <View key={index} style={[styles.cardContainer, index === 2 ? { marginBottom: height * 0.05 } : { marginBottom: height * 0.02 }]}>
//               <View style={{ padding: 10, gap: HP('0.2%'), marginTop: 5 }}>
//                 <CustomCheckbox
//                   checked={false}
//                   onChange={(value) => value}
//                   cutsomStyle={{ backgroundColor: pkg?.color }}
//                 />
//                 <CustomText
//                   text={pkg.name}
//                   font={family?.Gilroy_SemiBold}
//                   size={size?.h6}
//                   style={{ textTransform: 'uppercase' }}
//                   color={colors?.headingText}
//                 />
//                 <CustomText
//                   text={pkg.description}
//                   font={family?.Questrial_Regular}
//                   size={size?.large}
//                   color={colors?.secondary}
//                 />
//               </View>

//               <TouchableOpacity style={styles.touchableButton} onPress={() => togglePackage(index)}>
//                 <Animated.View style={{ transform: [{ rotate: rotateIcon(index) }] }}>
//                   <CustomIcon src={appIcons?.bottomArrow} size={size?.tiny} disabled={true} />
//                 </Animated.View>
//               </TouchableOpacity>

//               <Animated.View style={[styles.packageContainer, { height: animatedHeights[index] }]}>
//                 <View style={{ marginTop: height * 0.03, paddingHorizontal: 20 }}>

//                   <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
//                     <CustomText text={'$'} font={family?.Gilroy_SemiBold} size={size?.large} color={colors?.headingText} />
//                     <CustomText text={pkg.price} font={family?.Gilroy_SemiBold} size={size?.h2} color={colors?.headingText} />
//                     <CustomText
//                       text={'/per month'}
//                       font={family?.Gilroy_SemiBold}
//                       size={size?.medium}
//                       color={colors?.headingText}
//                       style={{ left: 3 }}
//                     />
//                   </View>

//                   <View style={{ marginTop: height * 0.02, marginBottom: height * 0.015 }}>
//                     <CustomButton
//                       gradientColorArr={[colors.secondary, colors.secondary]}
//                       title={'CONTINUE'}
//                       customWidth={width - 150}
//                       buttonStyle={{ alignSelf: 'center', borderRadius: 50 }}
//                       textStyle={{ fontSize: size.large }}
//                       onPress={() => {
//                         NavService?.navigate('login')
//                         Alert.alert('Subscription Selected')
//                       }}
//                     />
//                   </View>

//                   <View>
//                     {pkg.features.map((feature, i) => (
//                       <View
//                         key={i}
//                         style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: height * 0.013 }}
//                       >
//                         <CustomIcon size={size?.h5} src={appIcons?.checkmark} resizeMode={'center'} />
//                         <CustomText
//                           text={feature}
//                           font={family?.Questrial_Regular}
//                           size={size?.large}
//                           color={colors?.headingText}
//                           numberOfLines={1}
//                         />
//                       </View>
//                     ))}
//                   </View>
//                 </View>
//               </Animated.View>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </CustomBackground>
//   );
// };

// const styles = StyleSheet.create({
//   cardContainer: {
//     ...Shadows?.shadow4,
//     marginVertical: 10,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     marginBottom: height * 0.02,
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
//     ...Shadows?.shadow5
//   },
// });

// export default SubscriptionPlan;

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  ScrollView,
  Easing,
  Alert,
} from 'react-native';
import CustomBackground from '../../../components/CustomBackground';
import Shadows from '../../../helpers/Shadows';
import CustomText from '../../../components/CustomText';
import {family, HP, size} from '../../../utils';
import {colors} from '../../../utils/Colors';
import CustomCheckbox from '../../../components/CustomCheckbox';
import CustomIcon from '../../../components/CustomIcon';
import CustomButton from '../../../components/CustomButton';
import {appIcons} from '../../../assets';
import NavService from '../../../helpers/NavService';
import {
  useBuyMutation,
  useFetchPlanByUserQuery,
} from '../../../Api/subscriptionApiSlice';
import {LOG} from '../../../utils/helperFunction';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';
import {executeApiRequest} from '../../../Api/methods/method';

const {width, height} = Dimensions.get('screen');

const SubscriptionPlan = ({route}) => {
  const token = route?.params;
  // console.log('TOKEN: ', token?.token);
  const {data, isLoading} = useFetchPlanByUserQuery();
  LOG('DATA: ', data);
  const [buy, {isLoading: isBuying}] = useBuyMutation();
  const planData = data?.data || [];
  const [openPackage, setOpenPackage] = useState(null);

  const [animatedHeights, setAnimatedHeights] = useState([]);
  const [animatedRotations, setAnimatedRotations] = useState([]);

  // Initialize animation values when planData is loaded
  useEffect(() => {
    if (planData.length > 0) {
      setAnimatedHeights(planData.map(() => new Animated.Value(0)));
      setAnimatedRotations(planData.map(() => new Animated.Value(0)));
    }
  }, [planData]);

  const togglePackage = index => {
    if (!animatedHeights[index] || !animatedRotations[index]) return;

    animatedHeights.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: 0,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();

      Animated.timing(animatedRotations[i], {
        toValue: 0,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();
    });

    if (openPackage === index) {
      setOpenPackage(null);
    } else {
      Animated.timing(animatedHeights[index], {
        toValue: height * 0.3,
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

  const rotateIcon = index => {
    return animatedRotations[index]?.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
  };

  const handleBuy = async id => {
    const payload = {
      planId: id,
    };

    const response = await executeApiRequest({
      apiCallFunction: buy,
      body: payload,
      formData: false,
      toast: true,
      timeout: 30000,
    });

    LOG('SUCCESS: ', response);
    NavService.reset(0, [{name: 'login'}]);
  };
  return (
    <CustomBackground
      back={true}
      titleText={'SUBSCRIPTION PLANS'}
      descriptionText={'Choose your package plan'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: width * 0.08, paddingTop: 30}}>
          {isLoading ? (
            <ActivityLoader color={colors2.theme.secondary} />
          ) : (
            <>
              {planData.map((pkg, index) => (
                <View
                  key={index}
                  style={[
                    styles.cardContainer,
                    index === 2
                      ? {marginBottom: height * 0.05}
                      : {marginBottom: height * 0.02},
                  ]}>
                  <View style={{padding: 10, gap: HP('0.2%'), marginTop: 5}}>
                    <CustomCheckbox
                      checked={false}
                      onChange={value => value}
                      cutsomStyle={{
                        backgroundColor:
                          pkg.title === 'BASIC PACKAGE'
                            ? '#D4F0FF'
                            : pkg.title === 'STANDARD PACKAGE'
                            ? '#FFD4D4'
                            : pkg.title === 'PREMIUM PACKAGE'
                            ? '#D4D8FF'
                            : '#D4D8FF',
                      }}
                    />
                    <CustomText
                      text={pkg.title}
                      font={family?.Gilroy_SemiBold}
                      size={size?.h6}
                      style={{textTransform: 'uppercase'}}
                      color={colors?.headingText}
                    />
                    <CustomText
                      text={'For building personal business profiles'}
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
                        transform: [{rotate: rotateIcon(index) || '0deg'}],
                      }}>
                      <CustomIcon
                        src={appIcons?.bottomArrow}
                        size={size?.tiny}
                        disabled={true}
                      />
                    </Animated.View>
                  </TouchableOpacity>

                  <Animated.View
                    style={[
                      styles.packageContainer,
                      {height: animatedHeights[index] || 0},
                    ]}>
                    <View
                      style={{
                        marginTop: height * 0.03,
                        paddingHorizontal: 20,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 2,
                        }}>
                        <CustomText
                          text={'$'}
                          font={family?.Gilroy_SemiBold}
                          size={size?.large}
                          color={colors?.headingText}
                        />
                        <CustomText
                          text={pkg.price}
                          font={family?.Gilroy_SemiBold}
                          size={size?.h2}
                          color={colors?.headingText}
                        />
                        <CustomText
                          text={'/per month'}
                          font={family?.Gilroy_SemiBold}
                          size={size?.medium}
                          color={colors?.headingText}
                          style={{left: 3}}
                        />
                      </View>

                      <View
                        style={{
                          marginTop: height * 0.02,
                          marginBottom: height * 0.015,
                        }}>
                        {isBuying ? (
                          <ActivityLoader color={colors2.theme.secondary} />
                        ) : (
                          <CustomButton
                            gradientColorArr={[
                              colors.secondary,
                              colors.secondary,
                            ]}
                            title={'CONTINUE'}
                            customWidth={width - 150}
                            buttonStyle={{
                              alignSelf: 'center',
                              borderRadius: 50,
                            }}
                            textStyle={{fontSize: size.large}}
                            // onPress={() => {
                            //   NavService?.navigate('DrawerStack');
                            //   Alert.alert('Subscription Selected');
                            // }}
                            onPress={() => {
                              Alert.alert(
                                'Confirm Purchase',
                                'Do you want to continue and purchase this package?',
                                [
                                  {text: 'Cancel', style: 'cancel'},
                                  {
                                    text: 'Yes',
                                    onPress: () => handleBuy(pkg?._id),
                                  },
                                ],
                                {cancelable: true},
                              );
                            }}
                          />
                        )}
                      </View>

                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            marginTop: height * 0.013,
                          }}>
                          <CustomIcon
                            size={size?.h5}
                            src={appIcons?.checkmark}
                            resizeMode={'center'}
                          />
                          <CustomText
                            text={`Businesses Allowed: ${
                              pkg?.businessesAllowed || '-'
                            }`}
                            font={family?.Questrial_Regular}
                            size={size?.large}
                            color={colors?.headingText}
                            numberOfLines={1}
                          />
                        </View>
                      </View>
                    </View>
                  </Animated.View>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </CustomBackground>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    ...Shadows?.shadow4,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: height * 0.02,
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

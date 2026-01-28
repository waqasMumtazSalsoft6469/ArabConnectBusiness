'use strict';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity, Image, Platform} from 'react-native';
import {Camera, useCameraDevice, useCodeScanner} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import NavService from '../../../helpers/NavService';
import {colors} from '../../../utils/Colors';
import {appIcons} from '../../../assets';
import {useRedeemMutation} from '../../../Api/couponApiSlice';
import {LOG} from '../../../utils/helperFunction';
import {executeApiRequest} from '../../../Api/methods/method';
import {useRedeemRewardMutation} from '../../../Api/rewardsApiSlice';

const QRScannerScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [redeem, {isLoading}] = useRedeemMutation();
  const [redeemReward, {isLoading: rewardLoading}] = useRedeemRewardMutation();
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const device = useCameraDevice('back');

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    try {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
    } catch (error) {
      console.error('Camera permission error:', error);
      setHasPermission(false);
    }
  };

  const onSuccess = async (data) => {
    if (isScanned) return; // Prevent multiple scans
    setIsScanned(true);

    try {
      const dataParsed = JSON.parse(data);
      console.log('Data: ', dataParsed);

      let payload;
      let response;
      let successMessage;
      let apiCallFunction;

      if (dataParsed.type === 'reward') {
        // For rewards: Send the entire parsed data as payload
        console.log('Scanned Reward Data:', dataParsed);
        payload = dataParsed;
        apiCallFunction = redeemReward;
        LOG('Reward Payload: ', payload);
        response = await executeApiRequest({
          apiCallFunction,
          body: payload,
          toast: true,
          timeout: 30000,
        });
        LOG('Reward Remove Success:', response);
        successMessage = `Reward Removed for User: ${dataParsed.userId}`;
      } else {
        // For coupons: Keep original logic (assume no 'type' or not 'reward')
        const {userId, couponId} = dataParsed;
        if (!userId || !couponId) {
          throw new Error('Missing userId or couponId in QR data');
        }
        console.log('Scanned User ID:', userId);
        console.log('Scanned Coupon ID:', couponId);
        payload = {userId, couponId};
        apiCallFunction = redeem;
        LOG('Coupon Payload: ', payload);
        response = await executeApiRequest({
          apiCallFunction,
          body: payload,
          toast: true,
          timeout: 30000,
        });
        LOG('Coupon Redeem Success:', response);
        successMessage = `Coupon Redeemed for User: ${userId}`;
      }

      if (response) {
        Alert.alert('Success', successMessage, [
          {
            text: 'OK',
            onPress: () => {
              setIsScanned(false);
              navigation.goBack();
            },
          },
        ]);
      }
    } catch (error) {
      console.error('QR Scan Error:', error);
      setIsScanned(false);
      Alert.alert(
        'Invalid QR',
        'The QR code is not valid or failed to process.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Allow scanning again after error
            },
          },
        ],
      );
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (codes.length > 0 && !isScanned) {
        const code = codes[0];
        if (code.value) {
          onSuccess(code.value);
        }
      }
    },
  });

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <View style={[styles.header, {paddingTop: Platform.OS === 'ios' ? insets.top : getStatusBarHeight() + 10}]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Image
              source={appIcons.back}
              style={styles.backIcon}
              tintColor={colors.white}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Scan the User's QR Code</Text>
        </View>
        <View style={[styles.centerContent, {flex: 1}]}>
          <Text style={styles.text}>
            Camera permission is required to scan QR codes.
          </Text>
          <Text style={[styles.text, {marginTop: 10}]}>
            Please grant camera permission in your device settings.
          </Text>
        </View>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <View style={[styles.header, {paddingTop: Platform.OS === 'ios' ? insets.top : getStatusBarHeight() + 10}]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Image
              source={appIcons.back}
              style={styles.backIcon}
              tintColor={colors.white}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Scan the User's QR Code</Text>
        </View>
        <View style={[styles.centerContent, {flex: 1}]}>
          <Text style={styles.text}>No camera device found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={!isScanned}
        codeScanner={codeScanner}
      />
      {/* Header with back button */}
      <View style={[styles.header, {paddingTop: Platform.OS === 'ios' ? insets.top : getStatusBarHeight() + 10}]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={appIcons.back}
            style={styles.backIcon}
            tintColor={colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Scan the User's QR Code</Text>
      </View>
      {/* Scanning marker */}
      <View style={styles.markerContainer}>
        <View style={styles.marker} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    flex: 1,
  },
  text: {
    fontSize: 18,
    margin: 16,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
  },
  markerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    width: 250,
    height: 250,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors?.secondary || '#00FF00',
    backgroundColor: 'transparent',
  },
});

export default QRScannerScreen;

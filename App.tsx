import {
  KeyboardAvoidingView,
  LogBox,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import MainNavigation from './src/navigation/MainNavigation';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {colors} from './src/utils/Colors';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import {size, vh} from './src/utils';
import CustomText from './src/components/CustomText';
LogBox.ignoreLogs(['new NativeEventEmitter']);

const App = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const toastConfig = {
    success: internalState => (
      <View style={[styles.toastContainer, styles.success]}>
        <CustomText
          numberOfLines={2}
          style={styles.toastText}
          text={internalState.text1}
          // font={fonts.e.medium}
        />
      </View>
    ),
    error: internalState => (
      <View style={[styles.toastContainer, styles.error]}>
        <CustomText
          numberOfLines={1}
          style={styles.toastText}
          text={internalState.text1}
        />
      </View>
    ),
  };

  const statusHeight = StatusBar.currentHeight + 1;
  console.log('statusHeight', statusHeight);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={colors?.primary}
        barStyle={'light-content'}
      />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <KeyboardAvoidingView
            style={[styles.container, styles.containerWhiteBackground]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : undefined}>
            <MainNavigation />
            <Toast topOffset={70} config={toastConfig} />
            {/* <CustomerListing/> */}
          </KeyboardAvoidingView>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerWhiteBackground: {
    backgroundColor: colors.white,
  },

  toastContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingHorizontal: 20,
    padding: 10,
    borderWidth: 0.4,
    borderColor: colors?.secondary,
    borderRadius: 100,
    borderStyle: 'solid',
    marginTop: Platform?.OS === 'ios' ? vh * 1 : -vh * 5,
  },
  toastText: {
    color: 'white',
    fontSize: size?.medium,
    textAlign: 'center',
    // fontFamily: fonts.e.light,
  },
  success: {
    backgroundColor: '#000000',
    // backgroundColor: 'rgba(0,0,0,0.4)',
  },
  error: {
    backgroundColor: '#000000',
  },
});

export default App;

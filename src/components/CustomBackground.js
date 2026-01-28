import React, { useState, useEffect } from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  Platform
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors } from '../utils/Colors';
import NavService from '../helpers/NavService';
import { appIcons } from '../assets';
import { family, HP, size, WP } from '../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default ({
  children,
  menu = false,
  back = false,
  notification = false,
  back2 = false,
  title = true,
  titleText,
  onBack = null,
  titleDescription = true,
  isDashboard = false,
  descriptionText
}) => {
  const [isPortrait, setIsPortrait] = useState(Dimensions.get('window').height > Dimensions.get('window').width);

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setIsPortrait(height > width);
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);

    return () => {
      subscription?.remove();
    };
  }, []);

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors?.primary, }]}>
      <View style={[
        styles.header,
        {
          paddingVertical: isPortrait ? '15%' : '5%',
          paddingHorizontal: '8%',
          marginTop: isDashboard ? getStatusBarHeight() * 0.5 : 0,

        }
      ]}>

        {back && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (onBack != null) {
                onBack();
              } else {
                NavService.goBack();
              }
            }}
            style={{
              position: 'absolute',
              zIndex: 99,
              top: Platform.OS === 'ios' ? insets.top : getStatusBarHeight() + 10,
              left: 25,
            }}>
            <Image
              source={appIcons.back}
              style={styles.backImage}
            />
          </TouchableOpacity>
        )}
        {back2 && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (onBack != null) {
                onBack();
              } else {
                NavService.reset(0, [{ name: 'login' }])
              }
            }}
            style={{
              position: 'absolute',
              zIndex: 99,
              top: Platform.OS === 'ios' ? insets.top : getStatusBarHeight() + 10,
              left: 25,
            }}>
            <Image
              source={appIcons.back}
              style={styles.backImage}
            />
          </TouchableOpacity>
        )}

        {menu && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              NavService.openDrawer();
            }}
            style={{
              position: 'absolute',
              zIndex: 99,
              top: getStatusBarHeight() + 10,
              left: 25,
            }}
          >
            <Image
              source={appIcons.menu}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
                tintColor: colors.white,
              }}
            />

          </TouchableOpacity>

        )}
        {notification && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              NavService.navigate('Notification');
            }}
            style={{
              position: 'absolute',
              right: 25,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              backgroundColor: colors?.white,
              top: 34
            }}>
            <Image
              source={appIcons.notification}
              style={{
                width: 22,
                height: 22,
                tintColor: colors?.headingText,
                resizeMode: 'contain',

              }}
            />
            {/* <View style={{ backgroundColor: colors?.red, padding: 5.5, borderRadius: 50, position: 'absolute', top: 10, left: 21.2 }} /> */}
          </TouchableOpacity>
        )}
        <View style={isDashboard ? styles.isDashboard : styles.titleContainer}>

          {title && (
            <View>
              <Text style={[styles.headerSignInText, { fontSize: isDashboard ? size?.h2 : size?.h1, }]}>{titleText}</Text>
            </View>
          )}
          {titleDescription && (
            <View>
              <Text style={styles.headerDescription}>{descriptionText}</Text>
            </View>
          )}
        </View>

      </View>

      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.childrenContainer}>
        <View style={{ flex: 3 }}>{children}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colors?.primary,
    height: HP(26)
  },
  backImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  titleContainer: {
    gap: 10,
    top: 30,
  },
  headerSignInText: {
    fontSize: size?.h2,
    color: colors.white,
    fontFamily: family?.Gilroy_SemiBold,
  },
  headerDescription: {
    fontSize: size?.xxlarge,
    color: colors.white,
    fontFamily: family?.Questrial_Regular,
  },
  childrenContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors?.white,
  },
  isDashboard: {
    position: 'absolute',
    left: 70,
    top: 43
  }
});

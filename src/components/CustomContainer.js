import React from 'react';
import {View, ScrollView, Image, StyleSheet, Dimensions} from 'react-native';
import {appImages} from '../assets';
import {colors} from '../utils/Colors';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('screen');

const CustomContainer = ({
  children,
  bgImage,
  customBgStyles,
  customItemStyles,
}) => {
  return (
    <>
      {/* Banner */}
      <View style={styles.bannerContainer}>
        <FastImage
          style={[styles.image, customBgStyles]}
          source={bgImage}
          resizeMode="cover"
          defaultSource={appImages?.placeholder}
        />
      </View>
      <View style={[styles.itemsContainer, customItemStyles]}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
          showsVerticalScrollIndicator={false}>
          <View style={{marginBottom: height * 0.08}}>{children}</View>
        </ScrollView>
      </View>
    </>
  );
};

export default CustomContainer;

const styles = StyleSheet.create({
  itemsContainer: {
    backgroundColor: colors?.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: 1,
    flex: 1,
    marginTop: -height * 0.035,
    paddingTop: 10,
    //  backgroundColor: 'red',
  },
  bannerContainer: {
    height: height / 2.25,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: -height * 0.02,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

import React, {useState} from 'react';
import {View, Image, StyleSheet, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import {appIcons, appImages} from '../../assets';

const CustomFastImage = ({uri, style, resizeMode}) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={[styles.container, style]}>
      {loading && (
        <Image
          source={appImages?.placeholder}
          style={[StyleSheet.absoluteFill, style]}
          resizeMode="cover"
        />
      )}
      <FastImage
        source={uri}
        style={StyleSheet.absoluteFill}
        resizeMode={resizeMode ? resizeMode : FastImage.resizeMode.cover}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
});

export default CustomFastImage;

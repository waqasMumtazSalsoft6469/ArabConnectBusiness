/**
 * Drop-in replacement for react-native-fast-image (incompatible with RN 0.73+).
 * Uses React Native's built-in Image for caching and display.
 */
import React from 'react';
import {Image} from 'react-native';

export const resizeMode = {
  contain: 'contain',
  cover: 'cover',
  stretch: 'stretch',
  center: 'center',
};

export const priority = {
  low: 'low',
  normal: 'normal',
  high: 'high',
};

const FastImage = ({
  source,
  style,
  resizeMode: mode = 'cover',
  onLoadStart,
  onLoadEnd,
  onLoad,
  onError,
  ...rest
}) => {
  const imageSource =
    typeof source === 'string' ? {uri: source} : source && (source.uri || source.url) ? {uri: source.uri || source.url} : source;
  return (
    <Image
      source={imageSource}
      style={style}
      resizeMode={mode && typeof mode === 'string' ? mode : 'cover'}
      onLoadStart={onLoadStart}
      onLoadEnd={onLoadEnd}
      onLoad={onLoad}
      onError={onError}
      {...rest}
    />
  );
};

FastImage.resizeMode = resizeMode;
FastImage.priority = priority;

export default FastImage;

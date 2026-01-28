import {Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';

import {layout, spacing} from '../../theme/styles';
import {vh, vw} from '../../theme/units';
import {extractFileName, LOG} from '../../utils/helperFunction';
import {colors2} from '../../theme/colors2';
import ImagePicker2 from '../ImagePicker2';
import {appImages} from '../../assets';
import { colors } from '../../utils/Colors';

const Profile = ({handleImage, isEdit, initialImage, icon}) => {
  const [profileImage, setProfileImage] = useState(initialImage);
  console.log('profileImage', profileImage);

  const handleImageChange = (imagePath, mime, type) => {
    let img = extractFileName(imagePath);
    setProfileImage({uri: imagePath});
    const imageObj = {
      uri: imagePath,
      type: mime,
      name: img,
    };
    if (handleImage) handleImage(imageObj);
  };

  return (
    <ImagePicker2
      onImageChange={handleImageChange}
      uploadVideo={false}
      isMultiple={false}
      style={{position: 'relative'}}>
      <View style={styles?.wrapper}>
        <FastImage
          source={profileImage}
          style={styles?.images}
          resizeMode="cover"
          defaultSource={appImages?.placeholder}
        />
      </View>
      {isEdit && (
        <View style={styles?.cameraBtn}>
          <FastImage
            source={icon}
            style={styles.cameraIcon}
            resizeMode="cover"
          />
        </View>
      )}
    </ImagePicker2>
  );
};

export default Profile;

const styles = StyleSheet.create({
  wrapper: {
    height: vw * 22,
    width: vw * 22,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors?.secondary,
  },
  images: {
    height: '100%',
    width: '100%',
  },
  cameraBtn: {
    backgroundColor: colors2?.theme?.secondary,
    borderRadius: 100,
    // padding: spacing?.small,
    position: 'absolute',
    right: 2,
    bottom: 0,
    width: vh * 4.5,
    height: vh * 4.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    width: '100%',
    height: '100%',
  },
});

import React, {useState} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import {images} from '../../assets';
import ProfileImage from './ProfileImage';
import {appImages} from '../assets';
import {colors} from '../utils/Colors';
import {getImageUrl} from '../utils/helperFunction';
import {vh, vw} from '../theme/units';

const {width, height} = Dimensions.get('screen');

const CircularImagePicker = ({
  icon,
  isEditable,
  style,
  cameraStyle,
  imageProp,
  userImage,
  onImageSelect,
}) => {
  const windowWidth = useWindowDimensions().width;
  const isTablet = windowWidth > 600;
  const imageContainerWidth = isTablet ? 150 : 130;
  const imageContainerHeight = isTablet ? 150 : 130;
  const imageContainerTop = isTablet ? 145 : '';
  const imageContainerLeft = isTablet ? 30 : '';
  const iconWidth = isTablet ? 60 : width * 0.075;
  const iconHeight = isTablet ? 60 : width * 0.075;
  const iconPositionTop = isTablet ? 105 : -35;
  const iconPositionLeft = isTablet ? 110 : 68;

  const [image, setImage] = useState(null);

  const selectImage = () => {
    if (isEditable) {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.7,
        includeBase64: true,
        mediaType: 'photo',
        multiple: false,
        forceJpg: true,
        compressImageMaxWidth: 300,
        compressImageMaxHeight: 300,
        cropperChooseText: 'Select',
        cropperCancelText: 'Cancel',
        cropperToolbarTitle: 'Edit Image',
        compressImageMaxQuality: 0.8,
        loadingLabelText: 'Processing...',
        cropperToolbarColor: '#3498DB',
        cropperStatusBarColor: '#2C3E50',
        cropperToolbarWidgetColor: 'white',
        cropping: true,
      })
        .then(response => {
          setImage(response.path);
          onImageSelect(response.path);
        })
        .catch(error => {
          console.log('Image picker error:', error);
        });
    }
  };
  const selectImage1 = () => {
    if (isEditable) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.7,
        includeBase64: true,
        mediaType: 'photo',
        forceJpg: true,
        compressImageMaxWidth: 300,
        compressImageMaxHeight: 300,
        cropperChooseText: 'Select',
        cropperCancelText: 'Cancel',
        cropperToolbarTitle: 'Edit Image',
        compressImageMaxQuality: 0.8,
        loadingLabelText: 'Processing...',
        cropperToolbarColor: '#3498DB',
        cropperStatusBarColor: '#2C3E50',
        cropperToolbarWidgetColor: 'white',
        useFrontCamera: true, // Make sure to enable the front camera
      })
        .then(response => {
          setImage(response.path);
          onImageSelect(response.path);
        })
        .catch(error => {
          console.log('Image picker error:', error);
        });
    }
  };
  // const renderImage = () => {
  //     if (image) {
  //         return <Image source={{ uri: image }} style={styles.image} resizeMode='contain' />;
  //     } else {
  //         return (

  //             <ProfileImage
  //             size={'100%'}
  //             innerAsset
  //             imageUri={appImages.profile}
  //             name={'Alex'}
  //             style={{ borderWidth: 2, borderColor: colors.white }}
  //           />

  //         )
  //     }
  // };

  const renderImage = () => {
    if (image) {
      return (
        <Image
          source={{uri: image}}
          style={styles.image}
          resizeMode="contain"
        />
      );
    } else if (userImage) {
      return (
        <Image
          source={getImageUrl(userImage)}
          style={styles.image}
          resizeMode="contain"
        />
      );
    } else {
      return (
        <Image
          source={appImages.placeholder}
          style={styles.image}
          resizeMode="contain"
        />
      );
    }
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          {
            width: width * 0.25,
            height: width * 0.25,
            left: imageContainerLeft,
            top: imageContainerTop,
          },
          style,
        ]}>
        <TouchableOpacity
          onPress={() => selectImage()}
          style={[{width: 120, height: 120}]}>
          <View style={styles.imageContainer}>{renderImage()}</View>
        </TouchableOpacity>
      </View>
      <View>
        {isEditable && (
          <TouchableOpacity
            onPress={() => selectImage1()}
            style={[styles.cameraButton, cameraStyle]}>
            <Image source={icon} style={[styles.cameraIcon]} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 75,
    borderWidth: 5,
    borderColor: 'white',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  cameraButton: {
    position: 'absolute',
    width: vh * 2,
    height: vh * 2,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
    right: 20,
  },
});
export default CircularImagePicker;

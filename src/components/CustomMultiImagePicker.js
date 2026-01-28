import React, {useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomIcon from './CustomIcon';
import {appIcons, appImages} from '../assets';
import {family, HP, size, WP} from '../utils';
import CustomText from './CustomText';
import ImagePicker2 from './ImagePicker2';
import {colors} from '../utils/Colors';
import {extractFileName, LOG} from '../utils/helperFunction';

const CustomMultiImagePicker = ({
  handleImage,
  labelTitle,
  staric,
  title,
  errors,
  initialImages,
  onRemoveOldImage,
}) => {
  const [profileImages, setProfileImages] = useState(initialImages || []);
  const [removedOldImages, setRemovedOldImages] = useState([]);
  // Sync profileImages with initialImages when it changes
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      console.log('Initial Images in DocumentImagePicker:', initialImages);
      setProfileImages(initialImages);
    }
  }, [initialImages]);
  const handleImageChange = (imagePaths, mime, type) => {
    const imagesArray = Array.isArray(imagePaths) ? imagePaths : [imagePaths];
    const MAX_IMAGES = 10;
    if (profileImages.length + imagesArray.length > MAX_IMAGES) {
      Alert.alert(
        'Limit Reached',
        `You can only upload up to ${MAX_IMAGES} images.`,
      );
      return;
    }

    const newImages = imagesArray.map(path => {
      let img = extractFileName(path);
      return {
        uri: path,
        type: mime,
        name: img,
      };
    });
    const updatedImages = [...profileImages, ...newImages];

    setProfileImages(updatedImages);
    if (handleImage) handleImage(updatedImages);
  };
 const removeImage = index => {
  const imageToRemove = profileImages[index];

  const updatedImages = profileImages.filter((_, i) => i !== index);
  setProfileImages(updatedImages);
  if (handleImage) handleImage(updatedImages);

  // Check if it's from initialImages
  const isOld = initialImages?.some(img => img.uri === imageToRemove.uri);
  if (isOld) {
    const updatedRemoved = [...removedOldImages, imageToRemove];
    setRemovedOldImages(updatedRemoved);
    if (onRemoveOldImage) onRemoveOldImage(updatedRemoved); // Notify parent
  }
};


  return (
    <>
      <View style={styles?.labelWrap}>
        <CustomText
          text={labelTitle}
          font={family?.medium}
          size={size?.large}
        />
        {staric && <CustomText text="*" color={colors?.red} size={size?.h5} />}
      </View>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {profileImages.map((image, index) => {
            return (
              <View key={index} style={styles.imageWrapper}>
                <ImageBackground
                  source={{uri: image?.uri}}
                  style={styles.image}
                  defaultSource={appImages?.placeholder}
                  borderRadius={10}>
                  <TouchableOpacity
                    style={styles.removeIcon}
                    activeOpacity={0.9}
                    onPress={() => {
                      removeImage(index);
                    }}>
                    <CustomIcon
                      src={appIcons?.cut}
                      size={size?.h1}
                      disabled={true}
                      customIconWrapper={{
                        borderWidth: 2,
                        borderColor: colors?.white,
                        backgroundColor: colors?.white,
                        borderRadius: 50,
                      }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            );
          })}
          {profileImages.length <= 10 && (
            <ImagePicker2
              onImageChange={handleImageChange}
              uploadVideo={false}
              isMultiple={true}>
              <View style={styles.addImageWrapper}>
                <ImageBackground
                  style={styles.image}
                  source={appImages?.office1}
                  borderRadius={10}>
                  <View style={styles.overlay} />
                  <CustomIcon
                    src={appIcons?.addIcon}
                    size={size?.h5}
                    tintColor={colors?.white}
                  />
                  <CustomText
                    text={title ? title : 'ADD IMAGE'}
                    size={size?.small}
                    color={colors?.white}
                    font={family?.Gilroy_Medium}
                  />
                </ImageBackground>
              </View>
            </ImagePicker2>
          )}
        </View>
      </View>
      {errors && (
        <View style={{marginBottom: HP('2%'), alignSelf: 'flex-start'}}>
          <CustomText
            text={errors}
            size={size?.medium}
            color={colors?.red}
            font={family?.Gilroy_Medium}
          />
        </View>
      )}
    </>
  );
};

export default CustomMultiImagePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: WP('90%'),
    paddingVertical: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: WP('1%'),
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: HP('1%'),
    height: WP('17%'),
    width: WP('17%'),
    borderRadius: 10,
  },
  overlay: {
    height: WP('17%'),
    width: WP('17%'),
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'absolute',
  },
  removeIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  addImageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelWrap: {
    flexDirection: 'row',
    marginLeft: WP('4%'),
    justifyContent: 'flex-start',
    width: WP('90%'),
    marginTop: HP('1%'),
  },
});

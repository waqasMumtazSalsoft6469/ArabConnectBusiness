import React, {useRef} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import * as ImageCropPicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actions-sheet';
import {
  Image as ImageCompressor,
  Video as VideoCompressor,
} from 'react-native-compressor';
import {HP, size} from '../utils';
import {colors} from '../utils/Colors';
import CustomButton2 from './CustomButton2';

export default ImagePicker2 = ({
  children,
  onImageChange = () => {},
  uploadVideo = false,
  isMultiple = false,
  style,
}) => {
  const actionSheetRef = useRef(null);

  const imageChange = method => {
    if (method === 'camera') {
      ImageCropPicker.openCamera({
        mediaType: 'photo',
      }).then(async image => {
        actionSheetRef.current.hide();
        const result = await ImageCompressor.compress(image.path, {
          // maxHeight: 400,
          // maxWidth: 400,
          quality: 1,
        });
        console.log('resultresultresult',result)
        onImageChange(result, image.mime, 'photo'); // Wrap result in an array
      });
    } else if (method === 'gallery') {
      ImageCropPicker.openPicker({
        multiple: isMultiple,
        mediaType: 'photo',
      }).then(async images => {
        actionSheetRef.current.hide();
        let result;
        if (isMultiple) {
          const compressedImages = await Promise.all(
            images.map(img =>
              ImageCompressor.compress(img.path, {
                // maxHeight: 400,
                // maxWidth: 400,
                quality: 1,
              }),
            ),
          );
          onImageChange(compressedImages, images[0]?.mime, 'photo');
        } else {
          result = await ImageCompressor.compress(images.path, {
            // maxHeight: 400,
            // maxWidth: 400,
            quality: 1,
          });
          onImageChange(result, images.mime, 'photo'); // Wrap result in an array
        }
      });
    }
    // else if (method === 'video') {
    //   ImageCropPicker.openPicker({
    //     mediaType: 'video',
    //   }).then(async video => {
    //     actionSheetRef.current.hide();
    //     const result = await VideoCompressor.compress(video.path, {
    //       compressionMethod: 'auto',
    //     });
    //     onImageChange([result], video.mime, 'video'); // Wrap result in an array
    //   });
    // }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => actionSheetRef.current.show()}
      style={style}>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{backgroundColor: 'white'}}>
        <View style={{padding: 10}}>
          <View
            style={{
              borderRadius: 10,
              marginBottom: 10,
            }}>
            <View>
              <View
                style={{
                  backgroundColor: colors?.progressBg,
                  height: HP('1.1%'),
                  width: '25%',
                  borderRadius: 10,
                  alignSelf: 'center',
                  marginBottom: HP('5%'),
                }}
              />
            </View>

            <CustomButton2
              title={'Take Photo'}
              size={'small'}
              onPress={() => {
                imageChange('camera');
              }}
              buttonStyles={{paddingVertical: HP('1'), alignSelf: 'center'}}
            />

            <CustomButton2
              title={'Choose from Library'}
              size={'small'}
              onPress={() => {
                imageChange('gallery');
              }}
              gradientColorArr={[colors?.primary, colors?.primary]}
              buttonStyles={{paddingVertical: HP('1'), alignSelf: 'center'}}
            />
            {uploadVideo && (
              <CustomButton2
                title={'Upload A Video'}
                size={'small'}
                onPress={() => {
                  imageChange('video');
                }}
                gradientColorArr={['#000', '#000']}
                buttonStyles={{paddingVertical: HP('2')}}
              />
            )}
          </View>
        </View>
      </ActionSheet>
      {children}
    </TouchableOpacity>
  );
};

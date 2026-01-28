import {
  Platform,
  Dimensions,
  StyleSheet,
  View,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import AppBackground from '../../../components/AppBackground';
import Shadows from '../../../helpers/Shadows';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import {getImageUrl, LOG} from '../../../utils/helperFunction';
import FileViewer from 'react-native-file-viewer';
import {imageServer} from '../../../Api/configs';
import {showToast} from '../../../utils/toast';

const {height} = Dimensions.get('screen');

const JobResume = ({route}) => {
  const {resumeData} = route.params;
  LOG('RESUMEDATA: ', resumeData);
  const source = resumeData?.file;
  //   pdf: require('../../../assets/images/pdf1.pdf'),
  // console.log('PDF Source:', source);

  const downloadPdf = async () => {
    try {
      const fileUrl = imageServer + resumeData?.file;
      const fileName = resumeData?.name?.replace(/\s+/g, '_') || 'resume';
      const fileExt = '.pdf';

      const destPath =
        Platform.OS === 'ios'
          ? `${RNFS.DocumentDirectoryPath}/${fileName}${fileExt}`
          : `${RNFS.DownloadDirectoryPath}/${fileName}${fileExt}`;

      // Request permission for Android
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to download the file',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
          
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied',
            'Storage permission is required to download files.',
          );
          return;
        }
      }

      // Start download
      const download = RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: destPath,
      });

      const result = await download.promise;

      if (result.statusCode === 200) {
        // Alert.alert('Download Complete', 'Opening file...');
        showToast('Download Complete', 'Opening file...');
        setTimeout(() => {
          FileViewer.open(destPath)
            .then(() => {
              console.log('File opened successfully');
            })
            .catch(error => {
              console.log('Error opening file:', error.message);
              showToast('Error', 'Could not open the PDF file');
            });
        }, 3000); // 3-second delay
        // throw new Error(`Download failed with status ${result.statusCode}`);
      }
    } catch (error) {
      console.log('Download Error:', error.message);
    //   Alert.alert('Download Error', error.message);
    }
  };

  return (
    <AppBackground
      back={true}
      title={'RESUME'}
      download
      onDownloadPress={() => downloadPdf()}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginTop: 10,
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: height * 0.58,
            marginTop: height * 0.015,
          }}>
          <Pdf
            trustAllCerts={false}
            source={{uri: imageServer + source}}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              alignItems: 'center',
              ...Shadows?.shadow5,
              backgroundColor: 'white',
              borderRadius: 10,
            }}
          />
        </View>
      </View>
    </AppBackground>
  );
};

export default JobResume;

const styles = StyleSheet.create({});

import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppBackground from '../../../components/AppBackground';
import CustomText from '../../../components/CustomText';
import { family, size } from '../../../utils';
import { termsData } from '../../../utils/dummyData';
const { width, height } = Dimensions.get('screen');

const Help = () => {

  return (
    <AppBackground
    notification={true}
      title={'HELP CENTER'}
      back={true}
      marginHorizontal={false}
    >
      <View
        style={{ marginBottom: height * 0.02, marginHorizontal: width * 0.03, marginTop: height*0.03 }}>
        <FlatList
          data={termsData}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <CustomText
                style={{ textAlign: 'justify', flex: 0.07, marginTop: -1 }}
                text={item?.termNum}
                size={size?.h5}
                font={family?.Gilroy_SemiBold}
              />
              <CustomText
                style={{ textAlign: 'justify', flex: 0.92, lineHeight: height * 0.03   }}
                text={item?.termDetail}
                size={size?.xxlarge}
                font={family?.Questrial_Regular}
              />
            </View>
          )}
          keyExtractor={item => item?.id}
          showsVerticalScrollIndicator={false}

        />
      </View>
    </AppBackground>
  );
};

export default Help;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginVertical: 12,
    width: '100%',
    flex: 1,
    gap :10
  },
})

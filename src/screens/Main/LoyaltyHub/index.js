import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {vh} from '../../../utils';
import {colors} from '../../../utils/Colors';
import AppBackground from '../../../components/AppBackground';
import {HEIGHT} from '../../../theme/units';
import {useNavigation} from '@react-navigation/native';
import {hubItems} from '../../../utils/dummyData';
import LoyaltyCard from '../../../components/LoyaltyCard';

const LoyaltyHub = () => {
  const navigation = useNavigation();

  return (
    <AppBackground
      menu={true}
      title={'LOYALTY HUB'}
      description={'Reward your customers'}
      notification={true}
      titleColor={'white'}
      isDashboard={true}>
      <View style={styles.page}>
        <FlatList
          data={hubItems}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
          renderItem={({item}) => (
            <LoyaltyCard
              item={item}
              navigation={navigation}
              hubVariant
            />
          )}
        />
      </View>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingVertical: vh * 2,
    paddingHorizontal: vh * 1.2,
    backgroundColor: '#EEF2FF',
  },
  listContent: {
    paddingBottom: HEIGHT * 0.12,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default LoyaltyHub;

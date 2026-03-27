import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React, {useRef} from 'react';
import {vh} from '../../../utils';
import {colors} from '../../../utils/Colors';
import AppBackground from '../../../components/AppBackground';
import {HEIGHT, WIDTH} from '../../../theme/units';
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
      <View
        style={{
          paddingVertical: vh * 2,
          paddingHorizontal: vh * 1.5,
          flex: 1,
          backgroundColor: colors.grayBg,
        }}>
        <FlatList
          data={hubItems}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: HEIGHT * 0.1}}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          renderItem={({item, index}) => (
            <LoyaltyCard item={item} navigation={navigation} />
          )}
        />
      </View>
    </AppBackground>
  );
};

export default LoyaltyHub;


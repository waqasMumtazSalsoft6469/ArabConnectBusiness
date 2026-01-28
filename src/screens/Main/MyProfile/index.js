import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AppBackground from '../../../components/AppBackground';
import {HEIGHT, WIDTH} from '../../../theme/units';
import {useSelector} from 'react-redux';
import CustomFastImage from '../../../components/CustomFastImage';
import {getImageUrl, LOG} from '../../../utils/helperFunction';
import {colors2} from '../../../theme/colors2';
import {family, size, vh, vw} from '../../../utils';
import {spacing} from '../../../theme/styles';
import {colors} from '../../../utils/Colors';
import Shadows from '../../../helpers/Shadows';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import FastImage from 'react-native-fast-image';
import NavService from '../../../helpers/NavService';

const MyProfile = () => {
  let userDetails = useSelector(state => state?.auth?.user || {});
  LOG('userDetails: ', userDetails);

  let userImage = getImageUrl(userDetails?.image);
  const renderProfile = () => (
    <View style={{alignItems: 'center', paddingVertical: spacing.smallh}}>
      <View
        style={{
          borderRadius: 50,
          borderWidth: 1,
          borderColor: colors2.theme.greyAlt2,
        }}>
        <CustomFastImage
          resizeMode={'cover'}
          uri={userImage}
          style={styles?.profileStyles}
        />
      </View>
    </View>
  );

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <CustomText
        text={item.label}
        color={colors2.text.light}
        font={family?.Questrial_Regular}
        size={size?.large}
      />
      <CustomText
        text={item?.labelValue}
        color={colors2.text.dimBlack}
        font={family?.Questrial_Regular}
        size={size?.medium}
      />
    </View>
  );

  const renderProfileData = [
    {
      label: 'Name',
      labelValue: userDetails?.fullName,
    },
    {label: 'Gender', labelValue: userDetails?.gender},
    {label: 'Email Address', labelValue: userDetails?.email},
  ];
  return (
    <AppBackground back={true} title={'My Profile'} notification>
      <View style={{paddingHorizontal: 15, marginTop: HEIGHT * 0.03}}>
        {renderProfile && renderProfile()}
        <View style={styles.contentContainer}>
          <View style={styles.contentContainerStyle}>
            <FlatList
              scrollEnabled={true}
              data={renderProfileData}
              renderItem={renderItem}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              contentContainerStyle={{paddingHorizontal: 5}}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View style={{height: spacing?.large}} />
              )}
            />
          </View>
          <View style={{alignSelf: 'center', gap: vh * 1}}>
            <CustomButton
              gradientColorArr={[colors.primary, colors.primary]}
              title={'EDIT PROFILE'}
              customWidth={WIDTH - 55}
              buttonStyle={{alignSelf: 'center', borderRadius: 50}}
              textStyle={{fontSize: size.large}}
              onPress={() => {
                NavService?.navigate('editProfile');
              }}
            />
            <CustomButton
              gradientColorArr={[colors.secondary, colors.secondary]}
              title={'CHANGE PASSWORD'}
              customWidth={WIDTH - 55}
              buttonStyle={{alignSelf: 'center', borderRadius: 50}}
              textStyle={{fontSize: size.large}}
              onPress={() => {
                NavService?.navigate('changePassword');
              }}
            />
          </View>
        </View>
      </View>
    </AppBackground>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: spacing.large,
    alignItems: 'center',
    paddingHorizontal: WIDTH * 0.07,
    gap: vh * 4,
  },
  contentContainerStyle: {
    paddingHorizontal: spacing.large,
    height: vh * 20,
    paddingVertical: spacing.large,
    borderWidth: 1.5,
    width: vw * 90,
    alignSelf: 'center',
    // borderColor: colors.text.grey,
    borderColor: '#EEEEEE',
    borderRadius: 10,
    backgroundColor: colors?.theme?.white,
  },
  itemContainer: {
    width: (WIDTH - 90) / 1.8, // Adjust based on contentContainer padding
    marginHorizontal: 5,
  },
  profileStyles: {
    height: 90,
    width: 90,
    borderRadius: 100,
  },
});

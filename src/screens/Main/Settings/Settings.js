import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, Switch, Alert } from 'react-native';
import AppBackground from '../../../components/AppBackground';
import { appIcons } from '../../../assets';
import styles from './styles';

const { height } = Dimensions.get('screen');

const menuItems = [
  {
    icon: appIcons?.notification2,
    title: 'NOTIFICATIONS',
    border: '#0FAAFA',
    isToggle: true
  },
  {
    icon: appIcons?.delete,
    title: 'DELETE ACCOUNT',
    border: '#0FAAFA'
  },
];

const Settings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handlePress = (title) => {
    if (title === 'DELETE ACCOUNT') {
      Alert.alert(
        'Are you sure?',
        'Do you really want to delete your account?',
        [
          {
            text: 'No',
            onPress: () => console.log('No Pressed'),
            style: 'cancel'
          },
          {
            text: 'Yes',
            onPress: () => console.log('Yes Pressed'),
          }
        ],
        { cancelable: false }
      );
    }
  };

  const renderItem = ({ item }) => {
    const { title, icon, isToggle } = item;

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => handlePress(title)}
        style={styles.menuItem}>
        <View style={styles.menuItemContent}>
          <View style={[styles.iconContainer, { borderColor: item?.border }]}>
            <Image source={icon} style={styles.icon} />
          </View>
          <Text style={styles.menuItemText}>{title}</Text>
        </View>
        {isToggle ? (
          <View style={[styles.toggle, { borderColor: isEnabled ? '#09DE38' : '#cbcacc' }]}>
            <Switch
              trackColor={{ false: 'transparent', true: 'transparent' }}
              thumbColor={isEnabled ? '#09DE38' : '#cbcacc'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ backgroundColor: 'transparent' }}
            />
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <AppBackground
      back={true}
      title={'SETTINGS'}
      notification
    >
      <View style={{ flex: 1, marginTop: height * 0.05 }}>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={menuItems}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      </View>
    </AppBackground>
  );
};

export default Settings;

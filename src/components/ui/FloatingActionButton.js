import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import {colors} from '../../utils/Colors';

const FloatingActionButton = ({onPress, icon, style}) => {
  return (
    <View style={[styles.holder, style]} pointerEvents="box-none">
      <TouchableOpacity
        style={styles.fab}
        onPress={onPress}
        activeOpacity={0.88}
        accessibilityRole="button"
        accessibilityLabel="Add">
        <Image
          source={icon}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  holder: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    zIndex: 50,
  },
  fab: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.secondary,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 12,
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: colors.white,
  },
});

export default FloatingActionButton;

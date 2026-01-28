import {Storage} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const reduxStorage: Storage = {
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return Promise.resolve(true);
    } catch (error) {
      console.error('Error saving to AsyncStorage:', error);
      return Promise.reject(error);
    }
  },
  getItem: async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      return Promise.resolve(value);
    } catch (error) {
      console.error('Error reading from AsyncStorage:', error);
      return Promise.resolve(null);
    }
  },
  removeItem: async key => {
    try {
      await AsyncStorage.removeItem(key);
      return Promise.resolve();
    } catch (error) {
      console.error('Error removing from AsyncStorage:', error);
      return Promise.reject(error);
    }
  },
};

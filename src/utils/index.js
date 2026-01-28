import {Dimensions} from 'react-native';

export const vw = Dimensions.get('window').width * 0.01;
export const vh = Dimensions.get('window').height * 0.01;

export {size, family} from './sizes';
export {WP, HP} from './styling/responsive';
// export {colors} from './colors'
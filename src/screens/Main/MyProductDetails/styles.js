import {Dimensions, StyleSheet} from 'react-native';
import Shadows from '../../../helpers/Shadows';
import {colors} from '../../../utils/Colors';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  titleSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 4,
  },
  item: {
    marginVertical: 6,
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    gap: 5,
  },
  eventItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  hr: {
    borderTopWidth: 1,
    borderColor: colors?.lightGrayLine,
    marginTop: 15,
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
  },
  workItems: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  variationContainer: {
    backgroundColor: 'white',
    ...Shadows?.shadow5,
    borderRadius: 10,
    padding: height * 0.02,
    width: '100%',
    height: height * 0.21,
    marginBottom: height * 0.01,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  imageContainer: {
    width: width / 3 - 23,
    height: width / 3 - 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 5,
  },

  galleryList: {
    marginTop: height * 0.015,
  },
});

export default styles;

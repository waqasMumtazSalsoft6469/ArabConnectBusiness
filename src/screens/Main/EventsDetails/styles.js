import {Dimensions, StyleSheet} from 'react-native';
import Shadows from '../../../helpers/Shadows';
import {colors} from '../../../utils/Colors';
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
});

export default styles;

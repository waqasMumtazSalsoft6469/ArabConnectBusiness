import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../utils/Colors';
import {family, size, vh, vw} from '../../../utils';

const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  label: {
    fontSize: size?.xxlarge,
    color: colors?.darkPrimary,
    marginBottom: 5,
    fontFamily: family?.Gilroy_SemiBold,
  },
  field: {
    padding: 10,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#EDEDED',
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 50,
    backgroundColor: colors?.placeholderColor,
    fontSize: size.medium,
    fontFamily: family?.Gilroy_SemiBold,
  },
  focusedInput: {
    borderColor: colors?.iconColor,
  },
  datePicker: {
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: 8,
    fontSize: size?.normal,
    fontFamily: family?.Gilroy_SemiBold,
    left: 15,
  },

  inputField: {
    flexDirection: 'row',
    gap: 1,
  },

  line: {
    backgroundColor: '#DBDBDB',
    height: 1,
    width: '25%',
  },

  inputTouchable: {
    borderRadius: vw * 2,
    backgroundColor: colors.PlaceHolderBG,
    height: vh * 17,
    width: '90%',
    color: 'black',
    fontFamily: family.Gilroy_Medium,
    borderWidth: vh * 0.3,
    borderColor: '#D2D2D2',
    borderStyle: 'dashed',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.02,
    gap: 5,
  },

  hr: {
    borderTopWidth: 1,
    borderColor: colors?.lightGrayLine,
    marginTop: 15,
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default styles;

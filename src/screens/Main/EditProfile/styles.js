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
  input2: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EDEDED',
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
  forgotPass: {
    color: colors?.iconColor,
    fontSize: size?.medium,
    fontFamily: family?.Gilroy_Medium,
    textDecorationLine: 'underline',
  },

  forgotPassContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 20,
    width: width * 0.4,
    paddingVertical: 2,
  },

  inputField: {
    flexDirection: 'row',
    gap: 1,
  },
  syncContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: width * 0.01,
    width: '50%',
    alignSelf: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors?.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 50,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  saperatorContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 25,
  },
  line: {
    backgroundColor: '#DBDBDB',
    height: 1,
    width: '25%',
  },
  agreementContainerWrap: {
    paddingBottom: height * 0.03,
    width: '100%',
    paddingHorizontal: 20,
  },
  agreementContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  inputTouchable: {
    borderRadius: vw * 2,
    backgroundColor: colors.PlaceHolderBG,
    height: vh * 17,
    width: '95%',
    color: 'black',
    fontFamily: family.Gilroy_Medium,
    borderWidth: vh * 0.3,
    borderColor: '#D2D2D2',
    borderStyle: 'dashed',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: height * 0.02,
    gap: 5,
  },
  upload: {
    width: vw * 60,
    height: vh * 60,
  },
  hr: {
    borderTopWidth: 1,
    borderColor: colors?.lightGrayLine,
    marginTop: 15,
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
  },
  removeButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 4,
    marginTop: vh * 1
  },
  removeButtonText: {
    color: 'white',
  },
  addButton: {
    backgroundColor: '#2196f3',
    padding: 12,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;

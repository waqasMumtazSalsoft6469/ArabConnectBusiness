import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../utils/Colors';
import {family, size} from '../../../utils';

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
    paddingHorizontal: 15,
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
  hr: {
    borderTopWidth: 1,
    borderColor: colors?.lightGrayLine,
    marginTop: 15,
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
  },

  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'yellow'
   
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 20,
    backgroundColor: '#F6F6F6',
  },
  selectedButton: {
    borderColor: colors?.secondary,
    backgroundColor:  colors?.secondary,
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
  selectedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;

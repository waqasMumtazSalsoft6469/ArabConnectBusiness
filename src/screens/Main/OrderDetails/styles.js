import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../../utils/Colors';
import Shadows from '../../../helpers/Shadows';

const { width, height } = Dimensions.get('screen');
const circleSize = Math.min(width * 0.09, height * 0.09);
const styles = StyleSheet.create({
    cardContainer: {
        ...Shadows?.shadow5,
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: height * 0.02,
        width: '98%',
        alignSelf: 'center',
        position: 'relative', 
     

    },
    packageContainer: {
        overflow: 'hidden',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    touchableButton: {
        alignItems: 'center',
        width: height * 0.028,
        alignSelf: 'center',
        height: height * 0.028,
        justifyContent: 'center',
        top: 10,
        zIndex: 999,
        backgroundColor: 'white',
        borderRadius: 50,
        marginTop: -8,
        ...Shadows?.shadow5
    },
    imageContainer: {
        width: width * 0.135,
        height: height * 0.065,
        borderRadius: 100,
        overflow: 'hidden'
    },
    hr: {
        borderTopWidth: 1,
        borderColor: colors?.lightGrayLine,
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
    },
    statusFlag: {
        alignSelf: 'flex-start',
        width: '20%',
        height: height * 0.03,
        backgroundColor: colors?.iconColor,
        position: 'absolute',
        left: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    iconContainer: {
        borderRadius: circleSize / 2,
        backgroundColor: '#F55342',
        borderWidth: 2,
        borderColor: '#FDDDD9',
        width: circleSize,
        height: circleSize,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;
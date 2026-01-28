import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../../utils/Colors';
import { family, HP, size, vh, vw, WP } from '../../../utils';

const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({

    boxContainer: {
        width: '100%',
        backgroundColor: colors?.secondary,
        height: HP(28),
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 999,
        top: HP('5.5%'),
        borderRadius: 30,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: HP(4)
    },
    dateContainer: {
        padding: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '58%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 50,
        gap: 3,
        marginBottom: 5
    },
    imageContainer: {
        borderRadius: 100,
        width: WP(30),
        height: WP(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
    horizontalBoxContainer1:
    {
        width: '100%',
        height: height * 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        // position: 'absolute',
        // bottom: -40,
        // right: WP(1),
        // left: WP(5)
    },
    peachBox: {
        // height: '100%',
        width: '48%',
        borderRadius: 15,
        backgroundColor: '#FED0AB',
        padding: vh*3,
        paddingVertical: vh*2,
        gap: vh*1
    },
});

export default styles;

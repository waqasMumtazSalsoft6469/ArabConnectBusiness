import { StyleSheet } from "react-native";
import { family, size } from "../../../utils";
import { colors } from "../../../utils/Colors";

const styles = StyleSheet.create({
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 18,
      justifyContent: 'space-between',
      paddingBottom: 10,
    },
    menuItemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    iconContainer: {
      padding: 15,
      borderRadius: 50,
      borderWidth: 1.5,
    },
    icon: {
      width: 25,
      height: 25,
      resizeMode: 'contain',
    },
    menuItemText: {
      marginLeft: 10,
      color: colors?.drawerItem,
      fontSize: size?.large,
      fontFamily: family?.Gilroy_Regular,
    },
    toggle: {
      borderWidth: 1.5,
      borderRadius: 20,
      padding: 2
    }
  });
  export default styles;
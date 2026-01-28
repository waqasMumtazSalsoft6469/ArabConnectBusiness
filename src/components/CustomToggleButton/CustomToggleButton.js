import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/Colors';
import Shadows from '../../helpers/Shadows';
import { family, size,  } from '../../utils';

const { height } = Dimensions.get('screen');

const CustomToggleButton = ({ tabs, onTabChange }) => {
    const [activeTab, setActiveTab] = useState(tabs[0]); // Set initial active tab to the first tab

    const handleTabPress = (tab) => {
        setActiveTab(tab);
        onTabChange(tab);
    };

    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab}
                    style={[
                        styles.button,
                        activeTab === tab ? styles.activeButton : styles.inactiveButton,
                    ]}
                    onPress={() => handleTabPress(tab)}
                >
                    <Text style={activeTab === tab ? styles.activeText : styles.inactiveText}>
                        {tab.toUpperCase()}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: colors?.white,
        padding: 5,
        width: '98%',
        height: height * 0.07,
        ...Shadows?.shadow5,
        marginTop: 5
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderRadius: 20,
    },
    activeButton: {
        backgroundColor: colors?.secondary,
    },
    inactiveButton: {
        backgroundColor: 'transparent',
    },
    activeText: {
        color: '#fff',
        fontFamily: family?.Gilroy_SemiBold,
        fontSize: size?.large
    },
    inactiveText: {
        color: colors?.headingText,
        fontFamily: family?.Gilroy_SemiBold,
        fontSize: size?.large
    },
});

export default CustomToggleButton;
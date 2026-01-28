// HorizontalFlatList.js

import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import { colors } from '../utils/Colors';
import { appIcons } from '../assets';
import CustomText from './CustomText';
import { size } from '../utils';

const { height } = Dimensions.get('screen');

const HorizontalFlatList = ({ data, onItemPress }) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleItemPress = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
        onItemPress(id);
    };

    return (
        <FlatList
            style={{ marginTop: height * 0.01, marginBottom: height*0.01 }}
            horizontal
            data={data}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => handleItemPress(item.id)}
                    activeOpacity={0.8}
                    style={{
                        paddingHorizontal: 17,
                        backgroundColor: selectedItems.includes(item.id) ? colors.iconColor : colors.placeholderText,
                        borderRadius: 50,
                        marginRight: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: height * 0.04,
                    }}>
                    <CustomText
                        color={colors?.white}
                        text={item.name}
                        size={size?.medium}
                    />

                    {selectedItems.includes(item.id) && (
                        <View
                            style={{
                                position: 'absolute',
                                padding: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 50,
                                backgroundColor: colors?.white,
                                right: 5,
                                top: -8,
                                borderWidth: 2,
                                borderColor: colors?.iconColor
                            }}>

                            <Image
                                source={appIcons?.cross} // replace with your cross icon path
                                style={{ width: 8, height: 8 }}
                            />
                        </View>
                    )}
                </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingVertical: 10 }}
        />
    );
};

export default HorizontalFlatList;

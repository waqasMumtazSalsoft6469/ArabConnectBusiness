import React from 'react';
import {
    Dimensions,
    FlatList,
    View,
} from 'react-native';
import NavService from '../../../helpers/NavService';
import AppBackground from '../../../components/AppBackground';
import { officeData, restaurants } from '../../../utils/dummyData';
import CustomCard from '../../../components/CustomCard';

const { width, height } = Dimensions.get('screen');

const Favorites = () => {
    return (
        <AppBackground
            back={true}
            title={'FAVORITES'}
            notification
            
        >
            <View style={{ paddingHorizontal: 20, paddingVertical: 15, marginTop: 10,}}>
                <FlatList
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingVertical: 20,
                    }}
                    showsVerticalScrollIndicator={false}
                    data={officeData}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                    renderItem={({ item, index }) => (
                        <CustomCard
                            product={true}
                            heart={true}
                            myCoupon={true}
                            item={item}
                            index={index}
                            onPress={() => {
                                
                            }}
                        />
                    )}
                    numColumns={2}
                />
            </View>
        </AppBackground>
    );
};

export default Favorites;

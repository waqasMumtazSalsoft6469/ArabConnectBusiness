import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import AppBackground from '../../../components/AppBackground'
import CustomCard from '../../../components/CustomCard'
import CustomText from '../../../components/CustomText'
import { family, size } from '../../../utils'
import { colors } from '../../../utils/Colors'

const { width, height } = Dimensions.get('screen')

const data = [
  { id: '1', type: 'positive', amount: '+$81.00', date: '02 Jun, 2024 @ 11:00 am', transaction: 'TXN963258741', title: 'ADD BALANCE' },
  { id: '2', type: 'negative', amount: '-$22.00', date: '02 Jun, 2024 @ 11:00 am', transaction: 'TXN963258744', title: 'FOOD BUDDY' },
  { id: '3', type: 'negative', amount: '-$102.00', date: '02 Jun, 2024 @ 11:00 am', transaction: 'TXN963258745', title: 'CAR SERVICE' },
  { id: '4', type: 'positive', amount: '+$11.00', date: '02 Jun, 2024 @ 11:00 am', transaction: 'TXN963258743', title: 'ADD BALANCE' },
  { id: '5', type: 'positive', amount: '+$64.00', date: '02 Jun, 2024 @ 11:00 am', transaction: 'TXN963258742', title: 'ADD BALANCE' },
];

const renderItem = ({ item }) => (
  <View style={[styles.container, item.type === 'positive' ? styles.positiveContainer : styles.negativeContainer]}>
    <View>
      <CustomText
        text={item?.title}
        font={family?.Gilroy_SemiBold}
        size={size?.h3}
        color={colors?.headingText}
        numberOfLines={1}
      />
      <CustomText
        text={`Transaction #: ${item.transaction}`}
        font={family?.Questrial_Regular}
        size={size?.medium}
        color={colors?.headingText}
        numberOfLines={1}
      />
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <CustomText
        text={item.amount}
        font={family?.Gilroy_Bold}
        size={size?.h3}
        color={item.type === 'positive' ? '#178915' : colors?.red}
        numberOfLines={1}
      />
      <CustomText
        text={item.date}
        font={family?.Questrial_Regular}
        size={size?.small}
        color={colors?.headingText}
        numberOfLines={1}
      />
    </View>
  </View>
);

const Wallet = () => {
  return (
    <AppBackground
      back={true}
      title={'WALLET'}
      notification
      marginHorizontal={false}
    >
      <View style={{ flex: 1, marginTop: height * 0.03 }}>
        <CustomCard
          walletCard={true}
        />
        <View style={{ paddingHorizontal: 10, marginTop: height * 0.03, flex: 1, gap: 5 }}>
          <CustomText
            text={"TRANSACTION HISTORY"}
            font={family?.Gilroy_SemiBold}
            size={size?.h6}
            color={colors?.headingText}
            numberOfLines={1}
          />
          <FlatList
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: height * 0.03 }}
          />
        </View>
      </View>
    </AppBackground>
  )
}

export default Wallet

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: height * 0.02,
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.03,
    borderRadius: 15,
  },
  positiveContainer: {
    backgroundColor: '#EBF9EB',
  },
  negativeContainer: {
    backgroundColor: '#FEEAEA',
  },
});

import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {appIcons} from '../../assets';
import {colors} from '../../utils/Colors';
import CustomIcon from '../CustomIcon';
import CustomText from '../CustomText';
import {family, size, vh} from '../../utils';

const formatDate = date =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const DateRangeCard = ({onChange}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // STEP 1: Start Date selected
  const onStartConfirm = date => {
    setStartDate(date);
    setShowStartPicker(false);

    // Auto open end date picker
    setTimeout(() => setShowEndPicker(true), 300);
  };

  // STEP 2: End Date selected
  const onEndConfirm = date => {
    if (date < startDate) {
      Alert.alert('Invalid Date', 'End date cannot be before start date');
      return;
    }

    setEndDate(date);
    setShowEndPicker(false);
    onChange?.({startDate, endDate: date});
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.row}>
        <View style={styles.row}>
          <CustomIcon
            src={appIcons.calendar}
            size={18}
            tintColor={colors.primary}
          />
          <CustomText
            text="Date Range"
            font={family.Gilroy_Medium}
            size={size.large}
            style={{marginLeft: 8}}
          />
        </View>

        <TouchableOpacity onPress={() => setShowStartPicker(true)}>
          <CustomText
            text="Change"
            font={family.Gilroy_Medium}
            size={size.medium}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* RANGE TEXT */}
      <CustomText
        text={`${formatDate(startDate)} - ${formatDate(endDate)}`}
        font={family.Gilroy_Regular}
        size={size.medium}
        color={colors.secondary}
        style={{marginTop: vh}}
      />

      {/* START DATE PICKER */}
      <DateTimePickerModal
        isVisible={showStartPicker}
        mode="date"
        onConfirm={onStartConfirm}
        onCancel={() => setShowStartPicker(false)}
      />

      {/* END DATE PICKER */}
      <DateTimePickerModal
        isVisible={showEndPicker}
        mode="date"
        minimumDate={startDate}
        onConfirm={onEndConfirm}
        onCancel={() => setShowEndPicker(false)}
      />
    </View>
  );
};

export default DateRangeCard;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: vh * 2,
    padding: vh * 2,
    borderRadius: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

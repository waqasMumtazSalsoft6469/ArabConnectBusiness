// import {
//   Dimensions,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import CustomText from '../CustomText';
// import {family, size, vh} from '../../utils';
// import {colors} from '../../utils/Colors';
// import {appIcons} from '../../assets';
// import DateTimePicker from '@react-native-community/datetimepicker';
// const {width, height} = Dimensions.get('screen');
// const CustomDatePicker = ({
//   dateStyle,
//   labelStyle,
//   title,
//   staric,
//   leftIcon,
//   Iconcolor,
//   onDateChange,
//   date
// }) => {
//   const getFormattedDate = d => {
//     if (d && !isNaN(d) && d instanceof Date) {
//       return d.toISOString().split('T')[0];
//     }
//     return '';
//   };

//   const [dob, setDob] = useState(getFormattedDate(date));
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   // Sync internal state with prop when date changes from parent
//   useEffect(() => {
//     setDob(getFormattedDate(date));
//   }, [date]);

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       const formattedDate = selectedDate.toISOString().split('T')[0];
//       setDob(formattedDate);
//       if (onDateChange) {
//         onDateChange(selectedDate); // Pass full Date object to parent
//       }
//     }
//   };
//   return (
//     <View style={{width: '100%'}}>
//       {title && (
//         <View
//           style={{
//             flexDirection: 'row',
//             marginLeft: 20,
//             marginBottom: 5,
//             alignItems: 'center',
//           }}>
//           <CustomText
//             text={title}
//             font={family?.Gilroy_Medium}
//             size={size?.large}
//           />
//           {staric && (
//             <CustomText text="*" color={colors?.red} size={size?.h6} />
//           )}
//         </View>
//       )}
//       <TouchableOpacity
//         style={[styles.dateContainer, dateStyle]}
//         onPress={() => setShowDatePicker(true)}>
//         {leftIcon ? (
//           <Image
//             source={leftIcon}
//             style={{
//               width: 20,
//               height: 20,
//               resizeMode: 'contain',
//               tintColor: Iconcolor,
//               marginHorizontal: 5,
//             }}
//           />
//         ) : null}
//         <CustomText
//           text={dob ? dob : 'Enter Date'}
//           font={family?.Questrial_Regular}
//           size={size.medium}
//           color={dob ? colors?.text : colors?.placeholderText}
//         />
//         {/* <DateTimePickerComponent/> */}
//         {/* <Image
//           source={appIcons?.calendar}
//           style={{
//             height: 20,
//             width: 20,
//             resizeMode: 'contain',
//             tintColor: '#798A99',
//           }}
//         /> */}
//       </TouchableOpacity>
//       {showDatePicker && (
//         <DateTimePicker
//           value={dob ? new Date(dob) : new Date()}
//           mode="date"
//           display="default"
//           minimumDate={new Date()}
//           onChange={handleDateChange}
//         />
//       )}
//     </View>
//   );
// };

// export default CustomDatePicker;

// const styles = StyleSheet.create({
//   dateContainer: {
//     flexDirection: 'row',
//     width: '100%',
//     borderRadius: 25,
//     paddingHorizontal: 15,
//     alignSelf: 'center',
//     height: height * 0.063,
//     alignItems: 'center',
//     backgroundColor: colors?.placeholderColor,
//     gap: 3,
//   },
//   doblabel: {
//     alignSelf: 'flex-start',
//     marginLeft: 40,
//     gap: 5,
//     backgroundColor: colors?.white,
//     marginBottom: -5,
//     zIndex: 999,
//     paddingHorizontal: 5,
//   },
// });


import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  NativeModules,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import CustomText from '../CustomText';
import {family, size} from '../../utils';
import {colors} from '../../utils/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';

const {height} = Dimensions.get('screen');

const hasNativeDatePicker = () => {
  try {
    if (Platform.OS === 'ios') return true;
    return NativeModules.RNCDatePicker != null;
  } catch {
    return false;
  }
};

const NATIVE_PICKER_AVAILABLE = hasNativeDatePicker();

const getFormattedDate = d => {
  if (!d || !(d instanceof Date) || isNaN(d)) return '';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDateLabel = d => {
  if (!d || !(d instanceof Date)) return '';
  const months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

const CustomDatePicker = ({
  dateStyle,
  labelStyle,
  title,
  staric,
  leftIcon,
  Iconcolor,
  onDateChange,
  date,
  captureTime = false,
}) => {
  const [dob, setDob] = useState(date ? new Date(date) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFallbackModal, setShowFallbackModal] = useState(false);

  useEffect(() => {
    if (date) setDob(new Date(date));
  }, [date]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      let dateToUse = new Date(selectedDate);
      if (captureTime) {
        const now = new Date();
        dateToUse.setHours(now.getHours());
        dateToUse.setMinutes(now.getMinutes());
        dateToUse.setSeconds(0);
        dateToUse.setMilliseconds(0);
      }
      setDob(dateToUse);
      onDateChange && onDateChange(dateToUse);
    }
  };

  const fallbackDates = useMemo(() => {
    const list = [];
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    for (let i = 0; i < 365; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      list.push({date: d, key: getFormattedDate(d)});
    }
    return list;
  }, []);

  const onSelectFallbackDate = d => {
    setDob(d);
    onDateChange && onDateChange(d);
    setShowFallbackModal(false);
  };

  const openPicker = () => {
    if (NATIVE_PICKER_AVAILABLE) {
      setShowDatePicker(true);
    } else {
      setShowFallbackModal(true);
    }
  };

  return (
    <View style={{width: '100%'}}>
      {title && (
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            marginBottom: 5,
            alignItems: 'center',
          }}>
          <CustomText
            text={title}
            font={family?.Gilroy_Medium}
            size={size?.large}
          />
          {staric && (
            <CustomText text="*" color={colors?.red} size={size?.h6} />
          )}
        </View>
      )}
      <TouchableOpacity
        style={[styles.dateContainer, dateStyle]}
        onPress={openPicker}>
        {leftIcon ? (
          <Image
            source={leftIcon}
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
              tintColor: Iconcolor,
              marginHorizontal: 5,
            }}
          />
        ) : null}
        <CustomText
          text={dob ? getFormattedDate(dob) : 'Enter Date'}
          font={family?.Questrial_Regular}
          size={size.medium}
          color={dob ? colors?.text : colors?.placeholderText}
        />
      </TouchableOpacity>

      {NATIVE_PICKER_AVAILABLE && showDatePicker && (
        <DateTimePicker
          value={dob ? new Date(dob) : new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={handleDateChange}
        />
      )}

      {!NATIVE_PICKER_AVAILABLE && (
        <Modal
          visible={showFallbackModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowFallbackModal(false)}>
          <TouchableOpacity
            style={styles.fallbackOverlay}
            activeOpacity={1}
            onPress={() => setShowFallbackModal(false)}>
            <View style={styles.fallbackModal}>
              <CustomText text="Select date" style={styles.fallbackTitle} />
              <FlatList
                data={fallbackDates}
                keyExtractor={item => item.key}
                style={styles.fallbackList}
                initialNumToRender={30}
                getItemLayout={(_, index) => ({
                  length: 48,
                  offset: 48 * index,
                  index,
                })}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.fallbackItem}
                    onPress={() => onSelectFallbackDate(item.date)}
                    activeOpacity={0.7}>
                    <CustomText
                      text={formatDateLabel(item.date)}
                      style={styles.fallbackItemText}
                    />
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.fallbackCancel}
                onPress={() => setShowFallbackModal(false)}>
                <CustomText text="Cancel" style={styles.fallbackCancelText} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 25,
    paddingHorizontal: 15,
    alignSelf: 'center',
    height: height * 0.063,
    alignItems: 'center',
    backgroundColor: colors?.placeholderColor,
    gap: 3,
  },
  doblabel: {
    alignSelf: 'flex-start',
    marginLeft: 40,
    gap: 5,
    backgroundColor: colors?.white,
    marginBottom: -5,
    zIndex: 999,
    paddingHorizontal: 5,
  },
  fallbackOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  fallbackModal: {
    backgroundColor: colors?.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: height * 0.6,
    paddingBottom: 24,
  },
  fallbackTitle: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: size?.large,
    color: colors?.text,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors?.borderLight || '#eee',
  },
  fallbackList: {
    maxHeight: height * 0.4,
  },
  fallbackItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors?.borderLight || '#eee',
  },
  fallbackItemText: {
    fontFamily: family?.Questrial_Regular,
    fontSize: size?.medium,
    color: colors?.text,
  },
  fallbackCancel: {
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  fallbackCancelText: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: size?.medium,
    color: colors?.secondary,
  },
});
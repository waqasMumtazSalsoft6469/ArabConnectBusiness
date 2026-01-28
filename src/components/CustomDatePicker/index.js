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
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../CustomText';
import {family, size, vh} from '../../utils';
import {colors} from '../../utils/Colors';
import {appIcons} from '../../assets';
import DateTimePicker from '@react-native-community/datetimepicker';

const {width, height} = Dimensions.get('screen');

const CustomDatePicker = ({
  dateStyle,
  labelStyle,
  title,
  staric,
  leftIcon,
  Iconcolor,
  onDateChange,
  date,
  captureTime = false,  // NEW: Optional prop, default false to preserve old behavior
}) => {
  // UPDATED: getFormattedDate now handles full ISO by extracting local date
  const getFormattedDate = d => {
    if (d && !isNaN(d) && d instanceof Date) {
      // If captureTime and d has time (full datetime), still extract local date
      const localDate = new Date(d);  // new Date(ISO) creates UTC Date, but getFullYear/etc are local
      const year = localDate.getFullYear();
      const month = String(localDate.getMonth() + 1).padStart(2, '0');
      const day = String(localDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  };

  const [dob, setDob] = useState(getFormattedDate(date));
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Sync internal state with prop when date changes from parent
  useEffect(() => {
    setDob(getFormattedDate(date));
  }, [date]);

  // UPDATED: handleDateChange now conditionally captures current time if captureTime=true
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      let dateToUse = selectedDate;  // Base: local midnight from picker

      if (captureTime) {
        // NEW: Capture current local time and apply to selected date
        const now = new Date();
        dateToUse = new Date(selectedDate);  // Clone to avoid mutating picker date
        dateToUse.setHours(now.getHours());
        dateToUse.setMinutes(now.getMinutes());
        dateToUse.setSeconds(0);
        dateToUse.setMilliseconds(0);
      }

      const formattedDate = getFormattedDate(dateToUse);  // For display (date only)
      setDob(formattedDate);

      if (onDateChange) {
        // Pass full Date object (with time if captureTime) to parent
        onDateChange(captureTime ? dateToUse : selectedDate);
      }
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
        onPress={() => setShowDatePicker(true)}>
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
          text={dob ? dob : 'Enter Date'}
          font={family?.Questrial_Regular}
          size={size.medium}
          color={dob ? colors?.text : colors?.placeholderText}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          // UPDATED: value uses local date from dob (or current if null)
          value={dob ? new Date(dob) : new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()}  // Prevents past dates
          onChange={handleDateChange}
        />
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
});
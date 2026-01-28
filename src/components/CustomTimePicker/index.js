import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../CustomText';
import {family, size, vh} from '../../utils';
import {colors} from '../../utils/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import {LOG} from '../../utils/helperFunction';

const {width, height} = Dimensions.get('screen');
// const CustomTimePicker = ({
//   timeStyle,
//   labelStyle,
//   title,
//   staric,
//   leftIcon,
//   Iconcolor,
//   onTimeChange,
//   time,
// }) => {
//   const getFormattedTime = d => {
//     if (d && !isNaN(d) && d instanceof Date) {
//       const hours = d.getHours();
//       const minutes = d.getMinutes();
//       const ampm = hours >= 12 ? 'PM' : 'AM';
//       const adjustedHours = hours % 12 || 12;
//       return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
//     }
//     return '';
//   };

//   const [selectedTime, setSelectedTime] = useState(getFormattedTime(time));
//   LOG('selecteTime: ', selectedTime);
//   const [showTimePicker, setShowTimePicker] = useState(false);

//   useEffect(() => {
//     setSelectedTime(getFormattedTime(time));
//   }, []);

//   const handleTimeChange = (event, selectedDate) => {
//     if (event.type === 'dismissed') {
//       setShowTimePicker(false);
//       return;
//     }

//     if (selectedDate) {
//       setShowTimePicker(false);

//       const formattedTime = getFormattedTime(selectedDate);
//       console.log('Formatted Time: ', formattedTime);
//       setSelectedTime(formattedTime);

//       if (onTimeChange) {
//         const year = selectedDate.getFullYear();
//         const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
//         const day = String(selectedDate.getDate()).padStart(2, '0');
//         const hours = String(selectedDate.getHours()).padStart(2, '0');
//         const minutes = String(selectedDate.getMinutes()).padStart(2, '0');
//         const formatted = `${year}-${month}-${day}T${hours}:${minutes}:00`;
//         setSelectedTime(formattedTime);
//         onTimeChange(formatted);
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
//         style={[styles.timeContainer, timeStyle]}
//         onPress={() => setShowTimePicker(true)}>
//         {leftIcon && (
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
//         )}
//         <CustomText
//           text={selectedTime ? selectedTime : 'Enter Time'}
//           font={family?.Questrial_Regular}
//           size={size.medium}
//           color={selectedTime ? colors?.text : colors?.placeholderText}
//         />
//       </TouchableOpacity>
//       {showTimePicker && (
//         <DateTimePicker
//           value={time ? new Date(time) : new Date()}
//           mode="time"
//           display="default"
//           onChange={handleTimeChange}
//         />
//       )}
//     </View>
//   );
// };

const getFormattedTime = (value) => {
  if (!value) return '';

  let dateObj;

  // If already Date instance
  if (value instanceof Date) {
    dateObj = value;
  } else {
    // Assume ISO string from Formik
    const parsed = new Date(value);
    if (isNaN(parsed)) return '';
    dateObj = parsed;
  }

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const adjustedHours = hours % 12 || 12;

  return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const CustomTimePicker = ({
  timeStyle,
  labelStyle,
  title,
  staric,
  leftIcon,
  Iconcolor,
  onTimeChange,
  time,
}) => {
  const [selectedTime, setSelectedTime] = useState('');

  const [showTimePicker, setShowTimePicker] = useState(false);

  // Sync with Formik value (even on first render)
  useEffect(() => {
    if (time) {
      const formatted = getFormattedTime(time);
      setSelectedTime(formatted);
    }
  }, [time]);

  const handleTimeChange = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) {
      const formattedTime = getFormattedTime(selectedDate);
      setSelectedTime(formattedTime);

      if (onTimeChange) {
        // Format as ISO with zero seconds
        selectedDate.setSeconds(0, 0);
        onTimeChange(selectedDate.toISOString());
      }
    }
  };

  return (
    <View style={{ width: '100%' }}>
      {title && (
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            marginBottom: 5,
            alignItems: 'center',
          }}
        >
          <CustomText
            text={title}
            font={family?.Gilroy_Medium}
            size={size?.large}
          />
          {staric && <CustomText text="*" color={colors?.red} size={size?.h6} />}
        </View>
      )}

      <TouchableOpacity
        style={[styles.timeContainer, timeStyle]}
        onPress={() => setShowTimePicker(true)}
      >
        {leftIcon && (
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
        )}
        <CustomText
          text={selectedTime ? selectedTime : 'Enter Time'}
          font={family?.Questrial_Regular}
          size={size.medium}
          color={selectedTime ? colors?.text : colors?.placeholderText}
        />
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={time ? new Date(time) : new Date()}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

export default CustomTimePicker;

const styles = StyleSheet.create({
  timeContainer: {
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
});

import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../CustomText';
import {family, size} from '../../utils';
import {colors} from '../../utils/Colors';

const {height} = Dimensions.get('screen');

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);
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
  const [modalHour, setModalHour] = useState(12);
  const [modalMinute, setModalMinute] = useState(0);

  useEffect(() => {
    if (time) {
      const formatted = getFormattedTime(time);
      setSelectedTime(formatted);
    }
  }, [time]);

  const openPicker = () => {
    let d = new Date();
    if (time) {
      const parsed = typeof time === 'string' ? new Date(time) : time;
      if (parsed instanceof Date && !isNaN(parsed)) d = parsed;
    }
    setModalHour(d.getHours());
    setModalMinute(d.getMinutes());
    setShowTimePicker(true);
  };

  const handleConfirm = () => {
    const today = new Date();
    today.setHours(modalHour, modalMinute, 0, 0);
    const formattedTime = getFormattedTime(today);
    setSelectedTime(formattedTime);
    if (onTimeChange) {
      onTimeChange(today.toISOString());
    }
    setShowTimePicker(false);
  };

  const handleCancel = () => setShowTimePicker(false);

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
        onPress={openPicker}
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

      <Modal
        visible={showTimePicker}
        transparent
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleCancel}
        >
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={() => {}}
          >
            <CustomText text="Select time" style={styles.modalTitle} />
            <View style={styles.pickerRow}>
              <View style={styles.pickerColumn}>
                <CustomText text="Hour" style={styles.pickerLabel} />
                <ScrollView
                  style={styles.pickerScrollWrap}
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled
                >
                  {HOURS.map((h) => (
                    <TouchableOpacity
                      key={h}
                      style={[styles.pickerItem, modalHour === h && styles.pickerItemActive]}
                      onPress={() => setModalHour(h)}
                    >
                      <CustomText
                        text={String(h).padStart(2, '0')}
                        style={[styles.pickerItemText, modalHour === h && styles.pickerItemTextActive]}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <CustomText text=":" style={styles.timeSeparator} />
              <View style={styles.pickerColumn}>
                <CustomText text="Minute" style={styles.pickerLabel} />
                <ScrollView
                  style={styles.pickerScrollWrap}
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled
                >
                  {MINUTES.map((m) => (
                    <TouchableOpacity
                      key={m}
                      style={[styles.pickerItem, modalMinute === m && styles.pickerItemActive]}
                      onPress={() => setModalMinute(m)}
                    >
                      <CustomText
                        text={String(m).padStart(2, '0')}
                        style={[styles.pickerItemText, modalMinute === m && styles.pickerItemTextActive]}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalBtn} onPress={handleCancel}>
                <CustomText text="Cancel" style={styles.modalBtnCancelText} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.modalBtnConfirm]} onPress={handleConfirm}>
                <CustomText text="OK" style={styles.modalBtnConfirmText} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    maxHeight: height * 0.5,
  },
  modalTitle: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: size?.large,
    color: colors.black,
    marginBottom: 16,
    textAlign: 'center',
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pickerColumn: {
    flex: 1,
    alignItems: 'center',
  },
  pickerLabel: {
    fontFamily: family?.Gilroy_Medium,
    fontSize: size?.medium,
    color: colors.placeholderText,
    marginBottom: 8,
  },
  pickerScrollWrap: {
    maxHeight: 160,
    width: '100%',
  },
  pickerItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  pickerItemActive: {
    backgroundColor: colors.secondary,
  },
  pickerItemText: {
    fontFamily: family?.Questrial_Regular,
    fontSize: size?.medium,
    color: colors.text,
  },
  pickerItemTextActive: {
    color: colors.white,
  },
  timeSeparator: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: 24,
    color: colors.text,
    marginHorizontal: 8,
    marginTop: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalBtnConfirm: {
    backgroundColor: colors.secondary,
  },
  modalBtnCancelText: {
    fontFamily: family?.Gilroy_Medium,
    fontSize: size?.medium,
    color: colors.placeholderText,
  },
  modalBtnConfirmText: {
    fontFamily: family?.Gilroy_SemiBold,
    fontSize: size?.medium,
    color: colors.white,
  },
});

// import React, {useEffect, useState} from 'react';
// import {Text} from 'react-native';
// import { family } from '../utils';
// import { colors } from '../utils/Colors';

// const CustomText = ({
//   text = '',
//   size = 16,
//   style = {},
//   font = family?.Questrial_Regular,
//   onPress = undefined,
//   color,
//   expandable = false,
//   intialLength = 100,
//   numberOfLines,
//   underline = false,
//   backgroundColor,
// }) => {
//   const [textData, setTextData] = useState(text);

//   useEffect(() => {
//     if (expandable) {
//       setTextData(`${text.slice(0, intialLength)}...`);
//     } else {
//       setTextData(text);
//     }
//   }, [text]);

//   const toggleExpandable = () => {
//     if (textData.length == text.length) {
//       setTextData(`${text.slice(0, intialLength)}...`);
//     } else {
//       setTextData(text);
//     }
//   };

//   const actionBtnLable =
//     textData?.length == text?.length ? 'Read Less' : 'Read More';
//   return (
//     <Text
//       numberOfLines={numberOfLines}
//       onPress={onPress ?? undefined}
//       style={{
//         fontSize: size,
//         color: color ?? colors.black,
//         fontFamily: font,
//         textDecorationLine: underline ? 'underline' : 'none',
//         backgroundColor: backgroundColor ? backgroundColor : 'transparent',
//         ...style,
//       }}>
//       {textData}
//       {expandable ? '  ' : ''}
//       {expandable && (
//         <Text
//           onPress={toggleExpandable}
//           style={{
//             color: colors.primary,
//             // textDecorationLine: 'underline',
//             fontFamily: font,
//             fontWeight: '500',
//           }}>
//           {actionBtnLable}
//         </Text>
//       )}
//     </Text>
//   );
// };

// export default CustomText;


import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { family } from '../utils';
import { colors } from '../utils/Colors';

const CustomText = ({
  text = '',
  size = 16,
  style = {},
  font = family?.Questrial_Regular,
  onPress = undefined,
  color,
  expandable = false,
  intialLength = 100,
  numberOfLines,
  underline = false,
  backgroundColor,
}) => {
  const [textData, setTextData] = useState(text);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expandable) {
      setTextData(`${text.slice(0, intialLength)}...`);
    } else {
      setTextData(text);
    }
  }, [text]);

  const toggleExpandable = () => {
    setExpanded(!expanded);
    setTextData(expanded ? `${text.slice(0, intialLength)}...` : text);
  };

  const actionBtnLable = expanded ? 'Read Less' : 'Read More';

  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress ?? undefined}
      style={{
        fontSize: size,
        color: color ?? colors.black,
        fontFamily: font,
        textDecorationLine: underline ? 'underline' : 'none',
        backgroundColor: backgroundColor || 'transparent',
        ...style,
      }}>
      {textData}
      {expandable && (
        <Text
          onPress={toggleExpandable}
          style={{
            color: colors.primary,
            textDecorationLine: underline ? 'underline' : 'none', // Ensure underline applies here too
            fontFamily: font,
            fontWeight: '500',
          }}>
          {' '}
          {actionBtnLable}
        </Text>
      )}
    </Text>
  );
};

export default CustomText;

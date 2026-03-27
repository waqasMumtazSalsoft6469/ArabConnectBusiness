import React from 'react';
import {Dimensions} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const {width: W} = Dimensions.get('window');

/**
 * Decorative wave transition (fill = content background below hero).
 */
const WaveDivider = ({width = W, height = 36, fill = '#F0F4F8'}) => {
  const w = width;
  const h = height;
  const d = `M0,${h * 0.35} Q${w * 0.25},0 ${w * 0.5},${h * 0.45} T${w},${h * 0.25} L${w},${h} L0,${h} Z`;
  return (
    <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{marginTop: -1}}>
      <Path d={d} fill={fill} />
    </Svg>
  );
};

export default WaveDivider;

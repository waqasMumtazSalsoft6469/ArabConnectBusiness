import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {family, size} from '../../utils';
import {colors} from '../../utils/Colors';
import CustomText from '../CustomText';

/**
 * Presentational stat tile — data comes from parent (no API logic here).
 */
const StatCard = ({
  title,
  value,
  icon,
  gradientColors,
  trend,
  trendLabel,
}) => {
  const g = gradientColors || ['#E8F5F3', '#F0FDFA'];
  return (
    <LinearGradient
      colors={g}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.wrap}>
      <View style={styles.inner}>
        <View style={styles.iconCircle}>
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        </View>
        <CustomText
          text={title}
          font={family.Gilroy_Medium}
          size={size.small}
          color={colors.headingText}
          numberOfLines={2}
          style={styles.title}
        />
        <CustomText
          text={String(value ?? '—')}
          font={family.Gilroy_SemiBold}
          size={size.h4}
          color={colors.headingText}
          numberOfLines={1}
        />
        <View style={styles.trendRow}>
          <Text style={styles.trendArrow}>{trend || '—'}</Text>
          <CustomText
            text={trendLabel || ' '}
            font={family.Questrial_Regular}
            size={size.xsmall}
            color={colors.lightText}
            numberOfLines={1}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: '48%',
    borderRadius: 26,
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  inner: {
    padding: 18,
    paddingVertical: 16,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: colors.primary,
  },
  title: {
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 6,
    opacity: 0.92,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  trendArrow: {
    fontSize: 14,
    fontFamily: family.Gilroy_SemiBold,
    color: colors.primary,
  },
});

export default StatCard;

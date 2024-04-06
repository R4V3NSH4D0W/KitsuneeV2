import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {COLORS} from '../constants/color';

interface IProps {
  title: string;
  fontType?: string;
  fontSize?: number;
  textColor?: string;
}
const CustomText = ({title, fontType, fontSize, textColor}: IProps) => {
  return (
    <View>
      <Text style={styles.text(fontType, fontSize)}>{title}</Text>
    </View>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: (fontType: string, Size: number, textColor: string) => ({
    fontSize: Size,
    color: textColor,
    fontWeight: fontType,
  }),
});

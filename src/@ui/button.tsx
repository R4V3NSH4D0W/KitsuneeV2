import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {COLORS} from '../constants/color';
import Icons from 'react-native-vector-icons/AntDesign';
interface IProps {
  title?: string | number;
  fontSize?: number;
  hasIcon?: boolean;
  IconName?: string;
  IconSize?: number;
  IconColor?: string;
  buttonStyle?: any;
  buttonColor?: string;
  onPress?: () => void;
}

const CustomButton = ({
  title,
  onPress,
  fontSize,
  hasIcon,
  IconName,
  IconSize,
  IconColor,
  buttonColor,
  buttonStyle,
}: IProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.buttonContainer, buttonStyle]}>
        {hasIcon && <Icons name={IconName} size={IconSize} color={IconColor} />}
        <Text style={styles.buttonText(fontSize, buttonColor)}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    gap: 5,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: (fontSize: number, buttonColor: string) => ({
    color: buttonColor,
    textAlign: 'center',
    fontSize: fontSize,
  }),
});

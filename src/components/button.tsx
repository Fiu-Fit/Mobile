import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import COLORS from '../constants/colors';

interface ButtonProps {
  title: string;
  backgroundColor?: string;
  onPress?: () => void;
}

const Button = ({title, backgroundColor, onPress = () => {}}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[style.button, {backgroundColor: backgroundColor}]}>
      <Text style={style.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const style = StyleSheet.create({
  button: {
    height: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 30,
    shadowColor: COLORS.black,
    elevation: 3,
  },
  text: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

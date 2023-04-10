import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';

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
      style={[styles.button, {backgroundColor: backgroundColor}]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

import React from 'react';
import {View, Text, TextInput} from 'react-native';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './styles';

type InputProps = {
  value: string;
  placeholder: string;
  placeholderTextColor: string;
  onChangeText: (text: string) => void;
  labelText: string;
  labelColor?: string;
  iconName: string;
  error: string | undefined;
  password: boolean;
  onFocus?: () => void;
};

const Input = ({
  labelText,
  labelColor,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(password);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, {color: labelColor}]}>{labelText}</Text>
        {error && <Text style={styles.textError}>{error}</Text>}
      </View>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.blue
              : COLORS.light,
          },
        ]}>
        <Icon style={styles.icon} name={iconName} />
        <TextInput
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={styles.input}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.eyeIcon}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
          />
        )}
      </View>
    </View>
  );
};

export default Input;

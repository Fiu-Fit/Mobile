import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type InputProps = {
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
    <View style={style.container}>
      <Text style={[style.label, {color: labelColor}]}>{labelText}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.blue
              : COLORS.light,
          },
        ]}>
        <Icon style={style.icon} name={iconName} />
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
          style={style.input}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            style={style.eyeIcon}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
          />
        )}
      </View>
      <View style={style.errorContainer}>
        {error && <Text style={style.textError}>{error}</Text>}
      </View>
    </View>
  );
};

export default Input;

const style = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  errorContainer: {
    alignItems: 'flex-end',
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.grey,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 0.5,
    elevation: 2,
  },
  icon: {
    fontSize: 22,
    color: COLORS.blue,
    marginRight: 10,
  },
  eyeIcon: {
    fontSize: 22,
    color: COLORS.blue,
  },
  input: {
    color: COLORS.blue,
    flex: 1,
  },
  textError: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 7,
  },
});

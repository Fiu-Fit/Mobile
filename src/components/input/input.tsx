import React from 'react';
import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type InputProps = {
  value: string | number;
  placeholder: string;
  placeholderTextColor: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  labelText?: string;
  labelColor?: string;
  iconName: string;
  error: string | undefined;
  password: boolean;
  keyboardType?: KeyboardTypeOptions;
  onFocus?: () => void;
};

const Input = ({
  value,
  labelText,
  iconName,
  error,
  password,
  keyboardType,
  onFocus = () => {},
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(password);

  return (
    <View className='mb-4px'>
      <View className='flex-row justify-between'>
        {labelText && <Text className='my-5 text-xm'>{labelText}</Text>}
        {error && (
          <Text className='text-error-color text-xm mt-7'>{error}</Text>
        )}
      </View>
      <View
        className='bg-white/90 h-55 flex-row ph-15, items-center rounded-md border'
        style={[
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.blue
              : COLORS.light,
          },
        ]}>
        <Icon
          style={{ fontSize: 22, color: COLORS.blue, marginHorizontal: 10 }}
          name={iconName}
        />
        <TextInput
          keyboardType={keyboardType ?? 'default'}
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          className='flex-1 text-primary-color'
          value={`${value}`}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            style={{ fontSize: 22, color: COLORS.blue, marginRight: 10 }}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
          />
        )}
      </View>
    </View>
  );
};

export default Input;

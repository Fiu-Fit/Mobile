import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';

export type CheckboxValues = {
  [key: string]: boolean;
};

type CheckboxRowProps = {
  options: { label: string; key: number }[];
  checkboxValues: CheckboxValues;
  handleCheckboxPress: (key: number) => void;
};

export const CheckboxRow = ({
  options,
  checkboxValues,
  handleCheckboxPress,
}: CheckboxRowProps) => {
  return (
    <View className='flex-row my-2'>
      {options.map(option => (
        <Checkbox.Item
          key={option.key}
          label={option.label}
          status={checkboxValues[option.key] ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxPress(option.key)}
        />
      ))}
    </View>
  );
};

import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';

export type CheckboxValues = {
  [key: string]: boolean;
};

type CheckboxRowProps = {
  options: { label: string; key: number | undefined }[];
  checkboxValues: CheckboxValues;
  handleCheckboxPress: (key: number | undefined) => void;
};

export const CheckboxRow = ({
  options,
  checkboxValues,
  handleCheckboxPress,
}: CheckboxRowProps) => {
  return (
    <View className='flex-row my-2'>
      {options.map(option => {
        if (option.key === undefined) {
          return null;
        }
        return (
          <Checkbox.Item
            key={option.key}
            label={option.label}
            status={checkboxValues[option.key] ? 'checked' : 'unchecked'}
            onPress={() => handleCheckboxPress(option.key)}
          />
        );
      })}
    </View>
  );
};

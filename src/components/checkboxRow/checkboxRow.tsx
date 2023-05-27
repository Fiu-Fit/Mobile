import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';

export const checkboxOptions = [
  { label: 'Piernas', key: 0 },
  { label: 'Pecho', key: 1 },
  { label: 'Espalda', key: 2 },
  { label: 'Hombros', key: 3 },
  { label: 'Brazos', key: 4 },
  { label: 'Core', key: 5 },
  { label: 'Cardio', key: 6 },
  { label: 'Fullbody', key: 7 },
  { label: 'Peso libre', key: 8 },
  { label: 'Estiramiento', key: 9 },
  { label: 'Fuerza', key: 10 },
];

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

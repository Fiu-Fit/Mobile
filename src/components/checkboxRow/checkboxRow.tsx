import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';

export const checkboxOptions = [
  { label: 'Piernas', key: 'legs' },
  { label: 'Pecho', key: 'chest' },
  { label: 'Espalda', key: 'back' },
  { label: 'Hombros', key: 'shoulders' },
  { label: 'Brazos', key: 'arms' },
  { label: 'Core', key: 'core' },
  { label: 'Cardio', key: 'cardio' },
  { label: 'Fullbody', key: 'fullbody' },
  { label: 'Peso libre', key: 'freeweight' },
  { label: 'Estiramiento', key: 'stretching' },
  { label: 'Fuerza', key: 'strength' },
];

export type CheckboxValues = {
  [key: string]: boolean;
};

type CheckboxRowProps = {
  options: { label: string; key: string }[];
  checkboxValues: CheckboxValues;
  handleCheckboxPress: (key: string) => void;
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

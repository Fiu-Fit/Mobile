import React from 'react';
import { View } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import { InterestsScreenNavigationProp } from '../../navigation/navigation-props';
import { useAppTheme } from '../../App';
import Button from '../../components/button';

type InterestsScreenProps = {
  navigation: InterestsScreenNavigationProp;
  route: {
    params: {
      name: string;
    };
  };
};

type CheckboxValues = {
  [key: string]: boolean;
};

type CheckboxRowProps = {
  options: { label: string; key: string }[];
  checkboxValues: CheckboxValues;
  handleCheckboxPress: (key: string) => void;
};

const checkboxOptions = [
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

const CheckboxRow = ({
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

const InterestsScreen = ({ navigation, route }: InterestsScreenProps) => {
  const appTheme = useAppTheme();
  //const { name } = route.params;
  const name = 'Martin';
  const [checkboxValues, setCheckboxValues] = React.useState<CheckboxValues>(
    {},
  );

  const handleCheckboxPress = (key: string) => {
    setCheckboxValues(prevValues => ({
      ...prevValues,
      [key]: !prevValues[key],
    }));
  };

  const handleInterestsSubmit = () => {
    const selectedInterests = Object.keys(checkboxValues).filter(
      key => checkboxValues[key],
    );
    console.log(selectedInterests);
  };

  return (
    <View
      className='flex-1 justify-around items-center'
      style={{ backgroundColor: appTheme.colors.backdrop }}>
      <View className='flex-row'>
        <Text className='text-3xl'>Bienvenido, </Text>
        <Text className='text-3xl text-primary-color'>{name}</Text>
      </View>

      <View className='items-center'>
        <Text className='text-xl mb-5'>Selecciona tus intereses</Text>
        <CheckboxRow
          options={checkboxOptions.slice(0, 3)}
          checkboxValues={checkboxValues}
          handleCheckboxPress={handleCheckboxPress}
        />
        <CheckboxRow
          options={checkboxOptions.slice(3, 6)}
          checkboxValues={checkboxValues}
          handleCheckboxPress={handleCheckboxPress}
        />
        <CheckboxRow
          options={checkboxOptions.slice(6, 9)}
          checkboxValues={checkboxValues}
          handleCheckboxPress={handleCheckboxPress}
        />
        <CheckboxRow
          options={checkboxOptions.slice(9, 11)}
          checkboxValues={checkboxValues}
          handleCheckboxPress={handleCheckboxPress}
        />
      </View>
      <View className='flex-row mx-10'>
        <Button
          title='Continuar'
          onPress={() => {
            //navigation.navigate('Home');
            handleInterestsSubmit();
          }}
        />
      </View>
    </View>
  );
};

export default InterestsScreen;

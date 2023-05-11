import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { InterestsScreenNavigationProp } from '../../navigation/navigation-props';
import { useAppTheme } from '../../App';
import Button from '../../components/button';
import LoggerFactory from '../../utils/logger-utility';
import {
  CheckboxValues,
  CheckboxRow,
  checkboxOptions,
} from '../../components/checkboxRow';

const logger = LoggerFactory('interests');

type InterestsScreenProps = {
  navigation: InterestsScreenNavigationProp;
  route: {
    params: {
      name: string;
    };
  };
};

const InterestsScreen = ({ navigation, route }: InterestsScreenProps) => {
  const appTheme = useAppTheme();
  //const { name } = route.params;
  const name = 'Ian';
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
    logger.info('Selected interests: ', selectedInterests);
    navigation.navigate('Goals');
  };

  return (
    <View
      className='flex-1 justify-around items-center'
      style={{ backgroundColor: appTheme.colors.background }}>
      <View className='flex-row'>
        <Text className='text-3xl'>Bienvenido, </Text>
        <Text className='text-3xl text-primary-color'>{name}</Text>
      </View>

      <View className='items-center'>
        <Text className='text-xl mb-5'>Selecciona tus intereses</Text>
        {[0, 3, 6, 9].map((start, index) => (
          <CheckboxRow
            key={index}
            options={checkboxOptions.slice(start, start + 3)}
            checkboxValues={checkboxValues}
            handleCheckboxPress={handleCheckboxPress}
          />
        ))}
      </View>
      <View className='flex-row mx-10'>
        <Button title='Continuar' onPress={() => handleInterestsSubmit()} />
      </View>
    </View>
  );
};

export default InterestsScreen;

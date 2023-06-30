import React from 'react';
import { Alert, View } from 'react-native';
import { Text } from 'react-native-paper';
import { InterestsScreenNavigationProp } from '../../navigation/navigation-props';
import { useAppTheme, useUserContext } from '../../App';
import Button from '../../components/button';
import LoggerFactory from '../../utils/logger-utility';
import { CheckboxValues, CheckboxRow } from '../../components/checkboxRow';
import { axiosClient } from '../../utils/constants';
import { User } from '../../utils/custom-types';
import { workoutCategoryOptions } from '../../utils/workout-types';

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
  const { currentUser } = useUserContext();
  const { name } = route.params;
  const [checkboxValues, setCheckboxValues] = React.useState<CheckboxValues>(
    {},
  );

  const handleCheckboxPress = (key: number | undefined) => {
    if (key === undefined) {
      return;
    }
    setCheckboxValues(prevValues => ({
      ...prevValues,
      [key]: !prevValues[key],
    }));
  };

  const handleInterestsSubmit = async () => {
    const selectedInterests = Object.keys(checkboxValues).filter(
      key => checkboxValues[key],
    );
    try {
      logger.debug('Adding interests to user...');
      const { data } = await axiosClient.put<User>(`/users/${currentUser.id}`, {
        interests: selectedInterests.map(str => parseInt(str, 10)),
      });
      logger.debug(`User updated: ${currentUser.id}`, data);
    } catch (e) {
      logger.error('Error while saving user interests: ', { e });
      Alert.alert('Error al actualizar intereses!');
    }
    navigation.navigate('ConfirmRegistrationScreen');
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
            options={workoutCategoryOptions.slice(start, start + 3)}
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

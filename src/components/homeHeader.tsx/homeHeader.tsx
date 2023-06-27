import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { HomeNavigationProp } from '../../navigation/navigation-props';
import { axiosClient } from '../../utils/constants';
import LoggerFactory from '../../utils/logger-utility';
import { useUserContext } from '../../App';
import { Role } from '../../constants/roles';
import { User } from '../../utils/custom-types';

const logger = LoggerFactory('home-header');

const HomeHeader = ({ navigation }: { navigation: HomeNavigationProp }) => {
  const { currentUser } = useUserContext();
  return (
    <View className='flex-row mx-5 mt-5 justify-between'>
      <Text className='text-xl mt-2'>FiuFit</Text>
      {currentUser.role === Role.Athlete && (
        <Button
          icon='google-fit'
          mode='outlined'
          onPress={async () => {
            try {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { followedUsers, ...rest } = currentUser;
              const updatedUser = await axiosClient.put<User>(
                `/users/${currentUser.id}`,
                {
                  ...rest,
                  role: Role.Trainer,
                },
              );
              logger.debug('Updated user: ', updatedUser);
              await axiosClient.post('/auth/logout');
              navigation.getParent()?.navigate('LoginScreen');
            } catch (err: any) {
              logger.error(
                'Error while trying to make user a Trainer:',
                err.response.data,
              );
            }
          }}>
          <Text className='text-l'>Ser entrenador</Text>
        </Button>
      )}
      {currentUser.role === Role.Trainer && (
        <Button icon='google-fit' mode='outlined' onPress={() => {}}>
          <Text className='text-l'>Quiero ser verificado!</Text>
        </Button>
      )}
    </View>
  );
};

export default HomeHeader;

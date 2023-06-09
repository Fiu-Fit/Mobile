/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { HomeNavigationProp } from '../../navigation/navigation-props';
import { axiosClient } from '../../utils/constants';
import LoggerFactory from '../../utils/logger-utility';
import { useAppTheme, useUserContext } from '../../App';
import { Role } from '../../constants/roles';
import { User } from '../../utils/custom-types';
import { useState } from 'react';
import VerificationModal from '../VerificationModal';

const logger = LoggerFactory('home-header');

const HomeHeader = ({ navigation }: { navigation: HomeNavigationProp }) => {
  const { currentUser } = useUserContext();
  const appTheme = useAppTheme();
  const [verificationModalOpen, setVerficationModalOpen] =
    useState<boolean>(false);
  return (
    <View className='flex-row mx-5 mt-5 justify-between'>
      <Text className='text-xl mt-2'>FiuFit</Text>
      {currentUser.role === Role.Athlete && (
        <Button
          icon='google-fit'
          mode='outlined'
          onPress={async () => {
            try {
              const {
                followedUsers,
                followers,
                verification,
                interests,
                ...rest
              } = currentUser;
              const updatedUser = await axiosClient.put<User>(
                `/users/${currentUser.id}`,
                {
                  ...rest,
                  role: Role.Trainer,
                },
              );
              logger.debug('Updated user: ', updatedUser);
              Alert.alert(
                'Ya sos Trainer!',
                'Logueate nuevamente para crear tu primer entrenamiento!',
              );
              await axiosClient.post('/auth/logout');
              navigation.getParent()?.navigate('LoginScreen');
            } catch (err: any) {
              logger.error(
                'Error while trying to make user a Trainer:',
                err.response.data,
              );
            }
          }}>
          <Text
            className='text-l'
            style={{ color: appTheme.colors.onBackground }}>
            Ser entrenador
          </Text>
        </Button>
      )}
      {currentUser.role === Role.Trainer && !currentUser.verification && (
        <Button
          icon='google-fit'
          mode='outlined'
          onPress={() => {
            setVerficationModalOpen(true);
          }}>
          <Text
            className='text-l'
            style={{ color: appTheme.colors.onBackground }}>
            Quiero ser verificado!
          </Text>
        </Button>
      )}
      {verificationModalOpen && (
        <VerificationModal onDismiss={() => setVerficationModalOpen(false)} />
      )}
    </View>
  );
};

export default HomeHeader;

import {
  View,
  Image,
  StyleSheet,
  Text,
  Alert,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useAppTheme, useUserContext } from '../../App';
import { User, UserProfileProps } from '../../utils/custom-types';
import { observer } from 'mobx-react';
import LoggerFactory from '../../utils/logger-utility';
import { useEffect, useState } from 'react';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import { axiosClient } from '../../utils/constants';
import { fetchUserData, useFetchUser } from '../../utils/fetch-helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { searchStore } from '../../stores/userSearch.store';
import COLORS from '../../constants/colors';
import FloatingActionButton from '../dumb/floatingActionButton';

const logger = LoggerFactory('user-profile');

const handleFollow = async (selectedUserId: number, currentUserId: number) => {
  try {
    logger.info(
      `Trying to follow user ${selectedUserId} as user ${currentUserId}`,
    );
    await axiosClient.post(`/followers/follow?userId=${currentUserId}`, {
      userIdToFollow: selectedUserId,
    });
    logger.debug(`User ${currentUserId} now follows ${selectedUserId}`);
  } catch (error) {
    logger.error('An error ocurred while trying to follow this user: ', {
      error,
    });
  }
};

const handleUnfollow = async (
  selectedUserId: number,
  currentUserId: number,
) => {
  try {
    logger.info(
      `Trying to unfollow user ${selectedUserId} as user ${currentUserId}`,
    );
    await axiosClient.delete(
      `/followers/unfollow?userId=${currentUserId}&followerId=${selectedUserId}`,
    );
  } catch (error) {
    logger.error('An error ocurred while trying to follow this user: ', {
      error,
    });
  }
};
const updateUserPositionCallback = async (
  position: GeolocationResponse,
  currentUser: User,
) => {
  // We need to do this to update the user.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { verification, interests, followedUsers, ...data } = currentUser;
  const updatedUser = { ...data };
  const { latitude, longitude } = position.coords;
  logger.info('Updating with info:', {
    latitude,
    longitude,
  });
  updatedUser.coordinates = [longitude, latitude];
  try {
    await axiosClient.put(`/users/${updatedUser.id}`, updatedUser);
  } catch (err) {
    logger.error('Error while updating location:', { err });
    Alert.alert(
      'Error actualizando geolocalización',
      'Ocurrió un error, intente más tarde!',
    );
  }
};

const UserProfile = (props: UserProfileProps) => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iAmSelected = currentUser.id === selectedUser?.id;
  const toggleSwitch = async () => {
    await AsyncStorage.setItem(
      'biometricLoginState',
      isEnabled ? 'disabled' : 'enabled',
    );
    setIsEnabled(!isEnabled);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { followedUsers, ...rest } = currentUser;

  const [followAction, setFollowAction] = useState({
    followState: false,
    followCallback: handleFollow,
  });
  useFocusEffect(() => {
    if (iAmSelected) {
      setSelectedUser(currentUser);
    }
  });
  useEffect(() => {
    setIsLoading(true);
    logger.info(`Selected User: ${props.route?.params.givenUserId}`);
    const verifyBiometricPermissionsState = async () => {
      const permissions = await AsyncStorage.getItem('biometricLoginState');
      setIsEnabled(permissions === 'enabled' ? true : false);
    };
    const getSelectedUser = async () => {
      const fetchedUser = await fetchUserData(props.route?.params.givenUserId);
      if (fetchedUser.error !== null) {
        logger.error('an error ocurred while trying to fetch a user: ', {
          fetchedUser,
        });
        return;
      }
      setSelectedUser(fetchedUser.response);
    };
    verifyBiometricPermissionsState();
    getSelectedUser()
      .then(() => {
        setFollowAction(
          following
            ? { followState: following, followCallback: handleUnfollow }
            : { followState: following, followCallback: handleFollow },
        );
        setIsLoading(false);
      })
      .catch(error =>
        logger.error('an error ocurred while updateing the user: ', { error }),
      );
    const following = Boolean(
      currentUser.followedUsers.find(user => user?.id === selectedUser?.id),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followAction.followState, props.route?.params.givenUserId]);

  const handleSignOut = async () => {
    try {
      await axiosClient.post('/auth/logout');
      props.navigation?.getParent()?.navigate('LoginScreen');
    } catch (err: any) {
      logger.error(
        'Error while trying to make user a Trainer:',
        err.response.data,
      );
    }
  };

  useFetchUser({ observables: [followAction.followState] });

  return isLoading ? (
    <ActivityIndicator size='large' color='#0000ff' />
  ) : (
    <View
      style={[
        styles.container,
        {
          backgroundColor: appTheme.colors.background,
        },
      ]}>
      <Image
        source={{ uri: searchStore.profilePicture }}
        style={styles.profilePicture}
      />
      <Text style={styles.name}>
        {selectedUser?.firstName} {selectedUser?.lastName}
      </Text>
      {iAmSelected && selectedUser?.verification && (
        <View
          className='flex-row justify-between mx-10 mb-5'
          style={{ width: '100%' }}>
          <Text style={styles.personalInfo}>Estado de Verificación:</Text>
          <Text style={{ color: COLORS.blue }}>
            {selectedUser?.verification?.status}
          </Text>
        </View>
      )}
      {!iAmSelected && selectedUser?.verification?.status === 'Approved' && (
        <Text style={styles.personalInfo}>Trainer Verificado!</Text>
      )}
      <View
        className='flex-row justify-between mx-10 mb-5'
        style={{ width: '100%' }}>
        <Text style={styles.personalInfo}>Peso:</Text>
        <Text style={{ color: COLORS.blue }}>
          {selectedUser?.bodyWeight} kg
        </Text>
      </View>
      <View
        className='flex-row justify-between mx-10 mb-5'
        style={{ width: '100%' }}>
        <Text style={styles.personalInfo}>Email:</Text>
        <Text style={{ color: COLORS.blue }}>{selectedUser?.email}</Text>
      </View>
      {!iAmSelected && (
        <>
          <Button
            mode='contained'
            style={styles.button}
            onPress={() => {
              if (selectedUser) {
                props.navigation?.push('ChatScreen', { user: selectedUser });
              }
            }}>
            Enviar mensaje
          </Button>
        </>
      )}
      {iAmSelected && (
        <>
          <View
            className='flex-row justify-between mb-5'
            style={{ width: '100%' }}>
            <Text>Login Con Biometria: </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor='#3e3e3e'
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <Button
            mode='contained'
            style={styles.button}
            onPress={() => {
              Geolocation.getCurrentPosition(
                async position =>
                  await updateUserPositionCallback(position, currentUser),
                async error => {
                  if (error.PERMISSION_DENIED) {
                    Geolocation.requestAuthorization(
                      () => {
                        logger.info('Geolocation permission accepted!');
                        Geolocation.getCurrentPosition(
                          async positionOnError => {
                            await updateUserPositionCallback(
                              positionOnError,
                              currentUser,
                            );
                            Alert.alert('Geolocalización Actualizada!');
                          },
                        );
                      },
                      errorRequest => {
                        if (errorRequest.PERMISSION_DENIED) {
                          Alert.alert(
                            'Faltan Permisos',
                            'Se necesita el permiso de Geolocalización para actualizarla.',
                          );
                        }
                      },
                    );
                  }
                },
                { enableHighAccuracy: true, timeout: 1000 },
              );
            }}>
            Actualizar geolocalización
          </Button>
          <FloatingActionButton
            onPress={() => {
              logger.info('Navigation:', props.navigation);
              props.navigation?.getParent()?.navigate('EditProfile');
            }}
            icon='pencil'
          />
          <Button
            mode='contained'
            style={styles.button}
            onPress={handleSignOut}>
            Cerrar sesión
          </Button>
        </>
      )}
      {!iAmSelected && (
        <Button
          mode='contained'
          style={styles.button}
          onPress={() =>
            followAction
              .followCallback(selectedUser?.id ?? 0, currentUser.id)
              .then(() => {
                setFollowAction(
                  !followAction.followState
                    ? {
                        followState: !followAction.followState,
                        followCallback: handleFollow,
                      }
                    : {
                        followState: !followAction.followState,
                        followCallback: handleUnfollow,
                      },
                );
              })
          }>
          {followAction.followState ? 'Dejar de seguir' : 'Seguir'}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    height: '100%',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  personalInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginVertical: 10,
    width: '100%',
    borderRadius: 5,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
});

export default observer(UserProfile);

import {
  View,
  Image,
  StyleSheet,
  Text,
  Alert,
  TextInput,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
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
  const updatedUser = { ...currentUser };
  const { latitude, longitude } = position.coords;
  logger.info('Updating with info:', {
    latitude,
    longitude,
  });
  updatedUser.coordinates = [longitude, latitude];
  await axiosClient.put(`/users/${updatedUser.id}`, updatedUser);
};

const UserProfile = (props: UserProfileProps) => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [visible, setVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [iAmSelected, setIAmSelected] = useState(
    currentUser.id === selectedUser?.id,
  );
  const toggleSwitch = async () => {
    await AsyncStorage.setItem(
      'biometricLoginState',
      isEnabled ? 'disabled' : 'enabled',
    );
    setIsEnabled(!isEnabled);
  };
  const showDialog = () => setVisible(true);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { followedUsers, ...rest } = currentUser;

  const addNumber = async () => {
    logger.debug('New phone number: ', phoneNumber);
    const { data } = await axiosClient.put(`/users/${currentUser.id}`, {
      ...rest,
      phoneNumber,
    });
    logger.debug('Updated user: ', data);
    hideDialog();
  };

  const hideDialog = () => {
    setVisible(false);
    setPhoneNumber('');
  };

  const [followAction, setFollowAction] = useState({
    followState: false,
    followCallback: handleFollow,
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
        setIAmSelected(currentUser.id === selectedUser?.id);
        setIsLoading(false);
      })
      .catch(error =>
        logger.error('an error ocurred while updateing the user: ', { error }),
      );
    const following = Boolean(
      currentUser.followedUsers.find(user => user?.id === selectedUser?.id),
    );
  }, [followAction.followState, props.route?.params.givenUserId, iAmSelected]);
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
  const pictureUrl =
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80';

  useFetchUser({ observables: [followAction.followState] });
  return isLoading ? (
    <ActivityIndicator size='large' color='#0000ff' />
  ) : (
    <View
      style={[
        styles.container,
        {
          backgroundColor: appTheme.colors.surfaceVariant,
        },
      ]}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>New Number</Dialog.Title>
          <Dialog.Content>
            <TextInput
              placeholder='11-2233-4455'
              keyboardType='numeric'
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => hideDialog()}>Cancel</Button>
            <Button onPress={() => addNumber()}>Accept</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Image source={{ uri: pictureUrl }} style={styles.profilePicture} />
      <Text style={styles.name}>{selectedUser?.firstName}</Text>
      <Text style={styles.name}>{selectedUser?.lastName}</Text>
      {iAmSelected && selectedUser?.verification && (
        <Text style={styles.personalInfo}>
          Estado de Verificación: {selectedUser?.verification?.status}
        </Text>
      )}
      {!iAmSelected && selectedUser?.verification?.status === 'Approved' && (
        <Text style={styles.personalInfo}>Trainer Verificado!</Text>
      )}
      <Text style={styles.personalInfo}>{selectedUser?.bodyWeight} kg</Text>
      <Text style={styles.email}>{selectedUser?.email}</Text>
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
                            Alert.alert('Location Updated');
                          },
                        );
                      },
                      errorRequest => {
                        if (errorRequest.PERMISSION_DENIED) {
                          Alert.alert(
                            'Missing Permission',
                            'The Geolocation permission is needed to update the user location.',
                          );
                        }
                      },
                    );
                  }
                },
                { enableHighAccuracy: true, timeout: 1000 },
              );
            }}>
            Update Location
          </Button>
          <Button
            mode='contained'
            style={styles.button}
            onPress={() => {
              logger.info('Navigation:', props.navigation);
              props.navigation?.getParent()?.navigate('EditProfile');
            }}>
            Edit
          </Button>
          <Button mode='contained' style={styles.button} onPress={showDialog}>
            Add Number
          </Button>
          <Text> Permitir Login Con Biometria: </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor='#3e3e3e'
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Button
            mode='contained'
            style={styles.button}
            onPress={handleSignOut}>
            Cerrar sesion
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
          {followAction.followState ? 'Unfollow' : 'Follow'}
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
    marginBottom: 5,
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

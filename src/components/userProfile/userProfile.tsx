import { View, Image, StyleSheet, Text, Alert, TextInput } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { useAppTheme, useUserContext } from '../../App';
import auth from '@react-native-firebase/auth';
import { User, UserProfileProps } from '../../utils/custom-types';
import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react';
import LoggerFactory from '../../utils/logger-utility';
import { searchStore } from '../../stores/userSearch.store';
import { useEffect, useState } from 'react';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import { axiosClient } from '../../utils/constants';
import { useFetchUser } from '../../utils/fetch-helpers';

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
  useFocusEffect(() => {
    logger.info(`Selected User: ${props.route?.params.givenUserId}`);
    setSelectedUser(
      props.myProfile
        ? currentUser
        : searchStore.results.find(
            user => user.id === props.route?.params.givenUserId,
          ),
    );
  });
  useEffect(() => {
    const following = Boolean(
      currentUser.followedUsers.find(user => user?.id === selectedUser?.id),
    );
    setFollowAction(
      following
        ? { followState: following, followCallback: handleUnfollow }
        : { followState: following, followCallback: handleFollow },
    );
  }, [followAction.followState, currentUser, selectedUser]);
  const handleSignOut = async () => {
    await auth().signOut();
    props.navigation?.getParent()?.navigate('LoginScreen');
  };
  const pictureUrl =
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80';

  useFetchUser({ observables: [followAction.followState] });
  return (
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
      <Text style={styles.personalInfo}>{selectedUser?.bodyWeight} kg</Text>
      <Text style={styles.email}>{selectedUser?.email}</Text>
      {!props.myProfile && (
        <>
          <Button
            mode='contained'
            style={styles.button}
            onPress={() => {
              props.navigation?.push('ChatScreen', { user: selectedUser });
            }}>
            Enviar mensaje
          </Button>
        </>
      )}
      {props.myProfile && (
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
          <Button
            mode='contained'
            style={styles.button}
            onPress={handleSignOut}>
            Cerrar sesion
          </Button>
        </>
      )}
      {!props.myProfile && (
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

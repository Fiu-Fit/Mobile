import { View, Image, StyleSheet, Text, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useAppTheme, useUserContext } from '../../App';
import auth from '@react-native-firebase/auth';
import { User, UserProfileProps } from '../../utils/custom-types';
import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react';
import LoggerFactory from '../../utils/logger-utility';
import { searchStore } from '../../stores/userSearch.store';
import { useState } from 'react';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import { axiosClient } from '../../utils/constants';

const logger = LoggerFactory('user-profile');

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
  const [amFollowing, setAmFollowing] = useState(false)
  useFocusEffect(() => {
    logger.info(`Selected User: ${props.route?.params.givenUserId}`);
    setSelectedUser(
      props.myProfile
        ? currentUser
        : searchStore.results.find(
            user => user.id === props.route?.params.givenUserId,
          ),
    );
    setAmFollowing(currentUser.followedUsers?.find( user => {
      return user.id === selectedUser?.id;
    }) ? true : false);
  });

  const handleSignOut = async () => {
    await auth().signOut();
    props.navigation?.getParent()?.navigate('LoginScreen');
  };

  const handleFollow = async () => {
    try {
      await axiosClient.post(`/followers/follow?userId=${currentUser.id}&userIdToFollow=${selectedUser?.id}`);
    } catch (error) {
      logger.error("An error ocurred while trying to follow this user: ", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axiosClient.post(`/followers/unfollow?userId=${currentUser.id}&followerId=${selectedUser?.id}`);
    } catch (error) {
      logger.error("An error ocurred while trying to follow this user: ", error);
    }
  };
  const pictureUrl =
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: appTheme.colors.surfaceVariant,
        },
      ]}>
      <Image source={{ uri: pictureUrl }} style={styles.profilePicture} />
      <Text style={styles.name}>{selectedUser?.firstName}</Text>
      <Text style={styles.name}>{selectedUser?.lastName}</Text>
      <Text style={styles.personalInfo}>{selectedUser?.bodyWeight} kg</Text>
      <Text style={styles.email}>{selectedUser?.email}</Text>
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
                          async positionOnError =>
                            await updateUserPositionCallback(
                              positionOnError,
                              currentUser,
                            ),
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
          <Button
            mode='contained'
            style={styles.button}
            onPress={handleSignOut}>
            Cerrar sesion
          </Button>
        </>
      )}
          {!props.myProfile && (amFollowing ?
            <Button
              mode='contained'
              style={styles.button}
              onPress={handleUnfollow}>
              Unfollow
            </Button> :
            <Button
              mode='contained'
              style={styles.button}
              onPress={handleFollow}>
              Follow
            </Button>)}
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
});

export default observer(UserProfile);

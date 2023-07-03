import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAppTheme, useUserContext } from '../../App';
import { ProfileNavigationProp } from '../../navigation/navigation-props';
import { axiosClient } from '../../utils/constants';
import LoggerFactory from '../../utils/logger-utility';
import { fetchUserData } from '../../utils/fetch-helpers';
import Input from '../../components/input';
import COLORS from '../../constants/colors';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { runInAction } from 'mobx';
import { searchStore } from '../../stores/userSearch.store';

const logger = LoggerFactory('edit-profile');

const EditProfile = ({ navigation }: { navigation: ProfileNavigationProp }) => {
  const appTheme = useAppTheme();
  const { currentUser, setCurrentUser } = useUserContext();
  const [editedFirstName, setEditedFirstName] = useState(currentUser.firstName);
  const [editedLastName, setEditedLastName] = useState(currentUser.lastName);
  const [editedWeight, setEditedWeight] = useState('' + currentUser.bodyWeight);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(
    currentUser.phoneNumber,
  );
  const [selectedMultimedia, setSelectedMultimedia] = useState(
    currentUser.profilePicture,
  );

  const uploadProfilePicture = async () => {
    const lastSlashIndex = selectedMultimedia!.lastIndexOf('/');
    const fileName = selectedMultimedia!.substring(lastSlashIndex + 1);
    try {
      await storage()
        .ref(`/users/${currentUser.id}/${fileName}`)
        .putFile(selectedMultimedia!);
      return await storage()
        .ref(`/users/${currentUser.id}/${fileName}`)
        .getDownloadURL();
    } catch (e) {
      logger.debug('Error while uploading workout multimedia: ', e);
    }
    logger.debug('Profile picture uploaded!');
  };

  const handleSave = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { verification, interests, followedUsers, followers, ...userData } = currentUser;
    userData.firstName = editedFirstName;
    userData.lastName = editedLastName;
    userData.bodyWeight = Number(editedWeight);
    userData.phoneNumber = editedPhoneNumber;

    try {
      if (selectedMultimedia) {
        const profilePicUrl = await uploadProfilePicture();
        userData.profilePicture = profilePicUrl;
      }
      await axiosClient.put(`/users/${userData.id}`, userData);
      Alert.alert('Se actualizaron los datos del usuario!');
    } catch (err) {
      logger.error('Error while editing Profile:', { err });
      Alert.alert('Error al actualizar los datos del usuario');
    }
    const fetchedUser = await fetchUserData(currentUser.id);
    if (fetchedUser.error !== null) {
      logger.error('an error ocurred while trying to fetch a user: ', {
        fetchedUser,
      });
      return;
    }
    setCurrentUser(fetchedUser.response);

    navigation.navigate('Profile');
  };

  const handleCancel = () => {
    navigation.navigate('Profile');
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: appTheme.colors.background,
        },
      ]}>
      <Text className='text-xl mb-10'>Editar perfil</Text>
      <View style={{ width: '100%' }}>
        <Input
          value={editedFirstName}
          placeholder='Ingresa tu primer nombre'
          placeholderTextColor={COLORS.darkGrey}
          onChangeText={setEditedFirstName}
          labelText='Nombre'
          iconName='account-outline'
          error={''}
          password={false}
        />
        <Input
          value={editedLastName}
          placeholder='Ingresa tu último nombre'
          placeholderTextColor={COLORS.darkGrey}
          onChangeText={setEditedLastName}
          labelText='Apellido'
          iconName='account-outline'
          error={''}
          password={false}
        />
        <Input
          value={editedWeight}
          placeholder='Ingresa tu último nombre'
          placeholderTextColor={COLORS.darkGrey}
          onChangeText={setEditedWeight}
          labelText='Peso'
          iconName='scale-balance'
          error={''}
          password={false}
        />
        <Input
          value={editedPhoneNumber ?? ''}
          placeholder='Ingresa tu último nombre'
          placeholderTextColor={COLORS.darkGrey}
          onChangeText={setEditedPhoneNumber}
          labelText='Teléfono'
          iconName='phone-outline'
          error={''}
          password={false}
        />
      </View>

      <Button
        mode='contained'
        style={styles.button}
        className='mt-10'
        onPress={async () => {
          launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            },
            async response => {
              if (response.assets) {
                logger.debug('Selected multimedia: ', response.assets![0].uri);
                setSelectedMultimedia(response.assets![0].uri);
              }
            },
          );
        }}>
        Actualizar foto de perfil
      </Button>
      <View>
        <Text className='text-l' style={{ color: appTheme.colors.outline }}>
          {selectedMultimedia?.slice(59)}
        </Text>
      </View>

      <Button
        mode='contained'
        className='mt-10'
        style={styles.button}
        onPress={handleSave}>
        Guardar
      </Button>
      <Button mode='contained' style={styles.button} onPress={handleCancel}>
        Cancelar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    height: '100%',
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    marginVertical: 10,
    width: '100%',
    borderRadius: 5,
  },
});

export default EditProfile;

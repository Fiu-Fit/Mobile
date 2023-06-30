import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useAppTheme, useUserContext } from '../../App';
import { ProfileNavigationProp } from '../../navigation/navigation-props';
import { axiosClient } from '../../utils/constants';
import LoggerFactory from '../../utils/logger-utility';
import { fetchUserData } from '../../utils/fetch-helpers';

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

  const handleSave = async () => {
    const { verification, interests, followedUsers, ...userData } = currentUser;
    userData.firstName = editedFirstName;
    userData.lastName = editedLastName;
    userData.bodyWeight = Number(editedWeight);
    userData.phoneNumber = editedPhoneNumber;
    try {
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
          backgroundColor: appTheme.colors.surfaceVariant,
        },
      ]}>
      <TextInput
        label='First Name'
        value={editedFirstName}
        onChangeText={setEditedFirstName}
        style={styles.input}
      />
      <TextInput
        label='Last Name'
        value={editedLastName}
        onChangeText={setEditedLastName}
        style={styles.input}
      />
      <TextInput
        label='Weigth'
        value={editedWeight}
        onChangeText={setEditedWeight}
        style={styles.input}
        keyboardType='numeric'
      />
      <TextInput
        label='Phone Number'
        value={editedPhoneNumber ?? ''}
        onChangeText={setEditedPhoneNumber}
        style={styles.input}
      />
      <Button mode='contained' style={styles.button} onPress={handleSave}>
        Save
      </Button>
      <Button mode='contained' style={styles.button} onPress={handleCancel}>
        Cancel
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

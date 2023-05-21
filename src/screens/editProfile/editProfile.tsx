import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useAppTheme, useUserContext } from '../../App';
import { ProfileNavigationProp } from '../../navigation/navigation-props';
import { axiosClient } from '../../utils/constants';

const EditProfile = ({ navigation }: { navigation: ProfileNavigationProp }) => {
  const appTheme = useAppTheme();
  const { currentUser, setCurrentUser } = useUserContext();
  const [editedFirstName, setEditedFirstName] = useState(currentUser.firstName);
  const [editedLastName, setEditedLastName] = useState(currentUser.lastName);
  const [editedWeight, setEditedWeight] = useState('' + currentUser.bodyWeight);
  const [editedEmail, setEditedEmail] = useState(currentUser.email);

  const handleSave = async () => {
    const updatedUser = { ...currentUser };
    updatedUser.firstName = editedFirstName;
    updatedUser.lastName = editedLastName;
    updatedUser.bodyWeight = Number(editedWeight);
    updatedUser.email = editedEmail;
    await axiosClient.put(`/users/${updatedUser.id}`, updatedUser);
    setCurrentUser(updatedUser);
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
        label='Name'
        value={editedFirstName}
        onChangeText={setEditedFirstName}
        style={styles.input}
      />
      <TextInput
        label='Name'
        value={editedLastName}
        onChangeText={setEditedLastName}
        style={styles.input}
      />
      <TextInput
        label='Personal Info'
        value={editedWeight}
        onChangeText={setEditedWeight}
        style={styles.input}
      />
      <TextInput
        label='Email'
        value={editedEmail}
        onChangeText={setEditedEmail}
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
  triners: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  triner: {
    fontSize: 16,
    marginHorizontal: 5,
    color: 'blue',
    textDecorationLine: 'underline',
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

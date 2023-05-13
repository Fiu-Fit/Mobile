import { useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useAppTheme } from '../../App';
import { ProfileScreenNavigationProp } from '../../navigation/navigation-props';
import auth from '@react-native-firebase/auth';

// interface WorkoutCardProps {
//   name: string;
//   pictureUrl: string;
//   personalInfo: string;
//   email: string;
//   triners: string[];
//   onEdit?: (editedProfile: EditedProfile) => void;
// }

// interface EditedProfile {
//   name: string;
//   personalInfo: string;
//   email: string;
//   triners: string[];
// }

// const UserProfile = ({
//   name,
//   pictureUrl,
//   personalInfo,
//   email,
//   triners,
//   onEdit,
// }: WorkoutCardProps) => {
const UserProfile = ({
  navigation,
}: {
  navigation: ProfileScreenNavigationProp;
}) => {
  const appTheme = useAppTheme();

  const name = 'hola';
  const personalInfo = 'personalInfo';
  const pictureUrl =
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80';
  const email = 'email';
  const triners = ['hola'];
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedInfo, setEditedInfo] = useState(personalInfo);
  const [editedEmail, setEditedEmail] = useState(email);

  const handleSave = () => {
    // const editedProfile = {
    //   name: editedName,
    //   personalInfo: editedBio,
    //   email: editedEmail,
    //   triners,
    // };
    // onEdit && onEdit(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(name);
    setEditedInfo(personalInfo);
    setEditedEmail(email);
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    await auth().signOut();
    navigation.push('LoginScreen');
  };

  if (isEditing) {
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
          value={editedName}
          onChangeText={setEditedName}
          style={styles.input}
        />
        <TextInput
          label='Personal Info'
          value={editedInfo}
          onChangeText={setEditedInfo}
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
          Reset Original Values
        </Button>
      </View>
    );
  } else {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: appTheme.colors.surfaceVariant,
          },
        ]}>
        <Image source={{ uri: pictureUrl }} style={styles.profilePicture} />
        <Text style={styles.name}>{editedName}</Text>
        <Text style={styles.personalInfo}>{editedInfo}</Text>
        <Text style={styles.email}>{editedEmail}</Text>
        <View style={styles.triners}>
          {triners.map((triner: string) => (
            <Text key={triner} style={styles.triner}>
              {triner}
            </Text>
          ))}
        </View>
        <Button
          mode='contained'
          style={styles.button}
          onPress={() => setIsEditing(true)}>
          Edit
        </Button>
        <Button mode='contained' style={styles.button} onPress={handleSignOut}>
          Cerrar sesion
        </Button>
      </View>
    );
  }
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

export default UserProfile;

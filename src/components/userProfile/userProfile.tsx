import { View, Image, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useAppTheme, useUserContext } from '../../App';
import { ProfileNavigationProp } from '../../navigation/navigation-props';
import auth from '@react-native-firebase/auth';
import { UserProfileProps } from '../../utils/custom-types';
import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react';



const UserProfile = ({
  currentUser,
  navigation,
  canEdit = true,
}: UserProfileProps) => {
  const appTheme = useAppTheme();
  const { currentUser: loggedInUser } = useUserContext();
  useFocusEffect(() => {
    if (canEdit) {
      currentUser = loggedInUser;
    }
  });
  const handleSignOut = async () => {
    await auth().signOut();
    navigation?.getParent()?.navigate('LoginScreen');
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
      <Text style={styles.name}>{currentUser?.firstName}</Text>
      <Text style={styles.name}>{currentUser?.lastName}</Text>
      <Text style={styles.personalInfo}>{currentUser?.bodyWeight} kg</Text>
      <Text style={styles.email}>{currentUser?.email}</Text>
      {canEdit && (
        <>
          <Button
            mode='contained'
            style={styles.button}
            onPress={() => navigation?.getParent()?.navigate('EditProfile')}>
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

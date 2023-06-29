import { useUserContext } from '../../App';
import UserProfile from '../../components/userProfile';
import { observer } from 'mobx-react';

const MyProfileScreen = ({ navigation }: any) => {
  const { currentUser } = useUserContext();
  return (
    <UserProfile
      navigation={navigation}
      route={{
        key: String(currentUser.id),
        name: String(currentUser.id),
        params: { givenUserId: currentUser.id },
      }}
    />
  );
};

export default observer(MyProfileScreen);

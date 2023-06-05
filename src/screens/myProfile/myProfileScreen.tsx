import { useUserContext } from '../../App';
import UserProfile from '../../components/userProfile';
import { observer } from 'mobx-react';

const MyProfileScreen = (navigation: any) => {
  const { currentUser } = useUserContext();

  return (
    <UserProfile
      navigation={navigation}
      currentUser={currentUser}
      canEdit={true}
    />
  );
};

export default observer(MyProfileScreen);

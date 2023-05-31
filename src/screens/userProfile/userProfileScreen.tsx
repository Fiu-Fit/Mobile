import { useUserContext } from '../../App';
import { ProfileNavigationProp } from '../../navigation/navigation-props';
import UserProfile from '../../components/userProfile';
import LoggerFactory from '../../utils/logger-utility';
import { searchStore } from '../../stores/userSearch.store';
import { observer } from 'mobx-react';

const logger = LoggerFactory('user-profile-screen');
type UserProfileScreenProps = {
  navigation: ProfileNavigationProp;
  route: {
    params: {
      givenUserId: number;
      canEdit: boolean;
    };
  };
};
const UserProfileScreen = ({ navigation, route }: UserProfileScreenProps) => {
  const { currentUser } = useUserContext();
  const { givenUserId, canEdit } = route.params;
  const user = givenUserId
    ? searchStore.results.find(loadedUser => loadedUser.id === givenUserId)
    : currentUser;

  return (
    <UserProfile
      navigation={navigation}
      currentUser={user ?? currentUser}
      canEdit={canEdit}
    />
  );
};

export default observer(UserProfileScreen);

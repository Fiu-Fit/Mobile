import { useUserContext } from '../../App';
import { ProfileNavigationProp } from '../../navigation/navigation-props';
import { User } from '../../utils/custom-types';
import UserProfile from '../../components/userProfile';

const UserProfileScreen = ({
  navigation,
  givenUser,
  canEdit = true,
}: {
  navigation: ProfileNavigationProp;
  givenUser?: User;
  canEdit?: boolean;
}) => {
  const { currentUser } = useUserContext();
  const user = givenUser ?? currentUser;

  return (
    <UserProfile navigation={navigation} currentUser={user} canEdit={canEdit} />
  );
};

export default UserProfileScreen;

import { UserProfileScreenNavigationProp } from '../../navigation/navigation-props';
import UserProfile from '../../components/userProfile';
import { observer } from 'mobx-react';

type UserProfileScreenProps = {
  navigation: UserProfileScreenNavigationProp;
  route: {
    params: {
      givenUserId: number;
      canEdit: boolean;
    };
  };
};

const UserProfileScreen = ({ navigation, route }: UserProfileScreenProps) => {
  const { givenUserId, canEdit } = route.params;
  return (
    <UserProfile
      route={{
        key: String(givenUserId),
        name: String(givenUserId),
        params: { givenUserId },
      }}
      navigation={navigation}
    />
  );
};

export default observer(UserProfileScreen);

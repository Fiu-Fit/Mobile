import { View } from 'react-native';
import { useAppTheme, useUserContext } from '../../App';
import { observer } from 'mobx-react';
import ItemCardList from '../../components/itemCardList';
import LoggerFactory from '../../utils/logger-utility';
import { CardInfo } from '../../utils/custom-types';
import { UserListScreenNavigationProp } from '../../navigation/navigation-props';
import { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';

const logger = LoggerFactory('user-list');

type UserListScreenProps = {
  navigation: UserListScreenNavigationProp;
  route: {
    params: {
      showFollowers?: boolean;
    };
  };
};

const UserListScreen = ({ route, navigation }: UserListScreenProps) => {
  const { currentUser } = useUserContext();
  const appTheme = useAppTheme();
  const [usersToShow, setUsersToShow] = useState(
    route.params?.showFollowers
      ? currentUser.followers
      : currentUser.followedUsers,
  );
  useEffect(() => {
    setUsersToShow(
      route.params?.showFollowers
        ? currentUser.followers
        : currentUser.followedUsers,
    );
  }, [currentUser, route.params?.showFollowers]);
  const getCardsInfo = (): CardInfo[] => {
    logger.info('followers in getCardsInfo: ', currentUser.followers);
    return usersToShow.map(
      (result): CardInfo => ({
        id: result.id.toString(),
        title: `${result.firstName} ${result.lastName}`,
        content: result.email,
        type: result.role,
        imageUrl:
          result.profilePicture ||
          'https://firebasestorage.googleapis.com/v0/b/fiufit-e9664.appspot.com/o/resources%2Fuser-profile-icon.png?alt=media&token=21062428-0f66-46cf-8d3f-8320a9a3e875',
      }),
    );
  };
  return (
    <View>
      <Appbar.Header
        style={{ backgroundColor: appTheme.colors.primaryContainer }}>
        <Appbar.Content
          color={appTheme.colors.onPrimaryContainer}
          title={route.params?.showFollowers ? 'Seguidores' : 'Seguidos'}
        />
      </Appbar.Header>
      <ItemCardList
        items={getCardsInfo() ?? []}
        onPress={item => {
          navigation.push('UserProfileScreen', {
            givenUserId: Number(item.id),
          });
        }}
        profileCard={true}
      />
    </View>
  );
};

export default observer(UserListScreen);

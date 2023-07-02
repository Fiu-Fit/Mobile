import { View } from 'react-native';
import { useUserContext } from '../../App';
import { observer } from 'mobx-react';
import ItemCardList from '../../components/itemCardList';
import LoggerFactory from '../../utils/logger-utility';
import { CardInfo } from '../../utils/custom-types';
import { UserListScreenScreenNavigationProp } from '../../navigation/navigation-props';
import { useEffect, useState } from 'react';

const logger = LoggerFactory('user-list');

type UserListScreennProps = {
  navigation: UserListScreenScreenNavigationProp;
  route: {
    params: {
      showFollowers?: boolean;
    };
  };
};

const UserListScreen = ({ route }: UserListScreennProps) => {
  const { currentUser } = useUserContext();
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
          'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
      }),
    );
  };
  return (
    <View>
      <ItemCardList items={getCardsInfo() ?? []} onPress={() => {}} />
    </View>
  );
};

export default observer(UserListScreen);

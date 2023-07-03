/* eslint-disable react-native/no-inline-styles */
import { NotificationsNavigationProp } from '../../navigation/navigation-props';
import { useAppTheme } from '../../App';
import { View } from 'react-native';
import NotificationSelector from '../../components/notificationSelector';
import ItemCardList from '../../components/itemCardList';
import { notificationStore } from '../../stores/notification.store';
import { observer } from 'mobx-react';
import LoggerFactory from '../../utils/logger-utility';
import * as RootNavigation from '../../navigation/root-navigator';
import { NotificationType } from '../../utils/notification-types';
import { User } from '../../utils/custom-types';
import { axiosClient } from '../../utils/constants';

const logger = LoggerFactory('notifications-screen');

const NotificactionsScreen = ({
  navigation,
}: {
  navigation: NotificationsNavigationProp;
}) => {
  const appTheme = useAppTheme();

  return (
    <View style={{ backgroundColor: appTheme.colors.background, flex: 1 }}>
      <NotificationSelector />
      <View style={{ flex: 0.9 }}>
        <ItemCardList
          keyPrefix='notifications-goal-list'
          items={notificationStore.notificationCardsInfo}
          onPress={async item => {
            logger.debug('Goal id in notification screen: ', item.id);
            if (item.type === NotificationType.GoalCompleted.toString()) {
              logger.debug('Goal notification');
              RootNavigation.navigate('Goals', {
                screen: 'GoalScreen',
                params: { itemId: Number(item.id) },
              });
            } else {
              logger.debug('Message notification');
              try {
                const user = await axiosClient.get<User>(`/users/${item.id}`);
                logger.debug('Got user: ', user.data);
                RootNavigation.navigate('Profile', {
                  screen: 'ChatScreen',
                  params: { user: user.data },
                });
              } catch (err) {
                logger.error(`Error while fetching user with ID ${item.id}`, {
                  err,
                });
              }
            }
          }}
        />
      </View>
    </View>
  );
};

export default observer(NotificactionsScreen);

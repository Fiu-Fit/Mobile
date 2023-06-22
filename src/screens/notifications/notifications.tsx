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
          items={notificationStore.notificationCardsInfo}
          onPress={item => {
            logger.debug('Goal id in notification screen: ', item.id);
            RootNavigation.navigate('Goals', {
              screen: 'GoalScreen',
              params: { itemId: item.id },
            });
          }}
        />
      </View>
    </View>
  );
};

export default observer(NotificactionsScreen);

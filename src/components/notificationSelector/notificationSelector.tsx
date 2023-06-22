import { TouchableOpacity, View } from 'react-native';
import { useAppTheme, useUserContext } from '../../App';
import { Text } from 'react-native-paper';
import { notificationStore } from '../../stores/notification.store';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { action } from 'mobx';
import { observer } from 'mobx-react';

const NotificationSelector = () => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();
  const [isShowingGoalNotifications, setShowingGoalNotifications] =
    useState(false);

  useFocusEffect(
    useCallback(() => {
      action(() => {
        onChangeShowingGoalNotifications(isShowingGoalNotifications);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const onChangeShowingGoalNotifications = (
    isShowingGoalNotifications: boolean,
  ) => {
    if (isShowingGoalNotifications) {
      notificationStore.fetchGoalNotifications(currentUser.id);
    } else {
      notificationStore.fetchMessageNotifications(currentUser.id);
    }
    setShowingGoalNotifications(isShowingGoalNotifications);
  };

  return (
    <View
      className='flex-row justify-center items-center'
      style={{ flex: 0.1, backgroundColor: appTheme.colors.scrim }}>
      <TouchableOpacity
        className='justify-center items-center h-full'
        style={{
          flex: 0.5,
          borderBottomWidth: 2,
          borderBottomColor: isShowingGoalNotifications
            ? 'transparent'
            : appTheme.colors.primary,
        }}
        onPress={() => onChangeShowingGoalNotifications(false)}>
        <Text>Mensajes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className='justify-center items-center h-full'
        style={{
          flex: 0.5,
          borderBottomWidth: 2,
          borderBottomColor: isShowingGoalNotifications
            ? appTheme.colors.primary
            : 'transparent',
        }}
        onPress={() => onChangeShowingGoalNotifications(true)}>
        <Text>Metas</Text>
      </TouchableOpacity>
    </View>
  );
};

export default observer(NotificationSelector);

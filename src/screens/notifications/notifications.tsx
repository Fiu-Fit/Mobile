/* eslint-disable react-native/no-inline-styles */
import { NotificationsNavigationProp } from '../../navigation/navigation-props';
import { useAppTheme } from '../../App';
import { Text } from 'react-native-paper';
import { View } from 'react-native';

const NotificactionsScreen = ({
  navigation,
}: {
  navigation: NotificationsNavigationProp;
}) => {
  const appTheme = useAppTheme();
  return (
    <View style={{ backgroundColor: appTheme.colors.background, flex: 1 }}>
      <Text>Notifications</Text>
    </View>
  );
};

export default NotificactionsScreen;

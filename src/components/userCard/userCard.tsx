import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { useAppTheme } from '../../App';
import { observer } from 'mobx-react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { User } from '../../utils/custom-types';

interface UserCardProps {
  user: User;
  onPress?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onPress }) => {
  const appTheme = useAppTheme();

  const styles = StyleSheet.create({
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 66,
      height: 58,
      flex: 1,
    },
    cardPadding: {
      marginVertical: 8,
      marginHorizontal: 16,
    },
    cardContents: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userNames: {
      color: appTheme.colors.onBackground,
      fontSize: 16,
    },
    userMail: {
      color: appTheme.colors.onSurfaceVariant,
      fontSize: 14,
    },
    cardView: {
      flex: 2,
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        style={[
          styles.cardPadding,
          {
            backgroundColor: appTheme.colors.surfaceVariant,
          },
        ]}>
        <Card.Content style={styles.cardContents}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
            }}
            resizeMode='cover'
          />
          <View style={styles.cardView}>
            <Paragraph style={styles.userNames}>
              {`${user.firstName} ${user.lastName}`}
            </Paragraph>
            <Paragraph style={styles.userMail}>{user.email}</Paragraph>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default observer(UserCard);

import { Image, StyleSheet, View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { useAppTheme } from '../../App';
import { observer } from 'mobx-react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CardInfo } from '../../utils/custom-types';
import IconButton from '../button';
import SocialShare from '../socialShare';

interface ItemCardProps<T extends CardInfo> {
  item: T;
  onPress?: () => void;
  onEditPress?: () => void;
  onRemovePress?: () => void;
}

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
});

const ItemCard = <T extends CardInfo>({
  item,
  onPress,
  onEditPress,
  onRemovePress,
}: ItemCardProps<T>) => {
  const appTheme = useAppTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        className='my-2 mx-5'
        style={[
          styles.cardPadding,
          {
            backgroundColor: appTheme.colors.surfaceVariant,
          },
        ]}>
        <Card.Content className='flex-row justify-center items-center h-36'>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
            }}
            resizeMode='cover'
          />
          <View className='items-center' style={{ flex: 2 }}>
            <Paragraph
              style={{ color: appTheme.colors.onBackground }}
              className='text-2xl'>
              {item.title}
            </Paragraph>
            <Paragraph style={{ color: appTheme.colors.onSurfaceVariant }}>
              {item.content}
            </Paragraph>
            <SocialShare
              content={{
                title: item.title,
                message: item.content,
              }}
            />
            {onEditPress && (
              <IconButton icon={'pencil-outline'} onPress={onEditPress} />
            )}
            {onRemovePress && (
              <IconButton icon={'minus-circle'} onPress={onRemovePress} />
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default observer(ItemCard);

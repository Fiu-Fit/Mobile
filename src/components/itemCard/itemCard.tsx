import { Image, StyleSheet, View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { useAppTheme } from '../../App';
import { observer } from 'mobx-react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CardInfo } from '../../utils/custom-types';
import IconButton from '../button';

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
        key={`card-${item.id}`}
        className='my-2 mx-5'
        style={[
          styles.cardPadding,
          {
            backgroundColor: appTheme.colors.surfaceVariant,
          },
        ]}>
        <Card.Content
          key={`card-content-container-${item.id}`}
          className='flex-row justify-center items-center h-36'>
          <Image
            key={`card-image-${item.id}`}
            style={styles.logo}
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
            }}
            resizeMode='cover'
          />
          <View
            key={`card-view-${item.id}`}
            className='items-center'
            style={{ flex: 2 }}>
            <Paragraph
              key={`card-title-${item.id}`}
              style={{ color: appTheme.colors.onBackground }}
              className='text-2xl'>
              {item.title}
            </Paragraph>
            <Paragraph
              key={`card-content-${item.id}`}
              style={{ color: appTheme.colors.onSurfaceVariant }}>
              {item.content}
            </Paragraph>
            {onEditPress && (
              <IconButton
                key={`card-edit-buton-${item.id}`}
                icon={'pencil-outline'}
                onPress={onEditPress}
              />
            )}
            {onRemovePress && (
              <IconButton key={`card-remove-button-${item.id}`} icon={'minus-circle'} onPress={onRemovePress} />
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default observer(ItemCard);

import { Image, StyleSheet, View, FlatList } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { useAppTheme } from '../../App';
import AddButton from '../../components/addButton';

const cards = [
  { id: 1, title: 'Card 1', content: 'card 1' },
  { id: 2, title: 'Card 2', content: 'card 2' },
  { id: 3, title: 'Card 3', content: 'card 3' },
  { id: 4, title: 'Card 4', content: 'card 4' },
  { id: 5, title: 'Card 5', content: 'card 5' },
  { id: 6, title: 'Card 6', content: 'card 6' },
  { id: 7, title: 'Card 7', content: 'card 7' },
  { id: 8, title: 'Card 8', content: 'card 8' },
  { id: 9, title: 'Card 9', content: 'card 9' },
  { id: 10, title: 'Card 10', content: 'card 10' },
  { id: 11, title: 'Card 10', content: 'card 11' },
  { id: 12, title: 'Card 10', content: 'card 12' },
  { id: 13, title: 'Card 10', content: 'card 13' },
  { id: 14, title: 'Card 10', content: 'card 14' },
  { id: 15, title: 'Card 10', content: 'card 15' },
  { id: 16, title: 'Card 10', content: 'card 16' },
  { id: 17, title: 'Card 10', content: 'card 17' },
  { id: 18, title: 'Card 10', content: 'card 18' },
];

type CardType = {
  id: number;
  title: string;
  content: string;
};

type Props = {
  navigation: any;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 150,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
    flex: 1,
  },
});

const DemoScreen = ({ navigation }) => {
  const appTheme = useAppTheme();

  const renderItem = ({ item }: { item: CardType }) => (
    <Card
      key={item.id}
      style={{
        backgroundColor: appTheme.colors.surfaceVariant
      }}>
      <Card.Content style={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
          }}
          resizeMode='cover'
        />
        <Paragraph style={{ flex: 2 }}>{item.content}</Paragraph>
        <AddButton />
      </Card.Content>
    </Card>
  );

  const keyExtractor = (item: CardType) => item.id.toString();

  return (
    <View style={{ backgroundColor: appTheme.colors.background, flex: 1 }}>
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default DemoScreen;

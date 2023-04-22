import { Image, ScrollView } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import NavBar from '../../components/navBar';
import { useAppTheme } from '../../App';
import AddButton from '../../components/addButton';
import { StyleSheet } from 'react-native';

const cards = [
  { title: 'Card 1', content: 'card 1' },
  { title: 'Card 2', content: 'card 2' },
  { title: 'Card 3', content: 'card 3' },
  { title: 'Card 4', content: 'card 4' },
  { title: 'Card 5', content: 'card 5' },
  { title: 'Card 6', content: 'card 6' },
  { title: 'Card 7', content: 'card 7' },
  { title: 'Card 8', content: 'card 8' },
  { title: 'Card 9', content: 'card 9' },
  { title: 'Card 10', content: 'card 10' },
];

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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

const DemoScreen = ({ navigation }: { navigation: any }) => {
  const appTheme = useAppTheme();

  return (
    <>
      <NavBar />
      <ScrollView style={{ backgroundColor: appTheme.colors.background }}>
        {cards.map((card, index) => (
          <Card
            key={index}
            style={{ backgroundColor: appTheme.colors.surfaceVariant }}>
            <Card.Content style={styles.container}>
              <Image
                style={styles.logo}
                source={{
                  uri: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
                }}
              />
              <Paragraph style={{ flex: 2 }}>{card.content}</Paragraph>
              <AddButton />
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
};

export default DemoScreen;

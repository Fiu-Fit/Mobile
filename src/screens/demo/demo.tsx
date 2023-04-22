import { ScrollView } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import NavBar from '../../components/navBar';
import AddButton from '../../components/addButton';
import { useAppTheme } from '../../App';

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

const DemoScreen = ({ navigation }: { navigation: any }) => {
  const appTheme = useAppTheme();
  return (
    <>
      <NavBar />
      <ScrollView style={{ backgroundColor: appTheme.colors.background }}>
        <AddButton />
        {cards.map((card, index) => (
          <Card
            key={index}
            style={{ backgroundColor: appTheme.colors.surfaceVariant }}>
            <Card.Title title={card.title} />
            <Card.Content>
              <Paragraph>{card.content}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
};

export default DemoScreen;

import { View } from 'react-native';
import { useAppTheme } from '../../App';
import WorkoutCardList from '../../components/workoutCardList';
import NavBar from '../../components/navBar';
import { DemoScreenNavigationProp } from '../../navigation/navigation-props';

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

const WorkoutsScreen = ({
  navigation,
}: {
  navigation: DemoScreenNavigationProp;
}) => {
  const appTheme = useAppTheme();
  return (
    <View style={{ backgroundColor: appTheme.colors.background, flex: 1 }}>
      <NavBar navigation={navigation} />
      <WorkoutCardList workouts={cards} />
    </View>
  );
};

export default WorkoutsScreen;

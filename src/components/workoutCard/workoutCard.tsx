import { Image, StyleSheet } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import AddButton from '../addButton';
import { useAppTheme } from '../../App';

export interface IWorkoutCard {
  id: number;
  title: string;
  content: string;
}

interface WorkoutCardProps {
  workoutItem: IWorkoutCard;
  onPress?: () => void;
}
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

const WorkoutCardList = ({
  workoutItem,
  onPress = () => {},
}: WorkoutCardProps) => {
  const appTheme = useAppTheme();

  return (
    <Card
      key={`workout-card-${workoutItem.id}`}
      style={{
        backgroundColor: appTheme.colors.surfaceVariant,
      }}>
      <Card.Content style={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
          }}
          resizeMode='cover'
        />
        <Paragraph style={{ flex: 2 }}>{workoutItem.content}</Paragraph>
        <AddButton />
      </Card.Content>
    </Card>
  );
};

export default WorkoutCardList;

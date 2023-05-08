import { Image, StyleSheet, View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { useAppTheme } from '../../App';
import { observer } from 'mobx-react';
import { WorkoutsScreenNavigationProp } from '../../navigation/navigation-props';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface IWorkoutCard {
  id: string;
  title: string;
  content: string;
}

interface WorkoutCardProps {
  workoutItem: IWorkoutCard;
  navigation: WorkoutsScreenNavigationProp;
}
const styles = StyleSheet.create({
  cardContent: {
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
  cardPadding: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

const WorkoutCard = ({ workoutItem, navigation }: WorkoutCardProps) => {
  const appTheme = useAppTheme();

  return (
    <TouchableOpacity onPress={() => navigation.push('Workout')}>
      <Card
        key={`workout-card-${workoutItem.id}`}
        style={[
          styles.cardPadding,
          {
            backgroundColor: appTheme.colors.surfaceVariant,
          },
        ]}>
        <Card.Content style={styles.cardContent}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
            }}
            resizeMode='cover'
          />
          <View style={{ flex: 2 }}>
            <Paragraph>{workoutItem.title}</Paragraph>
            <Paragraph>{workoutItem.content}</Paragraph>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default observer(WorkoutCard);

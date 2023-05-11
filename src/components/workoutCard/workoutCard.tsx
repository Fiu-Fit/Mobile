import { Image, StyleSheet, View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { useAppTheme } from '../../App';
import { observer } from 'mobx-react';
import {
  HomeScreenNavigationProp,
  WorkoutsScreenNavigationProp,
} from '../../navigation/navigation-props';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface IWorkoutCard {
  id: string;
  title: string;
  content: string;
}

interface WorkoutCardProps {
  workoutItem: IWorkoutCard;
  navigation: WorkoutsScreenNavigationProp | HomeScreenNavigationProp;
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

const WorkoutCard = ({ workoutItem, navigation }: WorkoutCardProps) => {
  const appTheme = useAppTheme();

  return (
    <TouchableOpacity
      onPress={() => navigation.push('Workout', { workoutId: workoutItem.id })}>
      <Card
        key={`workout-card-${workoutItem.id}`}
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
              {workoutItem.title}
            </Paragraph>
            <Paragraph style={{ color: appTheme.colors.onBackground }}>
              {workoutItem.content}
            </Paragraph>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default observer(WorkoutCard);

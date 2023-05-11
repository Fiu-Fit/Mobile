import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { useAppTheme } from '../../App';
import { IExerciseCard } from '../../utils/workout-types';
import { ICard } from '../../utils/custom-types';

interface ExerciseCardProps {
  exerciseItem: IExerciseCard | ICard;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
  cardPadding: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

const ExerciseCard = ({ exerciseItem, onPress }: ExerciseCardProps) => {
  const appTheme = useAppTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        key={`exercise-card-${exerciseItem.id}`}
        className='my-2 mx-5'
        style={[
          styles.cardPadding,
          {
            backgroundColor: appTheme.colors.surfaceVariant,
          },
        ]}>
        <Card.Content className='flex-row justify-center items-center h-36'>
          <Image
            className='h-14 w-16 flex-1'
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
            }}
            resizeMode='cover'
          />
          <View className='items-center' style={{ flex: 2 }}>
            <Paragraph className='text-xl'>{exerciseItem.title}</Paragraph>
            <Paragraph
              className='text-base self-center'
              style={{ color: appTheme.colors.onSurfaceVariant }}>
              {exerciseItem.content}
            </Paragraph>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default ExerciseCard;

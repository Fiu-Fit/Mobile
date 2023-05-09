import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { useAppTheme } from '../../App';
import React from 'react';
import ExerciseModal from '../exerciseModal';

export interface IExerciseCard {
  id: string;
  name: string;
  description: string;
  category: string;
  sets: string;
  reps: string;
}

interface ExerciseCardProps {
  exerciseItem: IExerciseCard;
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

const ExerciseCard = ({ exerciseItem }: ExerciseCardProps) => {
  const appTheme = useAppTheme();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <TouchableOpacity onPress={showModal}>
      <ExerciseModal
        visible={visible}
        onDismiss={hideModal}
        exerciseItem={exerciseItem}
      />
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
            <Paragraph>{exerciseItem.name}</Paragraph>
            <Paragraph>
              {exerciseItem.sets}x{exerciseItem.reps}
            </Paragraph>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default ExerciseCard;

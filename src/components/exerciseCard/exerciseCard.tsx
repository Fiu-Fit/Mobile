import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Modal, Paragraph, Portal } from 'react-native-paper';
import { useAppTheme } from '../../App';
import React from 'react';
import ExerciseModal from '../exerciseModal';

export interface IExerciseCard {
  id: number;
  title: string;
  content: string;
}

interface ExerciseCardProps {
  exerciseItem: IExerciseCard;
  onPress?: () => void;
}
const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'row',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
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

const ExerciseCard = ({
  exerciseItem,
  onPress = () => {},
}: ExerciseCardProps) => {
  const appTheme = useAppTheme();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: appTheme.colors.surface,
    padding: 20,
    width: '90%',
    alignSelf: 'center',
    height: '70%',
    borderRadius: 20,
  };

  return (
    <TouchableOpacity onPress={showModal}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <ExerciseModal exerciseItem={exerciseItem} />
        </Modal>
      </Portal>
      <Card
        key={`exercise-card-${exerciseItem.id}`}
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
              uri: 'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
            }}
            resizeMode='cover'
          />
          <View className='items-center' style={{ flex: 2 }}>
            <Paragraph>{exerciseItem.title}</Paragraph>
            <Paragraph>{exerciseItem.content}</Paragraph>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default ExerciseCard;

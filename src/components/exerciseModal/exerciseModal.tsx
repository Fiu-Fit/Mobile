import { Image, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../App';
import { Modal, Portal } from 'react-native-paper';

export interface IExerciseCard {
  id: number;
  title: string;
  content: string;
}

const styles = StyleSheet.create({
  logo: {
    width: '60%',
    height: '60%',
    resizeMode: 'cover',
  },
});

type ModalProps = {
  visible: boolean;
  onDismiss: () => void;
  exerciseItem: IExerciseCard;
};

const ExerciseModal = ({ visible, onDismiss, exerciseItem }: ModalProps) => {
  const appTheme = useAppTheme();

  const containerStyle = {
    backgroundColor: appTheme.colors.surface,
    marginHorizontal: '5%',
    width: '90%',
    height: '70%',
    borderRadius: 20,
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}>
        <View className='items-center'>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
            }}
          />
          <View className='items-center'>
            <Text className='text-3xl' style={{ color: appTheme.colors.text }}>
              {exerciseItem.title} {exerciseItem.content}
            </Text>
            <Text style={{ color: appTheme.colors.text }}>Descripcion</Text>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default ExerciseModal;

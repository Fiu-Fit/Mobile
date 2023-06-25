import { Text, View } from 'react-native';
import { useAppTheme } from '../../App';
import { Modal, Portal } from 'react-native-paper';
import Button from '../../components/button';
import { WorkoutProps } from '../../utils/workout-types';

type ModalProps = {
  onDismiss: () => void;
  workoutItem: WorkoutProps;
};

const ExerciseModal = ({ onDismiss, workoutItem }: ModalProps) => {
  const appTheme = useAppTheme();

  const containerStyle = {
    backgroundColor: appTheme.colors.surface,
    marginHorizontal: '5%',
    width: '90%',
    height: '40%',
    borderRadius: 20,
  };

  return (
    <Portal>
      <Modal
        visible={true}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}>
        <View className='items-center justify-around' style={{ flex: 1 }}>
          <Text className='text-xl'>¡Entrenamiento completado!</Text>
          <Button title='Volver' onPress={onDismiss} />
        </View>
      </Modal>
    </Portal>
  );
};

export default ExerciseModal;

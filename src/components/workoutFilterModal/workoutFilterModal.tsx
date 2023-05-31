import { Text, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../../App';
import { Modal, Portal } from 'react-native-paper';

type ModalProps = {
  onDismiss: () => void;
  items: { label: string; key: number }[];
};

const WorkoutFilterModal = ({ onDismiss, items }: ModalProps) => {
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
        visible={true}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}>
        <View className='items-center mt-8' style={{ flex: 1 }}>
          {items.map(item => (
            <TouchableOpacity
              className='w-full items-center justify-center my-3'
              onPress={() => {
                onDismiss();
              }}>
              <Text className='text-l'>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </Portal>
  );
};

export default WorkoutFilterModal;

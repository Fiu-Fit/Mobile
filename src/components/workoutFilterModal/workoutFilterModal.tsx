import { Text, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../../App';
import { Divider, Modal, Portal } from 'react-native-paper';

type ModalProps = {
  onDismiss: () => void;
  onSelect: (filter: number | undefined) => void;
  items: { label: string; key: number | undefined }[];
};

const WorkoutFilterModal = ({ onDismiss, onSelect, items }: ModalProps) => {
  const appTheme = useAppTheme();

  const containerStyle = {
    backgroundColor: appTheme.colors.surface,
    marginHorizontal: '5%',
    width: '90%',
    height: '80%',
    borderRadius: 20,
  };

  return (
    <Portal>
      <Modal
        visible={true}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}>
        <View className='items-center justify-center mt-8' style={{ flex: 1 }}>
          {items.map(item => (
            <>
              <TouchableOpacity
                key={`workoutFilter-touchable-${item.key}`}
                className='w-full items-center justify-center my-3'
                onPress={() => {
                  onDismiss();
                  onSelect(item.key);
                }}>
                <Text key={`workoutFilter-text-${item.key}`} className='text-l'>
                  {item.label}
                </Text>
              </TouchableOpacity>
              <Divider
                key={`workoutFilter-divider-${item.key}`}
                style={{
                  alignSelf: 'stretch',
                  marginHorizontal: 60,
                  backgroundColor: appTheme.colors.outline,
                }}
              />
            </>
          ))}
        </View>
      </Modal>
    </Portal>
  );
};

export default WorkoutFilterModal;

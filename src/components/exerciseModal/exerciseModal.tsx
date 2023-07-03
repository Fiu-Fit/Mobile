import { Image, ScrollView, Text, View } from 'react-native';
import { useAppTheme } from '../../App';
import { Modal, Portal } from 'react-native-paper';
import { ExerciseCardInfo } from '../../utils/workout-types';

type ModalProps = {
  onDismiss: () => void;
  exerciseItem: ExerciseCardInfo;
};

const ExerciseModal = ({ onDismiss, exerciseItem }: ModalProps) => {
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
        <View className='items-center' style={{ flex: 1 }}>
          <View
            className='items-center mx-10 justify-between'
            style={{ flex: 0.5 }}>
            <Image
              style={{ width: 300, height: '100%' }}
              source={{ uri: exerciseItem.imageUrl }}
            />
          </View>
          <View
            className='items-center mx-10 justify-between'
            style={{ flex: 0.5 }}>
            <Text
              className='text-3xl'
              style={{ color: appTheme.colors.onBackground }}>
              {exerciseItem.title}
            </Text>
            <ScrollView>
              <Text
                style={{
                  color: appTheme.colors.onSurfaceDisabled,
                  marginTop: 20,
                }}>
                {exerciseItem.exercise?.description ?? 'Description missing'}
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default ExerciseModal;

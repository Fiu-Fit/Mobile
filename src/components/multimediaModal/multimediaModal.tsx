import { Text, View } from 'react-native';
import { useAppTheme } from '../../App';
import { Modal, Portal } from 'react-native-paper';
import { observer } from 'mobx-react';
import { WorkoutDetailStore } from '../../stores/workoutDetail.store';
import Slider from '../slider';

type ModalProps = {
  onDismiss: () => void;
  store: WorkoutDetailStore;
};

const MultimediaModal = ({ onDismiss, store }: ModalProps) => {
  const appTheme = useAppTheme();

  const containerStyle = {
    backgroundColor: appTheme.colors.surface,
    marginHorizontal: '5%',
    width: '90%',
    height: '60%',
    borderRadius: 20,
  };

  return (
    <Portal>
      <Modal
        visible={true}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}>
        <View className='items-center justify-center' style={{ flex: 1 }}>
          <Text className='text-xl mt-4' style={{ flex: 0.3 }}>
            Contenido Multimedia
          </Text>
          <Slider store={store} />
        </View>
      </Modal>
    </Portal>
  );
};

export default observer(MultimediaModal);

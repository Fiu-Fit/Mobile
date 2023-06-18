import { View } from 'react-native';
import { useAppTheme } from '../../App';
import { Modal, Portal, Text } from 'react-native-paper';
import { progressStore } from '../../stores/progress.store';
import { observer } from 'mobx-react';
import ItemCardList from '../itemCardList';

type ModalProps = {
  onDismiss: () => void;
};

const ExerciseMetricsModal = ({ onDismiss }: ModalProps) => {
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
        <View className='items-center justify-center' style={{ flex: 1 }}>
          <Text className='text-xl'>Resumen</Text>
          <ItemCardList
            items={progressStore.exerciseMetricsCardsInfo}
            onPress={() => {}}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default observer(ExerciseMetricsModal);

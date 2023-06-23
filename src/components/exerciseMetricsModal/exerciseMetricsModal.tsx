import { FlatList, View } from 'react-native';
import { useAppTheme } from '../../App';
import { Divider, Modal, Portal, Text } from 'react-native-paper';
import { progressStore } from '../../stores/progress.store';
import { observer } from 'mobx-react';

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
          <Text className='text-xl mt-10'>Resumen</Text>
          <FlatList
            className='mx-10 mt-2 mb-2'
            data={progressStore.exerciseMetricsCardsInfo}
            ItemSeparatorComponent={() => <Divider bold />}
            renderItem={({ item }) => (
              <View
                className='my-5 flex-row'
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '73%',
                }}>
                <Text className='text-l'>{item.title}</Text>
                <Text className='text-l'>x {item.content}</Text>
              </View>
            )}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default observer(ExerciseMetricsModal);

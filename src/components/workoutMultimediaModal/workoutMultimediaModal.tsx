import { Text, View } from 'react-native';
import { useAppTheme } from '../../App';
import { Modal, Portal } from 'react-native-paper';
import { observer } from 'mobx-react';

type ModalProps = {
  onDismiss: () => void;
};

const WorkoutMultimediaModal = ({ onDismiss }: ModalProps) => {
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
          <Text className='text-xl'>Contenido Multimedia</Text>
          {/*
            <Button
              title='Descargar file'
              onPress={async () => {
                const download = await storage()
                  .ref('/download/test.mp4')
                  .getDownloadURL();

                setDowloadResourcePath(download);
                logger.debug('Get downloaded file: ', downloadResourcePath);
              }}
            />
            <VideoPlayer
              video={{
                uri: downloadResourcePath,
              }}
              videoWidth={1600}
              videoHeight={1600}
              thumbnail={{ uri: resourcePath + '.jpg' }}
            />
            <Image
              source={{
                uri: downloadResourcePath,
              }}
              style={{ width: 200, height: 200 }}
            /> */}
        </View>
      </Modal>
    </Portal>
  );
};

export default observer(WorkoutMultimediaModal);

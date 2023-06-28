import { Alert, Text, View } from 'react-native';
import { useAppTheme, useUserContext } from '../../App';
import { Modal, Portal } from 'react-native-paper';
import CustomButton from '../button';
import { launchImageLibrary } from 'react-native-image-picker';
import LoggerFactory from '../../utils/logger-utility';
import { useState } from 'react';
import storage from '@react-native-firebase/storage';
import { axiosClient } from '../../utils/constants';
import VideoPlayer from 'react-native-video-player';


type ModalProps = {
  onDismiss: () => void;
};

const logger = LoggerFactory('verification-modal');

const VerificationModal = ({ onDismiss }: ModalProps) => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();
  const [selectedMultimedia, setSelectedMultimedia] = useState<string>();

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
        <View className='' style={{ flex: 6 }}>
          <View className='items-center mx-10 justify-between'>
            <Text className='text-3xl mt-2'>
              Convertite en Trainer Verificado!
            </Text>
          </View>
          <View
            className='items-center mx-10 mt-2 justify-between'
            style={{ flex: 1 }}>
            <Text
              className='text-xl'
              style={{ color: appTheme.colors.onBackground }}>
              Subí un video comprobando tu identidad y nuestros especialistas
              revisarán tu aplicación lo antes posible.
            </Text>
            <View className='items-center mt-2' style={{ flex: 4 }}>
              {selectedMultimedia && (
                <>
                  <Text
                    className='text-l'
                    style={{ color: appTheme.colors.outline }}>
                    {selectedMultimedia.slice(59)}
                  </Text>
                  <VideoPlayer
                    video={{
                      uri: selectedMultimedia,
                    }}
                    videoWidth={400}
                    videoHeight={450}
                  />
                </>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <CustomButton
                icon='upload'
                title='Adjuntar multimedia'
                onPress={async () => {
                  launchImageLibrary(
                    {
                      mediaType: 'video',
                      includeBase64: false,
                      maxHeight: 200,
                      maxWidth: 200,
                    },
                    async response => {
                      if (response.assets) {
                        logger.debug(
                          'Selected multimedia: ',
                          response.assets![0].uri,
                        );
                        setSelectedMultimedia(response.assets![0].uri!);
                      }
                    },
                  );
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <CustomButton
                title='Enviar'
                onPress={async () => {
                  if (!selectedMultimedia) {
                    Alert.alert('Seleccioná una imágen de tu galería!');
                    return;
                  }
                  logger.debug('Uploading files: ', selectedMultimedia);
                  const lastSlashIndex = selectedMultimedia.lastIndexOf('/');
                  const fileName = selectedMultimedia.substring(
                    lastSlashIndex + 1,
                  );
                  try {
                    await storage()
                      .ref(`/verifications/${currentUser.id}/${fileName}`)
                      .putFile(selectedMultimedia);
                    const uploadedUrl = await storage()
                      .ref(`/verifications/${currentUser.id}/${fileName}`)
                      .getDownloadURL();
                    const response = (
                      await axiosClient.post('/verifications', {
                        userId: currentUser.id,
                        resourceId: uploadedUrl,
                      })
                    ).data;
                    logger.info('Got verification response data:', response);
                    Alert.alert('Se envió la solicitud correctamente!');
                    onDismiss();
                  } catch (error) {
                    logger.error(
                      'Error while trying to upload verification request:',
                      { error },
                    );
                    Alert.alert('Ocurrio un error!');
                  }
                  logger.debug('Files uploaded!');
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default VerificationModal;

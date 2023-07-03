import { SafeAreaView, ScrollView, View } from 'react-native';
import { useAppTheme } from '../../App';
import { Modal, Portal, Text } from 'react-native-paper';
import Button from '../../components/button';
import React, { useEffect } from 'react';
import { Formik, FormikErrors } from 'formik';
import { ErrorEditGoalProps } from '../../utils/custom-types';
import Input from '../input';
import Loader from '../loader';
import { goalStore } from '../../stores/goal.store';
import LoggerFactory from '../../utils/logger-utility';
import { observer } from 'mobx-react';
import { launchImageLibrary } from 'react-native-image-picker';
import { runInAction } from 'mobx';

const MAX_DESCRIPTION_LENGTH = 100;
const logger = LoggerFactory('edit-goal-modal');

type EditGoalModalProps = {
  onDismiss: () => void;
};

const EditGoalModal = ({ onDismiss }: EditGoalModalProps) => {
  const appTheme = useAppTheme();
  const [loading, setLoading] = React.useState(false);
  const [selectedMultimedia, setSelectedMultimedia] = React.useState<string[]>(
    [],
  );

  useEffect(() => {
    setSelectedMultimedia(goalStore.currentGoal.multimedia);
  }, []);

  const handleEditGoal = async (newDescription: string) => {
    setLoading(true);
    try {
      runInAction(() => {
        goalStore.currentGoal.multimedia = selectedMultimedia;
      });
      await goalStore.editGoal(newDescription);
      onDismiss();
    } catch (error) {
      logger.error(error as string);
    }
    setLoading(false);
  };

  const containerStyle = {
    backgroundColor: appTheme.colors.surface,
    marginHorizontal: '5%',
    width: '90%',
    height: '70%',
    borderRadius: 20,
  };

  return loading ? (
    <Loader />
  ) : (
    <Portal>
      <Modal
        visible={true}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}>
        <SafeAreaView className='flex-1 bg-black' style={{ borderRadius: 20 }}>
          <ScrollView className='flex-none px-7 rounded-l'>
            {loading && <Loader />}
            <Formik
              initialValues={{
                description: '',
              }}
              validate={values => {
                let errors: FormikErrors<ErrorEditGoalProps> = {};
                if (!values.description) {
                  errors.description = 'Por favor realiza una descripción';
                } else if (values.description.length > MAX_DESCRIPTION_LENGTH) {
                  errors.description = 'Ingresa una descripción más corta';
                }
                return errors;
              }}
              onSubmit={values => {
                handleEditGoal(values.description);
              }}>
              {({ values, errors, handleChange, handleSubmit }) => (
                <>
                  <Input
                    value={values.description}
                    placeholder='Ingresa una descripción'
                    placeholderTextColor={appTheme.colors.background}
                    onChangeText={handleChange('description')}
                    multiline={true}
                    labelText='Descripción'
                    iconName='comment-outline'
                    error={errors.description}
                    password={false}
                    onFocus={() => {
                      errors.description = '';
                    }}
                  />
                  <View className='my-5 items-center justify-center'>
                    <Button
                      title='Adjuntar multimedia'
                      onPress={async () => {
                        launchImageLibrary(
                          {
                            mediaType: 'mixed',
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
                              setSelectedMultimedia([
                                ...Array.from(selectedMultimedia),
                                response.assets![0].uri!,
                              ]);
                            }
                          },
                        );
                      }}
                    />
                    <View>
                      {selectedMultimedia.map((filename, index) => (
                        <Text
                          className='text-l'
                          key={index}
                          style={{ color: appTheme.colors.outline }}>
                          {filename.slice(59)}
                        </Text>
                      ))}
                    </View>
                  </View>
                  <Button title='Enviar' onPress={handleSubmit} />
                </>
              )}
            </Formik>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </Portal>
  );
};

export default observer(EditGoalModal);

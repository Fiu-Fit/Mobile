import { SafeAreaView, ScrollView } from 'react-native';
import { useAppTheme } from '../../App';
import { Modal, Portal } from 'react-native-paper';
import Button from '../../components/button';
import React from 'react';
import { Formik, FormikErrors } from 'formik';
import { ErrorEditGoalProps } from '../../utils/custom-types';
import Input from '../input';
import Loader from '../loader';
import { goalStore } from '../../stores/goal.store';
import LoggerFactory from '../../utils/logger-utility';

const MAX_DESCRIPTION_LENGTH = 20;
const logger = LoggerFactory('edit-goal-modal');

type EditGoalModalProps = {
  onDismiss: () => void;
};

const WorkoutCommentModal = ({ onDismiss }: EditGoalModalProps) => {
  const appTheme = useAppTheme();
  const [loading, setLoading] = React.useState(false);

  const handleEditGoal = async (newDescription: string) => {
    setLoading(true);
    try {
      goalStore.editGoal(newDescription);
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
    height: '30%',
    borderRadius: 20,
  };

  return (
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

export default WorkoutCommentModal;

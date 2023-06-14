import { SafeAreaView, ScrollView } from 'react-native';
import { useAppTheme } from '../../App';
import { Modal, Portal } from 'react-native-paper';
import Button from '../../components/button';
import { Formik, FormikErrors } from 'formik';
import { ErrorCommentInputProps } from '../../utils/custom-types';
import Input from '../input';

const MAX_COMMENT_LENGTH = 50;

type WorkoutCommentModalProps = {
  onDismiss: () => void;
  onPress: (comment: string) => void;
};

const WorkoutCommentModal = ({
  onDismiss,
  onPress,
}: WorkoutCommentModalProps) => {
  const appTheme = useAppTheme();

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
            <Formik
              initialValues={{
                comment: '',
              }}
              validate={values => {
                let errors: FormikErrors<ErrorCommentInputProps> = {};
                if (!values.comment) {
                  errors.comment = 'Por favor realiza un comentario';
                } else if (values.comment.length > MAX_COMMENT_LENGTH) {
                  errors.comment = 'Ingresa un comentario más corto';
                }
                return errors;
              }}
              onSubmit={values => {
                onPress(values.comment);
              }}>
              {({ values, errors, handleChange, handleSubmit }) => (
                <>
                  <Input
                    value={values.comment}
                    placeholder='Ingresa un comentario'
                    placeholderTextColor={appTheme.colors.background}
                    onChangeText={handleChange('comment')}
                    multiline={true}
                    labelText='Comentario'
                    iconName='comment-outline'
                    error={errors.comment}
                    password={false}
                    onFocus={() => {
                      errors.comment = '';
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

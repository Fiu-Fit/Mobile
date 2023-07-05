import { Alert, SafeAreaView, View } from 'react-native';
import { Formik, FormikErrors } from 'formik';
import Input from '../../components/input';
import COLORS from '../../constants/colors';
import Button from '../../components/button';
import { PasswordRecoveryScreenNavigationProp } from '../../navigation/navigation-props';
import FiuFitLogo from '../../components/dumb/fiuFitLogo';
import LoggerFactory from '../../utils/logger-utility';
import { axiosClient } from '../../utils/constants';

const logger = LoggerFactory('password-recovery');

export type InputProps = {
  email: string;
};

const PasswordRecoveryScreen = ({
  navigation,
}: {
  navigation: PasswordRecoveryScreenNavigationProp;
}) => {
  const handlePasswordRecovery = async (inputs: InputProps) => {
    try {
      logger.info('Sending password recovery email to: ', inputs.email);
      await axiosClient.post('/auth/password-reset', {
        email: inputs.email,
      });
      logger.info('Email sent!');
      Alert.alert(
        'Reset enviado! Si no encuentra el email, revise su bandeja de Spam.',
      );
    } catch (err) {
      logger.error('Error while trying to send password recovery email: ', {
        err,
      });
      Alert.alert('Error al enviar el email de recuperación de contraseña!');
    }

    navigation.push('LoginScreen');
  };

  return (
    <SafeAreaView className='flex-1 bg-black px-8 w-full'>
      <FiuFitLogo />
      <View className='flex-1 py-5 w-full'>
        <Formik
          initialValues={{
            email: '',
          }}
          validate={values => {
            let errors: FormikErrors<InputProps> = {};
            if (!values.email) {
              errors.email = 'Please input email';
            } else if (!values.email.match(/\S+@\S+\.\S+/)) {
              errors.email = 'Please input valid email';
            }
            return errors;
          }}
          onSubmit={handlePasswordRecovery}>
          {({ values, errors, handleChange, handleSubmit }) => (
            <>
              <Input
                value={values.email}
                placeholder='Enter your email'
                placeholderTextColor={COLORS.darkGrey}
                onChangeText={handleChange('email')}
                labelText='Email'
                iconName='email-outline'
                error={errors.email}
                password={false}
                onFocus={() => {
                  errors.email = '';
                }}
              />
              <View className='my-5'>
                <Button title='Enviar email' onPress={handleSubmit} />
              </View>
              <View>
                <Button
                  title='Volver a login'
                  onPress={() => navigation.push('LoginScreen')}
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default PasswordRecoveryScreen;

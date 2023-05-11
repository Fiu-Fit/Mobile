import { Image, SafeAreaView, View } from 'react-native';
import { Formik, FormikErrors } from 'formik';
import Input from '../../components/input';
import COLORS from '../../constants/colors';
import Button from '../../components/button';
import { firebase } from '@react-native-firebase/auth';
import { PasswordRecoveryScreenNavigationProp } from '../../navigation/navigation-props';

export type InputProps = {
  email: string;
};

const PasswordRecoveryScreen = ({
  navigation,
}: {
  navigation: PasswordRecoveryScreenNavigationProp;
}) => {
  const handlePasswordRecovery = async (inputs: InputProps) => {
    await firebase.auth().sendPasswordResetEmail(inputs.email);

    navigation.push('Login');
  };

  return (
    <SafeAreaView className='flex-1 bg-black px-8 w-full'>
      <View className='my-20 justify-center align-center'>
        <Image
          className='scale-75 self-center'
          source={require('../../imgs/fiufit.png')}
        />
      </View>
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
              <Button title='Enviar email' onPress={handleSubmit} />
              <Button
                title='Volver a login'
                onPress={() => navigation.push('Login')}
              />
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default PasswordRecoveryScreen;

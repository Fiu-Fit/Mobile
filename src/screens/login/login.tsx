import React, { useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../components/input';
import Button from '../../components/button';
import Loader from '../../components/loader';
import COLORS from '../../constants/colors';
import LoggerFactory from '../../utils/logger-utility';
import { Formik, FormikErrors } from 'formik';
import { LoginScreenNavigationProp } from '../../navigation/navigation-props';
import { ErrorInputProps, InputProps } from '../../utils/custom-types';
import { axiosClient } from '../../utils/constants';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Role } from '../../constants/roles';
import { DateTime } from 'luxon';

const logger = LoggerFactory('login');

const LoginScreen = ({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) => {
  const [loading, setLoading] = React.useState(false);

  const saveToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('UserToken', token);
    } catch (error) {
      logger.error('Error while saving user token: ', error);
    }
  };

  const handleSignIn = async (inputs: InputProps) => {
    setLoading(true);
    const { email, password } = inputs;
    try {
      const response = await axiosClient.post('/auth/login', {
        email,
        password,
      });
      logger.debug('Saving token: ', response.data.token);
      await saveToken(response.data.token);
      navigation.push('Workouts');
    } catch (error) {
      logger.error('Error while logging in: ', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '649565336432-aftssi22monbq7e2egkrufg8uou85kac.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const getDateDiff = (date1: DateTime, date2: DateTime): number => {
    return date1.diff(date2, 'seconds').seconds;
  };

  async function createNewUser(user: FirebaseAuthTypes.User) {
    const lastSignInTime = DateTime.fromISO(user.metadata.lastSignInTime || '');
    const creationTime = DateTime.fromISO(user.metadata.creationTime || '');

    if (getDateDiff(lastSignInTime, creationTime) < 100) {
      const [firstName, lastName] = user?.displayName?.split(' ') || ['', ''];
      await axiosClient.post('users', {
        email: user?.email || '',
        firstName,
        lastName,
        uid: user.uid,
        role: Role.Athlete,
      });
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();

      const credential = auth.GoogleAuthProvider.credential(idToken);

      const userCredential = await auth().signInWithCredential(credential);

      const user = userCredential.user;

      const token = await auth().currentUser?.getIdToken();

      if (token) {
        await saveToken(token);
      }

      await createNewUser(user);

      navigation.push('Home');
    } catch (error) {
      logger.error('Error while logging in with google: ', error);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-black px-8 w-full'>
      {loading && <Loader />}
      <View className='my-20 justify-center align-center'>
        <Image
          className='scale-75 self-center'
          source={require('../../imgs/fiufit.png')}
        />
      </View>
      <View className='flex-1 py-5 w-full'>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: 'Athlete',
          }}
          validate={values => {
            let errors: FormikErrors<ErrorInputProps> = {};
            if (!values.email) {
              errors.email = 'Please input email';
            } else if (!values.email.match(/\S+@\S+\.\S+/)) {
              errors.email = 'Please input valid email';
            }
            if (!values.password) {
              errors.password = 'Please input password';
            }
            return errors;
          }}
          onSubmit={handleSignIn}>
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
              <Input
                value={values.password}
                placeholder='Enter your password'
                placeholderTextColor={COLORS.darkGrey}
                iconName='lock-outline'
                labelText='Password'
                onChangeText={handleChange('password')}
                password
                error={errors.password}
                onFocus={() => {
                  errors.password = '';
                }}
              />
              <Button title='Login' onPress={handleSubmit} />
            </>
          )}
        </Formik>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleGoogleSignIn}
          className='bg-primary-color h-12 w-full justify-center items-center mb-5 rounded-md'>
          <View className='flex flex-row'>
            <Image
              className='h-8 w-8'
              source={require('../../imgs/google-logo.png')}
            />

            <Text className='text-white text-lg text-bold align-center'>
              {'Sign in with Google'}
            </Text>
          </View>
        </TouchableOpacity>

        <Text
          onPress={() => navigation.push('Register')}
          className='font-bold text-center'>
          Don't have an account?
        </Text>
        <Button
          onPress={() => navigation.push('PasswordRecovery')}
          title='Olvidaste tu contraseña?'
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

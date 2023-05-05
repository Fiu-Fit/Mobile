import React from 'react';
import { Text, SafeAreaView, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Input from '../../components/input';
import Button from '../../components/button';
import Loader from '../../components/loader';
import COLORS from '../../constants/colors';
import LoggerFactory from '../../utils/logger-utility';
import { Formik, FormikErrors } from 'formik';
import { LoginScreenNavigationProp } from '../../navigation/navigation-props';
import { ErrorInputProps, InputProps } from '../../utils/custom-types';
import { API_GATEWAY_URL } from '../../utils/constants';

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
      const response = await axios.post(`${API_GATEWAY_URL}/auth/login`, {
        email,
        password,
      });
      logger.debug('Saving token: ', response.data.token);
      saveToken(response.data.token);
      navigation.push('Demo');
    } catch (error) {
      logger.error('Error while logging in: ', error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className='flex-1 bg-black px-8'>
      {loading && <Loader />}
      <View className='flex-1 justify-center align-center'>
        <Image
          className='scale-75 self-center'
          source={require('../../imgs/fiufit.png')}
        />
      </View>
      <View className='flex-1 py-5'>
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
          onSubmit={values => {
            handleSignIn(values);
          }}>
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
              {/* <Button title='Login' onPress={() => navigation.push('Home')} /> */}
            </>
          )}
        </Formik>
        <Text
          onPress={() => navigation.push('Register')}
          className='font-bold text-center'>
          Don't have an account?
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

import React from 'react';
import { Text, SafeAreaView, ScrollView, View, Alert } from 'react-native';
import Input from '../../components/input';
import Button from '../../components/button';
import Loader from '../../components/loader';
import COLORS from '../../constants/colors';
import LoggerFactory from '../../utils/logger-utility';
import { InputProps, ErrorInputProps, User } from '../../utils/custom-types';
import { RegisterScreenNavigationProp } from '../../navigation/navigation-props';
import { Formik, FormikErrors } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosClient } from '../../utils/constants';
import { fetchUserData } from '../../utils/fetch-helpers';
import { useUserContext } from '../../App';

const logger = LoggerFactory('register');
const MIN_PASS_LENGTH = 5;

const RegisterScreen = ({
  navigation,
}: {
  navigation: RegisterScreenNavigationProp;
}) => {
  const [loading, setLoading] = React.useState(false);

  const saveToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('UserToken', token);
    } catch (error) {
      logger.error('Error while saving user token: ', error);
    }
  };
  const { setCurrentUser } = useUserContext();
  const handleSignUp = async (inputs: InputProps) => {
    setLoading(true);
    try {
      logger.info('Inputs: ', inputs);
      const response = await axiosClient.post('/auth/register', inputs);
      logger.debug('Saving token: ', response.data.token);
      logger.debug('Registered user data: ', response.data);
      await saveToken(response.data.token);
      const { response: user, error } = await fetchUserData();
      if (error) {
        logger.error('Error while logging in: ', error);
      } else {
        logger.debug('user: ', user);
        setCurrentUser(user as User);
      }
      navigation.push('InterestsScreen', { name: inputs.firstName });
    } catch (error: any) {
      logger.error('Error while registering user: ', error.response.data);
      Alert.alert('Error al registrar usuario!');
    }
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <SafeAreaView className='flex-1 bg-black'>
      <View className='flex-none pt-20 items-center justify-center'>
        <Text className='text-6xl font-white text-white'>Registrarse</Text>
      </View>
      <ScrollView className='px-7'>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            bodyWeight: 0,
            email: '',
            password: '',
            role: 'Athlete',
            phoneNumber: '',
          }}
          validate={values => {
            let errors: FormikErrors<ErrorInputProps> = {};
            if (!values.firstName) {
              errors.firstName = 'Ingrese nombre';
            }
            if (!values.lastName) {
              errors.lastName = 'Ingrese apellido';
            }
            if (!values.bodyWeight) {
              errors.bodyWeight = 'Por favor ingrese su peso';
            }
            if (!values.email) {
              errors.email = 'Por favor ingrese su email';
            } else if (!values.email.match(/\S+@\S+\.\S+/)) {
              errors.email = 'Por favor ingrese un email valido';
            }
            if (!values.password) {
              errors.password = 'Please input password';
            } else if (values.password.length < MIN_PASS_LENGTH) {
              errors.password = 'Min password length is 5';
            }

            if (!values.phoneNumber) {
              errors.phoneNumber = 'Please input phone number';
            }
            return errors;
          }}
          onSubmit={values => {
            handleSignUp(values);
          }}>
          {({ values, errors, handleChange, handleSubmit }) => (
            <>
              <View className='flex-row'>
                <View style={{ width: '49%', marginRight: 5 }}>
                  <Input
                    value={values.firstName}
                    placeholder='Ingrese su nombre'
                    placeholderTextColor={COLORS.darkGrey}
                    onChangeText={handleChange('firstName')}
                    labelText='Nombre'
                    iconName='account-outline'
                    error={errors.firstName}
                    password={false}
                    onFocus={() => {
                      errors.firstName = '';
                    }}
                  />
                </View>
                <View style={{ width: '49%' }}>
                  <Input
                    value={values.lastName}
                    placeholder='Ingrese su apellido'
                    placeholderTextColor={COLORS.darkGrey}
                    onChangeText={handleChange('lastName')}
                    labelText='Apellido'
                    iconName='account'
                    error={errors.lastName}
                    password={false}
                    onFocus={() => {
                      errors.lastName = '';
                    }}
                  />
                </View>
              </View>

              <Input
                value={values.bodyWeight}
                placeholder='100'
                placeholderTextColor={COLORS.darkGrey}
                onChangeText={handleChange('bodyWeight')}
                labelText='Peso (Para calcular las calorías)'
                iconName='scale-balance'
                error={errors.bodyWeight}
                password={false}
                onFocus={() => {
                  errors.bodyWeight = '';
                }}
                keyboardType='numeric'
              />

              <Input
                value={values.phoneNumber}
                placeholder='Ingresa tu nombre de teléfono'
                placeholderTextColor={COLORS.darkGrey}
                onChangeText={handleChange('phoneNumber')}
                labelText='Teléfono'
                iconName='phone-outline'
                error={errors.phoneNumber}
                password={false}
                onFocus={() => {
                  errors.phoneNumber = '';
                }}
              />

              <Input
                value={values.email}
                placeholder='Ingresa tu email'
                placeholderTextColor={COLORS.darkGrey}
                onChangeText={handleChange('email')}
                labelText='Email'
                iconName='email-outline'
                error={errors.email}
                password={false}
                onFocus={() => {
                  errors.email = '';
                }}
                keyboardType='email-address'
              />

              <Input
                value={values.password}
                placeholder='Ingresa tu contraseña'
                placeholderTextColor={COLORS.darkGrey}
                iconName='lock-outline'
                labelText='Contraseña'
                onChangeText={handleChange('password')}
                password
                error={errors.password}
                onFocus={() => {
                  errors.password = '';
                }}
              />
              <View className='mt-5'>
                <Button title='Registrarme' onPress={handleSubmit} />
              </View>
            </>
          )}
        </Formik>
        <Text
          onPress={() => navigation.push('LoginScreen')}
          className='font-bold text-xs text-white/70 text-center mt-5'>
          ¿Ya tienes una cuenta?
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

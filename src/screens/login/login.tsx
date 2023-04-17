import React from 'react';
import {Text, SafeAreaView, View, Image} from 'react-native';
import axios from 'axios';
import Input from '../../components/input';
import Button from '../../components/button';
import Loader from '../../components/loader';
import COLORS from '../../constants/colors';
import LoggerFactory from '../../utils/logger-utility';
import {Formik, FormikErrors} from 'formik';
import {LoginScreenNavigationProp} from '../../navigation/navigation-props';
import {styles} from './styles';
import {errorInputProps, inputProps} from '../../utils/custom-types';

const logger = LoggerFactory('login');

const LoginScreen = ({navigation}: {navigation: LoginScreenNavigationProp}) => {
  const [loading, setLoading] = React.useState(false);

  const handleSignIn = async (inputs: inputProps) => {
    setLoading(true);
    try {
      const response = await axios.post('/auth/login', inputs);
      logger.info(response.data);
      navigation.push('Home');
    } catch (error) {
      logger.info(error as string);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../../imgs/fiufit.png')} />
      </View>
      <View style={styles.inputContainer}>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: 'Athlete',
          }}
          validate={values => {
            let errors: FormikErrors<errorInputProps> = {};
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
          {({values, errors, handleChange, handleSubmit}) => (
            <>
              <Input
                value={values.email}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.darkGrey}
                onChangeText={handleChange('email')}
                labelText="Email"
                labelColor={COLORS.white}
                iconName="email-outline"
                error={errors.email}
                password={false}
                onFocus={() => {
                  errors.email = '';
                }}
              />
              <Input
                value={values.password}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.darkGrey}
                iconName="lock-outline"
                labelText="Password"
                labelColor={COLORS.white}
                onChangeText={handleChange('password')}
                password
                error={errors.password}
                onFocus={() => {
                  errors.password = '';
                }}
              />
              <Button
                title="Login"
                backgroundColor={COLORS.darkBlue}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
        <Text
          onPress={() => navigation.push('Register')}
          style={styles.alreadyText}>
          Don't have an account?
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

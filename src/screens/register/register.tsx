import React from 'react';
import {Text, SafeAreaView, ScrollView, View} from 'react-native';
import axios from 'axios';
import Input from '../../components/input';
import Button from '../../components/button';
import Loader from '../../components/loader';
import COLORS from '../../constants/colors';
import LoggerFactory from '../../utils/logger-utility';
import {inputProps, errorInputProps} from '../../utils/custom-types';
import {RegisterScreenNavigationProp} from '../../navigation/navigation-props';
import {Formik, FormikErrors} from 'formik';
import {styles} from './styles';

const logger = LoggerFactory('register');
const MIN_PASS_LENGTH = 5;

const RegisterScreen = ({
  navigation,
}: {
  navigation: RegisterScreenNavigationProp;
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleSignUp = async (inputs: inputProps) => {
    setLoading(true);
    try {
      const response = await axios.post('/auth/register', inputs);
      logger.info(response.data);
      navigation.push('Login');
    } catch (error) {
      logger.error(error as string);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <View style={styles.header}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.description}>Enter your details</Text>
      </View>
      <ScrollView style={styles.subcontainer}>
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
              if (!values.firstName) {
                errors.firstName = 'Please input firstName';
              }
              if (!values.lastName) {
                errors.lastName = 'Please input lastName';
              }
              if (!values.email) {
                errors.email = 'Please input email';
              } else if (!values.email.match(/\S+@\S+\.\S+/)) {
                errors.email = 'Please input valid email';
              }
              if (!values.password) {
                errors.password = 'Please input password';
              } else if (values.password.length < MIN_PASS_LENGTH) {
                errors.password = 'Min password length is 5';
              }
              return errors;
            }}
            onSubmit={values => {
              handleSignUp(values);
            }}>
            {({values, errors, handleChange, handleSubmit}) => (
              <>
                <Input
                  value={values.firstName}
                  placeholder="Enter you first name"
                  placeholderTextColor={COLORS.darkGrey}
                  onChangeText={handleChange('firstName')}
                  labelText="First Name"
                  labelColor={COLORS.darkGrey}
                  iconName="account-outline"
                  error={errors.firstName}
                  password={false}
                  onFocus={() => {
                    errors.firstName = '';
                  }}
                />
                <Input
                  value={values.lastName}
                  placeholder="Enter your last name"
                  placeholderTextColor={COLORS.darkGrey}
                  onChangeText={handleChange('lastName')}
                  labelText="Last Name"
                  labelColor={COLORS.darkGrey}
                  iconName="account"
                  error={errors.lastName}
                  password={false}
                  onFocus={() => {
                    errors.lastName = '';
                  }}
                />
                <Input
                  value={values.email}
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.darkGrey}
                  onChangeText={handleChange('email')}
                  labelText="Email"
                  labelColor={COLORS.darkGrey}
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
                  labelColor={COLORS.darkGrey}
                  labelText="Password"
                  onChangeText={handleChange('password')}
                  password
                  error={errors.password}
                  onFocus={() => {
                    errors.password = '';
                  }}
                />
                <Button
                  title="Register"
                  backgroundColor={COLORS.blue}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
          <Text
            onPress={() => navigation.push('Login')}
            style={styles.alreadyText}>
            Already have account?
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

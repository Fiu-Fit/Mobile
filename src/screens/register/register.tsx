import React from 'react';
import {Text, SafeAreaView, ScrollView, View, Keyboard} from 'react-native';
import axios from 'axios';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import COLORS from '../../constants/colors';
import LoggerFactory from '../../utils/logger-utility';
import {RegisterScreenNavigationProp} from '../../navigation/navigation-props';
import {styles} from './styles';

const logger = LoggerFactory('register');
const MIN_PASS_LENGTH = 5;

const RegisterScreen = ({
  navigation,
}: {
  navigation: RegisterScreenNavigationProp;
}) => {
  const [inputs, setInputs] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'Athlete',
  });

  const [errors, setErrors] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });

  const [loading, setLoading] = React.useState(false);

  const handleOnChange = (text: string, input: string) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (errorMessage: string, input: string) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const validateEmail = (value: string): boolean => {
    if (!value) {
      handleError('Please input email', 'email');
      return false;
    } else if (!value.match(/\S+@\S+\.\S+/)) {
      handleError('Please input valid email', 'email');
      return false;
    }
    return true;
  };

  const validatePassword = (value: string): boolean => {
    if (!value) {
      handleError('Please input password', 'password');
      return false;
    }
    if (value.length < MIN_PASS_LENGTH) {
      handleError('Min password length of 5', 'password');
      return false;
    }
    return true;
  };

  const validateName = (value: string, input: string): boolean => {
    if (!value) {
      handleError('Please input ' + input, input);
      return false;
    }
    return true;
  };

  const validate = () => {
    Keyboard.dismiss();
    const emailIsValid = validateEmail(inputs.email);
    const passwordIsValid = validatePassword(inputs.password);
    const firstnameIsValid = validateName(inputs.firstName, 'firstName');
    const lastNameIsValid = validateName(inputs.lastName, 'lastName');

    if (
      emailIsValid &&
      passwordIsValid &&
      firstnameIsValid &&
      lastNameIsValid
    ) {
      handleSignUp();
    }
  };

  const handleSignUp = async () => {
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
          <Input
            // @ts-ignore
            placeholder="Enter you first name"
            placeholderTextColor={COLORS.darkGrey}
            onChangeText={(text: string) => handleOnChange(text, 'firstName')}
            labelText="First Name"
            labelColor={COLORS.darkGrey}
            iconName="account-outline"
            error={errors.firstName}
            password={false}
            onFocus={() => {
              handleError('', 'firstName');
            }}
          />
          <Input
            // @ts-ignore
            placeholder="Enter your last name"
            placeholderTextColor={COLORS.darkGrey}
            onChangeText={(text: string) => handleOnChange(text, 'lastName')}
            labelText="Last Name"
            labelColor={COLORS.darkGrey}
            iconName="account"
            error={errors.lastName}
            password={false}
            onFocus={() => {
              handleError('', 'lastName');
            }}
          />
          <Input
            // @ts-ignore
            placeholder="Enter your email"
            placeholderTextColor={COLORS.darkGrey}
            onChangeText={(text: string) => handleOnChange(text, 'email')}
            labelText="Email"
            labelColor={COLORS.darkGrey}
            iconName="email-outline"
            error={errors.email}
            password={false}
            onFocus={() => {
              handleError('', 'email');
            }}
          />
          <Input
            // @ts-ignore
            placeholder="Enter your password"
            placeholderTextColor={COLORS.darkGrey}
            iconName="lock-outline"
            labelColor={COLORS.darkGrey}
            labelText="Password"
            onChangeText={(text: string) => handleOnChange(text, 'password')}
            password
            error={errors.password}
            onFocus={() => {
              handleError('', 'password');
            }}
          />
          <Button
            title="Register"
            backgroundColor={COLORS.blue}
            onPress={validate}
          />
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

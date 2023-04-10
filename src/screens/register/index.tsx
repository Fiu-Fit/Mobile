import React from 'react';
import {Text, SafeAreaView, ScrollView, View, Keyboard} from 'react-native';
import axios from 'axios';
import Input from '../../components/input';
import Button from '../../components/button';
import Loader from '../../components/loader';
import COLORS from '../../constants/colors';
import ENDPOINTS from '../../constants/endpoints';
import LoggerFactory from '../../utils/logger-utility';
import {styles} from './styles';

const logger = LoggerFactory('register');

const RegisterScreen = ({navigation}: {navigation: any}) => {
  logger.info('Started Register screen!');
  const [inputs, setInputs] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'Trainer',
  });

  interface FormErrors {
    firstname?: string;
    lastname?: string;
    email?: string | undefined;
    password?: string;
    role?: string;
  }

  const [errors, setErrors] = React.useState<FormErrors>({});
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
    } else if (parseInt(value, 10) < 5) {
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
    const firstnameIsValid = validateName(inputs.firstname, 'firstname');
    const lastnameIsValid = validateName(inputs.lastname, 'lastname');

    if (
      emailIsValid &&
      passwordIsValid &&
      firstnameIsValid &&
      lastnameIsValid
    ) {
      handleSignUp();
    }
  };

  const handleSignUp = async () => {
    try {
      console.log(inputs);
      const response = await axios.post(ENDPOINTS.auth_register, {
        firstname: inputs.firstname,
        lastname: inputs.lastname,
        email: inputs.email,
        password: inputs.password,
        role: inputs.role,
      });
      //logger.info(response.data);
      console.log(response.data);
    } catch (error) {
      //logger.error(error);
      console.log(error);
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.push('Home');
    }, 3000);
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
            onChangeText={(text: string) => handleOnChange(text, 'firstname')}
            labelText="First Name"
            labelColor={COLORS.darkGrey}
            iconName="account-outline"
            error={errors.firstname}
            password={false}
            onFocus={() => {
              handleError('', 'firstName');
            }}
          />
          <Input
            // @ts-ignore
            placeholder="Enter your last name"
            placeholderTextColor={COLORS.darkGrey}
            onChangeText={(text: string) => handleOnChange(text, 'lastname')}
            labelText="Last Name"
            labelColor={COLORS.darkGrey}
            iconName="account"
            error={errors.lastname}
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
            onPress={() => navigation.push('SignIn')}
            style={styles.alreadyText}>
            Already have account?
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

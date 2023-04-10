import React from 'react';
import {Text, SafeAreaView, View, Keyboard, Image} from 'react-native';
import axios from 'axios';
import Input from '../../components/input';
import Button from '../../components/button';
import Loader from '../../components/loader';
import COLORS from '../../constants/colors';
import ENDPOINTS from '../../constants/endpoints';
import LoggerFactory from '../../utils/logger-utility';
import {styles} from './styles';

const logger = LoggerFactory('login');

const LoginScreen = ({navigation}: {navigation: any}) => {
  logger.info('Started Login screen!');
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });

  interface FormErrors {
    email?: string;
    password?: string;
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
      setErrors(prevState => ({...prevState, email: 'Please input email'}));
      return false;
    } else if (!value.match(/\S+@\S+\.\S+/)) {
      setErrors(prevState => ({
        ...prevState,
        email: 'Please input valid email',
      }));
      return false;
    }
    return true;
  };

  const validateInput = (value: string, input: string): boolean => {
    if (!value) {
      setErrors(prevState => ({
        ...prevState,
        [input]: 'Check this field',
      }));
      return false;
    }
    return true;
  };

  const validate = () => {
    Keyboard.dismiss();
    const emailIsValid = validateEmail(inputs.email);
    const passwordIsValid = validateInput(inputs.password, 'password');

    if (emailIsValid && passwordIsValid) {
      handleSignIn();
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post(ENDPOINTS.auth_login, {
        email: inputs.email,
        password: inputs.password,
      });
      console.log(response.data);
    } catch (error) {
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
        <Image style={styles.logo} source={require('../../imgs/fiufit.png')} />
      </View>
      <View style={styles.inputContainer}>
        <Input
          // @ts-ignore
          placeholder="Enter your email"
          placeholderTextColor={COLORS.darkGrey}
          onChangeText={(text: string) => handleOnChange(text, 'email')}
          labelText="Email"
          labelColor={COLORS.white}
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
          labelText="Password"
          labelColor={COLORS.white}
          onChangeText={(text: string) => handleOnChange(text, 'password')}
          password
          error={errors.password}
          onFocus={() => {
            handleError('', 'password');
          }}
        />
        <Button
          title="Sign In"
          backgroundColor={COLORS.darkBlue}
          onPress={validate}
        />
        <Text
          onPress={() => navigation.push('SignUp')}
          style={styles.alreadyText}>
          Don't have an account?
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

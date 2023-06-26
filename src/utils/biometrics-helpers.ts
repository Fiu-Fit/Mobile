import AsyncStorage from '@react-native-async-storage/async-storage';
import LoggerFactory from './logger-utility';
import TouchID from 'react-native-touch-id';
import { axiosClient } from './constants';
import { fetchUserData } from './fetch-helpers';

const logger = LoggerFactory('boimetrics-helper');

const optionalConfigObject = {
  title: 'Authentication Required', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

interface BiometricCredentials {
  email: string;
  password: string;
}

export const getBiometricLoginCredentials =
  async (): Promise<BiometricCredentials | null> => {
    logger.info('getting BiometricCredentials');
    const biometricCredentials = await AsyncStorage.getItem(
      'BiometricCredentials',
    );
    if (biometricCredentials !== null) {
      return JSON.parse(biometricCredentials) as BiometricCredentials;
    }
    return biometricCredentials;
  };

export const deviceSupportsTouchId = async () => {
  const biometryType = await TouchID.isSupported();
  return biometryType === 'TouchID';
};

export const setBiometricLoginPermission = async (newPermission: string) => {
  await AsyncStorage.setItem('BiometricPermission', newPermission);
};

export const getBiometricLoginPermission = async () => {
  return await AsyncStorage.getItem('BiometricPermission');
};

export const setBiometricLoginCredentials = async (
  email: string,
  password: string,
) => {
  await AsyncStorage.setItem(
    'BiometricCredentials',
    JSON.stringify({
      email,
      password,
    }),
  );
  logger.info('set BiometricCredentials');
};

export const authUserFingerprint = async (
  title: string,
  saveToken: (token: string) => Promise<void>,
) => {
  await TouchID.authenticate(undefined, {
    ...optionalConfigObject,
    title,
  });
  const biometricCredentials = await getBiometricLoginCredentials();
  if (biometricCredentials === null) {
    return;
  }
  const { email, password } = biometricCredentials;
  const response = await axiosClient.post('/auth/login', {
    email,
    password,
  });
  logger.debug('Saving token: ', response.data.token);
  await saveToken(response.data.token);
  if (
    biometricCredentials === null ||
    biometricCredentials.email !== email ||
    biometricCredentials.password !== password
  ) {
    setBiometricLoginCredentials(email, password);
  }
  return await fetchUserData();
};

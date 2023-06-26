import { useState } from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { RegisterScreenNavigationProp } from '../../navigation/navigation-props';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Button } from 'react-native-paper';
import { axiosClient } from '../../utils/constants';
import { useUserContext } from '../../App';

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});

const CELL_COUNT = 6;

const ConfirmRegistrationScreen = ({
  navigation,
}: {
  navigation: RegisterScreenNavigationProp;
}) => {
  const [pin, setPIN] = useState('');
  const ref = useBlurOnFulfill({ value: pin, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: pin,
    setValue: setPIN,
  });

  const { currentUser } = useUserContext();

  const handleConfirmRegistration = async () => {
    await axiosClient.patch('/auth/confirm-registration', {
      confirmationPIN: pin,
      userId: currentUser.id,
    });
    navigation.push('Home');
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Ingrese PIN de confirmacion de registro</Text>
      <CodeField
        ref={ref}
        {...props}
        value={pin}
        onChangeText={setPIN}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType='number-pad'
        textContentType='oneTimeCode'
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <Button onPress={handleConfirmRegistration}>Confirmar PIN</Button>
    </SafeAreaView>
  );
};

export default ConfirmRegistrationScreen;

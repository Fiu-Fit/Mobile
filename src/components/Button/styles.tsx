import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';

export const styles = StyleSheet.create({
  button: {
    height: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 30,
    shadowColor: COLORS.black,
    elevation: 3,
  },
  text: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

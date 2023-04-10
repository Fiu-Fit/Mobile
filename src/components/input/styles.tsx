import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.grey,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 0.5,
    elevation: 2,
  },
  icon: {
    fontSize: 22,
    color: COLORS.blue,
    marginRight: 10,
  },
  eyeIcon: {
    fontSize: 22,
    color: COLORS.blue,
  },
  input: {
    color: COLORS.blue,
    flex: 1,
  },
  textError: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 7,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

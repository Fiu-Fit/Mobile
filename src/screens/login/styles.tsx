import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue,
  },
  header: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  description: {
    fontSize: 15,
    marginVertical: 10,
    color: COLORS.light,
  },
  inputContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  alreadyText: {
    color: COLORS.grey,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  logo: {
    height: 100,
    width: 300,
    resizeMode: 'cover',
  },
});

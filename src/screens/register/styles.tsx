import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.blue,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 200,
    borderBottomEndRadius: 200,
    elevation: 2,
    alignItems: 'center',
  },
  subcontainer: {
    paddingVertical: 20,
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
    marginVertical: 20,
  },
  alreadyText: {
    color: COLORS.black,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
});

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AuthStack from './navigation/auth-navigator';
import {
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  useTheme,
} from 'react-native-paper';
import { useColorScheme } from 'react-native';

// axios.defaults.baseURL = 'http://localhost:8080'; // API Gateway URL

const customLightTheme = {
  ...MD3LightTheme,
  colors: {
    primary: 'rgb(98, 81, 166)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(231, 222, 255)',
    onPrimaryContainer: 'rgb(29, 1, 96)',
    secondary: 'rgb(96, 91, 113)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(230, 223, 249)',
    onSecondaryContainer: 'rgb(29, 25, 43)',
    tertiary: 'rgb(0, 106, 97)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(115, 248, 231)',
    onTertiaryContainer: 'rgb(0, 32, 29)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(250, 253, 251)',
    onBackground: 'rgb(25, 28, 27)',
    surface: 'rgb(250, 253, 251)',
    onSurface: 'rgb(25, 28, 27)',
    surfaceVariant: 'rgb(218, 229, 225)',
    onSurfaceVariant: 'rgb(63, 73, 70)',
    outline: 'rgb(111, 121, 118)',
    outlineVariant: 'rgb(190, 201, 197)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(45, 49, 48)',
    inverseOnSurface: 'rgb(239, 241, 239)',
    inversePrimary: 'rgb(84, 219, 200)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(238, 246, 243)',
      level2: 'rgb(230, 241, 239)',
      level3: 'rgb(223, 237, 234)',
      level4: 'rgb(220, 236, 232)',
      level5: 'rgb(215, 233, 229)',
    },
    surfaceDisabled: 'rgba(25, 28, 27, 0.12)',
    onSurfaceDisabled: 'rgba(25, 28, 27, 0.38)',
    backdrop: 'rgba(41, 50, 48, 0.4)',
    quaternary: 'rgb(0, 99, 153)',
    onQuaternary: 'rgb(255, 255, 255)',
    quaternaryContainer: 'rgb(205, 229, 255)',
    onQuaternaryContainer: 'rgb(0, 29, 50)',
    quinary: 'rgb(161, 60, 63)',
    onQuinary: 'rgb(255, 255, 255)',
    quinaryContainer: 'rgb(255, 218, 216)',
    onQuinaryContainer: 'rgb(65, 0, 7)',
  },
};
const customDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    primary: 'rgb(203, 190, 255)',
    onPrimary: 'rgb(51, 32, 116)',
    primaryContainer: 'rgb(74, 57, 140)',
    onPrimaryContainer: 'rgb(231, 222, 255)',
    secondary: 'rgb(202, 195, 220)',
    onSecondary: 'rgb(50, 46, 65)',
    secondaryContainer: 'rgb(72, 68, 88)',
    onSecondaryContainer: 'rgb(230, 223, 249)',
    tertiary: 'rgb(82, 219, 203)',
    onTertiary: 'rgb(0, 55, 50)',
    tertiaryContainer: 'rgb(0, 80, 73)',
    onTertiaryContainer: 'rgb(115, 248, 231)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(25, 28, 27)',
    onBackground: 'rgb(224, 227, 225)',
    surface: 'rgb(25, 28, 27)',
    onSurface: 'rgb(224, 227, 225)',
    surfaceVariant: 'rgb(63, 73, 70)',
    onSurfaceVariant: 'rgb(190, 201, 197)',
    outline: 'rgb(137, 147, 144)',
    outlineVariant: 'rgb(63, 73, 70)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(224, 227, 225)',
    inverseOnSurface: 'rgb(45, 49, 48)',
    inversePrimary: 'rgb(0, 107, 95)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(28, 38, 36)',
      level2: 'rgb(30, 43, 41)',
      level3: 'rgb(32, 49, 46)',
      level4: 'rgb(32, 51, 48)',
      level5: 'rgb(33, 55, 51)',
    },
    surfaceDisabled: 'rgba(224, 227, 225, 0.12)',
    onSurfaceDisabled: 'rgba(224, 227, 225, 0.38)',
    backdrop: 'rgba(41, 50, 48, 0.4)',
    quaternary: 'rgb(148, 204, 255)',
    onQuaternary: 'rgb(0, 51, 82)',
    quaternaryContainer: 'rgb(0, 75, 116)',
    onQuaternaryContainer: 'rgb(205, 229, 255)',
    quinary: 'rgb(255, 179, 177)',
    onQuinary: 'rgb(99, 13, 22)',
    quinaryContainer: 'rgb(130, 37, 42)',
    onQuinaryContainer: 'rgb(255, 218, 216)',
  },
};

export type AppTheme = typeof customLightTheme;

export const useAppTheme = () => useTheme<AppTheme>();

const App = () => {
  const colorScheme = useColorScheme();
  const { DarkTheme } = adaptNavigationTheme({
    reactNavigationDark: DefaultTheme,
  });
  const { LightTheme } = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
  });
  const paperTheme =
    colorScheme === 'dark' ? customDarkTheme : customLightTheme;
  const rNavTheme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={rNavTheme}>
        <AuthStack />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

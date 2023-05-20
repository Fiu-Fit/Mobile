import { Button } from 'react-native-paper';
import { useAppTheme } from '../../App';

interface ButtonProps {
  title?: string;
  icon?: string;
  mode?:
    | 'text'
    | 'outlined'
    | 'contained'
    | 'elevated'
    | 'contained-tonal'
    | undefined;
  buttonColor?: string;
  textColor?: string;
  onPress?: () => void;
}

const IconButton = ({
  title,
  icon,
  mode,
  buttonColor,
  textColor,
  onPress = () => {},
}: ButtonProps) => {
  const theme = useAppTheme();
  return (
    <Button
      icon={icon}
      onPress={onPress}
      mode={mode ?? 'contained'}
      buttonColor={buttonColor ?? theme.colors.primary}
      textColor={textColor ?? theme.colors.onPrimary}>
      {title}
    </Button>
  );
};

export default IconButton;

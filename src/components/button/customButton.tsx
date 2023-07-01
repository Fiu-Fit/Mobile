import { Button, IconButton } from 'react-native-paper';
import { useAppTheme } from '../../App';
import { RequireAtLeastOne } from '../../utils/custom-types';

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
  size?: number;
  onPress?: () => void;
  keyPrefix?: string;
}

const CustomButton = ({
  title,
  icon,
  mode,
  buttonColor,
  textColor,
  size,
  onPress = () => {},
  keyPrefix,
}: RequireAtLeastOne<ButtonProps, 'title' | 'icon'>) => {
  const theme = useAppTheme();
  return title ? (
    <Button
      key={`${keyPrefix}-custom-button`}
      icon={icon}
      onPress={onPress}
      mode={mode ?? 'contained'}
      buttonColor={buttonColor ?? theme.colors.primary}
      textColor={textColor ?? theme.colors.onPrimary}>
      {title}
    </Button>
  ) : (
    <IconButton
      key={`${keyPrefix}-custom-icon-button`}
      icon={icon ?? 'alert'}
      size={size}
      onPress={onPress}
    />
  );
};

export default CustomButton;

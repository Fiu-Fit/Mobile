import { Button, IconButton } from 'react-native-paper';
import { useAppTheme } from '../../../App';

interface FloatingActionButtonProps {
  icon?: string;
  descriptive?: boolean;
  text?: string;
  bottom?: number;
  right?: number;
  onPress?: () => void;
}

const FloatingActionButton = ({
  icon = 'plus',
  text = 'Add',
  descriptive = false,
  bottom = 20,
  right = 20,
  onPress = () => {},
}: FloatingActionButtonProps) => {
  const theme = useAppTheme();
  return descriptive ? (
    <Button mode='contained' onPress={() => onPress()}>
      {text}
    </Button>
  ) : (
    <IconButton
      style={{ position: 'absolute', bottom, right }}
      icon={icon}
      iconColor={theme.colors.onPrimary}
      containerColor={theme.colors.primary}
      size={40}
      onPress={() => onPress()}
      mode='contained'
    />
  );
};

export default FloatingActionButton;

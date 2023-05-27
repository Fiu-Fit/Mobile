import { Button, IconButton } from 'react-native-paper';
import { useAppTheme } from '../../../App';

interface FloatingActionButtonProps {
  icon?: string;
  descriptive?: boolean;
  bottom?: number;
  right?: number;
  onPress?: () => void;
}

const FloatingActionButton = ({
  icon = 'plus',
  descriptive = false,
  bottom = 20,
  right = 20,
  onPress = () => {},
}: FloatingActionButtonProps) => {
  const theme = useAppTheme();
  return descriptive ? (
    <Button mode='contained' onPress={() => onPress()}>
      Add
    </Button>
  ) : (
    <IconButton
      style={{ position: 'absolute', bottom, right }}
      icon={icon}
      iconColor={theme.colors.onQuinary}
      containerColor={theme.colors.quinary}
      size={40}
      onPress={() => onPress()}
      mode='contained'
    />
  );
};

export default FloatingActionButton;

import { Button, IconButton } from 'react-native-paper';
import { useAppTheme } from '../../../App';

interface FloatingActionButtonProps {
  icon?: string;
  descriptive?: boolean;
  onPress?: () => void;
}

const FloatingActionButton = ({
  icon = 'plus',
  descriptive = false,
  onPress = () => {},
}: FloatingActionButtonProps) => {
  const theme = useAppTheme();
  return descriptive ? (
    <Button mode='contained' onPress={() => onPress()}>
      Add
    </Button>
  ) : (
    <IconButton
      style={{ position: 'absolute', bottom: 20, right: 20 }}
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

import { Button, IconButton } from 'react-native-paper';
import { useAppTheme } from '../../App';

interface AddButtonProps {
  descriptive?: boolean;
  onPress?: () => void;
}

const AddButton = ({
  descriptive = false,
  onPress = () => {},
}: AddButtonProps) => {
  const theme = useAppTheme();
  return descriptive ? (
    <Button mode='contained' onPress={() => onPress()}>
      Add
    </Button>
  ) : (
    <IconButton
      style={{ position: 'absolute', bottom: 20, right: 20 }}
      icon='plus'
      iconColor={theme.colors.onQuinary}
      containerColor={theme.colors.quinary}
      size={40}
      onPress={() => onPress()}
      mode='contained'
    />
  );
};

export default AddButton;

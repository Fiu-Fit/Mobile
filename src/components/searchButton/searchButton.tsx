import { Button, IconButton } from 'react-native-paper';
import { useAppTheme } from '../../App';

interface SearchButtonProps {
  descriptive?: boolean;
  onPress?: () => void;
}

const SearchButton = ({
  descriptive = false,
  onPress = () => {},
}: SearchButtonProps) => {
  const theme = useAppTheme();
  return descriptive ? (
    <Button mode='contained' onPress={() => onPress()}>
      Search
    </Button>
  ) : (
    <IconButton
      icon='magnify'
      iconColor={theme.colors.onQuinary}
      containerColor={theme.colors.quinary}
      size={25}
      onPress={() => onPress()}
      mode='contained'
    />
  );
};

export default SearchButton;

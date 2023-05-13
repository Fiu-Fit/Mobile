import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../../App';

type WorkoutHeaderProps = {
  name: string;
  description: string;
};

const WorkoutHeader = ({ name, description }: WorkoutHeaderProps) => {
  const appTheme = useAppTheme();
  return (
    <View
      className='items-center justify-center'
      style={{ backgroundColor: appTheme.colors.background, flex: 0.2 }}>
      <Text
        className='text-4xl mt-10'
        style={{ color: appTheme.colors.onBackground }}>
        {name}
      </Text>
      <Text
        className='text-lg'
        style={{ color: appTheme.colors.onSurfaceVariant }}>
        {description}
      </Text>
    </View>
  );
};

export default WorkoutHeader;

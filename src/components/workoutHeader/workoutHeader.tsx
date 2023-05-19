import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';

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
      <View className='flex-row justify-around items-center flex-1 mr-10'>
        <View className='items-center justify-center' style={{ flex: 0.7 }}>
          <Text
            className='text-lg'
            style={{ color: appTheme.colors.onSurfaceVariant, flex: 0.5 }}>
            {description}
          </Text>
        </View>

        <TouchableOpacity
          className='justify-center items-center flex-row'
          style={{ flex: 0.3 }}>
          <Icon
            style={{ fontSize: 22, color: COLORS.blue, marginRight: 5 }}
            name='account-outline'
          />
          <Text className='text-lg' style={{ color: COLORS.blue }}>
            Jorge
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkoutHeader;

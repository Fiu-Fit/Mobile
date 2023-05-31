import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '../../App';

type WorkoutFilterProps = {
  iconName: string;
  text: string;
  onPress: () => void;
};

export const WorkoutFilter = ({
  iconName,
  text,
  onPress,
}: WorkoutFilterProps) => {
  const appTheme = useAppTheme();

  return (
    <TouchableOpacity
      className='flex-row justify-around my-2 w-full'
      onPress={onPress}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 20 }}>
          <Icon
            style={{
              fontSize: 22,
              color: appTheme.colors.primary,
              marginRight: 10,
            }}
            name={iconName}
          />
          <Text>{text}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{ color: appTheme.colors.primary }}>Cualquiera</Text>
          <Icon
            style={{
              fontSize: 22,
              color: appTheme.colors.primary,
              marginRight: 10,
            }}
            name='chevron-down'
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutFilter;

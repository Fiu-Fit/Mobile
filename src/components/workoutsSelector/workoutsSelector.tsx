import { TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../../App';
import { Text } from 'react-native-paper';

interface WorkoutSelectorProps {
  showingAllWorkouts: boolean;
  onPress: (showAllWorkouts: boolean) => void;
}

const WorkoutsSelector = ({
  showingAllWorkouts,
  onPress,
}: WorkoutSelectorProps) => {
  const appTheme = useAppTheme();
  return (
    <View
      className='flex-row justify-center items-center'
      style={{ flex: 0.1, backgroundColor: appTheme.colors.scrim }}>
      <TouchableOpacity
        className='justify-center items-center h-full'
        style={{
          flex: 0.5,
          borderBottomWidth: 2,
          borderBottomColor: showingAllWorkouts
            ? 'transparent'
            : appTheme.colors.primary,
        }}
        onPress={() => onPress(false)}>
        <Text>Recomendados</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className='justify-center items-center h-full'
        style={{
          flex: 0.5,
          borderBottomWidth: 2,
          borderBottomColor: showingAllWorkouts
            ? appTheme.colors.primary
            : 'transparent',
        }}
        onPress={() => onPress(true)}>
        <Text>Todos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutsSelector;

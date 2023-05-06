import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../../App';

const WorkoutCommentCard = ({ workoutComment }: string) => {
  const appTheme = useAppTheme();

  return (
    <View className='my-5'>
      <Text style={{ color: appTheme.colors.onSurfaceDisabled }}>{workoutComment}</Text>
    </View>
  );
};

export default WorkoutCommentCard;

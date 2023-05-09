import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../../App';

type WorkoutCommentCardProps = {
  workoutComment: string;
};

const WorkoutCommentCard = ({ workoutComment }: WorkoutCommentCardProps) => {
  const appTheme = useAppTheme();

  return (
    <View className='my-5'>
      <Text style={{ color: appTheme.colors.onSurfaceDisabled }}>
        {workoutComment}
      </Text>
    </View>
  );
};

export default WorkoutCommentCard;

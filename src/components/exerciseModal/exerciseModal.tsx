import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../../App';

export interface IExerciseCard {
  id: number;
  title: string;
  content: string;
}

interface ExerciseCardProps {
  exerciseItem: IExerciseCard;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    flex: 1,
  },
});

const ExerciseModal = ({ exerciseItem }: ExerciseCardProps) => {
  const appTheme = useAppTheme();

  return (
    <View className='items-center justify-center'>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
        }}
        resizeMode='cover'
      />
      <Text className='text-3xl' style={{ color: appTheme.colors.text }}>
        {exerciseItem.title} x10
      </Text>
      <Text style={{ color: appTheme.colors.text }}>Descripcion</Text>
    </View>
  );
};

export default ExerciseModal;

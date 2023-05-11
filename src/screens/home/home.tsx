import { ScrollView, View } from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import { HomeScreenNavigationProp } from '../../navigation/navigation-props';
import { useAppTheme } from '../../App';
import WorkoutCardList from '../../components/workoutCardList';

const fakeWorkoutsCards = [
  { id: '1', title: 'Abdominales', content: 'Estado' },
  { id: '2', title: 'Crossfit', content: 'Estado' },
  { id: '3', title: 'Flexiones', content: 'Estado' },
];

const MetricCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <View className='items-center justify-center'>
      <Text className='text-3xl'>{value}</Text>
      <Text>{title}</Text>
    </View>
  );
};

const HomeScreen = ({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) => {
  const appTheme = useAppTheme();

  return (
    <View
      className='flex-1'
      style={{ backgroundColor: appTheme.colors.scrim }}>
      <View style={{ flex: 0.1 }}>
        <View className='flex-row mx-5 mt-5 justify-between'>
          <Text className='text-xl mt-2'>FiuFit</Text>
          <Button
            icon='google-fit'
            mode='outlined'
            onPress={() => navigation.navigate('Login')}>
            <Text className='text-l'>Ser entrenador</Text>
          </Button>
        </View>
        <Divider className='mt-5' />
      </View>
      <View className='flex-row justify-around' style={{ flex: 0.2 }}>
        <MetricCard title={'Pasos'} value={'1200'} />
        <MetricCard title={'Calorias'} value='1200' />
        <MetricCard title={'Minutos'} value='1200' />
      </View>
      <View className='items-center justify-content' style={{ flex: 0.1 }}>
        <Text>Periodo de tiempo</Text>
      </View>
      <View style={{ flex: 0.6, backgroundColor: appTheme.colors.background }}>
        <Divider />
        <Text className='self-center text-xl my-4'>Mis entrenamientos</Text>
        <WorkoutCardList workouts={fakeWorkoutsCards} navigation={navigation} />
      </View>
    </View>
  );
};

export default HomeScreen;

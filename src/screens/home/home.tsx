import { View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { HomeScreenNavigationProp } from '../../navigation/navigation-props';
import { useAppTheme } from '../../App';
import WorkoutCardList from '../../components/itemCardList';
import { WorkoutStore } from '../../stores/workout.store';
import MetricCard from '../../components/metricCard';
import HomeHeader from '../../components/homeHeader.tsx';

const workoutsStore = new WorkoutStore();

const HomeScreen = ({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) => {
  const appTheme = useAppTheme();

  return (
    <View className='flex-1' style={{ backgroundColor: appTheme.colors.scrim }}>
      <View style={{ flex: 0.1 }}>
        <HomeHeader navigation={navigation} />
        <Divider className='mt-5' />
      </View>
      <View className='flex-row justify-around' style={{ flex: 0.2 }}>
        <MetricCard title={'Ejercicios'} value={'120'} />
        <MetricCard title={'Calorias'} value='12000' />
        <MetricCard title={'Minutos'} value='400' />
      </View>
      <View className='justify-center items-center' style={{ flex: 0.1 }}>
        <Text>Calendario</Text>
      </View>
      <View style={{ flex: 0.6, backgroundColor: appTheme.colors.background }}>
        <Divider />
        <Text className='self-center text-xl my-4'>Mis entrenamientos</Text>
        <WorkoutCardList
          workouts={workoutsStore.cardsInfo}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

import { Image, View } from 'react-native';
import { useAppTheme } from '../../App';
import { GoalScreenNavigationProp } from '../../navigation/navigation-props';
import { observer } from 'mobx-react';
import { Divider, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const goalDetailStore = new GoalDetailStore();

type GoalScreenProps = {
  navigation: GoalScreenNavigationProp;
  route: {
    params: {
      itemId: string;
    };
  };
};

const GoalScreen = ({ navigation, route }: GoalScreenProps) => {
  const appTheme = useAppTheme();
  const { itemId } = route.params;

  /*
  useEffect(() => {
    flowResult(goalDetailStore.fetchGoal(itemId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/

  return (
    <View
      className='flex-1'
      style={{ backgroundColor: appTheme.colors.background }}>
      <View className='justify-center items-center' style={{ flex: 0.2 }}>
        <Text
          style={{ color: appTheme.colors.onBackground }}
          className='text-3xl self-center'>
          Hacer abdominales
        </Text>
        <Text
          className='text-lg'
          style={{ color: appTheme.colors.onSurfaceVariant }}>
          Descripción
        </Text>
      </View>
      <View
        className='items-center justify-around'
        style={{ backgroundColor: appTheme.colors.backdrop, flex: 0.6 }}>
        <Text className='text-xl text-red-400'>Pendiente</Text>
        <Image
          className='h-20 w-80'
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
          }}
          resizeMode='cover'
        />
        <Text className='text-xl'>x 10</Text>
      </View>
      <View
        className='flex-row items-center justify-around'
        style={{ flex: 0.2 }}>
        <Icon size={50} name={'delete'} />
        <Icon size={50} name={'pencil'} />
      </View>
    </View>
  );
};

export default observer(GoalScreen);
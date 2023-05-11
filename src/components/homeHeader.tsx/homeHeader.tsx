import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { HomeScreenNavigationProp } from '../../navigation/navigation-props';

const HomeHeader = ({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) => {
  return (
    <View className='flex-row mx-5 mt-5 justify-between'>
      <Text className='text-xl mt-2'>FiuFit</Text>
      <Button
        icon='google-fit'
        mode='outlined'
        onPress={() => navigation.navigate('Login')}>
        <Text className='text-l'>Ser entrenador</Text>
      </Button>
    </View>
  );
};

export default HomeHeader;

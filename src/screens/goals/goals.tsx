import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { GoalsScreenNavigationProp } from '../../navigation/navigation-props';
import { useAppTheme } from '../../App';
import Button from '../../components/button';

const GoalsScreen = ({
  navigation,
}: {
  navigation: GoalsScreenNavigationProp;
}) => {
  const appTheme = useAppTheme();

  return (
    <View
      className='flex-1 justify-around items-center'
      style={{ backgroundColor: appTheme.colors.backdrop }}>
      <View className='flex-row'>
        <Text className='text-3xl'>Establece tus metas</Text>
      </View>

      <View className='flex-row mx-10'>
        <Button
          title='Continuar'
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
      </View>
    </View>
  );
};

export default GoalsScreen;

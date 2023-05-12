import { Image, View } from 'react-native';

const FiuFitLogo = () => {
  return (
    <View className='my-20 justify-center align-center'>
      <Image
        className='scale-75 self-center'
        source={require('../../../imgs/fiufit.png')}
      />
    </View>
  );
};

export default FiuFitLogo;

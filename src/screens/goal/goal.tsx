import { Image, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../../App';
import { GoalScreenNavigationProp } from '../../navigation/navigation-props';
import { observer } from 'mobx-react';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { action } from 'mobx';
import { useCallback, useState } from 'react';
import { goalStore } from '../../stores/goal.store';
import { useFocusEffect } from '@react-navigation/native';
import EditGoalModal from '../../components/editGoalModal';
import LoggerFactory from '../../utils/logger-utility';
import SocialShare from '../../components/socialShare';
import { GoalStatus } from '../../utils/goal-types';
import MultimediaModal from '../../components/multimediaModal/multimediaModal';

const logger = LoggerFactory('goal-screen');

type GoalScreenProps = {
  navigation: GoalScreenNavigationProp;
  route: {
    params: {
      itemId: number;
    };
  };
};

const GoalScreen = (props: GoalScreenProps) => {
  const appTheme = useAppTheme();
  const [showingEditGoalModal, setShowingEditGoalModal] = useState(false);
  const [showingMultimediaModal, setShowingMultimediaModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      action(() => {
        logger.debug('Props: ', props);
        goalStore.fetchGoal(props.route.params.itemId);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <View
      className='flex-1'
      style={{ backgroundColor: appTheme.colors.background }}>
      <View className='justify-center items-center' style={{ flex: 0.2 }}>
        <Text
          style={{ color: appTheme.colors.onBackground }}
          className='text-3xl self-center'>
          {goalStore.currentGoal?.title}
        </Text>
        <Text
          className='text-lg'
          style={{ color: appTheme.colors.onSurfaceVariant }}>
          {goalStore.currentGoal?.description}
        </Text>
        {(goalStore.currentGoal?.status === GoalStatus.COMPLETED ||
          goalStore.currentGoal?.status === GoalStatus.COMPLETEDLATE) && (
          <SocialShare
            content={{
              title: goalStore.currentGoal?.title,
              message: goalStore.currentGoal?.description,
              type: 'goal',
            }}
          />
        )}
      </View>
      <View
        className='items-center justify-around'
        style={{ backgroundColor: appTheme.colors.backdrop, flex: 0.6 }}>
        <Text className='text-xl text-red-400'>
          {goalStore.currentGoal?.status}
        </Text>
        <Image
          className='h-20 w-80'
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
          }}
          resizeMode='cover'
        />
        <Text className='text-xl'>x {goalStore.currentGoal?.targetValue}</Text>
      </View>
      <View
        className='flex-row items-center justify-around'
        style={{ flex: 0.2 }}>
        <TouchableOpacity
          onPress={() => {
            goalStore.deleteGoal();
            props.navigation.push('GoalsScreen');
          }}>
          <Icon size={50} name={'delete'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowingEditGoalModal(true)}>
          <Icon size={50} name={'pencil'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowingMultimediaModal(true)}>
          <Icon size={50} name={'attachment'} />
        </TouchableOpacity>
      </View>
      {showingEditGoalModal && (
        <EditGoalModal onDismiss={() => setShowingEditGoalModal(false)} />
      )}
      {showingMultimediaModal && (
        <MultimediaModal
          onDismiss={() => setShowingMultimediaModal(false)}
          store={goalStore}
        />
      )}
    </View>
  );
};

export default observer(GoalScreen);

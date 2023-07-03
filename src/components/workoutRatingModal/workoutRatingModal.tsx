import { Text, View } from 'react-native';
import { useAppTheme, useUserContext } from '../../App';
import { Modal, Portal, Divider } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
import { FlatList } from 'react-native';
import WorkoutCommentCard from '../workoutCommentCard';
import React from 'react';
import LoggerFactory from '../../utils/logger-utility';
import Loader from '../loader';
import { workoutDetailStore } from '../../stores/workoutDetail.store';
import { runInAction } from 'mobx';
import Input from '../input';
import Button from '../button';
import { observer } from 'mobx-react';

const logger = LoggerFactory('workout-rating-modal');

const DEFAULT_RATING_VALUE = 3;

type WorkoutRatingModalProps = {
  onDismiss: () => void;
};

const WorkoutRatingModal = ({ onDismiss }: WorkoutRatingModalProps) => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();
  const [loading, setLoading] = React.useState(false);
  const [rating, setRating] = React.useState(DEFAULT_RATING_VALUE);
  const [comment, setComment] = React.useState<string | undefined>('');
  const commentError = '';

  const containerStyle = {
    flex: 1,
    backgroundColor: appTheme.colors.surface,
    marginHorizontal: '5%',
    marginVertical: '5%',
    width: '90%',
    height: '80%',
    borderRadius: 20,
  };

  const ratingCompleted = () => {
    setLoading(true);
    try {
      logger.info('Rating: ', rating.toString());
      logger.info('Comment: ', comment!.toString());
      if (comment === '') {
        setComment(undefined);
      }
      runInAction(() => {
        workoutDetailStore.createWorkoutRating(currentUser.id, rating, comment);
        workoutDetailStore.fetchWorkout(workoutDetailStore.workout._id);
      });
    } catch (error) {
      logger.error(error as string);
    }
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <Portal>
      <Modal
        visible={true}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}>
        <View className='items-center' style={{ flex: 0.4 }}>
          <Text
            className='my-5'
            style={{ color: appTheme.colors.onBackground }}>
            Puntúa este entrenamiento
          </Text>
          <AirbnbRating
            count={5}
            defaultRating={DEFAULT_RATING_VALUE}
            reviews={['Terrible', 'Malo', 'OK', 'Bueno', 'Muy bueno']}
            onFinishRating={(newRating: number) => setRating(newRating)}
          />
          <Text className='mt-5'>
            Valoración global: {workoutDetailStore.workout.averageRating}
          </Text>
        </View>
        <View className='items-center' style={{ flex: 0.5 }}>
          <Text
            className='text-xl'
            style={{ color: appTheme.colors.onBackground }}>
            Comentarios
          </Text>
          <FlatList
            className='mx-10 mt-2 mb-2'
            data={workoutDetailStore?.workoutComments}
            ItemSeparatorComponent={() => <Divider bold />}
            renderItem={({ item }) => (
              <WorkoutCommentCard workoutComment={item} />
            )}
          />
        </View>
        <View
          className='items-center justify-around flex-row'
          style={{ flex: 0.1, width: '100%' }}>
          <View className='justify-center mx-2 mb-3' style={{ flex: 0.7 }}>
            <Input
              value={comment!}
              error={commentError}
              placeholder='Escribe un comentario'
              placeholderTextColor={appTheme.colors.background}
              onChangeText={text => setComment(text)}
              iconName='comment-outline'
              password={false}
            />
          </View>
          <View
            className='items-center justify-center mb-2'
            style={{ flex: 0.3 }}>
            <Button title='Enviar' onPress={ratingCompleted} />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default observer(WorkoutRatingModal);

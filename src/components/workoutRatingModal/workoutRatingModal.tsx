import { Text, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../../App';
import { Modal, Portal, Divider } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
import { FlatList } from 'react-native';
import WorkoutCommentCard from '../workoutCommentCard';
import React from 'react';
import WorkoutCommentModal from '../workoutCommentModal';
import LoggerFactory from '../../utils/logger-utility';
import Loader from '../loader';
import { WorkoutRating } from '../../utils/workout-types';

const logger = LoggerFactory('workoutRating');

type WorkoutRatingModalProps = {
  onDismiss: () => void;
  workoutRatingItem: WorkoutRating;
};

const WorkoutRatingModal = ({
  onDismiss,
  workoutRatingItem,
}: WorkoutRatingModalProps) => {
  const appTheme = useAppTheme();
  const [commentModalVisible, setCommentModalVisible] = React.useState(false);
  const showCommentModal = () => setCommentModalVisible(true);
  const hideCommentModal = () => setCommentModalVisible(false);
  const [loading, setLoading] = React.useState(false);

  const containerStyle = {
    backgroundColor: appTheme.colors.surface,
    marginHorizontal: '5%',
    width: '90%',
    height: '70%',
    borderRadius: 20,
  };

  const ratingCompleted = (rating: number) => {
    setLoading(true);
    try {
      logger.info('Rating: ', rating.toString());
      //const response = await axiosClient.post('/workouts/rate/this_workout_id', rating);
    } catch (error) {
      logger.error(error as string);
    }
    setLoading(false);
  };

  return (
    <Portal>
      <Modal
        visible={true}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}>
        <View className='items-center' style={{ flex: 0.4 }}>
          {loading && <Loader />}
          <Text
            className='my-5'
            style={{ color: appTheme.colors.onBackground }}>
            Puntúa este entrenamiento
          </Text>
          <AirbnbRating
            count={5}
            defaultRating={0}
            reviews={['Terrible', 'Malo', 'OK', 'Bueno', 'Muy bueno']}
            onFinishRating={ratingCompleted}
          />
          <Text className='mt-5'>
            Valoración global: {workoutRatingItem.globalRating}
          </Text>
        </View>
        <View className='items-center mt-10' style={{ flex: 0.6 }}>
          <Text
            className='text-xl'
            style={{ color: appTheme.colors.onBackground }}>
            Comentarios
          </Text>
          <FlatList
            className='mx-10 mt-2 mb-2'
            data={workoutRatingItem.comments}
            ItemSeparatorComponent={() => <Divider bold />}
            renderItem={({ item }) => (
              <WorkoutCommentCard workoutComment={item} />
            )}
          />
          <TouchableOpacity className='mb-4' onPress={showCommentModal}>
            <Text
              className='text-xs'
              style={{ color: appTheme.colors.onBackground }}>
              Agregar
            </Text>
            <WorkoutCommentModal
              visible={commentModalVisible}
              onDismiss={hideCommentModal}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
};

export default WorkoutRatingModal;

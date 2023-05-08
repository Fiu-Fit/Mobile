import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../../App';
import { Modal, Portal, Divider } from 'react-native-paper';
import { IWorkoutRating } from '../../screens/workout/workout';
import { AirbnbRating } from 'react-native-ratings';
import { FlatList } from 'react-native';
import WorkoutCommentCard from '../workoutCommentCard';
import React from 'react';
import WorkoutCommentModal from '../workoutCommentModal';

type WorkoutRatingModalProps = {
  visible: boolean;
  onDismiss: () => void;
  workoutRatingItem: IWorkoutRating;
};

const WorkoutRatingModal = ({
  visible,
  onDismiss,
  workoutRatingItem,
}: WorkoutRatingModalProps) => {
  const appTheme = useAppTheme();
  const [commentModalVisible, setCommentModalVisible] = React.useState(false);
  const showCommentModal = () => setCommentModalVisible(true);
  const hideCommentModal = () => setCommentModalVisible(false);

  const containerStyle = {
    backgroundColor: appTheme.colors.surface,
    marginHorizontal: '5%',
    width: '90%',
    height: '70%',
    borderRadius: 20,
  };

  const ratingCompleted = (rating: number) => {
    Alert.alert('Rating Completed: ', rating.toString());
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}>
        <View className='items-center' style={{ flex: 0.4 }}>
          <Text className='my-5' style={{ color: appTheme.colors.text }}>
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
          <Text className='text-xl' style={{ color: appTheme.colors.text }}>
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
            <Text className='text-xs' style={{ color: appTheme.colors.text }}>
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

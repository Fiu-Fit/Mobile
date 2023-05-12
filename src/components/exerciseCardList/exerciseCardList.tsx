import { FlatList, View } from 'react-native';
import ExerciseCard from '../exerciseCard';
import { IExerciseCard } from '../../utils/workout-types';
import { CardInfo } from '../../utils/custom-types';
import ExerciseModal from '../exerciseModal';
import React from 'react';

interface ExerciseCardListProps {
  exercises: IExerciseCard[] | CardInfo[];
}

const ExerciseCardList = ({ exercises }: ExerciseCardListProps) => {
  const [visibleMap, setVisibleMap] = React.useState<{
    [key: string]: boolean;
  }>({});

  const showModal = (exerciseId: string) => {
    setVisibleMap(prevVisibleMap => ({
      ...prevVisibleMap,
      [exerciseId]: true,
    }));
  };

  const hideModal = (exerciseId: string) => {
    setVisibleMap(prevVisibleMap => ({
      ...prevVisibleMap,
      [exerciseId]: false,
    }));
  };

  return (
    <>
      <FlatList
        className='mt-5 mb-4'
        data={exercises}
        renderItem={({ item }) => (
          <View>
            <ExerciseModal
              visible={visibleMap[item.id]}
              onDismiss={() => hideModal(item.id)}
              exerciseItem={item as IExerciseCard}
            />
            <ExerciseCard
              exerciseItem={item}
              onPress={() => showModal(item.id)}
            />
          </View>
        )}
        keyExtractor={item => `exercise-card-${item.id}`}
      />
    </>
  );
};

export default ExerciseCardList;

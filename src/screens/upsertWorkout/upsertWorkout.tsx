import { ScrollView, View } from 'react-native';
import { useAppTheme, useUserContext } from '../../App';
import { UpsertWorkoutScreenNavigationProp } from '../../navigation/navigation-props';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import Loader from '../../components/loader';
import { flowResult, runInAction } from 'mobx';
import CustomButton from '../../components/button';
import {
  CategoryType,
  ExerciseCardInfo,
  Unit,
  WorkoutProps,
} from '../../utils/workout-types';
import { workoutDetailStore } from '../../stores/workoutDetail.store';
import LoggerFactory from '../../utils/logger-utility';
import Input from '../../components/input';
import { FieldArray, Formik } from 'formik';
import ItemCard from '../../components/itemCard';
import EditExerciseModal from '../../components/editExerciseModal';
import { launchImageLibrary } from 'react-native-image-picker';
import Button from '../../components/button';
import { Text } from 'react-native-paper';

type UpsertWorkoutScreenProps = {
  navigation: UpsertWorkoutScreenNavigationProp;
  route: {
    params: {
      itemId?: string;
    };
  };
};

type UpsertWorkoutFormValue = Omit<
  WorkoutProps,
  'rating' | 'athleteIds' | 'multimedia'
>;

const logger = LoggerFactory('upsert-workout-screen');

const UpsertWorkoutScreen = ({
  navigation,
  route,
}: UpsertWorkoutScreenProps) => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();
  const [selectedExercise, setSelectedExercise] = React.useState<
    ExerciseCardInfo | undefined
  >(undefined);
  const { itemId } = route.params;
  const [selectedMultimedia, setSelectedMultimedia] = React.useState<string[]>(
    [],
  );

  useEffect(() => {
    flowResult(workoutDetailStore.fetchWorkout(itemId ?? ''));
    setSelectedMultimedia(workoutDetailStore.workout.multimedia);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitWorkout = async () => {
    runInAction(() => {
      workoutDetailStore.workout.multimedia = selectedMultimedia;
    });
    await workoutDetailStore.upsertStoredWorkout();
    navigation.navigate('Workouts', {
      screen: 'WorkoutScreen',
      params: { itemId: workoutDetailStore.workout._id },
    })
  };

  return workoutDetailStore.state === 'pending' ? (
    <Loader />
  ) : (
    <ScrollView
      key={'upsertWorkout-scrollview'}
      className='flex-1'
      style={{ backgroundColor: appTheme.colors.background }}>
      <Formik<UpsertWorkoutFormValue>
        initialValues={{
          _id: workoutDetailStore.workout._id,
          name: workoutDetailStore.workout.name,
          description: workoutDetailStore.workout.description,
          difficulty: workoutDetailStore.workout.difficulty,
          duration: workoutDetailStore.workout.duration,
          category: workoutDetailStore.workout.category,
          exercises: workoutDetailStore.workout.exercises,
          authorId: currentUser.id,
          averageRating: workoutDetailStore.workout.averageRating,
        }}
        key={'upsertWorkout-formik-form'}
        onSubmit={values => {
          runInAction(() => {
            workoutDetailStore.workout._id = values._id;
            workoutDetailStore.workout.name = values.name;
            workoutDetailStore.workout.description = values.description;
            workoutDetailStore.workout.difficulty = Number(values.difficulty);
            workoutDetailStore.workout.duration = Number(values.duration);
            workoutDetailStore.workout.category = values.category;
            workoutDetailStore.workout.authorId = currentUser.id;
          });
          handleSubmitWorkout();
        }}>
        {({ values, errors, handleChange, handleSubmit }) => (
          <>
            <Input
              key={'upsertWorkout-name-input'}
              value={values.name}
              placeholder='Workout name'
              placeholderTextColor={appTheme.colors.background}
              onChangeText={text => {
                runInAction(() => {
                  workoutDetailStore.workout.name = text;
                  handleChange('name')(text);
                });
              }}
              multiline={true}
              labelText='Workout name'
              iconName='comment-outline'
              error={errors.name}
              password={false}
              onFocus={() => {
                errors.name = '';
              }}
            />
            <Input
              key={'upsertWorkout-description-input'}
              value={values.description}
              placeholder='Workout description'
              placeholderTextColor={appTheme.colors.background}
              onChangeText={text => {
                runInAction(() => {
                  workoutDetailStore.workout.description = text;
                  handleChange('description')(text);
                });
              }}
              multiline={true}
              labelText='Workout description'
              iconName='comment-outline'
              error={errors.description}
              password={false}
              onFocus={() => {
                errors.description = '';
              }}
            />
            <Input
              key={'upsertWorkout-difficulty-input'}
              value={values.difficulty}
              placeholder='Workout difficulty'
              placeholderTextColor={appTheme.colors.background}
              onChangeText={text => {
                runInAction(() => {
                  workoutDetailStore.workout.difficulty = Number(text);
                  handleChange('difficulty')(text);
                });
              }}
              multiline={true}
              labelText='Workout difficulty'
              iconName='comment-outline'
              error={errors.difficulty}
              password={false}
              onFocus={() => {
                errors.difficulty = '';
              }}
              keyboardType='numeric'
            />
            <FieldArray
              key={'upsertWorkout-fieldarray'}
              name='exercises'
              render={arrayHelpers => (
                <>
                  {workoutDetailStore.exerciseCards.map((exercise, index) => (
                    <>
                      <ItemCard<ExerciseCardInfo>
                        key={`upsertWorkout-itemcard-exercise-${exercise.id}`}
                        item={exercise}
                        onPress={() => {
                          setSelectedExercise(exercise);
                        }}
                        onRemovePress={() =>
                          runInAction(() => {
                            logger.info('Removing ID: ', exercise.id);
                            workoutDetailStore.removeExercise(`${exercise.id}`);
                            arrayHelpers.remove(index);
                          })
                        }
                      />
                    </>
                  ))}
                  <CustomButton
                    key={'upsertWorkout-add-exercise-button'}
                    icon='plus'
                    onPress={() => {
                      workoutDetailStore.addNewExercise({
                        _id: workoutDetailStore.newExercises.size.toString(),
                        exerciseId: '',
                        sets: 0,
                        reps: 0,
                        unit: Unit.SECONDS,
                        exercise: {
                          _id: '',
                          name: '',
                          description: '',
                          category: CategoryType.FULLBODY,
                        },
                      });
                      setSelectedExercise(
                        workoutDetailStore.exerciseCards.find(
                          exerciseCard =>
                            exerciseCard.id ===
                            (
                              workoutDetailStore.newExercises.size - 1
                            ).toString(),
                        ) as ExerciseCardInfo,
                      );
                      logger.info('Adding new Exercise');
                    }}
                  />
                </>
              )}
            />
            <View className='my-5 items-center justify-center'>
              <Button
                title='Adjuntar multimedia'
                onPress={async () => {
                  launchImageLibrary(
                    {
                      mediaType: 'mixed',
                      includeBase64: false,
                      maxHeight: 200,
                      maxWidth: 200,
                    },
                    async response => {
                      if (response.assets) {
                        logger.debug(
                          'Selected multimedia: ',
                          response.assets![0].uri,
                        );
                        setSelectedMultimedia([
                          ...Array.from(selectedMultimedia),
                          response.assets![0].uri!,
                        ]);
                      }
                    },
                  );
                }}
              />
              <View>
                {selectedMultimedia.map((filename, index) => (
                  <Text
                    className='text-l'
                    key={index}
                    style={{ color: appTheme.colors.outline }}>
                    {filename.slice(59)}
                  </Text>
                ))}
              </View>
            </View>

            <CustomButton
              key={'upsertWorkout-send-workout-button'}
              title='Enviar'
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
      {selectedExercise && (
        <EditExerciseModal
          key={'edit-exercise-modal'}
          onDismiss={() => setSelectedExercise(undefined)}
          exerciseItem={selectedExercise}
        />
      )}
    </ScrollView>
  );
};

export default observer(UpsertWorkoutScreen);

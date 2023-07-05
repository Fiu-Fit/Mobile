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
  categoryMap,
  workoutCategoryOptions,
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
import WorkoutFilterModal from '../../components/workoutFilterModal';

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
  'rating' | 'athleteIds' | 'multimedia' | 'category'
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
  const [categoryModalVisible, setCategoryModalVisible] = React.useState(false);

  useEffect(() => {
    logger.debug('Upserting...');
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
    });
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
          exercises: workoutDetailStore.workout.exercises,
          authorId: currentUser.id,
          averageRating: workoutDetailStore.workout.averageRating,
        }}
        onSubmit={values => {
          runInAction(() => {
            workoutDetailStore.workout._id = values._id;
            workoutDetailStore.workout.name = values.name;
            workoutDetailStore.workout.description = values.description;
            workoutDetailStore.workout.difficulty = Number(values.difficulty);
            workoutDetailStore.workout.duration = Number(values.duration);
            workoutDetailStore.workout.authorId = currentUser.id;
          });
          handleSubmitWorkout();
        }}>
        {({ values, errors, handleChange, handleSubmit }) => (
          <View className='mx-5'>
            {categoryModalVisible && (
              <WorkoutFilterModal
                onDismiss={() => setCategoryModalVisible(false)}
                onSelect={(category: number | undefined) => {
                  runInAction(() => {
                    workoutDetailStore.workout.category =
                      category !== -1 ? category : -1;
                  });
                }}
                items={workoutCategoryOptions}
              />
            )}
            <Input
              value={values.name}
              placeholder='Nombre'
              placeholderTextColor={appTheme.colors.background}
              onChangeText={text => {
                runInAction(() => {
                  workoutDetailStore.workout.name = text;
                  handleChange('name')(text);
                });
              }}
              multiline={true}
              iconName='dumbbell'
              labelText='Nombre'
              error={errors.name}
              password={false}
              onFocus={() => {
                errors.name = '';
              }}
            />
            <Input
              value={values.description}
              placeholder='Descripción'
              placeholderTextColor={appTheme.colors.background}
              onChangeText={text => {
                runInAction(() => {
                  workoutDetailStore.workout.description = text;
                  handleChange('description')(text);
                });
              }}
              multiline={true}
              iconName='dumbbell'
              labelText='Descripción'
              error={errors.description}
              password={false}
              onFocus={() => {
                errors.description = '';
              }}
            />
            <View className='flex-row mb-2 justify-between items-center'>
              <View style={{ width: '30%', marginRight: 5 }}>
                <Input
                  value={values.difficulty}
                  placeholder='Dificultad'
                  placeholderTextColor={appTheme.colors.background}
                  onChangeText={text => {
                    runInAction(() => {
                      workoutDetailStore.workout.difficulty = Number(text);
                      handleChange('difficulty')(text);
                    });
                  }}
                  multiline={true}
                  labelText='Dificultad'
                  iconName='dumbbell'
                  error={errors.difficulty}
                  password={false}
                  onFocus={() => {
                    errors.difficulty = '';
                  }}
                  keyboardType='numeric'
                />
              </View>
              <View style={{ width: '30%', marginRight: 5 }}>
                <Input
                  value={values.duration}
                  placeholder='Duración'
                  placeholderTextColor={appTheme.colors.background}
                  onChangeText={text => {
                    runInAction(() => {
                      workoutDetailStore.workout.duration = Number(text);
                      handleChange('duration')(text);
                    });
                  }}
                  multiline={true}
                  labelText='Duración'
                  iconName='clock'
                  error={errors.duration}
                  password={false}
                  onFocus={() => {
                    errors.duration = '';
                  }}
                  keyboardType='numeric'
                />
              </View>
              <View style={{ width: '30%', marginTop: 50 }}>
                <Button
                  title={
                    categoryMap.get(
                      workoutDetailStore.workout.category ?? -1,
                    ) || 'Desconocido'
                  }
                  onPress={() => {
                    setCategoryModalVisible(true);
                  }}
                  icon='label-variant'
                />
              </View>
            </View>
            <FieldArray
              key={'upsertWorkout-fieldarray'}
              name='exercises'
              render={arrayHelpers => (
                <>
                  {workoutDetailStore.exerciseCards.map((exercise, index) => (
                    <ItemCard<ExerciseCardInfo>
                      key={`upsertWorkout-${index}-${exercise.id}-key`}
                      keyPrefix={`upsertWorkout-${index}-${exercise.id}`}
                      profileCard={false}
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
                  ))}
                  <View className='items-center'>
                    <CustomButton
                      keyPrefix={'upsertWorkout-add-exercise-button'}
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
                            category: CategoryType.UNRECOGNIZED,
                          },
                          category: CategoryType.UNRECOGNIZED,
                          repDuration: 0,
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
                  </View>
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
                    key={`selected-multimedia-${index}`}
                    style={{ color: appTheme.colors.outline }}>
                    {filename.slice(59)}
                  </Text>
                ))}
              </View>
            </View>

            <CustomButton
              keyPrefix={'upsertWorkout-send-workout-button'}
              title='Enviar'
              onPress={handleSubmit}
            />
          </View>
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

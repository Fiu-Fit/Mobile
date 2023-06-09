import { Image, ScrollView, View } from 'react-native';
import { useAppTheme } from '../../App';
import { List, Modal, Portal } from 'react-native-paper';
import {
  CategoryType,
  Exercise,
  ExerciseCardInfo,
  Unit,
  WorkoutExercise,
  imageMap,
  unitMap,
} from '../../utils/workout-types';
import { Formik, isNaN } from 'formik';
import { workoutDetailStore } from '../../stores/workoutDetail.store';
import CustomButton from '../button/customButton';
import Input from '../input';
import { runInAction } from 'mobx';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../utils/constants';
import LoggerFactory from '../../utils/logger-utility';
import { observer } from 'mobx-react';

type ModalProps = {
  onDismiss: () => void;
  exerciseItem: ExerciseCardInfo;
};
type UpsertExerciseFormValue = Omit<WorkoutExercise, 'rating' | 'athleteIds'>;

const logger = LoggerFactory('edit-exercise-modal');

const FolderIcon = (props: any) => <List.Icon {...props} icon='folder' />;

const EditExerciseModal = ({ onDismiss, exerciseItem }: ModalProps) => {
  const appTheme = useAppTheme();
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<
    Exercise | undefined
  >(undefined);
  const [selectedUnit, setSelectedUnit] = useState<Unit | undefined>(undefined);
  const workoutExercise = workoutDetailStore.workout.exercises.get(
    `${exerciseItem.id}`,
  ) ??
    workoutDetailStore.newExercises.get(`${exerciseItem.id}`) ?? {
      _id: workoutDetailStore.newExercises.size.toString(),
      exerciseId: '',
      exercise: {
        _id: '',
        name: '',
        description: '',
        category: '',
      } as unknown as Exercise,
      sets: 0,
      reps: 0,
      unit: Unit.UNRECOGNIZED,
      weight: 0,
      repDuration: 3,
      category: CategoryType.UNRECOGNIZED,
    };
  const containerStyle = {
    backgroundColor: appTheme.colors.surface,
    marginHorizontal: '5%',
    width: '90%',
    height: '70%',
    borderRadius: 20,
  };

  useEffect(() => {
    const fetchExerciseList = async () => {
      let exercises;
      try {
        const { data } = await axiosClient.get<Exercise[]>('/exercises');
        exercises = data;
        logger.info('Got available exercises: ', exercises);
      } catch (e) {
        logger.error('Error while fetching exercise list: ', e);
      }
      setExerciseList(exercises ?? []);
      setSelectedExercise(workoutExercise.exercise);
      setSelectedUnit(workoutExercise.unit);
    };
    logger.info('Unit map:', unitMap);

    fetchExerciseList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Portal>
      <Modal
        key={'edit-exercise-modal'}
        visible={true}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}>
        <View className='items-center' style={{ flex: 1 }}>
          <View
            key={'edit-exercise-modal-image-view'}
            className='items-center mx-10 justify-between'
            style={{ flex: 0.5 }}>
            <Image
              key={'edit-exercise-modal-image'}
              style={{ width: 300, height: '100%' }}
              source={{
                uri:
                  imageMap.get(Number(selectedExercise?.category) ?? '') ??
                  'https://firebasestorage.googleapis.com/v0/b/fiufit-e9664.appspot.com/o/resources%2Ferror.png?alt=media&token=252e80d6-d0bb-4281-a3a8-923218af07d6',
              }}
            />
          </View>
          <ScrollView
            key={'edit-exercise-modal-scrollview'}
            className='flex-1'
            style={{
              backgroundColor: appTheme.colors.background,
              width: '90%',
            }}>
            <Formik<UpsertExerciseFormValue>
              initialValues={{
                _id: workoutExercise?._id ?? '',
                exercise:
                  workoutExercise?.exercise ??
                  ({
                    _id: '',
                    name: '',
                    description: '',
                    category: '',
                  } as unknown as Exercise),
                exerciseId: workoutExercise.exercise._id,
                sets: workoutExercise?.sets ?? 0,
                reps: workoutExercise?.reps ?? 0,
                unit: (workoutExercise?.unit as Unit) ?? Unit.UNRECOGNIZED,
                weight: workoutExercise?.weight ?? 0,
                repDuration: 3,
                category: CategoryType.UNRECOGNIZED,
              }}
              key={'edit-exercise-modal-form'}
              onSubmit={function (): void | Promise<any> {
                onDismiss();
              }}>
              {({ values, errors, handleChange }) => (
                <>
                  <List.Section
                    title='Ejercicios'
                    key={'edit-exercise-modal-exercises-section'}>
                    <List.Accordion
                      key={'edit-exercise-modal-exercises-list'}
                      title={selectedExercise?.name ?? 'Elige un ejercicio'}
                      left={props =>
                        FolderIcon({
                          key: 'edit-exercise-modal-exercises-icon',
                          ...props,
                        })
                      }>
                      {exerciseList.map((exercise, index) => (
                        <List.Item
                          key={`edit-exercise-modal-exercises-dropdown-${exercise._id}-${index}`}
                          title={exercise.name}
                          description={exercise.description}
                          onPress={() => {
                            values.exercise = exercise;
                            setSelectedExercise(exercise);
                          }}
                        />
                      ))}
                    </List.Accordion>
                  </List.Section>

                  <List.Section
                    title='Unidad'
                    key={'edit-exercise-modal-units-section'}>
                    <List.Accordion
                      key={'edit-exercise-modal-units-dropdown'}
                      title={
                        unitMap.get(selectedUnit ?? Unit.UNRECOGNIZED) ??
                        'Elige una unidad'
                      }
                      left={props =>
                        FolderIcon({
                          key: 'edit-exercise-modal-units-icon',
                          ...props,
                        })
                      }
                      onPress={() => {
                        setSelectedUnit(undefined);
                      }}
                      expanded={selectedUnit === undefined}>
                      {Array.from(unitMap.entries()).map(
                        ([key, value], index) => (
                          <List.Item
                            key={`edit-exercise-modal-unit-${key}-${value}-${index}`}
                            title={value}
                            onPress={() => {
                              values.unit = key;
                              setSelectedUnit(key);
                            }}
                          />
                        ),
                      )}
                    </List.Accordion>
                  </List.Section>
                  <Input
                    key={'edit-exercise-modal-sets-input'}
                    value={values.sets}
                    placeholder='3'
                    placeholderTextColor={appTheme.colors.background}
                    onChangeText={text => {
                      runInAction(() => {
                        if (isNaN(text)) {
                          return;
                        }
                        handleChange('sets')(text);
                      });
                    }}
                    multiline={true}
                    labelText='Sets'
                    iconName='dumbbell'
                    error={errors.sets}
                    password={false}
                    onFocus={() => {
                      errors.sets = '';
                    }}
                  />
                  <Input
                    key={'edit-exercise-modal-reps-input'}
                    value={values.reps}
                    placeholder='12'
                    placeholderTextColor={appTheme.colors.background}
                    onChangeText={text => {
                      runInAction(() => {
                        handleChange('reps')(text);
                      });
                    }}
                    multiline={true}
                    labelText='Repeticiones'
                    iconName='dumbbell'
                    error={errors.reps}
                    password={false}
                    onFocus={() => {
                      errors.reps = '';
                    }}
                  />
                  <Input
                    key={'edit-exercise-modal-weight-input'}
                    value={values.weight ?? 0}
                    placeholder='10.0'
                    placeholderTextColor={appTheme.colors.background}
                    onChangeText={text => {
                      runInAction(() => {
                        handleChange('weight')(text);
                      });
                    }}
                    multiline={true}
                    labelText='Peso (0 si no se necesita)'
                    iconName='dumbbell'
                    error={errors.weight}
                    password={false}
                    keyboardType='numeric'
                    onFocus={() => {
                      errors.weight = '';
                    }}
                  />
                  <View className='mt-5'>
                    <CustomButton
                      key={'edit-exercise-modal-save-button'}
                      title='Guardar'
                      onPress={() => {
                        runInAction(() => {
                          workoutExercise.sets = Number(values.sets);
                          workoutExercise.reps = Number(values.reps);
                          workoutExercise.weight = Number(values.weight);
                          workoutExercise.repDuration = 3;
                          workoutExercise.exercise =
                            selectedExercise ??
                            ({
                              _id: '',
                              name: '',
                              description: '',
                              category: '',
                            } as unknown as Exercise);

                          workoutExercise.unit =
                            selectedUnit ?? Unit.UNRECOGNIZED;
                        });
                        workoutDetailStore.addNewExercise(workoutExercise);
                        logger.info('workoutExercise saved: ', workoutExercise);
                        onDismiss();
                      }}
                    />
                  </View>
                </>
              )}
            </Formik>
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
};

export default observer(EditExerciseModal);

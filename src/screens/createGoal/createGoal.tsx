import { useEffect, useState } from 'react';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import Input from '../../components/input';
import Button from '../../components/button';
import Loader from '../../components/loader';
import LoggerFactory from '../../utils/logger-utility';
import { CreateGoalScreenNavigationProp } from '../../navigation/navigation-props';
import { Formik, FormikErrors } from 'formik';
import { GoalInputProps } from '../../utils/goal-types';
import { useAppTheme, useUserContext } from '../../App';
import ItemCardList from '../../components/itemCardList/itemCardList';
import { Divider } from 'react-native-paper';
import { CardInfo, DateState } from '../../utils/custom-types';
import { exerciseStore } from '../../stores/exercise.store';
import { flowResult } from 'mobx';
import { goalStore } from '../../stores/goal.store';
import { observer } from 'mobx-react';
import moment from 'moment';
import CalendarModal from '../../components/calendarModal';

const logger = LoggerFactory('create-goal');

const CreateGoalScreen = ({
  navigation,
}: {
  navigation: CreateGoalScreenNavigationProp;
}) => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [showExerciseList, setShowExerciseList] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<
    CardInfo | undefined
  >();
  const [showingCalendarModal, setShowingCalendarModal] = useState(false);
  const [date, setDate] = useState<DateState>({
    selectedDate: undefined,
    displayedDate: moment(),
  });

  const handleNewGoal = async (inputs: GoalInputProps) => {
    setLoading(true);
    try {
      inputs.exerciseId = selectedExercise?.id;
      inputs.deadline = date.selectedDate;
      console.log(inputs.deadline);
      flowResult(goalStore.createGoal(inputs, currentUser.id));
      navigation.push('GoalsScreen');
    } catch (error) {
      logger.error(error as string);
    }
    setLoading(false);
  };

  useEffect(() => {
    flowResult(exerciseStore.fetchExercises());
  }, []);

  return (
    <SafeAreaView className='flex-1 bg-black'>
      {loading && <Loader />}
      {showingCalendarModal && (
        <CalendarModal
          onDismiss={() => setShowingCalendarModal(false)}
          setDate={newDate => setDate(newDate)}
          date={date}
        />
      )}
      <View className='flex-none pt-20 items-center justify-center'>
        <Text className='text-5xl font-white text-white'>Crear Meta</Text>
      </View>
      <View className='mt-2'>
        {showExerciseList ? (
          <Text className='self-center text-xl'>Elige un ejercicio</Text>
        ) : (
          <Text className='self-center text-xl'>{selectedExercise?.title}</Text>
        )}
        <Divider className='my-5' />
      </View>
      {showExerciseList ? (
        <View className='mt-5'>
          <ItemCardList
            items={exerciseStore.cardsInfo}
            onPress={item => {
              setSelectedExercise(item);
              setShowExerciseList(false);
            }}
          />
        </View>
      ) : (
        <>
          <ScrollView className='flex-none my-15 mx-5'>
            <View>
              <Formik
                initialValues={{
                  title: '',
                  description: '',
                  exerciseId: '',
                  targetValue: '',
                }}
                validate={values => {
                  let errors: FormikErrors<GoalInputProps> = {};
                  if (!values.title) {
                    errors.title = 'Por favor ingresa un título';
                  }
                  if (!values.description) {
                    errors.description = 'Por favor ingresa una descripción';
                  }
                  if (!values.targetValue) {
                    errors.targetValue = 'Por favor elige un objetivo';
                  }
                  return errors;
                }}
                onSubmit={values => {
                  handleNewGoal(values);
                }}>
                {({ values, errors, handleChange, handleSubmit }) => (
                  <>
                    <Input
                      value={values.title}
                      placeholder='Ingresa un título'
                      placeholderTextColor={appTheme.colors.onPrimary}
                      onChangeText={handleChange('title')}
                      labelText='Título'
                      iconName='arm-flex'
                      error={errors.title}
                      password={false}
                      onFocus={() => {
                        errors.title = '';
                      }}
                    />
                    <Input
                      value={values.description}
                      placeholder='Ingresa una descripción'
                      placeholderTextColor={appTheme.colors.onPrimary}
                      onChangeText={handleChange('description')}
                      labelText='Descripción'
                      iconName='arrange-send-backward'
                      error={errors.description}
                      password={false}
                      onFocus={() => {
                        errors.description = '';
                      }}
                    />
                    <Input
                      value={values.targetValue}
                      placeholder='Ingresa un objetivo'
                      placeholderTextColor={appTheme.colors.onPrimary}
                      onChangeText={handleChange('targetValue')}
                      labelText='Objetivo'
                      iconName='vector-circle'
                      error={errors.targetValue}
                      password={false}
                      onFocus={() => {
                        errors.targetValue = '';
                      }}
                      keyboardType='numeric'
                    />
                    <View className='my-5'>
                      <Button
                        title={
                          date.selectedDate
                            ? date.selectedDate.toLocaleDateString()
                            : 'Seleccionar un deadline (opcional)'
                        }
                        onPress={() => setShowingCalendarModal(true)}
                        buttonColor={appTheme.colors.backdrop}
                        textColor={appTheme.colors.onBackground}
                      />
                    </View>

                    <Button title='Crear' onPress={handleSubmit} />
                  </>
                )}
              </Formik>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default observer(CreateGoalScreen);

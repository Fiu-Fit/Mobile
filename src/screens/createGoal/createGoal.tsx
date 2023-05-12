import React from 'react';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import Input from '../../components/input';
import Button from '../../components/button';
import Loader from '../../components/loader';
import LoggerFactory from '../../utils/logger-utility';
import { CreateGoalScreenNavigationProp } from '../../navigation/navigation-props';
import { Formik, FormikErrors } from 'formik';
import { ExerciseStore } from '../../stores/exercise.store';
import { GoalInputProps } from '../../utils/goal-types';
import { useAppTheme } from '../../App';
import ItemCardList from '../../components/itemCardList/itemCardList';

const execisesStore = new ExerciseStore();
const logger = LoggerFactory('create-goal');

const CreateGoalScreen = ({
  navigation,
}: {
  navigation: CreateGoalScreenNavigationProp;
}) => {
  const [loading, setLoading] = React.useState(false);
  const [showExerciseList, setShowExerciseList] = React.useState(true);
  const [selectedExerciseId, setSelectedExerciseId] = React.useState<string>();

  const appTheme = useAppTheme();
  const handleNewGoal = async (inputs: GoalInputProps) => {
    setLoading(true);
    try {
      logger.info('Inputs: ', inputs);
      logger.info('Exercise ID: ', selectedExerciseId);
      //const response = await axiosClient.post('/goals', inputs);
      navigation.push('Goals');
    } catch (error) {
      logger.error(error as string);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className='flex-1 bg-black'>
      {loading && <Loader />}
      <View className='flex-none pt-20 items-center justify-center'>
        <Text className='text-5xl font-white text-white'>Crear Meta</Text>
      </View>
      {showExerciseList ? (
        <View>
          <Text className='self-center text-xl'>Elige un ejercicio</Text>
          <ItemCardList
            items={execisesStore.cardsInfo}
            onPress={item => {
              setSelectedExerciseId(item.id);
              setShowExerciseList(false);
            }}
          />

          <Button
            title={'Continuar'}
            onPress={() => setShowExerciseList(false)}
          />
        </View>
      ) : (
        <ScrollView className='flex-none px-7'>
          <View className='my-20'>
            <Formik
              initialValues={{
                title: '',
                description: '',
                exerciseId: '',
                targetValue: '',
                deadline: '',
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
                  />
                  <Input
                    value={values.deadline}
                    placeholder='Ingresa un deadline (opcional)'
                    placeholderTextColor={appTheme.colors.onPrimary}
                    onChangeText={handleChange('deadline')}
                    labelText='Deadline (opcional)'
                    iconName='flag-checkered'
                    error={errors.deadline}
                    password={false}
                  />
                  <Button title='Crear' onPress={handleSubmit} />
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CreateGoalScreen;

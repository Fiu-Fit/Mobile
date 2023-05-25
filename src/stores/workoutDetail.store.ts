import {
  makeObservable,
  observable,
  computed,
  flow,
  runInAction,
  action,
} from 'mobx';
import {
  CategoryType,
  ExerciseCardInfo,
  IWorkoutHeader,
  WorkoutExercise,
  WorkoutProps,
} from '../utils/workout-types';
import { axiosClient } from '../utils/constants';
import LoggerFactory from '../utils/logger-utility';

const logger = LoggerFactory('workout-detail-store');

const defaultWorkout = {
  _id: '',
  name: '',
  description: '',
  duration: 0,
  difficulty: 0,
  category: CategoryType.FULLBODY,
  rating: { globalRating: 0, comments: [] },
  exercises: new Map<string, WorkoutExercise>(),
  athleteIds: [],
  authorId: 0,
};

export class WorkoutDetailStore {
  workoutId: string | undefined;
  workout: WorkoutProps = defaultWorkout;
  newExercises = new Map<string, WorkoutExercise>();
  state = 'pending';

  get workoutHeader(): IWorkoutHeader {
    const { name, description, duration, exercises } = this.workout;
    return {
      name,
      description,
      duration,
      rating: {
        globalRating: 4,
        comments: [
          '¡Wow! Realmente disfruté este entrenamiento. Los ejercicios fueron desafiantes y me encantó cómo trabajaron diferentes grupos musculares. ¡Definitivamente quiero hacerlo de nuevo!',
          '¡Increíble sesión de entrenamiento! Los ejercicios fueron variados y efectivos. Me encantó cómo pude sentir que mi cuerpo se fortalecía con cada movimiento. ¡Altamente recomendado!',
          'Qué gran entrenamiento. Los ejercicios fueron divertidos y me mantuvieron comprometido durante toda la sesión. Me encantó la combinación de fuerza y cardio. ¡Me siento enérgico y revitalizado!',
        ],
      },
      exerciseCount: exercises.size,
    };
  }

  get exerciseCards(): ExerciseCardInfo[] {
    const oldExercises = Array.from(this.workout.exercises.values());
    const newExercises = Array.from(this.newExercises.values());
    return [...oldExercises, ...newExercises].map(
      (workoutExercise): ExerciseCardInfo => {
        return {
          id: workoutExercise._id,
          title: workoutExercise.exercise?.name ?? 'Name missing',
          content: `${workoutExercise.sets} x ${workoutExercise.reps}`,
          exercise: workoutExercise.exercise,
          imageUrl:
            'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
        };
      },
    );
  }

  get exercises(): WorkoutExercise[] {
    return Array.from(this.workout.exercises.values());
  }

  constructor() {
    makeObservable(this, {
      workoutId: observable,
      workout: observable,
      state: observable,
      newExercises: observable,
      exerciseCards: computed,
      workoutHeader: computed,
      addNewExercise: action,
      editExercise: action,
      removeExercise: action,
      upsertStoredWorkout: flow,
      fetchWorkout: flow,
    });
  }

  *fetchWorkout(workoutId: string) {
    this.state = 'pending';
    if (!workoutId || workoutId === '') {
      this.workout = defaultWorkout;
      this.state = 'done';
      return;
    }
    try {
      logger.debug('Getting workout detail...');
      const { data } = yield axiosClient.get<WorkoutProps>(
        `/workouts/${workoutId}`,
      );
      logger.debug('Got data: ', data);
      runInAction(() => {
        const {
          exercises: exercisesList,
        }: {
          exercises: WorkoutExercise[];
        } = data;
        const workoutData = data;
        this.workout = {
          ...workoutData,
          exercises: new Map<string, WorkoutExercise>(),
        };
        logger.info('Workout Data:', workoutData);
        this.workout.exercises = exercisesList.reduce((map, exercise) => {
          if (map.has(exercise._id)) {
            return map;
          }
          map.set(exercise._id, exercise);
          return map;
        }, this.workout.exercises);
        this.newExercises = new Map<string, WorkoutExercise>();
        logger.debug('Loaded Workout: ', this.workout);
        this.state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
  addNewExercise(exercise: WorkoutExercise) {
    this.newExercises.set(exercise._id, exercise);
  }
  editExercise(exerciseId: string, exercise: WorkoutExercise) {
    if (this.workout.exercises.has(exerciseId)) {
      this.workout.exercises.set(exerciseId, exercise);
    }
    this.newExercises.set(exerciseId, exercise);
  }

  removeExercise(exerciseId: string) {
    this.workout.exercises.delete(exerciseId) ||
      this.newExercises.delete(exerciseId);
  }
  *upsertStoredWorkout() {
    const newExercisesList = Array.from(this.newExercises.values()).map(
      newExercise => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, exerciseId, exercise, ...exerciseToInsert } = newExercise;
        return { exerciseId: exercise._id, ...exerciseToInsert };
      },
    );
    try {
      const { _id, exercises, ...restOfWorkout } = this.workout;
      const workoutPayload = {
        ...restOfWorkout,
        exercises: [
          ...Array.from(exercises.values()),
          ...Array.from(newExercisesList.values()),
        ],
      };
      logger.info('Workout ID: ', _id);
      logger.info('Upserting workout: ', workoutPayload);
      const { data } = yield !this.workout._id
        ? axiosClient.post<WorkoutProps>('/workouts', workoutPayload)
        : axiosClient.put<WorkoutProps>(`/workouts/${this.workout._id}`, {
            _id,
            ...workoutPayload,
          });
      this.workout._id = data._id;
      logger.info('Upsert workout Data: ', data);
    } catch (err) {
      logger.error(
        'Error while trying to upsert workout:',
        (err as any).response,
      );
    }
  }
}

export const workoutDetailStore = new WorkoutDetailStore();

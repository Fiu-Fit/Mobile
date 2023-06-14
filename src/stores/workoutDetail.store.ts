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
  WorkoutRatingProps,
} from '../utils/workout-types';
import { axiosClient } from '../utils/constants';
import LoggerFactory from '../utils/logger-utility';

const logger = LoggerFactory('workout-detail-store');

const defaultWorkout = {
  _id: '',
  name: '',
  description: '',
  duration: 0,
  author: '',
  difficulty: 0,
  category: CategoryType.FULLBODY,
  averageRating: 0,
  exercises: new Map<string, WorkoutExercise>(),
  athleteIds: [],
  authorId: 0,
};

export class WorkoutDetailStore {
  workout: WorkoutProps = defaultWorkout;
  newExercises = new Map<string, WorkoutExercise>();
  ratings: WorkoutRatingProps[] = [];
  state = 'pending';

  get workoutHeader(): IWorkoutHeader {
    const { name, description, duration, exercises, averageRating } =
      this.workout;
    return {
      name,
      description,
      duration,
      author: 'Jorge', // @TODO Backend: attach User Object in Author instead of AuthorID
      averageRating: averageRating ?? 'No ratings!',
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

  get workoutComments(): string[] {
    const comments: string[] = this.ratings
      .filter((rating: WorkoutRatingProps) => rating.comment !== undefined)
      .map((rating: WorkoutRatingProps) => rating.comment!);

    return comments;
  }

  constructor() {
    makeObservable(this, {
      workout: observable,
      state: observable,
      newExercises: observable,
      ratings: observable,
      exerciseCards: computed,
      workoutHeader: computed,
      workoutComments: computed,
      addNewExercise: action,
      editExercise: action,
      removeExercise: action,
      upsertStoredWorkout: flow,
      fetchWorkout: flow,
      fetchWorkoutRatings: flow,
      addWorkoutAsFavourite: flow,
      createWorkoutRating: flow,
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

  *addWorkoutAsFavourite(userId: number) {
    this.state = 'pending';
    try {
      logger.debug(
        `Adding workout ${this.workout._id} as favourite for User ${userId}`,
      );
      const { data } = yield axiosClient.put(
        `/users/${userId}/favoriteWorkouts`,
        { workoutId: this.workout._id },
      );
      logger.debug('Got data: ', data);
      this.state = 'done';
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

  *fetchWorkoutRatings() {
    this.ratings = [];
    this.state = 'pending';
    try {
      const filters = {
        workoutId: this.workout._id,
      };

      const params = {
        filters: JSON.stringify(filters),
      };

      logger.debug(`Getting ratings for workout id ${this.workout._id}...`);
      const { data } = yield axiosClient.get<WorkoutRatingProps[]>('/ratings', {
        params,
      });
      logger.debug(`Got data for workout: ${this.workout._id}`, data);
      runInAction(() => {
        this.ratings = data;
        this.state = 'done';
      });
    } catch (e) {
      logger.error('Error while fetching ratings:', { e });
      runInAction(() => {
        this.state = 'error';
      });
    }
  }

  *createWorkoutRating(userId: number, rating: number, comment?: string) {
    this.state = 'pending';
    try {
      logger.debug('Creating workout rating...');
      logger.debug('Creating rating: ', {
        workoutId: this.workout._id,
        athleteId: userId,
        rating,
        comment,
      });
      const { data } = yield axiosClient.post<WorkoutRatingProps>('/ratings', {
        workoutId: this.workout._id,
        athleteId: userId,
        rating,
        comment,
      });
      this.state = 'done';
      logger.debug('Got data: ', data);
    } catch (e: any) {
      logger.error('Error while creating rating: ', { e });

      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}

export const workoutDetailStore = new WorkoutDetailStore();

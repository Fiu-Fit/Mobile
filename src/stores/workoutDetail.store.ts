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
  WorkoutMetric,
  WorkoutProps,
  WorkoutRatingProps,
  imageMap,
} from '../utils/workout-types';
import { axiosClient } from '../utils/constants';
import LoggerFactory from '../utils/logger-utility';
import { workoutStore } from './workout.store';
import { goalStore } from './goal.store';
import storage from '@react-native-firebase/storage';

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
  multimedia: [],
};

export class WorkoutDetailStore {
  workout: WorkoutProps = defaultWorkout;
  newExercises = new Map<string, WorkoutExercise>();
  ratings: WorkoutRatingProps[] = [];
  downloads: string[] = [];
  metrics: WorkoutMetric[] = [];
  state = 'pending';
  selectedYearFilter: Number = new Date().getFullYear();
  authorName: string = 'Author';

  get workoutHeader(): IWorkoutHeader {
    const { name, description, duration, exercises, averageRating } =
      this.workout;
    return {
      name,
      description,
      duration,
      author: this.authorName,
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
          type: 'exercise',
          exercise: workoutExercise.exercise,
          imageUrl: imageMap.get(workoutExercise.exercise.category),
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
      downloads: observable,
      metrics: observable,
      selectedYearFilter: observable,
      authorName: observable,
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
      completeWorkout: flow,
      removeWorkoutAsFavourite: flow,
      createWorkoutRating: flow,
      fetchWorkoutMetrics: flow,
      fetchAuthor: flow,
    });
  }

  async downloadResources() {
    logger.debug('Downloading files: ', this.workout.multimedia);
    this.downloads = [];
    await Promise.all(
      this.workout.multimedia.map(async uri => {
        const lastSlashIndex = uri.lastIndexOf('/');
        const fileName = uri.substring(lastSlashIndex + 1);
        try {
          const download = await storage()
            .ref(`/workouts/${this.workout._id}/${fileName}`)
            .getDownloadURL();
          this.downloads.push(download + uri.slice(uri.lastIndexOf('.')));
        } catch (e) {
          logger.debug('Error while download workout multimedia: ', e);
        }
      }),
    );
  }

  async uploadResources() {
    logger.debug('Uploading files: ', this.workout.multimedia);
    await Promise.all(
      this.workout.multimedia.map(async uri => {
        const lastSlashIndex = uri.lastIndexOf('/');
        const fileName = uri.substring(lastSlashIndex + 1);
        try {
          await storage()
            .ref(`/workouts/${this.workout._id}/${fileName}`)
            .putFile(uri);
        } catch (e) {
          logger.debug('Error while uploading workout multimedia: ', e);
        }
      }),
    );
    logger.debug('Files uploaded!');
  }

  *fetchAuthor() {
    this.state = 'pending';
    try {
      logger.debug(
        `Getting author ${this.workout.authorId} for workout ${this.workout._id}`,
      );
      const { data } = yield axiosClient.get(`/users/${this.workout.authorId}`);
      logger.debug('Got author ', data);
      runInAction(() => {
        this.authorName = data.name;
      });
      this.state = 'done';
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
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
      runInAction(async () => {
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
        await this.fetchWorkoutRatings();
        logger.debug('Loaded Workout: ', this.workout);
        await this.downloadResources();
        await this.fetchAuthor();
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
      logger.debug('Got New Favorite Workout data: ', data);
      runInAction(() => {
        workoutStore.fetchFavoriteWorkouts(userId);
      });
      this.state = 'done';
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }

  *removeWorkoutAsFavourite(userId: number) {
    this.state = 'pending';
    try {
      logger.debug(
        `Removing workout ${this.workout._id} as favourite for User ${userId}`,
      );
      const { data } = yield axiosClient.delete(
        `/users/${userId}/favoriteWorkouts/${this.workout._id}`,
      );
      logger.debug('Got Deleted Favorite Workout data: ', data);
      runInAction(() => {
        workoutStore.fetchFavoriteWorkouts(userId);
      });
      this.state = 'done';
    } catch (e) {
      logger.error('Error while removing favorite workout:', { e });
      runInAction(() => {
        this.state = 'error';
      });
    }
  }

  *fetchWorkoutMetrics() {
    this.state = 'pending';
    try {
      logger.debug('Getting workout metrics...');
      const { data } = yield axiosClient.get<WorkoutMetric[]>(
        `/workouts/${this.workout._id}/metrics?year=${this.selectedYearFilter}`,
      );
      logger.debug('Got data: ', data);
      runInAction(() => {
        this.metrics = data;
        this.state = 'done';
      });
    } catch (e) {
      logger.error('Error while fetching workout metrics:', { e });
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
      yield this.uploadResources();
    } catch (err) {
      logger.error(
        'Error while trying to upsert workout:',
        (err as any).response,
      );
    }
  }

  *completeWorkout(userId: number) {
    this.state = 'pending';
    try {
      logger.debug('Marking workout as completed...');
      const { data } = yield axiosClient.post('/progress/complete', {
        workoutId: this.workout._id,
        userId: userId,
      });
      this.state = 'done';

      logger.debug('Got data: ', data);
      goalStore.fetchGoals(userId);
    } catch (e: any) {
      logger.error('Error while completing Workout:', { e });
      runInAction(() => {
        this.state = 'error';
      });
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

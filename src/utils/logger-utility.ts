import {
  logger,
  fileAsyncTransport,
  consoleTransport,
} from 'react-native-logs';
import RNFS from 'react-native-fs';

const config = {
  transport: [consoleTransport, fileAsyncTransport],
  // We need to add every tag/module here for it to show up.
  enabledExtensions: [
    'login',
    'register',
    'profile-search-screen',
    'user-profile',
    'user-profile-screen',
    'workout-store',
    'workout-screen',
    'upsert-workout-screen',
    'user-profile',
    'edit-exercise-modal',
    'workout-comment',
    'workout-detail-store',
    'exercise-store',
    'user-search-store',
    'interests',
    'goals',
    'create-goal',
    'password-recovery',
    'home-header',
    'social-share',
    'push-notification-manager',
    'notification',
  ],
  transportOptions: {
    colors: {
      none: 'white',
      error: 'redBright',
      warn: 'yellowBright',
      info: 'blue',
      debug: 'magenta',
    },
    FS: RNFS,
    fileName: 'logs_{date-today}',
  },
  levels: {
    none: 0,
    debug: 1,
    warning: 2,
    info: 3,
    error: 4,
  },
};

const log = logger.createLogger(config);
const loggerCache = new Map<string, unknown>();

type LoggerType = {
  none: (text: string, obj?: any) => void;
  error: (text: string, obj?: any) => void;
  warning: (text: string, obj?: any) => void;
  info: (text: string, obj?: any) => void;
  debug: (text: string, obj?: any) => void;
};

const LoggerFactory = (scope: string): LoggerType => {
  if (loggerCache.get(scope)) {
    return loggerCache.get(scope) as LoggerType;
  }
  log.enable();
  const scopedLogger = log.extend(scope);
  loggerCache.set(scope, scopedLogger);
  return scopedLogger as LoggerType;
};

export default LoggerFactory;

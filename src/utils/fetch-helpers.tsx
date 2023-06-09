import { axiosClient } from './constants';
import { User } from './custom-types';
import LoggerFactory from './logger-utility';

const logger = LoggerFactory('fetch-helpers');

export const updateCurrentUser = async () => {
  const { data } = await axiosClient.post('/users/me');
  logger.info('Got User ID: ', data.id);
  const { data: followedUsers } = await axiosClient.get(
    `/followers/following?userId=${data.id}`,
  );
  logger.info('Got followedUsers: ', followedUsers);
  return {
    ...data,
    followedUsers: followedUsers.rows,
  } as User;
};

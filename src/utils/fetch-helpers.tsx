import { useEffect, useState } from 'react';
import { axiosClient } from './constants';
import LoggerFactory from './logger-utility';
import { User } from './custom-types';
import { useUserContext } from '../App';

const logger = LoggerFactory('fetch-helpers');

export const useFetchUser = ({
  id,
  observables,
}: {
  id?: number;
  observables?: any[];
}) => {
  const [response, setResponse] = useState<User | undefined>(undefined);
  const [error, setError] = useState(null);
  const { setCurrentUser } = useUserContext();
  const hookDependencies = observables ? observables : [];
  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await fetchUserData(id);
      setResponse(response as User);
      setError(error);
      if (error) {
        logger.error('Error while logging in: ', error);
        return;
      }
      if (!id) {
        logger.debug('user: ', response);
        setCurrentUser(response as User);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, hookDependencies);

  return { response, error };
};

export const fetchUserData = async (id?: number) => {
  try {
    logger.debug(`Fetching user: ${id}`);
    const { data } = !id
      ? await axiosClient.post('/users/me')
      : await axiosClient.get(`/users/${id}`);
    logger.debug('Got user: ', data);
    const { data: followedUsers } = await axiosClient.get(
      `/followers/following?userId=${data.id}`,
    );
    logger.debug('followed users:', followedUsers?.rows);
    return {
      response: { ...data, followedUsers: followedUsers?.rows ?? [] },
      error: null,
    };
  } catch (err: any) {
    logger.error('An error ocurred while fetching the user: ', { error: err });
    return { response: null, error: err };
  }
};

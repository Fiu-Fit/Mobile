import { useEffect, useState } from 'react';
import { axiosClient } from './constants';
import { User } from './custom-types';
import LoggerFactory from './logger-utility';

const logger = LoggerFactory('fetch-helpers');

export const useFetchUser = (id?: number ) => {
  const [response, setResponse] = useState<any>(undefined);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } =  id ? await axiosClient.get('/users/me') : await axiosClient.get(`/users/${id}`);
        logger.info('Got me: ', data);
        const { data: followedUsers } = await axiosClient.get(
          `/followers/following?userId=${data.id}`,
        );
        logger.info(`Got followedUsers for id: ${id}: `, followedUsers);
        setResponse({
          ...data,
          followedUsers: followedUsers.rows,
        } as User);
      } catch (error: any) {
        logger.error('An error ocurred while fetching the user: ', error);
        setError(error);
      }
    };
    fetchData();
  }, []);

  return { response, error };
};
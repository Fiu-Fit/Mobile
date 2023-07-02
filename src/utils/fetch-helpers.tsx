import { useEffect, useState } from 'react';
import { axiosClient } from './constants';
import LoggerFactory from './logger-utility';
import { User } from './custom-types';
import { useUserContext } from '../App';
import { searchStore } from '../stores/userSearch.store';

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
      logger.debug('Current user for picture: ', response as User);
      if (response.profilePicture) {
        searchStore.downloadProfilePicture(response as User);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, hookDependencies);

  return { response, error };
};

export const fetchUserData = async (id?: number) => {
  let data;
  let followedUsers;
  let verification;
  try {
    logger.debug(`Fetching user: ${id}`);
    data = !id
      ? (await axiosClient.post('/users/me')).data
      : (await axiosClient.get(`/users/${id}`)).data;
    logger.debug('Got user: ', data);
  } catch (err: any) {
    logger.error('An error ocurred while fetching the user: ', { error: err });
    return { response: null, error: err };
  }

  try {
    followedUsers = (
      await axiosClient.get(`/followers/following?userId=${data.id}`)
    ).data;
    logger.debug('followed users:', followedUsers?.rows);
  } catch (err: any) {
    logger.error(
      `An error ocurred while fetching followed users for user: ${data.id}`,
      { error: err },
    );
  }
  try {
    verification = (await axiosClient.get(`/verifications/user/${data.id}`))
      .data;
  } catch (err: any) {
    if (err.response.status === 404) {
      logger.warning(`No user verification found for user: ${data.id}`);
    } else {
      logger.error(`Error while fetching verification for user: ${data.id}`);
    }
  }

  return {
    response: {
      ...data,
      followedUsers: followedUsers?.rows ?? [],
      verification,
    },
    error: null,
  };
};

import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {checkNetworkConnectivity} from '../utils/helperFunction';
import {baseUrl} from './configs';

// Create custom baseQuery for network connectivity proper error handling.
const baseQuery = async (args, api, extraOptions) => {
  const isConnected = await checkNetworkConnectivity();

  if (!isConnected) {
    return {
      error: {
        status: 'NO_INTERNET',
        data: {message: 'No internet connection'},
      },
    };
  }

  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) => {
      const token = getState().auth.token;
      const tempToken = getState().auth.tempToken;
      // console.log('token', token);

      if (token || tempToken) {
        headers.set('authorization', `Bearer ${token || tempToken}`);
      }
      return headers;
    },
  });

  return await rawBaseQuery(args, api, extraOptions);
};

export {baseQuery};

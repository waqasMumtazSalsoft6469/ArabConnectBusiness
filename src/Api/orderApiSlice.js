import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const orderApi = createApi({
  reducerPath: reducers.path.order,
  baseQuery,
  endpoints: builder => ({
    fetchAllOrder: builder.query({
      query: ({businessProfileId}) => {
        LOG('IN PARAMS', businessProfileId);
        return {
          url: `${endpoints.order.fetchAllOrder.url}`,
          method: endpoints.order.fetchAllOrder.method || 'GET',
          params: {businessProfileId},
        };
      },
      transformResponse: response => response?.data,
    }),
  }),
});

export const {useFetchAllOrderQuery} = orderApi;

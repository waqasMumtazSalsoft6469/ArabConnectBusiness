import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const subscriptionApi = createApi({
  reducerPath: reducers.path.subscription,
  baseQuery,
  endpoints: builder => ({
    buy: builder.mutation({
      query: body => {
        LOG('body', body);
        return {
          url: endpoints.subscription.buy.url,
          method: endpoints.subscription.buy.method,
          body: body,
        };
      },
    }),
    fetchPlanByUser: builder.query({
      query: () => {
        return {
          url: endpoints.subscription.fetchPlanByUser.url,
          method: endpoints.subscription.fetchPlanByUser.method,
        };
      },
      transformResponse: response => response,
    }),
    fetchActiveSubscription: builder.query({
      query: () => {
        return {
          url: endpoints.subscription.fetchActiveSubscription.url,
          method: endpoints.subscription.fetchActiveSubscription.method,
        };
      },
      transformResponse: response => response,
    }),
    fetchPlanByUserID: builder.query({
      query: () => {
        return {
          url: endpoints.subscription.fetchPlanByUserID.url,
          method: endpoints.subscription.fetchPlanByUserID.method,
          // params:{subscriptionId:subscriptionId}
        };
      },
      transformResponse: response => response?.data,
    }),
  }),
});

export const {
  useBuyMutation,
  useFetchPlanByUserQuery,
  useFetchPlanByUserIDQuery,
  useFetchActiveSubscriptionQuery,
} = subscriptionApi;

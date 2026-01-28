import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const rewardsApi = createApi({
  reducerPath: reducers.path.rewards,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.rewards.add.url,
          method: endpoints.rewards.add.method,
          // headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),

    fetchRewardsByBusiness: builder.query({
      query: ({businessProfileId}) => {
        LOG('params: ', businessProfileId);
        return {
          url: endpoints.rewards.fetchRewardsByBusiness.url,
          method: endpoints.rewards.fetchRewardsByBusiness.method,
          params: {businessProfileId},
        };
      },
      transformResponse: response => response?.data,
    }),

    edit: builder.mutation({
      query: ({id, body}) => {
        LOG('ID RECIEVED: ', id);
        LOG('BODY RECIEVED: ', body);

        return {
          url: `${endpoints.rewards.edit.url}`,
          method: endpoints.rewards.edit.method,
          body: body,
          params: {rewardId: id},
        };
      },
    }),

    deleteReward: builder.mutation({
      query: ({id}) => {
        LOG('rewarrd id in api', id);
        return {
          url: `${endpoints.rewards.deleteReward.url}/${id}`,
          method: endpoints.rewards.deleteReward.method,
        };
      },
      transformResponse: response => response?.data,
    }),
    redeemReward: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.rewards.redeemReward.url,
          method: endpoints.rewards.redeemReward.method,
          body: body,
        };
      },
    }),
  }),
});

export const {
  useAddMutation,
  useEditMutation,
  useDeleteRewardMutation,
  useFetchRewardsByBusinessQuery,
  useRedeemRewardMutation
} = rewardsApi;

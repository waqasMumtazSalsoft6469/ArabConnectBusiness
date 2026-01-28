import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const businessprofileApi = createApi({
  reducerPath: reducers.path.businessProfile,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body', body);
        return {
          url: endpoints.businessProfile.add.url,
          method: endpoints.businessProfile.add.method,
          body: body,
        };
      },
    }),
    addPoints: builder.mutation({
      query: body => {
        LOG('body', body);
        return {
          url: endpoints.businessProfile.addPoints.url,
          method: endpoints.businessProfile.addPoints.method,
          body: body,
        };
      },
    }),
    redeemPoints: builder.mutation({
      query: body => {
        LOG('body', body);
        return {
          url: endpoints.businessProfile.redeemPoints.url,
          method: endpoints.businessProfile.redeemPoints.method,
          body: body,
        };
      },
    }),
    fetchBusinessType: builder.query({
      query: () => {
        return {
          url: endpoints.businessProfile.fetchBusinessType.url,
          method: endpoints.businessProfile.fetchBusinessType.method,
        };
      },
      transformResponse: response => {
        console.log('✅ Parsed response:', response);
        return response?.data;
      },
    }),
    //This is to fetch business user profile
    fetchBusinessProfileID: builder.query({
      query: ({id}) => {
        LOG('ID RECIEVED: ', id);
        return {
          url: `${endpoints.businessProfile.fetchBusinessProfileID.url}/${id}`,
          method: endpoints.businessProfile.fetchBusinessProfileID.method,
        };
      },
      transformResponse: response => {
        console.log('✅ Parsed response:', response);
        return response?.data;
      },
    }),
    //This is to fetch business profiles by the active profile ID
    fetchBusinessProfileByID: builder.query({
      query: ({id}) => {
        LOG('ID RECIEVED: ', id);
        return {
          url: `${endpoints.businessProfile.fetchBusinessProfileByID.url}/${id}`,
          method: endpoints.businessProfile.fetchBusinessProfileByID.method,
        };
      },
      transformResponse: response => {
        console.log('✅ Parsed response:', response);
        return response?.data;
      },
    }),
    fetchMyBusinessProfiles: builder.query({
      query: () => {
        return {
          url: endpoints.businessProfile.fetchMyBusinessProfiles.url,
          method: endpoints.businessProfile.fetchMyBusinessProfiles.method,
        };
      },
      transformResponse: response => {
        console.log('Parsed response:', response);
        return response?.data;
      },
    }),

    fetchCustomerTransaction: builder.query({
      query: ({businessProfileId, userId}) => {
        LOG('params: ', businessProfileId, userId);
        return {
          url: endpoints.businessProfile.fetchCustomerTransaction.url,
          method: endpoints.businessProfile.fetchCustomerTransaction.method,
          params: {businessProfileId, userId},
        };
      },
      transformResponse: response => response?.data,
    }),
    edit: builder.mutation({
      query: ({id, body}) => {
        LOG('ID RECIEVED: ', id);
        LOG('BODY RECIEVED: ', body);
        return {
          url: `${endpoints.businessProfile.edit.url}/${id}`,
          method: endpoints.businessProfile.edit.method,
          body: body,
        };
      },
    }),
    activateProfile: builder.mutation({
      query: body => {
        LOG('BODY RECIEVED: ', body);
        return {
          url: endpoints.businessProfile.activateProfile.url,
          method: endpoints.businessProfile.activateProfile.method,
          body: body,
        };
      },
    }),
    fetchBusinessCustomer: builder.query({
      query: ({businessProfileId}) => {
        LOG('params: ', businessProfileId);
        return {
          url: endpoints.businessProfile.fetchBusinessCustomer.url,
          method: endpoints.businessProfile.fetchBusinessCustomer.method,
          params: {businessProfileId},
        };
      },
      transformResponse: response => response?.data,
    }),
    fetchBusinessAnalytics: builder.query({
      query: ({businessProfileId}) => {
        LOG('params: ', businessProfileId);
        return {
          url: endpoints.businessProfile.fetchBusinessAnalytics.url,
          method: endpoints.businessProfile.fetchBusinessAnalytics.method,
          params: {businessProfileId},
        };
      },
      transformResponse: response => response?.data,
    }),
    fetchChartAnalytics: builder.query({
      query: ({businessProfileId, type}) => {
        LOG('idasdasdsaa: ', businessProfileId);
        LOG('chart type: ', type);
        return {
          url: endpoints.businessProfile.fetchChartAnalytics.url,
          method: endpoints.businessProfile.fetchChartAnalytics.method,
          params: {businessProfileId, type},
        };
      },
      transformResponse: response => response?.data,
    }),
    fetchLoyaltyAnalytics: builder.query({
      query: () => {
        return {
          url: endpoints.businessProfile.fetchLoyaltyAnalytics.url,
          method: endpoints.businessProfile.fetchLoyaltyAnalytics.method,
        };
      },
      transformResponse: response => response?.data,
    }),
    inviteCustomer: builder.mutation({
      query: body => {
        LOG('BODY RECEIVED:', body);
        return {
          url: endpoints.businessProfile.inviteCustomer.url,
          method: endpoints.businessProfile.inviteCustomer.method,
          body,
        };
      },
    }),
  }),
});

export const {
  useAddMutation,
  useAddPointsMutation,
  useRedeemPointsMutation,
  useFetchBusinessTypeQuery,
  useFetchBusinessProfileIDQuery,
  useFetchBusinessProfileByIDQuery,
  useEditMutation,
  useActivateProfileMutation,
  useFetchMyBusinessProfilesQuery,
  useFetchBusinessCustomerQuery,
  useFetchBusinessAnalyticsQuery,
  useInviteCustomerMutation,
  useFetchCustomerTransactionQuery,
  useFetchLoyaltyAnalyticsQuery,
  useFetchChartAnalyticsQuery,
} = businessprofileApi;

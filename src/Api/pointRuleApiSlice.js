import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';

const POINT_RULE_TAG = 'PointRule';

export const pointRuleApi = createApi({
  reducerPath: reducers.path.pointRule,
  baseQuery,
  tagTypes: [POINT_RULE_TAG],
  endpoints: builder => ({
    fetchPointRule: builder.query({
      query: () => ({
        url: endpoints.pointRule.fetchPointRule.url,
        method: endpoints.pointRule.fetchPointRule.method,
      }),
      transformResponse: res => res?.data ?? null,
      providesTags: [POINT_RULE_TAG],
    }),
    createOrUpdatePointRule: builder.mutation({
      query: body => ({
        url: endpoints.pointRule.createOrUpdatePointRule.url,
        method: endpoints.pointRule.createOrUpdatePointRule.method,
        body,
      }),
      transformResponse: res => res?.data,
      invalidatesTags: [POINT_RULE_TAG],
    }),
    togglePointRule: builder.mutation({
      query: () => ({
        url: endpoints.pointRule.togglePointRule.url,
        method: endpoints.pointRule.togglePointRule.method,
      }),
      transformResponse: res => res?.data,
      invalidatesTags: [POINT_RULE_TAG],
    }),
  }),
});

export const {
  useFetchPointRuleQuery,
  useCreateOrUpdatePointRuleMutation,
  useTogglePointRuleMutation,
} = pointRuleApi;

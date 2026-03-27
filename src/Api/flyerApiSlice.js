import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {jsonToFormdata} from '../utils/helperFunction';

const FLYER_TAG = 'Flyers';
const FLYER_TEMPLATE_TAG = 'FlyerTemplates';

export const flyerApi = createApi({
  reducerPath: reducers.path.flyer,
  baseQuery,
  tagTypes: [FLYER_TAG, FLYER_TEMPLATE_TAG],
  endpoints: builder => ({
    fetchFlyers: builder.query({
      query: () => ({
        url: endpoints.flyer.fetchFlyers.url,
        method: endpoints.flyer.fetchFlyers.method,
      }),
      transformResponse: response => response?.data,
      providesTags: [FLYER_TAG],
    }),
    createFlyer: builder.mutation({
      query: body => ({
        url: endpoints.flyer.createFlyer.url,
        method: endpoints.flyer.createFlyer.method,
        body,
      }),
      transformResponse: response => response?.data,
      invalidatesTags: [FLYER_TAG],
    }),
    updateFlyer: builder.mutation({
      query: ({flyerId, id, body}) => ({
        url: `${endpoints.flyer.updateFlyer.url}/${flyerId || id}`,
        method: endpoints.flyer.updateFlyer.method,
        body,
      }),
      transformResponse: response => response?.data,
      invalidatesTags: [FLYER_TAG],
    }),
    fetchFlyerById: builder.query({
      query: flyerId => ({
        url: `${endpoints.flyer.fetchFlyerById.url}/${flyerId}`,
        method: endpoints.flyer.fetchFlyerById.method,
      }),
      transformResponse: response => response?.data,
      providesTags: (result, error, id) => [{type: FLYER_TAG, id}],
    }),
    publishFlyer: builder.mutation({
      query: flyerId => ({
        url: `${endpoints.flyer.publishFlyer.url}/${flyerId}/publish`,
        method: endpoints.flyer.publishFlyer.method,
      }),
      transformResponse: response => response?.data,
      invalidatesTags: [FLYER_TAG],
    }),
    unpublishFlyer: builder.mutation({
      query: flyerId => ({
        url: `${endpoints.flyer.unpublishFlyer.url}/${flyerId}/unpublish`,
        method: endpoints.flyer.unpublishFlyer.method,
      }),
      transformResponse: response => response?.data,
      invalidatesTags: [FLYER_TAG],
    }),
    updateFlyerSlot: builder.mutation({
      query: ({flyerId, slotAssignmentId, body}) => ({
        url: `${endpoints.flyer.updateFlyerSlot.url}/${flyerId}/slots/${slotAssignmentId}`,
        method: endpoints.flyer.updateFlyerSlot.method,
        body: jsonToFormdata(body),
      }),
      transformResponse: response => response?.data,
      invalidatesTags: [FLYER_TAG],
    }),
    fetchFlyerTemplates: builder.query({
      query: () => ({
        url: endpoints.flyer.fetchFlyerTemplates.url,
        method: endpoints.flyer.fetchFlyerTemplates.method,
      }),
      transformResponse: response => response?.data,
      providesTags: [FLYER_TEMPLATE_TAG],
    }),
    fetchFlyerTemplateById: builder.query({
      query: templateId => ({
        url: `${endpoints.flyer.fetchFlyerTemplateById.url}/${templateId}`,
        method: endpoints.flyer.fetchFlyerTemplateById.method,
      }),
      transformResponse: response => response?.data,
      providesTags: (result, error, id) => [{type: FLYER_TEMPLATE_TAG, id}],
    }),
  }),
});

export const {
  useFetchFlyersQuery,
  useFetchFlyerByIdQuery,
  useCreateFlyerMutation,
  useUpdateFlyerMutation,
  usePublishFlyerMutation,
  useUnpublishFlyerMutation,
  useUpdateFlyerSlotMutation,
  useFetchFlyerTemplatesQuery,
  useFetchFlyerTemplateByIdQuery,
} = flyerApi;

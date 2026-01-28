import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const eventApi = createApi({
  reducerPath: reducers.path.event,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.event.add.url,
          method: endpoints.event.add.method,
          // headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),
    fetchEventByUser: builder.query({
      query: ({id}) => {
        LOG('params: ', id);
        return {
          url: `${endpoints.event.fetchEventByUser.url}/${id}`,
          method: endpoints.event.fetchEventByUser.method,
        };
      },
      transformResponse: response => response?.data,
    }),
    fetchEventById: builder.query({
      query: jobId => {
        LOG('jobId', jobId);
        return {
          url: `${endpoints.event.fetchEventById.url}/${jobId}`,
          method: endpoints.event.fetchEventById.method || 'GET',
        };
      },
      transformResponse: response => response?.data,
    }),
    edit: builder.mutation({
      query: ({id, body}) => {
        LOG('ID RECIEVED: ', id);
        LOG('BODY RECIEVED: ', body);
        return {
          url: `${endpoints.event.edit.url}/${id}`,
          method: endpoints.event.edit.method,
          body: body,
        };
      },
    }),

    deleteEvent: builder.mutation({
      query: ({id}) => {
        LOG('id: ', id);
        return {
          url: `${endpoints.event.deleteEvent.url}/${id}`,
          method: endpoints.event.deleteEvent.method,
        };
      },
      transformResponse: response => response?.data,
    }),

    fetchEventTicketsByUser: builder.query({
      query: ({eventId}) => {
        LOG('params: ', eventId);
        return {
          url: endpoints.event.fetchEventTicketsByUser.url,
          method: endpoints.event.fetchEventTicketsByUser.method,
          params: {eventId},
        };
      },
      transformResponse: response => response?.data,
    }),
  }),
});

export const {
  useAddMutation,
  useFetchEventByUserQuery,
  useFetchEventByIdQuery,
  useEditMutation,
  useDeleteEventMutation,
  useFetchEventTicketsByUserQuery,
} = eventApi;

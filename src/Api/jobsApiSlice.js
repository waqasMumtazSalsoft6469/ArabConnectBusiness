import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const jobApi = createApi({
  reducerPath: reducers.path.job,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.job.add.url,
          method: endpoints.job.add.method,
          // headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),
    fetchJobByUser: builder.query({
      query: ({businessId}) => {
        LOG('params: ', businessId);
        return {
          url: endpoints.job.fetchJobByUser.url,
          method: endpoints.job.fetchJobByUser.method,
          params: {businessId},
        };
      },
      transformResponse: response => response?.data,
    }),
    fetchJobById: builder.query({
      query: jobId => {
        LOG('jobId', jobId);
        return {
          url: `${endpoints.job.fetchJobById.url}/${jobId}`,
          method: endpoints.job.fetchJobById.method || 'GET',
        };
      },
      transformResponse: response => response?.data,
    }),
    edit: builder.mutation({
      query: ({id, body}) => {
        LOG('ID RECIEVED: ', id);
        LOG('BODY RECIEVED: ', body);
        return {
          url: `${endpoints.job.edit.url}/${id}`,
          method: endpoints.job.edit.method,
          body: body,
        };
      },
    }),

    deleteJob: builder.mutation({
      query: ({id}) => {
        LOG('id: ', id);
        return {
          url: `${endpoints.job.deleteJob.url}/${id}`,
          method: endpoints.job.deleteJob.method,
        };
      },
      transformResponse: response => response?.data,
    }),
    fetchJobApplication: builder.query({
      query: ({id}) => {
        LOG('ID RECIEVED: ', id);
        return {
          url: `${endpoints.job.fetchJobApplication.url}/${id}`,
          method: endpoints.job.fetchJobApplication.method,
        };
      },
    }),
  }),
});

export const {
  useAddMutation,
  useFetchJobByUserQuery,
  useFetchJobApplicationQuery,
  useFetchJobByIdQuery,
  useEditMutation,
  useDeleteJobMutation,
} = jobApi;

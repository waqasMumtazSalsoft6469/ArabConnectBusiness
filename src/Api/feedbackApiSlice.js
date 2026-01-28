import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const feedbackApi = createApi({
  reducerPath: reducers.path.feedback,
  baseQuery,
  endpoints: builder => ({
    contactUs: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.feedback.contactUs.url,
          method: endpoints.feedback.contactUs.method,
          body: body,
        };
      },
    }),
  }),
});

export const {useContactUsMutation} = feedbackApi;

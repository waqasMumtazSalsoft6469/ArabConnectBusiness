import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const campaignApi = createApi({
  reducerPath: reducers.path.campaign,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.campaign.add.url,
          method: endpoints.campaign.add.method,
          // headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),

    fetchCampaignByBusiness: builder.query({
      query: ({businessId}) => {
        LOG('params: ', businessId);
        return {
          url: endpoints.campaign.fetchCampaignByBusiness.url,
          method: endpoints.campaign.fetchCampaignByBusiness.method,
          params: {businessId},
        };
      },
      transformResponse: response => response?.data,
    }),

    edit: builder.mutation({
      query: ({id, body}) => {
        LOG('ID RECIEVED: ', id);
        LOG('BODY RECIEVED: ', body);
        return {
          url: `${endpoints.campaign.edit.url}/${id}`,
          method: endpoints.campaign.edit.method,
          body: body,
        };
      },
    }),

    deleteCampaign: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.campaign.deleteCampaign.url,
          method: endpoints.campaign.deleteCampaign.method,
          body: body,
        };
      },
      transformResponse: response => response?.data,
    }),
  }),
});

export const {
  useAddMutation,
  useEditMutation,
  useDeleteCampaignMutation,
  useFetchCampaignByBusinessQuery,
} = campaignApi;

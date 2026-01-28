import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const couponApi = createApi({
  reducerPath: reducers.path.coupon,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.coupon.add.url,
          method: endpoints.coupon.add.method,
          // headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),
    redeem: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.coupon.redeem.url,
          method: endpoints.coupon.redeem.method,
          // headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),
    fetchCouponByBusiness: builder.query({
      query: ({businessProfileId}) => {
        LOG('params: ', businessProfileId);
        return {
          url: endpoints.coupon.fetchCouponByBusiness.url,
          method: endpoints.coupon.fetchCouponByBusiness.method,
          params: {businessProfileId},
        };
      },
      transformResponse: response => response?.data,
    }),
    fetchCouponById: builder.query({
      query: jobId => {
        LOG('jobId', jobId);
        return {
          url: `${endpoints.coupon.fetchCouponById.url}/${jobId}`,
          method: endpoints.coupon.fetchCouponById.method || 'GET',
        };
      },
      transformResponse: response => response?.data,
    }),
    edit: builder.mutation({
      query: ({id, body}) => {
        LOG('ID RECIEVED: ', id);
        LOG('BODY RECIEVED: ', body);
        return {
          url: `${endpoints.coupon.edit.url}/${id}`,
          method: endpoints.coupon.edit.method,
          body: body,
        };
      },
    }),

    deleteCoupon: builder.mutation({
      query: ({id}) => {
        LOG('id: ', id);
        return {
          url: `${endpoints.coupon.deleteCoupon.url}/${id}`,
          method: endpoints.coupon.deleteCoupon.method,
        };
      },
      transformResponse: response => response?.data,
    }),
  }),
});

export const {
  useAddMutation,
  useRedeemMutation,
  useFetchCouponByBusinessQuery,
  useFetchCouponByIdQuery,
  useEditMutation,
  useDeleteCouponMutation,
} = couponApi;

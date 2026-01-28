import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../utils/helperFunction';

export const productApi = createApi({
  reducerPath: reducers.path.product,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        return {
          url: endpoints.product.add.url,
          method: endpoints.product.add.method,
          // headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),
    fetchBusinessProduct: builder.query({
      query: ({businessProfileId}) => {
        LOG('params: ', businessProfileId);
        return {
          url: endpoints.product.fetchBusinessProduct.url,
          method: endpoints.product.fetchBusinessProduct.method,
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
          url: `${endpoints.product.edit.url}/${id}`,
          method: endpoints.product.edit.method,
          body: body,
        };
      },
    }),

    deleteProduct: builder.mutation({
      query: ({id}) => {
        LOG('id: ', id);
        return {
          url: `${endpoints.product.deleteProduct.url}/${id}`,
          method: endpoints.product.deleteProduct.method,
        };
      },
      transformResponse: response => response?.data,
    }),
  }),
});

export const {
  useAddMutation,
  useFetchBusinessProductQuery,
  useEditMutation,
  useDeleteProductMutation,
} = productApi;

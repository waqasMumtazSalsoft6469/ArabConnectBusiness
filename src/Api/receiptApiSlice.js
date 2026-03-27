import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';

const RECEIPT_TAG = 'Receipts';

export const receiptApi = createApi({
  reducerPath: reducers.path.receipt,
  baseQuery,
  tagTypes: [RECEIPT_TAG],
  endpoints: builder => ({
    fetchReceipts: builder.query({
      query: (params = {}) => {
        const {page, limit, status, search} = params;
        const queryParams = {};
        if (page != null) queryParams.page = page;
        if (limit != null) queryParams.limit = limit;
        if (status && status !== 'all') queryParams.status = status;
        if (search?.trim()) queryParams.search = search.trim();
        return {
          url: endpoints.receipt.fetchReceipts.url,
          method: endpoints.receipt.fetchReceipts.method,
          params: queryParams,
        };
      },
      transformResponse: res => res?.data ?? {},
      providesTags: [RECEIPT_TAG],
    }),
    fetchReceiptById: builder.query({
      query: receiptId => ({
        url: `${endpoints.receipt.fetchReceiptById.url}/${receiptId}`,
        method: endpoints.receipt.fetchReceiptById.method,
      }),
      transformResponse: res => res?.data,
      providesTags: (result, error, id) => [{type: RECEIPT_TAG, id}],
    }),
    approveReceipt: builder.mutation({
      query: ({receiptId, body}) => ({
        url: `${endpoints.receipt.approveReceipt.url}/${receiptId}/approve`,
        method: endpoints.receipt.approveReceipt.method,
        body: body || {},
      }),
      transformResponse: res => res?.data,
      invalidatesTags: [RECEIPT_TAG],
    }),
    rejectReceipt: builder.mutation({
      query: ({receiptId, body}) => ({
        url: `${endpoints.receipt.rejectReceipt.url}/${receiptId}/reject`,
        method: endpoints.receipt.rejectReceipt.method,
        body: body || {},
      }),
      transformResponse: res => res?.data,
      invalidatesTags: [RECEIPT_TAG],
    }),
  }),
});

export const {
  useFetchReceiptsQuery,
  useFetchReceiptByIdQuery,
  useApproveReceiptMutation,
  useRejectReceiptMutation,
} = receiptApi;

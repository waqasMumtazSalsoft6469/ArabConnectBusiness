import {combineReducers} from '@reduxjs/toolkit';
// import {authApi} from '../Api/authApiSlice';
// import {resetApi} from '../Api/resetPassApiSlice';
import authReducer from './slices/authSlice';
import {authApi} from '../Api/authApiSlice';
import {profileApi} from '../Api/profileApiSlice';
import {jobApi} from '../Api/jobsApiSlice';
import {subscriptionApi} from '../Api/subscriptionApiSlice';
import {eventApi} from '../Api/EventsApiSlice';
import {businessprofileApi} from '../Api/businessApiSlice';
import {couponApi} from '../Api/couponApiSlice';
import {resetApi} from '../Api/resetPassApiSlice';
import {productApi} from '../Api/productsApiSlice';
import {orderApi} from '../Api/orderApiSlice';
import {feedbackApi} from '../Api/feedbackApiSlice';
import {campaignApi} from '../Api/campaignApiSlice';
import {rewardsApi} from '../Api/rewardsApiSlice';
import {flyerApi} from '../Api/flyerApiSlice';
import {receiptApi} from '../Api/receiptApiSlice';
import {pointRuleApi} from '../Api/pointRuleApiSlice';

export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  // [resetApi.reducerPath]: resetApi.reducer,
  auth: authReducer,
  [resetApi.reducerPath]: resetApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [jobApi.reducerPath]: jobApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [couponApi.reducerPath]: couponApi.reducer,
  [subscriptionApi.reducerPath]: subscriptionApi.reducer,
  [businessprofileApi.reducerPath]: businessprofileApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [feedbackApi.reducerPath]: feedbackApi.reducer,
  [campaignApi.reducerPath]: campaignApi.reducer,
  [rewardsApi.reducerPath]: rewardsApi.reducer,
  [flyerApi.reducerPath]: flyerApi.reducer,
  [receiptApi.reducerPath]: receiptApi.reducer,
  [pointRuleApi.reducerPath]: pointRuleApi.reducer,
});

import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
// import {authApi} from '../Api/authApiSlice';
// import {resetApi} from '../Api/resetPassApiSlice';
import {reduxStorage} from './mmkv';
import {rootReducer} from './rootReducer';
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

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  // whitelist: ['auth'], // Only persist specific reducers
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      resetApi.middleware,
      profileApi.middleware,
      jobApi.middleware,
      eventApi.middleware,
      couponApi.middleware,
      subscriptionApi.middleware,
      businessprofileApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      feedbackApi.middleware,
      campaignApi.middleware,
      rewardsApi.middleware,
    ),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);

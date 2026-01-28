import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavService from '../helpers/NavService';
import AuthStack from './routes/AuthStack';
import MainStack from './routes/MainStack';
import {useSelector} from 'react-redux';
import { LOG } from '../utils/helperFunction';

const MainNavigation = () => {
  const token = useSelector(state => state?.auth?.token);
  LOG('Token-Parent', token);
  return (
    <NavigationContainer ref={NavService.setTopLevelNavigator}>
      {token ? (
        <MainStack initialRoute={undefined} />
      ) : (
        <AuthStack initialRoute={undefined} />
      )}
    </NavigationContainer>
  );
};

export default MainNavigation;

import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { BottomTabs } from '../bottomTabs/BottomTabs';
import DrawerComp from '../../../components/DrawerComp';

const Drawer = createDrawerNavigator();
const DrawerStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          width: '100%',
        },
      }}
      drawerContent={props => <DrawerComp {...props} />}
    >
      <Drawer.Screen
        options={{headerShown: false}}
        name="BottomTabs"
        component={BottomTabs}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;

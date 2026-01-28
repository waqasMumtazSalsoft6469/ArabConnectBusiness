import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../../screens/Main/Home/Home';
import Events from '../../../screens/Main/Events/Events';
import TabBar from '../../../components/TabBar';
import CouponDetails from '../../../screens/Main/CouponDetails/CouponDetails';

import {createStackNavigator} from '@react-navigation/stack';
import MyBusinesses from '../../../screens/Main/MyBusinesses/MyBusinesses';
import MyCoupons from '../../../screens/Main/MyCoupons/MyCoupons';
import AddCoupon from '../../../screens/Main/AddCoupon/AddCoupon';
import EditCoupon from '../../../screens/Main/EditCoupon/EditCoupon';
import MyBusinessDetails from '../../../screens/Main/MyBusinessDetails/MyBusinessDetails';
import EditBusinessProfile from '../../../screens/Main/EditBusinessProfile/EditBusinessProfile';
import EditBusinessImage from '../../../screens/Main/EditBusinessImage/EditBusinessImage';
import Campaign from '../../../screens/Main/Campaign/Campaign';
import CampaignDetails from '../../../screens/Main/CampaignDetails';
import LoyaltyHub from '../../../screens/Main/LoyaltyHub';
import LoyaltyDashboard from '../../../screens/Main/LoyaltyDashboard';
import CustomerListing from '../../../screens/Main/CustomerListing/CustomerListing';
import CustomerDetails from '../../../screens/Main/CustomerDetails/CustomerDetails';
import Rewards from '../../../screens/Main/Rewards';
import Analytics from '../../../screens/Main/Analytics';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="tabBar4"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="tabBar4" component={Home} />
      <Stack.Screen name="CouponDetails" component={CouponDetails} />
    </Stack.Navigator>
  );
}
function LoyaltyStack() {
  return (
    <Stack.Navigator
      initialRouteName="loyalty"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        gestureEnabled: false,
      }}>
      <Tab.Screen name="loyalty" component={LoyaltyHub} />
      <Tab.Screen name="dashboard" component={LoyaltyDashboard} />
      <Tab.Screen name="analytics" component={Analytics} />
      <Tab.Screen name="customerListing" component={CustomerListing} />
      <Tab.Screen name="customerDetails" component={CustomerDetails} />
      <Tab.Screen name="campaign" component={Campaign} />
      <Tab.Screen name="campaigndetails" component={CampaignDetails} />
      <Tab.Screen name="rewards" component={Rewards} />
    </Stack.Navigator>
  );
}
function MyBusinessStack() {
  return (
    <Stack.Navigator
      initialRouteName="MyBusinesses"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="MyBusinesses" component={MyBusinesses} />
      <Stack.Screen name="MyBusinessDetails" component={MyBusinessDetails} />
      <Stack.Screen
        name="EditBusinessProfile"
        component={EditBusinessProfile}
      />
      <Stack.Screen name="EditBusinessImage" component={EditBusinessImage} />
    </Stack.Navigator>
  );
}
function EventStack() {
  return (
    <Stack.Navigator
      initialRouteName="Events"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Events" component={Events} />
    </Stack.Navigator>
  );
}
function CouponStack() {
  return (
    <Stack.Navigator
      initialRouteName="MyCoupons"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="MyCoupons" component={MyCoupons} />
      <Stack.Screen name="CouponDetails" component={CouponDetails} />
      <Stack.Screen name="AddCoupon" component={AddCoupon} />
      <Stack.Screen name="EditCoupon" component={EditCoupon} />
    </Stack.Navigator>
  );
}
export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <TabBar {...props} />}
      initialRouteName="HomeStack"
      backBehavior="initialRoute">
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="CouponStack" component={CouponStack} />
      <Tab.Screen name="EventStack" component={EventStack} />
      <Tab.Screen name="LoyaltyStack" component={LoyaltyStack} />
      {/* <Tab.Screen name="JobStack" component={JobStack} /> */}
      <Tab.Screen name="MyBusinessStack" component={MyBusinessStack} />
    </Tab.Navigator>
  );
};

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         animation: 'simple_push',
//         headerShown: false,
//       }}
//       tabBar={props => <TabBar {...props} />}
//       initialRouteName={'tabBar4'}>
//       <Tab.Screen name="Deals" component={Deals} />
//       <Tab.Screen name="Jobs" component={Jobs} />
//       <Tab.Screen name="tabBar4" component={Home} />
//       <Tab.Screen name="CouponDetails" component={CouponDetails} />
//       <Tab.Screen name="Events" component={Events} />
//       <Tab.Screen name="Shop" component={Shop} />
//     </Tab.Navigator>
//   );
// };

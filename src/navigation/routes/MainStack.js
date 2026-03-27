// @app
import React from 'react';

// drawerComponentt
import DrawerStack from './drawer/DrawerStack';
import Home from '../../screens/Main/Home/Home';
import Events from '../../screens/Main/Events/Events';
import Jobs from '../../screens/Main/Jobs/Jobs';

import {createStackNavigator} from '@react-navigation/stack';
import Edit from '../../screens/Main/EditProfile/Edit';
import Change from '../../screens/Main/ChangePassword/Change';
import Favorites from '../../screens/Main/Favorites/Favorites';
import Settings from '../../screens/Main/Settings/Settings';
import About from '../../screens/Main/AboutUs/About';
import Contact from '../../screens/Main/ContactUs/Contact';
import Help from '../../screens/Main/HelpCenter/Help';
import Terms from '../../screens/Main/Terms/Terms';
import Privacy from '../../screens/Main/Privacy/Privacy';
import CouponDetails from '../../screens/Main/CouponDetails/CouponDetails';

import JobDetails from '../../screens/Main/JobDetails/JobDetails';
import Notification from '../../screens/Main/Notifications/Notification';
import MyBusinesses from '../../screens/Main/MyBusinesses/MyBusinesses';
import MyCoupons from '../../screens/Main/MyCoupons/MyCoupons';
import JobEdit from '../../screens/Main/JobEdit/JobEdit';
import JobSubmittedResumes from '../../screens/Main/JobSubmittedResumes/JobSubmittedResumes';
import JobResume from '../../screens/Main/JobResume/JobResume';
import AddCoupon from '../../screens/Main/AddCoupon/AddCoupon';
import SubscriptionPlan from '../../screens/Main/SubscriptionPlan/SubscriptionPlan';

import EditBusinessProfile from '../../screens/Main/EditBusinessProfile/EditBusinessProfile';
import EditBusinessImage from '../../screens/Main/EditBusinessImage/EditBusinessImage';
import PushNotifications from '../../screens/Main/PushNotifications/PushNotifications';
import Collaborate from '../../screens/Main/Collaborate/Collaborate';
import EventsDetail from '../../screens/Main/EventsDetails/EventsDetail';
import Newsletter from '../../screens/Main/Newsletter/Newsletter';
import TicketListing from '../../screens/Main/TicketListing/TicketListing';
import CustomerListing from '../../screens/Main/CustomerListing/CustomerListing';
import CustomerDetails from '../../screens/Main/CustomerDetails/CustomerDetails';
import EventAdd from '../../screens/Main/EventAdd/EventAdd';
import Restaurants from '../../screens/Main/Restaurants/Restaurants';
import RestaurantDetails from '../../screens/Main/RestaurantDetails/RestaurantDetails';
import MyProducts from '../../screens/Main/MyProducts/MyProducts';
import MyProductsHome from '../../screens/Main/MyProductsHome/MyProductsHome';
import OtherBusiness from '../../screens/Main/OtherBusiness/OtherBusiness';
import AddProduct from '../../screens/Main/AddProduct/AddProduct';
import EditProduct from '../../screens/Main/EditProduct/EditProduct';
import Delivery from '../../screens/Main/OrderDetails/Delivery';
import Campaign from '../../screens/Main/Campaign/Campaign';
import MyCollaborations from '../../screens/Main/MyCollaborations/MyCollaborations';
import NewCampaign from '../../screens/Main/NewCampaign/NewCampaign';
import NewCampaignPlus from '../../screens/Main/NewCampaignPlus/NewCampaignPlus';
import EditCampaign from '../../screens/Main/EditCampaign/EditCampaign';
import MyProductDetails from '../../screens/Main/MyProductDetails/MyProductDetails';
import MySubscription from '../../screens/Main/MySubscription';
import EventEdit from '../../screens/Main/EditEvent/EventEdit';
import AddBusinessProfile from '../../screens/Main/AddBusinessProfile/AddBusinessProfile';
import AddBusinessImage from '../../screens/Main/AddBusinessImage/AddBusinessImage';
import MyProfile from '../../screens/Main/MyProfile';
import QRScannerScreen from '../../screens/Main/QRScanner';
import MyBusinessDetails from '../../screens/Main/MyBusinessDetails/MyBusinessDetails';
import AddJob from '../../screens/Main/AddJob/Addjob';
import LoyaltyHub from '../../screens/Main/LoyaltyHub';
import LoyaltyDashboard from '../../screens/Main/LoyaltyDashboard';
import Rewards from '../../screens/Main/Rewards';
import Analytics from '../../screens/Main/Analytics';
import FlyyerList from '../../screens/Main/FlyyerList/FlyyerList';
import CreateFlyyerStepOne from '../../screens/Main/CreateFlyyer/StepOne';
import CreateFlyyerStepTwo from '../../screens/Main/CreateFlyyer/StepTwo';
import FlyerDetails from '../../screens/Main/FlyerDetails/FlyerDetails';
import FlyerBuilder from '../../screens/Main/FlyerBuilder/FlyerBuilder';
import ReceiptList from '../../screens/Main/ReceiptList/ReceiptList';
import ReceiptDetail from '../../screens/Main/ReceiptDetail/ReceiptDetail';
import PointRule from '../../screens/Main/PointRule/PointRule';

// Screens

const Stack = createStackNavigator();
const MainStack = ({initialRoute}) => {
  return (
    <Stack.Navigator
      initialRouteName="DrawerStack"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="DrawerStack" component={DrawerStack} />
      <Stack.Screen name="tabBar4" component={Home} />
      <Stack.Screen name="AddBusiness" component={AddBusinessProfile} />
      <Stack.Screen name="AddBusinessImage" component={AddBusinessImage} />
      <Stack.Screen name="MyCoupons" component={MyCoupons} />
      <Stack.Screen name="CouponDetails" component={CouponDetails} />
      <Stack.Screen name="AddCoupon" component={AddCoupon} />
      <Stack.Screen name="MyBusinesses" component={MyBusinesses} />

      <Stack.Screen name="MyBusinessDetails" component={MyBusinessDetails} />
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="EventAdd" component={EventAdd} />
      <Stack.Screen name="EventEdit" component={EventEdit} />
      <Stack.Screen name="EventDetails" component={EventsDetail} />
      <Stack.Screen name="Jobs" component={Jobs} />
      <Stack.Screen name="AddJob" component={AddJob} />
      <Stack.Screen name="JobDetails" component={JobDetails} />
      <Stack.Screen name="JobEdit" component={JobEdit} />
      <Stack.Screen
        name="JobSubmittedResumes"
        component={JobSubmittedResumes}
      />
      <Stack.Screen name="JobResume" component={JobResume} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="PushNotifications" component={PushNotifications} />

      {/* Drawer Screens */}
      <Stack.Screen name="editProfile" component={Edit} />
      <Stack.Screen name="myProfile" component={MyProfile} />
      <Stack.Screen name="QRScannerScreen" component={QRScannerScreen} />
      <Stack.Screen
        name="EditBusinessProfile"
        component={EditBusinessProfile}
      />
      <Stack.Screen name="EditBusinessImage" component={EditBusinessImage} />
      <Stack.Screen name="changePassword" component={Change} />
      <Stack.Screen name="favorites" component={Favorites} />
      <Stack.Screen name="SubscriptionPlan" component={SubscriptionPlan} />
      <Stack.Screen name="MySubscription" component={MySubscription} />
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="about" component={About} />
      <Stack.Screen name="contact" component={Contact} />
      <Stack.Screen name="collaborate" component={Collaborate} />
      <Stack.Screen name="help" component={Help} />
      <Stack.Screen name="privacy" component={Privacy} />
      <Stack.Screen name="terms" component={Terms} />
      <Stack.Screen name="newsletter" component={Newsletter} />
      <Stack.Screen name="ticketListing" component={TicketListing} />
      <Stack.Screen name="myProductsHome" component={MyProductsHome} />
      <Stack.Screen name="myProducts" component={MyProducts} />
      <Stack.Screen name="myProductDetails" component={MyProductDetails} />
      <Stack.Screen name="addProducts" component={AddProduct} />
      <Stack.Screen name="editProduct" component={EditProduct} />
      <Stack.Screen name="campaign" component={Campaign} />
      <Stack.Screen name="rewards" component={Rewards} />
      <Stack.Screen name="loyalty" component={LoyaltyHub} />
      <Stack.Screen name="analytics" component={Analytics} />
      <Stack.Screen name="dashboard" component={LoyaltyDashboard} />
      <Stack.Screen name="newcampaign" component={NewCampaign} />
      <Stack.Screen name="flyyerList" component={FlyyerList} />
      <Stack.Screen name="createFlyyerStep1" component={CreateFlyyerStepOne} />
      <Stack.Screen name="createFlyyerStep2" component={CreateFlyyerStepTwo} />
      <Stack.Screen name="flyerDetails" component={FlyerDetails} />
      <Stack.Screen name="flyerBuilder" component={FlyerBuilder} />
      <Stack.Screen name="receiptList" component={ReceiptList} />
      <Stack.Screen name="receiptDetail" component={ReceiptDetail} />
      <Stack.Screen name="pointRule" component={PointRule} />
      <Stack.Screen name="editcampaign" component={EditCampaign} />
      <Stack.Screen name="newcampaignplus" component={NewCampaignPlus} />
      <Stack.Screen name="otherBusiness" component={OtherBusiness} />
      <Stack.Screen name="mycollab" component={MyCollaborations} />

      <Stack.Screen name="orderDetails" component={Delivery} />
      {/*Unknown Location */}
      <Stack.Screen name="customerListing" component={CustomerListing} />
      <Stack.Screen name="customerDetails" component={CustomerDetails} />
      {/* <Stack.Screen name="restaurants" component={Restaurants} /> */}
      <Stack.Screen name="restaurantDetails" component={RestaurantDetails} />
    </Stack.Navigator>
  );
};
export default MainStack;

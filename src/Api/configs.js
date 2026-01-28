export const baseUrl = 'https://react.customdev.solutions:3011/api';
// export const baseUrl = 'https://367c-110-93-244-176.ngrok-free.app/api';
export const imageServer = 'https://react.customdev.solutions:3011/Uploads/';
// export const imageServer =
//   'https://367c-110-93-244-176.ngrok-free.app/Uploads/';

export const endpoints = {
  auth: {
    login: {
      url: 'business/login',
      method: 'POST',
    },
    register: {
      url: 'business/signup',
      method: 'POST',
    },
  },
  profile: {
    update: {
      url: 'business/editProfile',
      method: 'PUT',
    },
  },
  job: {
    add: {
      url: 'jobs/createJob',
      method: 'POST',
    },
    fetchJobByUser: {
      url: 'jobs/getAllJobs',
      method: 'GET',
    },
    fetchJobById: {
      url: 'jobs/getJob',
      method: 'GET',
    },
    fetchJobApplication: {
      url: 'application/getJobApplications',
      method: 'GET',
    },
    edit: {
      url: 'jobs/updateJob',
      method: 'PUT',
    },
    deleteJob: {
      url: 'jobs/deleteJob',
      method: 'DELETE',
    },
  },
  product: {
    add: {
      url: 'product/addProduct',
      method: 'POST',
    },
    fetchBusinessProduct: {
      url: 'product/getBusinessProducts',
      method: 'GET',
    },
    edit: {
      url: 'product/updateProduct',
      method: 'PUT',
    },
    deleteProduct: {
      url: 'product/deleteProduct',
      method: 'DELETE',
    },
  },

  event: {
    add: {
      url: 'event/addEvent',
      method: 'POST',
    },
    fetchEventByUser: {
      url: 'event/getBusinessEvents',
      method: 'GET',
    },
    fetchEventById: {
      url: 'event/getEvent',
      method: 'GET',
    },
    edit: {
      url: 'event/editEvent',
      method: 'PUT',
    },
    deleteEvent: {
      url: 'event/deleteEvent',
      method: 'DELETE',
    },
    fetchEventTicketsByUser: {
      url: 'booking/getEventBookings',
      method: 'GET',
    },
  },

  feedback: {
    contactUs: {
      url: 'feedback/addFeedback',
      method: 'POST',
    },
  },

  order: {
    fetchAllOrder: {
      url: 'order/getAllOrders',
      method: 'GET',
    },
  },
  subscription: {
    buy: {
      url: 'subscription/buySubscription',
      method: 'POST',
    },
    fetchPlanByUser: {
      url: 'plan/getPlans',
      method: 'GET',
    },
    fetchActiveSubscription: {
      url: 'subscription/fetchActiveSubscription',
      method: 'GET',
    },
    fetchPlanByUserID: {
      url: 'subscription/fetchActiveSubscription',
      method: 'GET',
    },
  },
  businessProfile: {
    add: {
      url: 'businessProfile/createProfile',
      method: 'POST',
    },
    addPoints: {
      url: 'businessPoints/add',
      method: 'POST',
    },
    redeemPoints: {
      url: 'businessPoints/redeem',
      method: 'POST',
    },
    fetchBusinessType: {
      url: 'businessType/getBusinessTypes',
      method: 'GET',
    },
    fetchMyBusinessProfiles: {
      url: 'businessProfile/getMyBusiensses',
      method: 'GET',
    },
    fetchBusinessProfileID: {
      url: 'business/getBusiness',
      method: 'GET',
    },
    fetchBusinessProfileByID: {
      url: 'businessProfile/getProfile',
      method: 'GET',
    },
    edit: {
      url: 'businessProfile/editMyProfile',
      method: 'PUT',
    },
    activateProfile: {
      url: 'business/setActiveProfile',
      method: 'PUT',
    },
    fetchBusinessCustomer: {
      url: 'businessProfile/getBusinessCustomers',
      method: 'GET',
    },
    fetchBusinessAnalytics: {
      url: 'analytics',
      method: 'GET',
    },
    fetchChartAnalytics: {
      url: 'businessProfile/chartAnalytics',
      method: 'GET',
    },
    fetchLoyaltyAnalytics: {
      url: 'businessProfile/loyalBaseAnalytics',
      method: 'GET',
    },
    fetchCustomerTransaction: {
      url: 'user/transactionHistory',
      method: 'GET',
    },
    inviteCustomer: {
      url: 'businessProfile/addCustomer',
      method: 'POST',
    },
  },
  coupon: {
    add: {
      url: 'coupon/addCoupon',
      method: 'POST',
    },
    redeem: {
      url: 'coupon/redeemCoupon',
      method: 'POST',
    },
    fetchCouponByBusiness: {
      url: 'coupon/getBusinessCoupons',
      method: 'GET',
    },
    fetchCouponById: {
      url: 'coupon/getCoupon',
      method: 'GET',
    },
    edit: {
      url: 'coupon/updateCoupon',
      method: 'PUT',
    },
    deleteCoupon: {
      url: 'coupon/deleteCoupon',
      method: 'DELETE',
    },
  },
  campaign: {
    add: {
      url: 'campaigns/addCampaign',
      method: 'POST',
    },
    fetchCampaignByBusiness: {
      url: 'campaigns/getCampaigns',
      method: 'GET',
    },
    edit: {
      url: 'campaigns/editCampaign',
      method: 'PUT',
    },
    deleteCampaign: {
      url: 'campaigns/deleteCampaign',
      method: 'DELETE',
    },
  },
  rewards: {
    add: {
      url: 'rewards/addReward',
      method: 'POST',
    },
    fetchRewardsByBusiness: {
      url: 'rewards/getRewards',
      method: 'GET',
    },
    edit: {
      url: 'rewards/updateReward',
      method: 'PUT',
    },
    deleteReward: {
      url: 'rewards/deleteReward',
      method: 'DELETE',
    },
    redeemReward: {
      url: 'rewards/redeemReward',
      method: 'POST',
    },
  },
};

export const reducers = {
  path: {
    auth: 'authApi',
    profile: 'profileApi',
    job: 'JobApi',
    coupon: 'CouponApi',
    campaign: 'CampaignApi',
    rewards: 'RewardsApi',
    event: 'EventApi',
    subscription: 'SubscriptionApi',
    businessProfile: 'BusinessProfileApi',
    product: 'ProdcutApi',
    order: 'orderApi',
    feedback: 'FeedbackApi',
  },
};

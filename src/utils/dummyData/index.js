import { appIcons, appImages } from '../../assets';
import { HEIGHT } from '../../theme/units';

export const jobCategoryOptions = [
  { key: '1', value: 'Information Technology (IT) & Software' },
  { key: '2', value: 'Cybersecurity & Network Security' },
  { key: '3', value: 'Marketing, Advertising & PR' },
  { key: '4', value: 'Sales & Business Development' },
  { key: '5', value: 'Content Creation & Media' },
  { key: '6', value: 'Healthcare & Medical' },
  { key: '7', value: 'Education & Training' },
  { key: '8', value: 'Engineering & Technical' },
  { key: '9', value: 'Finance & Accounting' },
  { key: '10', value: 'Human Resources (HR) & Recruitment' },
  { key: '11', value: 'Hospitality & Tourism' },
  { key: '12', value: 'Logistics, Transport & Supply Chain' },
  { key: '13', value: 'Legal & Compliance' },
  { key: '14', value: 'Arts, Design & Creative' },
  { key: '15', value: 'Construction & Real Estate' },
];

export const STATUS_OPTIONS = [
  {key: 'all', label: 'All'},
  {key: 'pending', label: 'Pending'},
  {key: 'approved', label: 'Approved'},
  {key: 'rejected', label: 'Rejected'},
];
export const subCategoryOptionsMap = {
  'Information Technology (IT) & Software': [
    { key: '1', value: 'Software Development' },
    { key: '2', value: 'Mobile App Development' },
    { key: '3', value: 'Web Development' },
    { key: '4', value: 'IT Support & Helpdesk' },
    { key: '5', value: 'UI/UX Design' },
    { key: '6', value: 'Database Administration' },
    { key: '7', value: 'Cloud Computing' },
  ],
  'Cybersecurity & Network Security': [
    { key: '1', value: 'Network Security' },
    { key: '2', value: 'Penetration Testing' },
    { key: '3', value: 'Incident Response' },
    { key: '4', value: 'Security Compliance' },
    { key: '5', value: 'Cloud Security' },
    { key: '6', value: 'Threat Intelligence' },
  ],
  'Marketing, Advertising & PR': [
    { key: '1', value: 'Digital Marketing' },
    { key: '2', value: 'SEO/SEM' },
    { key: '3', value: 'Social Media Marketing' },
    { key: '4', value: 'Brand Management' },
    { key: '5', value: 'Public Relations' },
    { key: '6', value: 'Email Marketing' },
    { key: '7', value: 'Content Strategy' },
  ],
  'Sales & Business Development': [
    { key: '1', value: 'Retail Sales' },
    { key: '2', value: 'B2B Sales' },
    { key: '3', value: 'Customer Relationship Management' },
    { key: '4', value: 'Lead Generation' },
    { key: '5', value: 'Account Management' },
    { key: '6', value: 'Franchise Development' },
  ],
  'Content Creation & Media': [
    { key: '1', value: 'Copywriting' },
    { key: '2', value: 'Video Production' },
    { key: '3', value: 'Graphic Design' },
    { key: '4', value: 'Photography' },
    { key: '5', value: 'Podcasting' },
    { key: '6', value: 'Animation & Motion Graphics' },
  ],
  'Healthcare & Medical': [
    { key: '1', value: 'Nursing' },
    { key: '2', value: 'General Practitioner' },
    { key: '3', value: 'Specialist Doctor' },
    { key: '4', value: 'Pharmacy' },
    { key: '5', value: 'Medical Laboratory' },
    { key: '6', value: 'Physiotherapy' },
  ],
  'Education & Training': [
    { key: '1', value: 'Primary School Teacher' },
    { key: '2', value: 'Secondary School Teacher' },
    { key: '3', value: 'University Lecturer' },
    { key: '4', value: 'Corporate Trainer' },
    { key: '5', value: 'E-Learning Specialist' },
    { key: '6', value: 'Curriculum Developer' },
  ],
  'Engineering & Technical': [
    { key: '1', value: 'Civil Engineering' },
    { key: '2', value: 'Mechanical Engineering' },
    { key: '3', value: 'Electrical Engineering' },
    { key: '4', value: 'Industrial Engineering' },
    { key: '5', value: 'Quality Assurance' },
    { key: '6', value: 'CAD Design' },
  ],
  'Finance & Accounting': [
    { key: '1', value: 'Financial Analysis' },
    { key: '2', value: 'Accounting' },
    { key: '3', value: 'Auditing' },
    { key: '4', value: 'Tax Consultancy' },
    { key: '5', value: 'Payroll Management' },
    { key: '6', value: 'Investment Banking' },
  ],
  'Human Resources (HR) & Recruitment': [
    { key: '1', value: 'Talent Acquisition' },
    { key: '2', value: 'HR Generalist' },
    { key: '3', value: 'Employee Relations' },
    { key: '4', value: 'HR Compliance' },
    { key: '5', value: 'Training & Development' },
    { key: '6', value: 'Compensation & Benefits' },
  ],
  'Hospitality & Tourism': [
    { key: '1', value: 'Hotel Management' },
    { key: '2', value: 'Food & Beverage Service' },
    { key: '3', value: 'Travel Agency' },
    { key: '4', value: 'Tour Guide' },
    { key: '5', value: 'Event Planning' },
  ],
  'Logistics, Transport & Supply Chain': [
    { key: '1', value: 'Supply Chain Management' },
    { key: '2', value: 'Warehouse Management' },
    { key: '3', value: 'Transportation Planning' },
    { key: '4', value: 'Fleet Management' },
    { key: '5', value: 'Inventory Control' },
  ],
  'Legal & Compliance': [
    { key: '1', value: 'Corporate Law' },
    { key: '2', value: 'Criminal Law' },
    { key: '3', value: 'Contract Management' },
    { key: '4', value: 'Regulatory Compliance' },
    { key: '5', value: 'Paralegal Services' },
  ],
  'Arts, Design & Creative': [
    { key: '1', value: 'Fine Arts' },
    { key: '2', value: 'Fashion Design' },
    { key: '3', value: 'Interior Design' },
    { key: '4', value: 'Illustration' },
    { key: '5', value: '3D Modeling' },
  ],
  'Construction & Real Estate': [
    { key: '1', value: 'Architecture' },
    { key: '2', value: 'Civil Construction' },
    { key: '3', value: 'Property Sales' },
    { key: '4', value: 'Real Estate Management' },
    { key: '5', value: 'Quantity Surveying' },
  ],
};

export const hubItems = [
  {
    id: 1,
    title: 'Dashboard',
    subtitle: 'Manage loyalty program',
    screen: 'dashboard',
    icon: appIcons.dashboard,
    color: '#FF7E5F',
  },
  {
    id: 2,
    title: 'Campaigns',
    subtitle: 'Manage your marketing',
    screen: 'campaign',
    icon: appIcons.campaigns,
    color: '#6A82FB',
  },
  {
    id: 3,
    title: 'Rewards',
    subtitle: 'Track customer rewards',
    screen: 'rewards',
    icon: appIcons.rewards,
    color: '#43C6AC',
  },
  // {
  //   id: 4,
  //   title: 'Analytics',
  //   subtitle: 'Detailed stats & reports',
  //   screen: 'analytics',
  //   icon: appIcons.analytics,
  //   color: '#7F00FF',
  // },
  {
    id: 4,
    title: 'Customers',
    subtitle: 'Manage your client base',
    screen: 'customerListing',
    icon: appIcons.customers,
    color: '#00C6FF',
  },
];
export const dashboardItems = [
  {
    id: 1,
    title: 'Total Customers',
    num: 40,
    icon: appIcons.totalcustomers,
    size: HEIGHT * 0.05,
    info: '5 Active',
  },
  {
    id: 2,
    title: 'Active Rewards',
    num: 6,
    icon: appIcons.activerewards,
    size: HEIGHT * 0.035,
    info: '6 total',
  },
  {
    id: 3,
    title: 'Active Campaigns',
    num: 10,
    icon: appIcons.transactions,
    size: HEIGHT * 0.035,
    info: '0',
  },
  {
    id: 4,
    title: 'Point Issued',
    num: 7705,
    icon: appIcons.points,
    size: HEIGHT * 0.035,
    info: 'Lifetime',
  },
];
export const analyticsItems = [
  {
    id: 1,
    title: 'Points Earned',
    num: 2050,
    icon: appIcons.totalcustomers,
    size: HEIGHT * 0.05,
  },
  {
    id: 2,
    title: 'Points Redeemed',
    num: 340,
    icon: appIcons.activerewards,
    size: HEIGHT * 0.035,
  },
  {
    id: 3,
    title: 'Redemptions',
    num: 10,
    icon: appIcons.transactions,
    size: HEIGHT * 0.035,
  },
  {
    id: 4,
    title: 'New Customers',
    num: 4,
    icon: appIcons.points,
    size: HEIGHT * 0.035,
  },
];

export const campaignData = [
  {
    id: 1,
    title: 'Summer Special Discount',
    description: 'Get 20% off on all summer collection items.',
  },
  {
    id: 2,
    title: 'Summer Special Discount',
    description: 'Get 20% off on all summer collection items.',
  },
  {
    id: 3,
    title: 'Summer Special Discount',
    description: 'Get 20% off on all summer collection items.',
  },
];

export const LogData = [
  {
    name: 'Grocery Carter',
    price: '164.00',
    status: 'Pending',
    pickupTime: '09:00 AM',
    deliveryTime: '09:00 AM',
    deliveryLocation: '105 William St, Chicago, US',
    pickupLocation: '7958 Swift Village',
    orderId: 'ORDER ID: IF-002',
    icon: appIcons?.packageIcon1,
    flagText: 'Pending',
  },
  {
    name: 'Grocery Carter',
    price: '164.00',
    status: 'Cancelled',
    pickupTime: '09:00 AM',
    deliveryTime: '09:00 AM',
    deliveryLocation: '105 William St, Chicago, US',
    pickupLocation: '7958 Swift Village',
    orderId: 'ORDER ID: IF-002',
    icon: appIcons?.packageIcon2,
    flagText: 'Cancelled',
  },
  {
    name: 'Grocery Carter',
    price: '164.00',
    status: 'Pending',
    pickupTime: '09:00 AM',
    deliveryTime: '09:00 AM',
    deliveryLocation: '105 William St, Chicago, US',
    pickupLocation: '7958 Swift Village',
    orderId: 'ORDER ID: IF-002',
    icon: appIcons?.packageIcon3,
    flagText: 'Pending',
  },
  {
    name: 'Grocery Carter',
    price: '164.00',
    status: 'Delivered',
    pickupTime: '09:00 AM',
    deliveryTime: '09:00 AM',
    deliveryLocation: '105 William St, Chicago, US',
    pickupLocation: '7958 Swift Village',
    orderId: 'ORDER ID: IF-002',
    icon: appIcons?.packageIcon2,
    flagText: 'Delivered',
  },
  {
    name: 'Grocery Carter',
    price: '164.00',
    status: 'Cancelled',
    pickupTime: '09:00 AM',
    deliveryTime: '09:00 AM',
    deliveryLocation: '105 William St, Chicago, US',
    pickupLocation: '7958 Swift Village',
    orderId: 'ORDER ID: IF-002',
    icon: appIcons?.packageIcon2,
    flagText: 'Cancelled',
  },
];
export const TicketListingData = [
  {
    id: '1',
    name: 'Lucille R. Ferris',
    timing: '30 August,11:00 AM',
    email: 'example@gmail.com',
    image: appImages?.profile1,
  },
  {
    id: '2',
    name: 'James Freedy',
    timing: '30 August,11:00 AM',
    email: 'example@gmail.com',
    image: appImages?.profile2,
  },
  {
    id: '3',
    name: 'Carter Packer',
    timing: '30 August,11:00 AM',
    email: 'example@gmail.com',
    image: appImages?.profile,
  },
];
export const CustomerListingData = [
  {
    id: '1',
    name: 'Lucille R. Ferris',
    timing: '30 August,11:00 AM',
    email: 'example@gmail.com',
    image: appImages?.profile1,
    totalSpent: '32.5',
    visits: '89',
    birthday: '29-9-2005',
  },
  {
    id: '2',
    name: 'James Freedy',
    timing: '30 August,11:00 AM',
    email: 'example@gmail.com',
    image: appImages?.profile2,
    totalSpent: '32.5',
    visits: '89',
    birthday: '29-9-2005',
  },
  {
    id: '3',
    name: 'Carter Packer',
    timing: '30 August,11:00 AM',
    email: 'example@gmail.com',
    image: appImages?.profile,
    totalSpent: '32.5',
    visits: '89',
    birthday: '29-9-2005',
  },
];
export const CampaignBoxData = [
  {
    id: '1',
    name: 'Free Chocolate Bar With Fruits',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Hand Made Hot Drinks With Bakery Items',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Free Chocolate Bar With Fruits',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Hand Made Hot Drinks With Bakery Items',
    status: 'Inactive',
  },
];
export const couponData = [
  {
    id: 0,
    coupon_title: 'SMART GEAR',
    coupon_promo: '10% off - Smart Fitness...',
    coupon_desc: 'Get 10% off on all smart fitness tracker watches',
    coupon_image: appImages?.watch_image,
    validity: 'Offer valid till JULY 25, 2024',
    expiryDate: '30 April 2024',
    redemption: '05',
    reminder: '02 Days',
    full_desc:
      'Buy this coupon for a 20% discount on all restaurant products, saving you $20. Enjoy our full menu, dine-in or takeout. Limited time offer!',
    swipe: false,
  },
  {
    id: 1,
    coupon_title: 'FOOD BUDDY',
    coupon_promo: '15% off - on all products..',
    coupon_desc:
      'Buy this coupon for a 15% discount on all restaurant products....',
    coupon_image: appImages?.burger_image,
    full_desc:
      "Smart wireless Bluetooth refers to advanced Blue- tooth technology used in a variety of devices and applications, enhancing connectivity and functionality. Here's a breakdown of its components and capabilities:",
  },
  {
    id: 2,
    coupon_title: 'TECH GEAR',
    coupon_promo: '20% off - wireless Bluetooth',
    coupon_desc:
      'Experience crystal clear audio with our wireless bluetooth headphones.',
    coupon_image: appImages?.headphones_image,
    validity: 'Offer valid till JULY 25, 2024',
    full_desc:
      "Smart wireless Bluetooth refers to advanced Blue- tooth technology used in a variety of devices and applications, enhancing connectivity and functionality. Here's a breakdown of its components and capabilities:",
  },
  {
    id: 3,
    coupon_title: 'FOOD BUDDY',
    coupon_promo: '15% off - on all products..',
    coupon_desc:
      'Buy this coupon for a 15% discount on all restaurant products....',
    coupon_image: appImages?.burger_image,
    validity: 'Offer valid till JULY 25, 2024',
    full_desc:
      "Smart wireless Bluetooth refers to advanced Blue- tooth technology used in a variety of devices and applications, enhancing connectivity and functionality. Here's a breakdown of its components and capabilities:",
  },
  {
    id: 4,
    coupon_title: 'TECH GEAR',
    coupon_promo: '20% off - wireless Bluetooth',
    coupon_desc:
      'Experience crystal clear audio with our wireless bluetooth headphones.',
    coupon_image: appImages?.headphones_image,
    validity: 'Offer valid till JULY 25, 2024',
    full_desc:
      "Smart wireless Bluetooth refers to advanced Blue- tooth technology used in a variety of devices and applications, enhancing connectivity and functionality. Here's a breakdown of its components and capabilities:",
  },
];
export const couponBenefits = [
  {
    id: 1,
    termNum: '1-',
    termDetail: 'Wireless headphones, speakers, and earbuds',
  },
  {
    id: 2,
    termNum: '2-',
    termDetail: 'Smartwatches, fitness trackers, and health monitors',
  },
  {
    id: 3,
    termNum: '3-',
    termDetail: 'Remote monitoring devices, hearing aids',
  },
  {
    id: 4,
    termNum: '4-',
    termDetail: 'Eliminates the need for cables, providing ease',
  },
];
export const couponConditions = [
  {
    id: 1,
    termNum: '1-',
    termDetail: 'Limit one coupon per customer',
  },
  {
    id: 2,
    termNum: '2-',
    termDetail:
      "Coupon is non-transferable & can't be combined with any other offer",
  },
  {
    id: 3,
    termNum: '3-',
    termDetail: "Coupon has no cash value & can't be redeemed for cash",
  },
];
export const dealItems = [
  {
    id: 1,
    image: appImages?.restaurant,
    title: 'RESTAURANTS & DINING',
    details: 'RESTAURANTS DETAILS',
  },
  {
    id: 2,
    image: appImages?.coffee_image,
    title: 'COFFEE & DESERTS',
    details: 'COFFEE DETAILS',
  },
  {
    id: 3,
    image: appImages?.automobile,
    title: 'AUTOMOBILE',
    details: 'AUTOMOBILE DETAILS',
  },
  {
    id: 4,
    image: appImages?.cleaningService,
    title: 'CLEANING SERVICES',
    details: 'SERVICE DETAILS',
  },
  {
    id: 5,
    image: appImages?.shop_image,
    title: 'SHOP',
    details: 'SHOP DETAILS',
  },
];
export const restaurants = [
  {
    id: 1,
    name: 'FLAVORFUL HOUSE',
    website: 'Flavorfulfarehouse.com',
    image: appImages?.restaurant1,
  },
  {
    id: 2,
    name: 'SAVORY SPICE SHACK',
    website: 'Flavorfulfarehouse.com',
    image: appImages?.restaurant2,
  },
  {
    id: 3,
    name: 'FRESH HARVEST EATERY',
    website: 'Flavorfulfarehouse.com',
    image: appImages?.restaurant3,
  },
  {
    id: 4,
    name: 'FLAVOR FUSION',
    website: 'Flavorfulfarehouse.com',
    image: appImages?.restaurant4,
  },
  {
    id: 5,
    name: 'CULINARY BITES',
    website: 'Flavorfulfarehouse.com',
    image: appImages?.restaurant5,
  },
  {
    id: 6,
    name: 'URBAN BITES',
    website: 'Flavorfulfarehouse.com',
    image: appImages?.restaurant6,
  },
];
export const marketplaceData = [
  {
    id: 1,
    name: "MEN'S FASHION",
    image: appImages?.marketplace1,
  },
  {
    id: 2,
    name: 'MOBILE-TABLETS',
    image: appImages?.marketplace2,
  },
  {
    id: 3,
    name: 'AUTOMOBILE',
    image: appImages?.marketplace3,
  },
  {
    id: 4,
    name: 'HOME GARDEN',
    image: appImages?.marketplace4,
  },
  {
    id: 5,
    name: 'FITNESS MACHINES',
    image: appImages?.marketplace5,
  },
  {
    id: 6,
    name: 'KIDS & TOYS',
    image: appImages?.marketplace6,
  },
  {
    id: 7,
    name: 'COMPUTER & LAPTOPS',
    image: appImages?.marketplace7,
  },
  {
    id: 8,
    name: 'WOMEN FASHION',
    image: appImages?.marketplace8,
  },
  {
    id: 9,
    name: 'BOOKS & HOBBIES',
    image: appImages?.marketplace9,
  },
  {
    id: 10,
    name: 'BUISNESS EQUIPMENT',
    image: appImages?.marketplace10,
  },
];
export const officeData = [
  {
    id: 1,
    name: "MEN'S FASHION",
    image: appImages?.office1,
  },
  {
    id: 2,
    name: 'MOBILE-TABLETS',
    image: appImages?.office2,
  },
  {
    id: 3,
    name: 'AUTOMOBILE',
    image: appImages?.office3,
  },
  {
    id: 4,
    name: 'HOME GARDEN',
    image: appImages?.office4,
  },
  {
    id: 5,
    name: 'FITNESS MACHINES',
    image: appImages?.office5,
  },
  {
    id: 6,
    name: 'KIDS & TOYS',
    image: appImages?.office6,
  },
];

export const carData = [
  {
    id: 1,
    type: 'MERCEDES BENZ E CLASS',
    image: appImages?.car1,
    description:
      'The mercedes benz E class 2023 combines luxury & performance with a sleek design, cutting edge technology & premium amenties....',
    rate: '27,000',
    owner: 'James Anderson',
    location: 'Located in Los Angeles',
    number: '+1 (555) 987-6543',
    year: '2024',
    condition: 'EXCELENT',
    carColor: 'SILVER',
    AboutCar:
      'The pre owned Mercedes Benz E Class 2023 is a testament to luxury & performance, showcasing a timeless design paired with cutting edge technology & premium features from its sleek exterior lines to the refined interior, every detail excludes elegance and sophistication. Equipped with advanced safety system & innovative technology this iconic model offers a driving experience that’s both thrilling & safe. Don’t just drive, indulge in the excellence of Mercedes Benz engineering with this exceptional pre owned E Class.',
  },
  {
    id: 2,
    type: 'AUDI A4',
    image: appImages?.car2,
    description:
      'The Audi A4 2023 is a premium sedan known for its elegant design, refined interior, & advanced techno-logy. With a smooth driving experience...',
    rate: '47,000',
    owner: 'John Doe',
    location: 'Located in Chicago',
    number: '+1 (555) 987-6543',
    year: '2021',
    condition: 'GOOD',
    carColor: 'SILVER',
    AboutCar:
      'The pre owned Mercedes Benz E Class 2023 is a testament to luxury & performance, showcasing a timeless design paired with cutting edge technology & premium features from its sleek exterior lines to the refined interior, every detail excludes elegance and sophistication. Equipped with advanced safety system & innovative technology this iconic model offers a driving experience that’s both thrilling & safe. Don’t just drive, indulge in the excellence of Mercedes Benz engineering with this exceptional pre owned E Class.',
  },
  {
    id: 3,
    type: 'BMW X5',
    image: appImages?.car3,
    rate: '55,000',
    owner: 'James King',
    location: 'Located in Ohio',
    number: '+1 (555) 987-6543',
    year: '2024',
    condition: 'EXCELENT',
    carColor: 'SILVER',
    description:
      'The BMW X5 2022 is a luxury SUV that blends style, performance and comfort. With spacious interior, advanced technology & powerful...',
    AboutCar:
      'The pre owned Mercedes Benz E Class 2023 is a testament to luxury & performance, showcasing a timeless design paired with cutting edge technology & premium features from its sleek exterior lines to the refined interior, every detail excludes elegance and sophistication. Equipped with advanced safety system & innovative technology this iconic model offers a driving experience that’s both thrilling & safe. Don’t just drive, indulge in the excellence of Mercedes Benz engineering with this exceptional pre owned E Class.',
  },
  {
    id: 4,
    type: 'MERCEDES BENZ E CLASS',
    image: appImages?.car4,
    rate: '30,000',
    description:
      'The mercedes benz E class 2023 combines luxury & performance with a sleek design, cutting edge technology & premium amenties....',
    owner: 'Anderson Smith',
    location: 'Located in New York City',
    number: '+1 (555) 987-6543',
    year: '2023',
    condition: 'EXCELENT',
    carColor: 'SILVER',
    AboutCar:
      'The pre owned Mercedes Benz E Class 2023 is a testament to luxury & performance, showcasing a timeless design paired with cutting edge technology & premium features from its sleek exterior lines to the refined interior, every detail excludes elegance and sophistication. Equipped with advanced safety system & innovative technology this iconic model offers a driving experience that’s both thrilling & safe. Don’t just drive, indulge in the excellence of Mercedes Benz engineering with this exceptional pre owned E Class.',
  },
];

export const restaurantTiming = [
  {
    id: 1,
    timing: 'Monday - Sunday 11:00 AM till 20:00 PM',
    address: 'Flavourful House 123 Main Street, Anytown, USA',
    email: 'bussiness@emailaddress.com',
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
];

export const type = [
  {
    id: 1,
    name: 'COFFEE & DESERTS',
  },
  {
    id: 2,
    name: 'RESTAURANTS & DINING',
  },
  {
    id: 3,
    name: 'CAFE',
  },
  {
    id: 4,
    name: 'AUTOMOBILE',
  },
];
export const jobType = [
  {
    id: 1,
    name: 'PROFESSIONAL SERVICES',
  },
  {
    id: 2,
    name: 'SHOP',
  },
  {
    id: 3,
    name: 'RESTAURANTS & DINING',
  },
  {
    id: 4,
    name: 'CLEANING SERVICES',
  },
];
export const dishes = [
  {
    id: 1,
    name: 'Lasagna',
    image: appImages?.dish1,
    price: '50.25',
    original: '68.25',
    type: 'Lasagna',
    description: `Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type`,
    points: '100',
  },
  {
    id: 2,
    name: 'Spaghetti Bolognese',
    image: appImages?.dish2,
    price: '48.95',
    original: '55.86',
    type: 'Pasta',
    description: `Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type`,
    points: '100',
  },
  {
    id: 3,
    name: 'Vitella Tonato',
    image: appImages?.dish3,
    price: '39.85',
    original: '45.10',
    type: 'Meat',
    description: `Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type`,
    points: '100',
  },
  {
    id: 4,
    name: 'Pizza Margherita',
    image: appImages?.dish4,
    price: '68.20',
    type: 'Pizza',
    description: `Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type`,
    points: '100',
  },
  {
    id: 5,
    name: 'Vitella Tonato',
    image: appImages?.dish3,
    price: '39.85',
    original: '45.10',
    type: 'Meat',
    description: `Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type`,
    points: '100',
  },
  {
    id: 6,
    name: 'Pizza Margherita',
    image: appImages?.dish4,
    price: '68.20',
    type: 'Pizza',
    description: `Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type`,
    points: '100',
  },
  {
    id: 4,
    name: 'Pizza Margherita',
    image: appImages?.dish4,
    price: '68.20',
    type: 'Pizza',
    description: `Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type`,
    points: '100',
  },
  {
    id: 5,
    name: 'Vitella Tonato',
    image: appImages?.dish3,
    price: '39.85',
    original: '45.10',
    type: 'Meat',
    description: `Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type`,
    points: '100',
  },
  {
    id: 6,
    name: 'Pizza Margherita',
    image: appImages?.dish4,
    price: '68.20',
    type: 'Pizza',
    description: `Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type`,
    points: '100',
  },
];
export const restaurantGallery = [
  {
    id: 1,
    image: appImages?.office1,
  },
  {
    id: 2,
    image: appImages?.office2,
  },
  {
    id: 3,
    image: appImages?.office3,
  },
  {
    id: 4,
    image: appImages?.office4,
  },
  {
    id: 5,
    image: appImages?.office5,
  },
  {
    id: 6,
    image: appImages?.office6,
  },
];

export const eventData = [
  {
    id: 1,
    day: '12',
    month: 'NOV',
    image: appImages?.event1,
    title: 'TECH STARTUP BOOTCAMP',
    company: 'Innovate Now Inc',
    rate: '50.00',
    dateTime: 'August 14, 2024',
    timing: '11:00 PM',
    address: 'Flavourful House 123 Main Street, Anytown, USA',
    bgImage: appImages?.eventDetails,
    participants: 'Quantity: 03',
    ticketSold: '255 Sold',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 2,
    day: '04',
    month: 'JAN',
    image: appImages?.event2,
    title: 'MUSIC FESTIVAL 2024',
    company: 'Harmonic Events',
    rate: '299.00',
    dateTime: 'August 24, 2024',
    timing: '11:00 PM',
    address: 'Flavourful House 123 Main Street, Anytown, USA',
    bgImage: appImages?.eventDetails,
    participants: 'Quantity: 03',
    ticketSold: '302 Sold',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 3,
    day: '12',
    month: 'NOV',
    image: appImages?.event3,
    title: 'WELLNESS EXPO',
    company: 'Harmony Productions',
    rate: '99.00',
    dateTime: 'August 04, 2024',
    timing: '11:00 PM',
    address: 'Flavourful House 123 Main Street, Anytown, USA',
    bgImage: appImages?.eventDetails,
    participants: 'Quantity: 03',
    ticketSold: '123 Sold',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];
export const JobData = [
  {
    id: 1,
    image: appIcons?.job1,
    title: 'WEB DEVELOPER (ON-SITE)',
    company: 'Hatypo Studio',
    jobLevel: 'Expert',
    jobLocation: 'NEW YORK CITY',
    jobTime: 'APPLE INC',
    salary: '$4.5K/Monthly',
    position: 'EXPERT DEVELOPER',
    description:
      "Seeking a skilled software developer to join tech innovations Inc's dynamic team response include coding, testing and debugging software application",
  },
  {
    id: 2,
    image: appIcons?.job2,
    title: 'SENIOR UX DESIGNER',
    company: 'Eluxa Space',
    jobLevel: 'Expert',
    jobLocation: 'NEW YORK CITY',
    jobTime: 'FULL TIME',
    salary: '$4.5K/Monthly',
    position: 'EXPERT DEVELOPER',
    description:
      "Seeking a skilled software developer to join tech innovations Inc's dynamic team response include coding, testing and debugging software application",
  },
  {
    id: 3,
    image: appIcons?.job3,
    title: 'WEB DEVELOPER (ON-SITE)',
    company: 'Hatypo Studio',
    jobLevel: 'Expert',
    jobLocation: 'NEW YORK CITY',
    jobTime: 'APPLE INC',
    salary: '$4.5K/Monthly',
    position: 'EXPERT DEVELOPER',
    description:
      "Seeking a skilled software developer to join tech innovations Inc's dynamic team response include coding, testing and debugging software application",
  },
];

export const AllCouponData = [
  {
    id: 1,
    title: 'FOOD BUDDY',
    type: '20% OFF ON ALL PRODUCTS',
    description:
      'Buy this coupon for a 20% discount on all restaurant products, saving you $20.00. Enjoy our full menu, dine-in or takeout. Limited time offer!',
    expiry: '30 August, 2024',
    image: appImages?.couponImage1,
  },
  {
    id: 2,
    title: 'FOOD BUDDY',
    type: '15% OFF ON ALL PRODUCTS',
    description:
      'Buy this coupon for a 20% discount on all restaurant products, saving you $20.00. Enjoy our full menu, dine-in or takeout. Limited time offer!',
    expiry: '30 July, 2024',
    image: appImages?.couponImage2,
  },
  {
    id: 3,
    title: 'FOOD BUDDY',
    type: '25% OFF ON ALL PRODUCTS',
    description:
      'Buy this coupon for a 20% discount on all restaurant products, saving you $20.00. Enjoy our full menu, dine-in or takeout. Limited time offer!',
    expiry: '15 September, 2024',
    image: appImages?.couponImage3,
  },
];
// Dummy transaction data - replace this in your component file
export const transactionData = [
  {
    id: 1,
    type: 'earned',
    date: 'Nov 30, 2025',
    title: 'Purchase No. 1245',
    customer: 'John Doe',
  },
  {
    id: 2,
    type: 'redeemed',
    date: 'Dec 05, 2025',
    title: 'Redeemed: Free Premium Coffee',
    customer: 'Jane Smith',
  },
  {
    id: 3,
    type: 'earned',
    date: 'Dec 08, 2025',
    title: 'Purchase No. 1247',
    customer: 'Unknown',
  },
];
export const notificationData = [
  {
    id: 1,
    notification:
      'New coupon you redeemed has been stored in your profile section',
    time: 'Just Now',
  },
];
export const notificationYesterdayData = [
  {
    id: 1,
    notification:
      'New coupon you redeemed has been stored in your profile section',
    time: '20 hours Ago',
  },
  {
    id: 2,
    notification: 'New coupons has arrived, take a look before it goes',
    time: '1 day ago',
  },
  {
    id: 3,
    notification:
      'New coupon you redeemed has been stored in your profile section',
    time: '2 day ago',
  },
];
export const termsData = [
  {
    id: 1,
    termNum: '1- ACCEPTANCE OF TERMS',
    termDetail:
      'By downloading, accessing, or using the Shopdit Business App, you agree to be bound by these Terms and Conditions. If you do not agree, you must not use the application.',
  },
  {
    id: 2,
    termNum: '2- BUSINESS ELIGIBILITY',
    termDetail:
      'You must be a legally registered business or authorized representative of a business to use the Shopdit Business App. You confirm that all information you provide is accurate and lawful.',
  },
  {
    id: 3,
    termNum: '3- BUSINESS ACCOUNTS',
    termDetail:
      'You are responsible for maintaining the confidentiality of your login credentials and all activity performed through your business account. You are responsible for ensuring that all users accessing your account are authorized.',
  },
  {
    id: 4,
    termNum: '4- SUBSCRIPTIONS AND BILLING',
    termDetail:
      'Access to Shopdit Business features requires an active subscription purchased through Apple In-App Purchase. Subscriptions renew automatically unless canceled through your Apple account. Shopdit does not manage or store your payment information.',
  },
  {
    id: 5,
    termNum: '5- BUSINESS PROFILES',
    termDetail:
      'Depending on your subscription plan, you may create one or more business profiles. Each profile represents a physical or online business location and may create campaigns, deals, coupons, rewards, and listings.',
  },
  {
    id: 6,
    termNum: '6- CAMPAIGNS, COUPONS, AND DEALS',
    termDetail:
      'Businesses may create and publish campaigns, coupons, and deals for users. You are fully responsible for honoring all offers you publish. Redemption may require QR code scanning or in-person verification.',
  },
  {
    id: 7,
    termNum: '7- EVENTS AND JOB LISTINGS',
    termDetail:
      'Businesses may create event and job listings. Shopdit only provides a platform for listing and discovery. You are responsible for the accuracy, legality, and fulfillment of any events, hiring, or employment agreements.',
  },
  {
    id: 8,
    termNum: '8- BUSINESS POINTS AND REWARDS',
    termDetail:
      'You may issue Business Points and rewards to users as loyalty incentives. Business Points have no cash value and cannot be exchanged for money. You are responsible for honoring all point redemptions and rewards you offer.',
  },
  {
    id: 9,
    termNum: '9- USER INTERACTIONS',
    termDetail:
      'Users may contact your business through the app. All transactions, service delivery, and communications occur directly between you and the user. Shopdit does not mediate disputes.',
  },
  {
    id: 10,
    termNum: '10- CONTENT AND BUSINESS DATA',
    termDetail:
      'You retain ownership of your business content, including images, offers, and descriptions. By uploading content, you grant Shopdit a license to display and promote it within the app and marketing channels.',
  },
  {
    id: 11,
    termNum: '11- PROHIBITED ACTIVITIES',
    termDetail:
      'You agree not to post misleading, fraudulent, illegal, or harmful content. Shopdit reserves the right to remove content or suspend accounts that violate these terms.',
  },
  {
    id: 12,
    termNum: '12- ANALYTICS AND DATA',
    termDetail:
      'Shopdit provides analytics tools for tracking performance. These analytics are provided for informational purposes only and do not guarantee sales, customers, or business success.',
  },
  {
    id: 13,
    termNum: '13- PRIVACY AND DATA USE',
    termDetail:
      'Use of the Shopdit Business App is subject to our Privacy Policy. By using the app, you consent to Shopdit collecting and processing business and customer data as described.',
  },
  {
    id: 14,
    termNum: '14- SERVICE AVAILABILITY',
    termDetail:
      'Shopdit does not guarantee uninterrupted or error-free service. Features may change, be updated, or removed at any time.',
  },
  {
    id: 15,
    termNum: '15- TERMINATION',
    termDetail:
      'Shopdit may suspend or terminate your business account if you violate these Terms, misuse the platform, or engage in unlawful activity.',
  },
  {
    id: 16,
    termNum: '16- DISCLAIMER',
    termDetail:
      'The Shopdit Business App is provided “as is” without warranties of any kind. Shopdit does not guarantee business growth, customer traffic, or revenue.',
  },
  {
    id: 17,
    termNum: '17- LIMITATION OF LIABILITY',
    termDetail:
      'To the maximum extent permitted by law, Shopdit shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.',
  },
  {
    id: 18,
    termNum: '18- CHANGES TO TERMS',
    termDetail:
      'Shopdit may update these Terms at any time. Continued use of the app after updates constitutes acceptance of the revised Terms.',
  },
  {
    id: 19,
    termNum: '19- GOVERNING LAW',
    termDetail:
      'These Terms are governed by the laws of the jurisdiction in which Shopdit operates.',
  },
  {
    id: 20,
    termNum: '20- CONTACT US',
    termDetail:
      'If you have questions about these Business Terms, please contact us through the Shopdit Business App support section.',
  },
];


export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  distance: string;
  priceRange: string;
  tags: string[];
  categories: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  toppings?: Topping[];
  sizes?: Size[];
  spiciness?: SpicyLevel[];
}

export interface Topping {
  id: string;
  name: string;
  price: number;
}

export interface Size {
  id: string;
  name: string;
  price: number;
}

export interface SpicyLevel {
  id: string;
  name: string;
  icon: string;
}

export interface Voucher {
  id: string;
  title: string;
  description: string;
  discount: string;
  icon: string;
  minOrder?: number;
  type: 'percentage' | 'fixed' | 'freeship';
  value: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

// Restaurants
export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Hana Chicken',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec',
    rating: 4.8,
    reviews: 289,
    deliveryTime: '15 mins',
    distance: '2 km',
    priceRange: '$5 - $50',
    tags: ['Freeship', 'Near you', 'Deal $1'],
    categories: ['Fried Chicken'],
    location: {
      lat: 10.8231,
      lng: 106.6297,
      address: '123 Nguyen Hue Street, District 1, HCMC'
    }
  },
  {
    id: '2',
    name: 'Bamsu Restaurant',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
    rating: 4.1,
    reviews: 156,
    deliveryTime: '35 mins',
    distance: '4.5 km',
    priceRange: '$10 - $60',
    tags: ['Freeship', 'Near you'],
    categories: ['Chicken Salad', 'Sandwich', 'Desserts'],
    location: {
      lat: 10.7769,
      lng: 106.7009,
      address: '456 Le Lai Street, District 1, HCMC'
    }
  },
  {
    id: '3',
    name: 'B\'Fresh Coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
    rating: 4.5,
    reviews: 342,
    deliveryTime: '30 mins',
    distance: '3.2 km',
    priceRange: '$3 - $20',
    tags: ['Freeship', 'Near you'],
    categories: ['Coffee', 'Drink'],
    location: {
      lat: 10.7626,
      lng: 106.6820,
      address: '789 Pasteur Street, District 3, HCMC'
    }
  },
  {
    id: '4',
    name: 'Loran Seafood',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de',
    rating: 4.7,
    reviews: 198,
    deliveryTime: '30 mins',
    distance: '5 km',
    priceRange: '$15 - $80',
    tags: ['Deal $1'],
    categories: ['Seafood'],
    location: {
      lat: 10.7891,
      lng: 106.6946,
      address: '321 Hai Ba Trung Street, District 1, HCMC'
    }
  },
  {
    id: '5',
    name: 'Laura Green',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    rating: 4.2,
    reviews: 267,
    deliveryTime: '20 mins',
    distance: '1.8 km',
    priceRange: '$8 - $35',
    tags: ['Deal $1', '-25%'],
    categories: ['Healthy', 'Salad'],
    location: {
      lat: 10.7733,
      lng: 106.6982,
      address: '654 Vo Van Tan Street, District 3, HCMC'
    }
  }
];

// Menu Items
export const menuItems: MenuItem[] = [
  {
    id: 'm1',
    restaurantId: '1',
    name: 'Fried Chicken',
    description: 'Crispy fried wings, thigh',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec',
    price: 15,
    rating: 4.5,
    reviews: 99,
    category: 'Main Course',
    sizes: [
      { id: 's1', name: 'S', price: 0 },
      { id: 's2', name: 'M', price: 5 },
      { id: 's3', name: 'L', price: 10 }
    ],
    toppings: [
      { id: 't1', name: 'Corn', price: 2 },
      { id: 't2', name: 'Cheese Cheddar', price: 5 },
      { id: 't3', name: 'Salted egg', price: 10 }
    ],
    spiciness: [
      { id: 'sp1', name: 'No', icon: '😊' },
      { id: 'sp2', name: 'Hot', icon: '🌶️' },
      { id: 'sp3', name: 'Very hot', icon: '🔥' }
    ]
  },
  {
    id: 'm2',
    restaurantId: '1',
    name: 'Chicken Salad',
    description: 'Fresh salad with grilled chicken',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    price: 15,
    rating: 4.5,
    reviews: 39,
    category: 'Salad'
  },
  {
    id: 'm3',
    restaurantId: '1',
    name: 'Spicy Chicken',
    description: 'Hot and spicy fried chicken',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6',
    price: 15,
    rating: 4.5,
    reviews: 99,
    category: 'Main Course'
  },
  {
    id: 'm4',
    restaurantId: '1',
    name: 'Fried Potatos',
    description: 'Crispy golden french fries',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877',
    price: 15,
    rating: 4.5,
    reviews: 99,
    category: 'Side Dish'
  },
  {
    id: 'm5',
    restaurantId: '1',
    name: 'Saute Chicken Rice',
    description: 'Sauté chicken, Rice',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19',
    price: 15,
    rating: 4.5,
    reviews: 99,
    category: 'Main Course'
  },
  {
    id: 'm6',
    restaurantId: '1',
    name: 'Chicken Burger',
    description: 'Fried chicken, Cheese & Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    price: 15,
    rating: 4.5,
    reviews: 99,
    category: 'Burger'
  },
  {
    id: 'm7',
    restaurantId: '1',
    name: 'Fried Chicken & Potatos',
    description: 'Combo meal with chicken and fries',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710',
    price: 26,
    rating: 4.5,
    reviews: 39,
    category: 'Combo'
  }
];

// Vouchers
export const vouchers: Voucher[] = [
  {
    id: 'v1',
    title: '10% Discount',
    description: 'Get 10% off on your order',
    discount: '- 10%',
    icon: '🎫',
    type: 'percentage',
    value: 10
  },
  {
    id: 'v2',
    title: 'Free Shipping',
    description: 'No delivery fee',
    discount: '-$1 shipping fee',
    icon: '🛵',
    type: 'freeship',
    value: 1
  },
  {
    id: 'v3',
    title: 'E-wallet Discount',
    description: 'Pay with e-wallet to get discount',
    discount: '-10% for E-wallet',
    icon: '💳',
    type: 'percentage',
    value: 10
  },
  {
    id: 'v4',
    title: 'Big Order Discount',
    description: 'For orders over $50',
    discount: '- 30% for bill over $50',
    icon: '📱',
    minOrder: 50,
    type: 'percentage',
    value: 30
  }
];

// Categories
export const categories: Category[] = [
  { id: 'c1', name: 'Rice', icon: '🍚', color: '#E3F2FD' },
  { id: 'c2', name: 'Healthy', icon: '🥗', color: '#F3E5F5' },
  { id: 'c3', name: 'Drink', icon: '🧃', color: '#E1F5FE' },
  { id: 'c4', name: 'Fastfood', icon: '🍔', color: '#FFF3E0' },
  { id: 'c5', name: 'Seafood', icon: '🦞', color: '#FCE4EC' },
  { id: 'c6', name: 'Dessert', icon: '🍰', color: '#FFF9C4' },
];

// Driver info
export const driverInfo = {
  id: 'd1',
  name: 'John Cooper',
  role: 'Food Delivery',
  rating: 4.8,
  phone: '+84 123 456 789',
  avatar: 'https://i.pravatar.cc/150?img=12'
};

export default {
  restaurants,
  menuItems,
  vouchers,
  categories,
  driverInfo
};
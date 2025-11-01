// redux/orderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cartSlice';

export type OrderStatus = 
  | 'pending'
  | 'confirmed' 
  | 'looking_for_driver'
  | 'preparing'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  items: CartItem[];
  restaurantId: string;
  restaurantName: string;
  deliveryAddress: string;
  deliveryLocation: {
    lat: number;
    lng: number;
  };
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  estimatedDeliveryTime: string;
  driver?: {
    id: string;
    name: string;
    phone: string;
    avatar: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface OrderState {
  currentOrder: Order | null;
  orders: Order[];
  tracking: {
    orderId: string | null;
    driverLocation: {
      lat: number;
      lng: number;
    } | null;
    eta: string | null;
  };
}

const initialState: OrderState = {
  currentOrder: null,
  orders: [],
  tracking: {
    orderId: null,
    driverLocation: null,
    eta: null,
  },
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder: (
      state,
      action: PayloadAction<Omit<Order, 'id' | 'createdAt' | 'updatedAt'>>
    ) => {
      const newOrder: Order = {
        ...action.payload,
        id: `ORD-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.currentOrder = newOrder;
      state.orders.unshift(newOrder);
    },

    updateOrderStatus: (
      state,
      action: PayloadAction<{ orderId: string; status: OrderStatus }>
    ) => {
      if (state.currentOrder?.id === action.payload.orderId) {
        state.currentOrder.status = action.payload.status;
        state.currentOrder.updatedAt = new Date().toISOString();
      }
      
      const order = state.orders.find(o => o.id === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
        order.updatedAt = new Date().toISOString();
      }
    },

    assignDriver: (
      state,
      action: PayloadAction<{
        orderId: string;
        driver: Order['driver'];
      }>
    ) => {
      if (state.currentOrder?.id === action.payload.orderId) {
        state.currentOrder.driver = action.payload.driver;
      }
      
      const order = state.orders.find(o => o.id === action.payload.orderId);
      if (order) {
        order.driver = action.payload.driver;
      }
    },

    startTracking: (state, action: PayloadAction<string>) => {
      state.tracking.orderId = action.payload;
    },

    updateDriverLocation: (
      state,
      action: PayloadAction<{ lat: number; lng: number }>
    ) => {
      state.tracking.driverLocation = action.payload;
    },

    updateETA: (state, action: PayloadAction<string>) => {
      state.tracking.eta = action.payload;
    },

    stopTracking: (state) => {
      state.tracking = {
        orderId: null,
        driverLocation: null,
        eta: null,
      };
    },

    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },

    clearOrders: (state) => {
      state.orders = [];
      state.currentOrder = null;
      state.tracking = {
        orderId: null,
        driverLocation: null,
        eta: null,
      };
    },
  },
});

export const {
  createOrder,
  updateOrderStatus,
  assignDriver,
  startTracking,
  updateDriverLocation,
  updateETA,
  stopTracking,
  clearCurrentOrder,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
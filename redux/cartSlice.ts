// redux/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  toppings?: string[];
  spiciness?: string;
  note?: string;
  restaurantId: string;
  restaurantName: string;
}

export interface CartState {
  items: CartItem[];
  restaurantId: string | null;
  restaurantName: string | null;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  selectedVoucher: string | null;
}

const initialState: CartState = {
  items: [],
  restaurantId: null,
  restaurantName: null,
  subtotal: 0,
  deliveryFee: 2,
  discount: 0,
  selectedVoucher: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => 
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          JSON.stringify(item.toppings) === JSON.stringify(action.payload.toppings) &&
          item.spiciness === action.payload.spiciness
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      // Set restaurant info if first item
      if (state.items.length === 1) {
        state.restaurantId = action.payload.restaurantId;
        state.restaurantName = action.payload.restaurantName;
      }

      // Recalculate subtotal
      state.subtotal = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => {
        const itemKey = `${item.id}-${item.size}-${JSON.stringify(item.toppings)}-${item.spiciness}`;
        return itemKey !== action.payload;
      });

      // Clear restaurant info if cart is empty
      if (state.items.length === 0) {
        state.restaurantId = null;
        state.restaurantName = null;
      }

      // Recalculate subtotal
      state.subtotal = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ itemKey: string; quantity: number }>
    ) => {
      const item = state.items.find(item => {
        const itemKey = `${item.id}-${item.size}-${JSON.stringify(item.toppings)}-${item.spiciness}`;
        return itemKey === action.payload.itemKey;
      });

      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i !== item);
        }
      }

      // Recalculate subtotal
      state.subtotal = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.restaurantId = null;
      state.restaurantName = null;
      state.subtotal = 0;
      state.discount = 0;
      state.selectedVoucher = null;
    },

    applyVoucher: (
      state,
      action: PayloadAction<{ voucherId: string; discount: number }>
    ) => {
      state.selectedVoucher = action.payload.voucherId;
      state.discount = action.payload.discount;
    },

    removeVoucher: (state) => {
      state.selectedVoucher = null;
      state.discount = 0;
    },

    updateDeliveryFee: (state, action: PayloadAction<number>) => {
      state.deliveryFee = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyVoucher,
  removeVoucher,
  updateDeliveryFee,
} = cartSlice.actions;

export default cartSlice.reducer;
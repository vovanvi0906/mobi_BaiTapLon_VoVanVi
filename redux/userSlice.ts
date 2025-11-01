// redux/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Address {
  id: string;
  label: 'Home' | 'Work' | 'Other';
  address: string;
  lat: number;
  lng: number;
  isDefault: boolean;
}

export interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  avatar: string | null;
  addresses: Address[];
  selectedAddress: Address | null;
  favorites: string[];
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  phone: null,
  avatar: null,
  addresses: [
    {
      id: 'addr1',
      label: 'Home',
      address: '201 Katlian No.21 Street',
      lat: 10.7769,
      lng: 106.7009,
      isDefault: true,
    },
  ],
  selectedAddress: {
    id: 'addr1',
    label: 'Home',
    address: '201 Katlian No.21 Street',
    lat: 10.7769,
    lng: 106.7009,
    isDefault: true,
  },
  favorites: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        email: string;
        phone: string;
        avatar?: string;
      }>
    ) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.avatar = action.payload.avatar || null;
    },

    updateProfile: (
      state,
      action: PayloadAction<Partial<UserState>>
    ) => {
      return { ...state, ...action.payload };
    },

    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },

    updateAddress: (state, action: PayloadAction<Address>) => {
      const index = state.addresses.findIndex(
        addr => addr.id === action.payload.id
      );
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    },

    deleteAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(
        addr => addr.id !== action.payload
      );
    },

    selectAddress: (state, action: PayloadAction<Address>) => {
      state.selectedAddress = action.payload;
    },

    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.favorites.indexOf(action.payload);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },

    clearUser: (state) => {
      return initialState;
    },
  },
});

export const {
  setUser,
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  selectAddress,
  toggleFavorite,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
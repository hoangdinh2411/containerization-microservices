import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  menu: [],
  orders: {
    list: [],
    totalProduct: 0,
  },
};

const appSlice = createSlice({
  name: 'order cafe',
  initialState,
  reducers: {
    SET_MENU: (state, action) => {
      state.menu = action.payload;
    },
    SET_ORDERS: (state, action) => {
      state.orders.list = action.payload.list;
      state.orders.totalProduct = action.payload.total
     

    },
  },
});

const {reducer, actions} = appSlice;

export const {SET_MENU, SET_ORDERS} = actions;
export default reducer;

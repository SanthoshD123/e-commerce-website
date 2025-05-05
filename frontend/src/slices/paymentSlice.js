import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    methods: [],
  },
  reducers: {
    setPaymentMethods: (state, action) => {
      state.methods = action.payload; // Store available payment methods
    },
  },
});

export const { setPaymentMethods } = paymentSlice.actions;
export default paymentSlice.reducer;

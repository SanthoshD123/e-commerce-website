// import { createSlice } from '@reduxjs/toolkit';
// import { updateCart } from '../utils/cartUtils';

// const initialState = localStorage.getItem('cart')
//   ? JSON.parse(localStorage.getItem('cart'))
//   : { 
//       cartItems: [], 
//       shippingAddress: {}, 
//       paymentMethod: 'GPay'  // Default to GPay
//     };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       // NOTE: we don't need user, rating, numReviews or reviews in the cart
//       const { user, rating, numReviews, reviews, ...item } = action.payload;

//       const existItem = state.cartItems.find((x) => x._id === item._id);

//       if (existItem) {
//         state.cartItems = state.cartItems.map((x) =>
//           x._id === existItem._id ? item : x
//         );
//       } else {
//         state.cartItems = [...state.cartItems, item];
//       }

//       return updateCart(state, item);
//     },
//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
//       return updateCart(state);
//     },
//     saveShippingAddress: (state, action) => {
//       state.shippingAddress = action.payload;
//       localStorage.setItem('cart', JSON.stringify(state));
//     },
//     savePaymentMethod: (state, action) => {
//       const allowedPaymentMethods = ['GPay', 'Debit Card', 'Cash on Delivery'];

//       if (allowedPaymentMethods.includes(action.payload)) {
//         state.paymentMethod = action.payload;
//       } else {
//         state.paymentMethod = 'GPay'; // Default to GPay if invalid value
//       }

//       localStorage.setItem('cart', JSON.stringify(state));
//     },
//     clearCartItems: (state) => {
//       state.cartItems = [];
//       localStorage.setItem('cart', JSON.stringify(state));
//     },
//     // Reset cart state when user logs out
//     resetCart: (state) => (state = initialState),
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   saveShippingAddress,
//   savePaymentMethod,
//   clearCartItems,
//   resetCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';
// import { updateCart } from '../utils/cartUtils';

// const initialState = localStorage.getItem('cart')
//   ? JSON.parse(localStorage.getItem('cart'))
//   : { 
//       cartItems: [], 
//       shippingAddress: {}, 
//       paymentMethod: 'GPay'  // Default to GPay
//     };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const { user, rating, numReviews, reviews, ...item } = action.payload;

//       const existItem = state.cartItems.find((x) => x._id === item._id);

//       if (existItem) {
//         state.cartItems = state.cartItems.map((x) =>
//           x._id === existItem._id ? { ...x, qty: existItem.qty + item.qty } : x
//         );
//       } else {
//         state.cartItems.push(item);
//       }

//       // Update local storage AFTER modifying the state
//       updateCart(state);
//     },

//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
//       updateCart(state);
//     },

//     saveShippingAddress: (state, action) => {
//       state.shippingAddress = action.payload;
//       localStorage.setItem('cart', JSON.stringify(state));
//     },

//     savePaymentMethod: (state, action) => {
//       const allowedPaymentMethods = ['GPay', 'Debit Card', 'Cash on Delivery'];
//       state.paymentMethod = allowedPaymentMethods.includes(action.payload)
//         ? action.payload
//         : 'GPay';
//       localStorage.setItem('cart', JSON.stringify(state));
//     },

//     clearCartItems: (state) => {
//       state.cartItems = [];
//       updateCart(state);
//     },

//     resetCart: (state) => {
//       Object.assign(state, initialState);
//       updateCart(state);
//     },
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   saveShippingAddress,
//   savePaymentMethod,
//   clearCartItems,
//   resetCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { 
      cartItems: [], 
      shippingAddress: {}, 
      paymentMethod: 'GPay'  // Default to GPay
    };

const allowedPaymentMethods = ['GPay', 'Debit Card', 'Cash on Delivery'];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { user, rating, numReviews, reviews, ...item } = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? { ...x, qty: existItem.qty + item.qty } : x
        );
      } else {
        state.cartItems.push(item);
      }

      updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },

    savePaymentMethod: (state, action) => {
      if (allowedPaymentMethods.includes(action.payload)) {
        state.paymentMethod = action.payload;
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },

    clearCartItems: (state) => {
      state.cartItems = [];
      updateCart(state);
    },

    resetCart: (state) => {
      Object.assign(state, { ...initialState });
      updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;

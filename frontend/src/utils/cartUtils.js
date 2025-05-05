export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// NOTE: the code below has been changed from the course code to fix an issue
// with type coercion of strings to numbers.
// Our addDecimals function expects a number and returns a string, so it is not
// correct to call it passing a string as the argument.

export const updateCart = (state) => {
  // Calculate the items price in whole number (pennies) to avoid issues with
  // floating point number calculations
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + (item.price * 100 * item.qty) / 100,
    0
  );
  state.itemsPrice = addDecimals(itemsPrice);

  // Calculate the shipping price
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice);

  // Calculate the tax price
  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  // Calculate the total price
  state.totalPrice = addDecimals(totalPrice);

  // Save the cart to localStorage
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
// export const addDecimals = (num) => {
//   return (Math.round(num * 100) / 100).toFixed(2);
// };

// // Function to update the cart and save it in localStorage
// export const updateCart = (state, forceClear = false) => {
//   if (forceClear) {
//     // Clear cart only if forceClear is set to true (e.g., after a successful purchase)
//     localStorage.removeItem('cart');
//     return { cartItems: [], itemsPrice: "0.00", shippingPrice: "0.00", taxPrice: "0.00", totalPrice: "0.00" };
//   }

//   // Calculate items price (avoiding floating point issues)
//   const itemsPrice = state.cartItems.reduce(
//     (acc, item) => acc + (item.price * 100 * item.qty) / 100,
//     0
//   );
//   state.itemsPrice = addDecimals(itemsPrice);

//   // Calculate shipping price
//   const shippingPrice = itemsPrice > 100 ? 0 : 10;
//   state.shippingPrice = addDecimals(shippingPrice);

//   // Calculate tax price
//   const taxPrice = 0.15 * itemsPrice;
//   state.taxPrice = addDecimals(taxPrice);

//   // Calculate total price
//   const totalPrice = itemsPrice + shippingPrice + taxPrice;
//   state.totalPrice = addDecimals(totalPrice);

//   // Save the cart to localStorage
//   localStorage.setItem('cart', JSON.stringify(state));

//   return state;
// };

// // Function to load cart from localStorage
// export const loadCart = () => {
//   const cart = localStorage.getItem('cart');
//   return cart ? JSON.parse(cart) : { cartItems: [], itemsPrice: "0.00", shippingPrice: "0.00", taxPrice: "0.00", totalPrice: "0.00" };
// };

// // Function to clear cart manually
// export const clearCart = () => {
//   localStorage.removeItem('cart');
//   return { cartItems: [], itemsPrice: "0.00", shippingPrice: "0.00", taxPrice: "0.00", totalPrice: "0.00" };
// };


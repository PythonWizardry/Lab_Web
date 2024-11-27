import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
  };
  
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      setCart(state, action) {
        state.items = action.payload;
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      },
      addItem(state, action) {
        state.items.push(action.payload);
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      },
      incrementQuantity(state, action) {
        const { id, color, warranty } = action.payload;
        const item = state.items.find(i => i.id === id && i.color === color && i.warranty === warranty);
        if (item) {
          item.amount += 1;
          localStorage.setItem('cartItems', JSON.stringify(state.items));
        }
      },
      decrementQuantity(state, action) {
        const { id, color, warranty } = action.payload;
        const item = state.items.find(i => i.id === id && i.color === color && i.warranty === warranty);
        if (item && item.amount > 1) {
          item.amount -= 1;
          localStorage.setItem('cartItems', JSON.stringify(state.items));
        }
      },
      removeItem(state, action) {
        const { id, color, warranty } = action.payload;
        state.items = state.items.filter(item => !(item.id === id && item.color === color && item.warranty === warranty));
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
  });
  
export const { setCart, incrementQuantity, decrementQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import  cSidebarReducer  from './features/cart/cSidebarSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    cSidebar: cSidebarReducer,
  },
})
import { configureStore } from '@reduxjs/toolkit';
import sidebarSlice from './features/sidebar';
import grabbingCardSlice from './features/grabbingCard'

export const store = configureStore({
    reducer: {
        sidebarSlice,
        grabbingCardSlice
    }
})
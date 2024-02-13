import { configureStore } from '@reduxjs/toolkit';
import sidebarSlice from './features/sidebar';
import grabTaskCardSlice from './features/grabbingCard'

export const store = configureStore({
    reducer: {
        sidebarSlice,
        grabTaskCardSlice
    }
})
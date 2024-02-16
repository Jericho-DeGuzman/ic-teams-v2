import { configureStore } from '@reduxjs/toolkit';
import sidebarSlice from './features/sidebar';
import draggingCardSlice from './features/draggingCard';

export const store = configureStore({
    reducer: {
        sidebarSlice,
        draggingCardSlice,
    }
})
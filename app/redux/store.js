import { configureStore } from '@reduxjs/toolkit';
import sidebarSlice from './features/sidebar';
import grabbingCardSlice from './features/draggingCard';
import cardPositionSlice from './features/cardPositions';

export const store = configureStore({
    reducer: {
        sidebarSlice,
        grabbingCardSlice,
        cardPositionSlice,
    }
})
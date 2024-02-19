import { configureStore } from '@reduxjs/toolkit';
import sidebarSlice from './features/sidebar';
import draggingCardSlice from './features/draggingCard';
import targetFormSlice from './features/targetForms';

export const store = configureStore({
    reducer: {
        sidebarSlice,
        draggingCardSlice,
        targetFormSlice,
    }
})
import { configureStore } from '@reduxjs/toolkit';
import sidebarSlice from './features/sidebar';
import draggingCardSlice from './features/draggingCard';
import targetFormSlice from './features/targetForms';
import taskFormSlice from './features/taskForm';
import selectionDataSlice from './features/selectionData';
import deletingTargetSlice from './features/deleteTarget';
import targetDataSlice from './features/targets'
import editingTargetSlice from './features/editingTarget'

export const store = configureStore({
    reducer: {
        sidebarSlice,
        draggingCardSlice,
        targetFormSlice,
        taskFormSlice,
        selectionDataSlice,
        deletingTargetSlice,
        targetDataSlice,
        editingTargetSlice,
    }
})
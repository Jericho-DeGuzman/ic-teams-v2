import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: false
}

export const sidebarSlice = createSlice ({
    name: 'sidebar',
    initialState,
    reducers: {
        openSidebar: (state) => {
            state.value = true
        },
        closeSidebar: (state) => {
            state.value = false
        }
    }
})

export const {openSidebar, closeSidebar} = sidebarSlice.actions;
export default sidebarSlice.reducer;
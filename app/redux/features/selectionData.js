import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        distributionGroups : [],
        categories: [],
    }
}

export const selectionDataSlice = createSlice({
    name: 'selectionData',
    initialState,
    reducers: {
        setDistributionGroupsData: (state, action) => {
            state.data.distributionGroups = action.payload;
        },
        setCategoriesData: (state, action) => {
            state.data.categories = action.payload;
        }
    }
})

export const {setDistributionGroupsData, setCategoriesData} = selectionDataSlice.actions;
export default selectionDataSlice.reducer;
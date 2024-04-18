import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        distributionGroups: [],
        categories: [],
        fileRequirements: [],
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
        },
        setFileRequirements: (state, action) => {
            state.data.fileRequirements = action.payload;
        }
    }
})

export const { setDistributionGroupsData, setCategoriesData, setFileRequirements } = selectionDataSlice.actions;
export default selectionDataSlice.reducer;
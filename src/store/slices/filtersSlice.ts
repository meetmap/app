import { createSlice } from "@reduxjs/toolkit";

export interface IFilters {
    tags: string[]
    minPrice: number | null
    maxPrice: number | null
    startDate: Date | null
    endDate: Date | null
    radius: number | null
}

interface InitialState {
    filters: IFilters
}

const initialState: InitialState = {
    filters: {
        tags: [],
        minPrice: null,
        maxPrice: null,
        startDate: null,
        endDate: null,
        radius: null
    }
};

const filtersSlice = createSlice({
    name: "filtersSlice",
    initialState,
    reducers: {
        setFiltersState: (state, action: {payload: IFilters}) => {
            state.filters = action.payload
        }
    }
});

export const { setFiltersState } = filtersSlice.actions;

export default filtersSlice.reducer;
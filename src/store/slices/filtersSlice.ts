import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MapView, { Address } from "react-native-maps";
import { ITag } from "../../types/event";

export interface IFilters {
    tags: string[]
    minPrice: number | null
    maxPrice: number | null
    startDate: Date | null
    endDate: Date | null
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
        endDate: null
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
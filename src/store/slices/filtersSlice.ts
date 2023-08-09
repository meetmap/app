import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MapView, { Address } from "react-native-maps";

interface InitialState {
    tags: string[]
}

const initialState: InitialState = {
    tags: []
};

const filtersSlice = createSlice({
    name: "filtersSlice",
    initialState,
    reducers: {
        setTagFiltersState: (state, action) => {
            if (state.tags.includes(action.payload)) {
                const index = state.tags.indexOf(action.payload);
                if (index > -1) {
                    state.tags.splice(index, 1);
                }
            } else {
                state.tags.push(action.payload)
            }
        }
    }
});

export const { setTagFiltersState } = filtersSlice.actions;

export default filtersSlice.reducer;
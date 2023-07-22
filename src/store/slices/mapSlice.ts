import { createSlice } from "@reduxjs/toolkit";
import { Address } from "react-native-maps";

interface InitialState {
    // viewState: ViewState | null
    addressState: Address | undefined 
    mapFilters: string
}

const initialState: InitialState = {
    addressState: undefined,
    mapFilters: "All"
};

const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setAddressState: (state, action: { payload: Address | undefined }) => {
            state.addressState = action.payload
        },
        setMapFiltersState: (state, action: {payload: string}) => {
            state.mapFilters = action.payload
        }
    },
});

export const { setAddressState, setMapFiltersState } = appSlice.actions;

export default appSlice.reducer;
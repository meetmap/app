import { createSlice } from "@reduxjs/toolkit";
import { Address } from "react-native-maps";

interface InitialState {
    // viewState: ViewState | null
    addressState: Address | undefined 
}

const initialState: InitialState = {
    addressState: undefined,
};

const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setAddressState: (state, action: { payload: Address | undefined }) => {
            state.addressState = action.payload
        },
    },
});

export const { setAddressState } = appSlice.actions;

export default appSlice.reducer;
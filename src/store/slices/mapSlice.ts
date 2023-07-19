import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    viewState: ViewState | null
}

const initialState: InitialState = {
    viewState: null,
};

const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setViewState: (state, action: { payload: ViewState }) => {
            state.viewState = action.payload
        },
    },
});

export const { setViewState } = appSlice.actions;

export default appSlice.reducer;
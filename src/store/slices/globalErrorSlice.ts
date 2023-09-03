import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    errorMessage: null | string,
}

const initialState: InitialState = {
    errorMessage: null,
};

const globalErrorSlice = createSlice({
    name: "globalErrorSlice",
    initialState,
    reducers: {
        showErrorModal: (state, action: { payload: string }) => {
            state.errorMessage = action.payload
        },
        hideErrorModal: (state) => {
            state.errorMessage = null
        }
    },
});

export const { showErrorModal, hideErrorModal } = globalErrorSlice.actions;

export default globalErrorSlice.reducer;

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    isOpened: boolean
}

const initialState: InitialState = {
    isOpened: false
};

const searchModalSlice = createSlice({
    name: "searchModalSlice",
    initialState,
    reducers: {
        setIsOpenedSearchModal: (state, action: { payload: boolean }) => {
            state.isOpened = action.payload;
        },
    }
});

export const { setIsOpenedSearchModal } = searchModalSlice.actions;

export default searchModalSlice.reducer;

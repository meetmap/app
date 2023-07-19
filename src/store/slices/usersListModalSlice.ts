import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    isOpened: boolean
}

const initialState: InitialState = {
    isOpened: false
};

const usersListModalSlice = createSlice({
    name: "usersListModalSlice",
    initialState,
    reducers: {
        setIsOpenedUsersListModalSlice: (state, action: { payload: boolean }) => {
            state.isOpened = action.payload;
        },
    }
});

export const { setIsOpenedUsersListModalSlice } = usersListModalSlice.actions;

export default usersListModalSlice.reducer;

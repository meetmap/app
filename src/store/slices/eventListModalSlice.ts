import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IEvent } from "../../types/event";

interface InitialState {
    event: IEvent | null
    isLoading: boolean
    isOpened: boolean
}

const initialState: InitialState = {
    event: null,
    isLoading: false,
    isOpened: false
};

// export const getEventByIdThunk = createAsyncThunk<
//     IEvent,
//     string
// >("eventModalSlice/data", async (payload, { rejectWithValue }) => {
//     const data = await getEventById(payload);
//     return data;
// });

const eventListModalSlice = createSlice({
    name: "eventListModalSlice",
    initialState,
    reducers: {
        setIsOpenedEventListModal: (state, action: { payload: boolean }) => {
            state.isOpened = action.payload;
        },
        // setChangeModalEventData: (state, action: PayloadAction<number | undefined>) => {
        //     state.visibleRadius = action.payload;
        // },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getEventByIdThunk.fulfilled, (state, action) => {
    //             state.event = action.payload;
    //             state.isOpened = true
    //         })
    //         .addCase(getEventByIdThunk.pending, (state, action) => {
    //             state.isLoading = true;
    //         })
    //         .addCase(getEventByIdThunk.rejected, (state, action) => {
    //             state.isLoading = false;
    //         });
    // },
});

export const { setIsOpenedEventListModal } = eventListModalSlice.actions;

export default eventListModalSlice.reducer;

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getEventById } from "../../api/events";
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

export const getEventByIdThunk = createAsyncThunk<
    IEvent,
    string
>("eventModalSlice/data", async (payload, { rejectWithValue }) => {
    const data = await getEventById(payload);
    return data;
});

const eventModalSlice = createSlice({
    name: "eventModalSlice",
    initialState,
    reducers: {
        setIsOpenedEventModal: (state, action: { payload: boolean }) => {
            state.isOpened = action.payload;
        },
        // setChangeModalEventData: (state, action: PayloadAction<number | undefined>) => {
        //     state.visibleRadius = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEventByIdThunk.fulfilled, (state, action) => {
                state.event = action.payload;
            })
            .addCase(getEventByIdThunk.pending, (state, action) => {
                state.isLoading = true;
                state.isOpened = true
            })
            .addCase(getEventByIdThunk.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export const { setIsOpenedEventModal } = eventModalSlice.actions;

export default eventModalSlice.reducer;

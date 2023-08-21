import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MapView, { Address } from "react-native-maps";
import { ITag, ITicket } from "../../types/event";
import { ICoordinates } from "./locationSlice";
import { IEventFormValues } from "../../Views/CreateEventView";


interface InitialState {
    eventFormValues: IEventFormValues
}

const initialState: InitialState = {
    eventFormValues: {
        title: "",
        description: "",
        accessibility: "public",
        startTime: null,
        endTime: null,
        ageLimit: 1,
        location: null,
        tickets: [],
        tagsCids: []
    }
};

const createEventFormSlice = createSlice({
    name: "createEventFormSlice",
    initialState,
    reducers: {
        setEventFormValuesState: (state, action: { payload: IEventFormValues }) => {
            state.eventFormValues = action.payload
        },
        setTicketsState: (state, action: { payload: ITicket[] }) => {
            state.eventFormValues.tickets = action.payload
        },
        setTagsState: (state, action: { payload: string[] }) => {
            state.eventFormValues.tagsCids = action.payload
        }
    }
});

export const { setEventFormValuesState, setTicketsState, setTagsState } = createEventFormSlice.actions;

export default createEventFormSlice.reducer;
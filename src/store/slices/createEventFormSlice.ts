import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MapView, { Address } from "react-native-maps";
import { ITag } from "../../types/event";
import { ICoordinates } from "./locationSlice";

export interface IEventFormValues {
    title: string
    description: string
    accessibility: "public" | "private"
    startTime: Date | null
    endTime: Date | null
    ageLimit: number
    location: ICoordinates | null
    tickets: ITicket[]
    tagsCids: string[]
}

export interface ITicket {
    name: string
    price: number
    amount: number
    description: string
}

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
        }
    }
});

export const { setEventFormValuesState } = createEventFormSlice.actions;

export default createEventFormSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { ITicket } from "@src/types/event";
import { IEventFormValues } from "@src/Views/CreateEventView";
import { IUploadedImage } from "@src/api/users";


interface InitialState {
    eventFormValues: IEventFormValues
    images: IUploadedImage[]
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
    },
    images: []
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
        },
        setEventImages: (state, action: { payload: IUploadedImage[] }) => {
            state.images = action.payload
        }
    }
});

export const { setEventFormValuesState, setTicketsState, setTagsState, setEventImages} = createEventFormSlice.actions;

export default createEventFormSlice.reducer;
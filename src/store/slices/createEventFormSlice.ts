import { createSlice } from "@reduxjs/toolkit";
import { ICreateEventFormValues, ITicket } from "@src/types/event";
import { IUploadedImage } from "@src/api/users";



interface InitialState {
    eventFormValues: ICreateEventFormValues
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
        setEventFormValuesState: (state, action: { payload: ICreateEventFormValues }) => {
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
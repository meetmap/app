import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IEvent } from "../../types/event";
import { getAllNearEvents } from "../../api/events";

interface InitialState {
  events: IEvent[];
  eventsGeo: {
    type: "Feature";
    properties: {
      cluster: boolean;
      data: IEvent;
      picture: string[];
    };
    geometry: {
      type: "Point";
      coordinates: number[];
    };
  }[]
  centeredCoords?: Position;
  visibleRadius?: number;
  isLoading: boolean;
}

const initialState: InitialState = {
  events: [],
  eventsGeo: [],
  isLoading: false,
  centeredCoords: undefined,
  visibleRadius: undefined,
};

export const getEventsByLocationThunk = createAsyncThunk<
  IEvent[],
  {
    lat: number;
    lng: number;
    radius: number;
  }
>("events/location", async (payload, { rejectWithValue }) => {
  const data = await getAllNearEvents(payload);

  return data;
});

const eventsSlice = createSlice({
  name: "eventsSlice",
  initialState,
  reducers: {
    setCenteredCoords: (state, action: PayloadAction<Position | undefined>) => {
      state.centeredCoords = action.payload;
    },
    setVisibleRadius: (state, action: PayloadAction<number | undefined>) => {
      state.visibleRadius = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getEventsByLocationThunk.fulfilled, (state, action) => {
        // Add user to the state array
        state.events = action.payload;
        state.eventsGeo = action.payload?.map(feature => ({
          type: 'Feature',
          properties: {
            cluster: false,
            data: feature,
            picture: [feature.picture]
          },
          geometry: {
            type: 'Point',
            coordinates: [
              feature.location.coordinates.coordinates[0],
              feature.location.coordinates.coordinates[1]
            ]
          }
        }));
      })
      .addCase(getEventsByLocationThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getEventsByLocationThunk.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setCenteredCoords, setVisibleRadius } = eventsSlice.actions;

export default eventsSlice.reducer;

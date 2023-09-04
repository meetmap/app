import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IEventByLocation } from "@src/types/event";
import { getAllNearEvents } from "@src/api/events";

interface InitialState {
  events: IEventByLocation[];
  eventsGeo: {
    type: "Feature";
    properties: {
      cluster: boolean;
      data: IEventByLocation;
      cids: string[]
    };
    geometry: {
      type: "Point";
      coordinates: number[];
    };
  }[]
  // centeredCoords?: Position;
  // visibleRadius?: number;
  isLoading: boolean;
}

const initialState: InitialState = {
  events: [],
  eventsGeo: [],
  isLoading: false,
  // centeredCoords: undefined,
  // visibleRadius: undefined,
};

export const getEventsByLocationThunk = createAsyncThunk<
  IEventByLocation[],
  {
    lat: number;
    lng: number;
    radius: number;
  }
>("events/location", async (payload) => {
  const data = await getAllNearEvents(payload);
  return data;
});

const eventsSlice = createSlice({
  name: "eventsSlice",
  initialState,
  reducers: {
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
            cids: [feature.cid]
          },
          geometry: {
            type: 'Point',
            coordinates: [
              feature.coordinates[0],
              feature.coordinates[1]
            ]
          }
        }));
      })
      .addCase(getEventsByLocationThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEventsByLocationThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// export const { } = eventsSlice.actions;

export default eventsSlice.reducer;

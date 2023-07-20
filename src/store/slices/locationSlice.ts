import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { debounce } from "lodash";
import { GetFriendsLocationResponse, getUpdatedFriendsLocation, updateUserLocation } from "../../api/location";

const debouncedUpdateUserLocation = debounce(updateUserLocation, 500);

interface LocationState {
  userCoordinates: ICoordinates | null;
  friendsCoordinates: GetFriendsLocationResponse[];
}

export interface ICoordinates {
  lat: number;
  lng: number;
}

const initialState: LocationState = {
  userCoordinates: null,
  friendsCoordinates: [],
};

const locationSlice = createSlice({
  name: "locationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUserLocationThunk.fulfilled, (state, action) => {
      state.userCoordinates = action.payload;
    });
    builder.addCase(updateUserLocationThunk.rejected, (state, action) => {
      state.userCoordinates = action.meta.arg;
    });
    builder.addCase(getUpdatedFriendsLocationThunk.fulfilled, (state, action) => {
      state.friendsCoordinates = action.payload;
    });
  },
});

export const updateUserLocationThunk = createAsyncThunk<
  ICoordinates,
  {
    lat: number;
    lng: number;
  }
>("location/update-self", async (payload, { rejectWithValue }) => {
  try {
    const data = await debouncedUpdateUserLocation(payload);
    if (!data) {
      throw new Error("No data yet");
    }
    return data;
  } catch (error) {
    console.log(error)
    return payload
  }
});

export const getUpdatedFriendsLocationThunk = createAsyncThunk<GetFriendsLocationResponse[]>(
  "location/friends",
  async (payload) => {
    const data = await getUpdatedFriendsLocation();
    return data;
  }
);

export const { } = locationSlice.actions;

export default locationSlice.reducer;

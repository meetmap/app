import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MapView, { Address } from "react-native-maps";

interface InitialState {
    // viewState: ViewState | null
    addressState: Address | undefined
    addressStateFetching: boolean,
    addressStateError: any,
    mapFilters: string
}

const initialState: InitialState = {
    addressState: undefined,
    addressStateFetching: false,
    addressStateError: undefined,
    mapFilters: "All"
};

const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setAddressState: (state, action: { payload: Address | undefined }) => {
            state.addressState = action.payload
        },
        setMapFiltersState: (state, action: { payload: string }) => {
            state.mapFilters = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAddressThunk.pending, (state, action) => {
                state.addressStateFetching = true
            })
            .addCase(getAddressThunk.fulfilled, (state, action) => {
                state.addressState = action.payload
                state.addressStateFetching = false
            })
            .addCase(getAddressThunk.rejected, (state, action) => {
                state.addressStateFetching = false
                state.addressStateError = "Error occurred.";
            })
    }
});

export const getAddressThunk = createAsyncThunk<
    Address,
    {
        mapView: MapView
        latitude: number;
        longitude: number;
    },
    {
        rejectValue: { error: any };
    }
>('address/get',
    async ({ mapView, latitude, longitude }, { rejectWithValue }) => {
        try {
            const address = await mapView.addressForCoordinate({ latitude, longitude })
            return address
        } catch (error) {
            return rejectWithValue({ error });
        }
    }
)

export const { setAddressState, setMapFiltersState } = appSlice.actions;

export default appSlice.reducer;
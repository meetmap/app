import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MapView, { Address } from "react-native-maps";

interface InitialState {
    // viewState: ViewState | null
    addressState: Address | undefined
    addressStateFetching: boolean,
    mapFilters: string
}

const initialState: InitialState = {
    addressState: undefined,
    addressStateFetching: false,
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
            .addCase(getAddressThunk.pending, (state) => {
                state.addressStateFetching = true
            })
            .addCase(getAddressThunk.fulfilled, (state, action) => {
                state.addressState = action.payload
                state.addressStateFetching = false
            })
            .addCase(getAddressThunk.rejected, (state) => {
                state.addressStateFetching = false
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
    async ({ mapView, latitude, longitude }) => {
        const address = await mapView.addressForCoordinate({ latitude, longitude })
        return address
    }
)

export const { setAddressState, setMapFiltersState } = appSlice.actions;

export default appSlice.reducer;
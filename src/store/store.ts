import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import eventsSlice from "./slices/eventsSlice";
import userSlice from "./slices/userSlice";
import friendsSlice from "./slices/friendsSlice";
import locationSlice from "./slices/locationSlice";
import mapSlice from "./slices/mapSlice";
import globalErrorSlice from "./slices/globalErrorSlice";
import filtersSlice from "./slices/filtersSlice";
import createEventFormSlice from "./slices/createEventFormSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['filtersSlice/setFiltersState', 'createEventFormSlice/setEventFormValuesState'],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ['filtersSlice.filters.startDate'],
        // Ignore these paths in the state
        ignoredPaths: ['filtersSlice.filters', 'payload.startDate', 'createEventFormSlice.eventFormValues'],
      },
    }),
  reducer: {
    appSlice,
    eventsSlice,
    userSlice,
    friendsSlice,
    locationSlice,
    mapSlice,
    globalErrorSlice,
    filtersSlice,
    createEventFormSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

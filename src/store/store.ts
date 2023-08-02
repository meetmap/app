import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import eventsSlice from "./slices/eventsSlice";
import userSlice from "./slices/userSlice";
import friendsSlice from "./slices/friendsSlice";
import locationSlice from "./slices/locationSlice";
import mapSlice from "./slices/mapSlice";
import globalErrorSlice from "./slices/globalErrorSlice";

export const store = configureStore({
  reducer: {
    appSlice,
    eventsSlice,
    userSlice,
    friendsSlice,
    locationSlice,
    mapSlice,
    globalErrorSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

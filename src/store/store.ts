import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import eventsSlice from "./slices/eventsSlice";
import userSlice from "./slices/userSlice";
import friendsSlice from "./slices/friendsSlice";
import locationSlice from "./slices/locationSlice";
import mapSlice from "./slices/mapSlice";
import eventModalSlice from "./slices/eventModalSlice";
import searchModalSlice from "./slices/searchModalSlice";
import eventListModalSlice from "./slices/eventListModalSlice";
import usersListModalSlice from "./slices/usersListModalSlice";

export const store = configureStore({
  reducer: {
    appSlice,
    eventsSlice,
    userSlice,
    friendsSlice,
    locationSlice,
    mapSlice,
    eventModalSlice,
    searchModalSlice,
    eventListModalSlice,
    usersListModalSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

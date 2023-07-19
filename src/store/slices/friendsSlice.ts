import {
  acceptFriendship,
  getIncomingFrienshipRequests,
  getOutcomingFrienshipRequests,
  getUserFriends,
  rejectFriendship,
  requestFriendship
} from "../../api/friends";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPartialUser } from "../../types/users";
import { RootState } from "../store";


interface InitialState {
  friends: IPartialUser[];
  incomingRequests: IPartialUser[];
  outcomingRequests: IPartialUser[];
  isLoading: boolean;
}

const initialState: InitialState = {
  friends: [],
  incomingRequests: [],
  outcomingRequests: [],
  isLoading: false,
};

const friendsSlice = createSlice({
  name: "friendsSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetInitialFriendsThunk.fulfilled, (state, action) => {
        state.friends = action.payload.friends;
        state.incomingRequests = action.payload.incomingRequests;
        state.outcomingRequests = action.payload.outcomingRequests;
        state.isLoading = false;
      })
      .addCase(GetInitialFriendsThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(GetInitialFriendsThunk.rejected, (state, action) => {
        state.friends = [];
        state.isLoading = false;
      });

    builder
      .addCase(RejectFriendshipThunk.fulfilled, (state, action) => {
        console.log(state.outcomingRequests.filter((friend) => friend.id !== action.payload.id));
        state.friends = state.friends.filter((friend) => friend.id !== action.payload.id);
        state.incomingRequests = state.incomingRequests.filter((friend) => friend.id !== action.payload.id);
        state.outcomingRequests = state.outcomingRequests.filter((friend) => friend.id !== action.payload.id);
      })
      .addCase(RejectFriendshipThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(RejectFriendshipThunk.rejected, (state, action) => {
        state.isLoading = false;
      });

    builder
      .addCase(ReuqestFriendshipThunk.fulfilled, (state, action) => {
        state.outcomingRequests.push(action.payload);
      })
      .addCase(ReuqestFriendshipThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(ReuqestFriendshipThunk.rejected, (state, action) => {
        state.isLoading = false;
      });

    builder
      .addCase(AcceptFriendshipThunk.fulfilled, (state, action) => {
        state.incomingRequests = state.incomingRequests.filter((incoming) => incoming.id !== action.payload.id);
        state.friends.push(action.payload);
      })
      .addCase(AcceptFriendshipThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(AcceptFriendshipThunk.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const GetInitialFriendsThunk = createAsyncThunk<{
  friends: IPartialUser[];
  incomingRequests: IPartialUser[];
  outcomingRequests: IPartialUser[];
}>("friends/get-self", async (_, thunkApi) => {
  const state = (await thunkApi.getState()) as RootState;
  if (!state.userSlice.user) {
    throw new Error("Login first");
  }
  state.userSlice.user?.id;
  const friends = await getUserFriends(state.userSlice.user.cid);
  const incomingRequests = await getIncomingFrienshipRequests();
  const outcomingRequests = await getOutcomingFrienshipRequests();
  return { friends, incomingRequests, outcomingRequests };
});

export const RejectFriendshipThunk = createAsyncThunk<IPartialUser, { friendId: string }>(
  "friends/reject",
  async ({ friendId }, thunkApi) => {
    return await rejectFriendship(friendId);
  }
);

export const ReuqestFriendshipThunk = createAsyncThunk<IPartialUser, { userId: string }>(
  "friends/request",
  async ({ userId }, thunkApi) => {
    return await requestFriendship(userId);
  }
);

export const AcceptFriendshipThunk = createAsyncThunk<IPartialUser, { friendId: string }>(
  "friends/accept",
  async ({ friendId }, thunkApi) => {
    return await acceptFriendship(friendId);
  }
);

export default friendsSlice.reducer;

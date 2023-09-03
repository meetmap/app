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
import { IPaginateRespose } from "../../types/response";


interface InitialState {
  friends: IPaginateRespose<IPartialUser>;
  incomingRequests: IPaginateRespose<IPartialUser>;
  outcomingRequests: IPaginateRespose<IPartialUser>;
  isLoading: boolean;
}

const initialState: InitialState = {
  friends: {
    paginatedResults: [],
    totalCount: 0,
    nextPage: 0
  },
  incomingRequests: {
    paginatedResults: [],
    totalCount: 0,
    nextPage: 0
  },
  outcomingRequests: {
    paginatedResults: [],
    totalCount: 0,
    nextPage: 0
  },
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
      .addCase(GetInitialFriendsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetInitialFriendsThunk.rejected, (state) => {
        state.friends = {
          paginatedResults: [],
          totalCount: 0,
          nextPage: 0
        };
        state.isLoading = false;
      });

    builder
      .addCase(RejectFriendshipThunk.fulfilled, (state, action) => {
        state.friends.paginatedResults = state.friends.paginatedResults.filter((friend) => friend.id !== action.payload.id);
        state.incomingRequests.paginatedResults = state.incomingRequests.paginatedResults.filter((friend) => friend.id !== action.payload.id);
        state.outcomingRequests.paginatedResults = state.outcomingRequests.paginatedResults.filter((friend) => friend.id !== action.payload.id);
      })
      .addCase(RejectFriendshipThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RejectFriendshipThunk.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(ReuqestFriendshipThunk.fulfilled, (state, action) => {
        state.outcomingRequests.paginatedResults.push(action.payload);
      })
      .addCase(ReuqestFriendshipThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ReuqestFriendshipThunk.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(AcceptFriendshipThunk.fulfilled, (state, action) => {
        state.incomingRequests.paginatedResults = state.incomingRequests.paginatedResults.filter((incoming) => incoming.id !== action.payload.id);
        state.friends.paginatedResults.push(action.payload);
      })
      .addCase(AcceptFriendshipThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AcceptFriendshipThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const GetInitialFriendsThunk = createAsyncThunk<{
  friends: IPaginateRespose<IPartialUser>;
  incomingRequests: IPaginateRespose<IPartialUser>;
  outcomingRequests: IPaginateRespose<IPartialUser>;
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
  async ({ friendId }) => {
    return await rejectFriendship(friendId);
  }
);

export const ReuqestFriendshipThunk = createAsyncThunk<IPartialUser, { userId: string }>(
  "friends/request",
  async ({ userId }) => {
    return await requestFriendship(userId);
  }
);

export const AcceptFriendshipThunk = createAsyncThunk<IPartialUser, { friendId: string }>(
  "friends/accept",
  async ({ friendId }) => {
    return await acceptFriendship(friendId);
  }
);

export default friendsSlice.reducer;

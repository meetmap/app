import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SecureStoreKeys } from "../../constants/secure-store";
import { IUserSelf } from "../../types/users";
import { ICreateUser, createUser, getUserSelf, loginWithUsername } from "../../api/users";
import { getFromSecureStore, setToSecureStore } from "../../api/secure-store";

interface InitialState {
  user: IUserSelf | null;
  isLoading: boolean;
}

const initialState: InitialState = {
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(LoginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(LoginUserThunk.pending, (state, action) => {
        state.user = null;
        state.isLoading = true;
      })
      .addCase(LoginUserThunk.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
      });

    builder
      .addCase(InitializeUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(InitializeUserThunk.pending, (state, action) => {
        state.user = null;
        state.isLoading = true;
      })
      .addCase(InitializeUserThunk.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
      });
  },
});

export const InitializeUserThunk = createAsyncThunk<IUserSelf>("users/init", async () => {
  
  const user = await getUserSelf();
  if (!user) {
    throw new Error("Login first");
  }
  return user;
});

export const LoginUserThunk = createAsyncThunk<
  IUserSelf,
  {
    username: string;
    password: string;
  }
>("users/login", async ({ password, username }) => {
  const data = await loginWithUsername({ username, password });
  await setToSecureStore(SecureStoreKeys.ACCESS_TOKEN, data.tokens.at);
  await setToSecureStore(SecureStoreKeys.REFRESH_TOKEN, data.tokens.rt);
  await setToSecureStore(SecureStoreKeys.USER, JSON.stringify(data.user));
  return data.user;
});


export const RegisterUserThunk = createAsyncThunk<
  IUserSelf,
  ICreateUser
>("users/create", async ({ username, email, birthDate, password }) => {
  const data = await createUser({ username, email, birthDate, password });
  await setToSecureStore(SecureStoreKeys.ACCESS_TOKEN, data.tokens.at);
  await setToSecureStore(SecureStoreKeys.REFRESH_TOKEN, data.tokens.rt);
  await setToSecureStore(SecureStoreKeys.USER, JSON.stringify(data.user));
  return data.user;
});

export default userSlice.reducer;

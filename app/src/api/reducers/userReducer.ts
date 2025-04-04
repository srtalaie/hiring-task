import { createSlice } from "@reduxjs/toolkit";
import { Credentials, Profile, User } from "../../../../types";
import { getProfile, login, logout } from '../services/authService';

const initialState = {
  user: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  }
})

export const { setUser } = userSlice.actions

export const loginUser = (creds: Credentials) => {
  return async (dispatch: (action: { type: string; payload: User }) => void) => {
    try {
      const user: User = await login(creds);
      dispatch(setUser(user));
    } catch (error: unknown) {
      console.error('Error during login:', error);
      throw error;
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: (action: { type: string }) => void) => {
    try {
      await logout();
      dispatch(setUser(null));
    } catch (error: unknown) {
      console.error('Error during logout:', error);
      throw error;
    }
  };
};

export const getUserProfile = () => {
  return async (dispatch: (action: { type: string; payload: Profile }) => void) => {
    try {
      const user: Profile = await getProfile();
      dispatch(setUser(user));
    } catch (error: unknown) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  };
}

export default userSlice.reducer
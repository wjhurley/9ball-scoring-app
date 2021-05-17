import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeepOmit, Merge } from 'ts-essentials';

import { RootState } from '../store';

import { UserInfo } from '../../../server/src/auth/auth.service';
import { Player } from '../../../server/src/player/player.entity';
import { PlayerTeam } from '../../../server/src/player-team/player-team.entity';
import { Team } from '../../../server/src/team/team.entity';

type LoginUserPayload = {
  email: string;
  password: string;
};

export type PlayerState = Merge<
  DeepOmit<
    Player,
    {
      createdAt: never;
      id: never;
      teams: never;
      updatedAt: never;
    }
  >,
  { teams: PlayerTeamState[] }
>;

export type PlayerTeamState = Merge<
  DeepOmit<
    PlayerTeam,
    {
      createdAt: never;
      id: never;
      team: never;
      updatedAt: never;
    }
  >,
  { team: TeamState }
>;

export type TeamState = DeepOmit<
  Team,
  {
    createdAt: never;
    id: never;
    updatedAt: never;
  }
>;

export type UserState = Merge<
  UserInfo,
  {
    players: PlayerState[];
  }
>;

export const loginUser = createAsyncThunk<unknown, LoginUserPayload, {}>(
  'user/loginUser',
  async ({ email, password }) => {
    try {
      const response = await fetch('http://localhost:5000/auth/signin', {
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`Unable to log in.\nError ${response.status}: ${response.statusText}`);
      }

      const userInfo: UserInfo = await response.json();

      return userInfo;
    } catch (e) {
      throw new Error(e);
    }
  },
);

const initialState: UserState = {
  accessToken: '',
  email: '',
  firstName: '',
  lastName: '',
  players: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserInfo(state, action: PayloadAction<UserInfo>) {
      const { accessToken, email, firstName, lastName } = action.payload;
      state.accessToken = accessToken;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
    },
  },
  extraReducers: {
    [(loginUser.fulfilled as unknown) as string]: (state, action: PayloadAction<UserInfo>) => {
      const { accessToken, email, firstName, lastName } = action.payload;
      state.accessToken = accessToken;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
    },
  },
});

export const { updateUserInfo } = userSlice.actions;

export const getUserData = (state: RootState) => state.user;

export default userSlice.reducer;

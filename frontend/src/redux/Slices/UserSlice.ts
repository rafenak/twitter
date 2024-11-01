import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../utils/GlobalInterfaces";
import axios from "axios";

interface UserSliceState {
  loggedIn: User | undefined;
  following: User[];
  followers: User[];
  username: string;
  token: string;
  fromRegister: boolean;
  error: boolean;
}

interface LoginBody {
  username: string;
  password: string;
}

interface VerifyUserBody {
  email: string;
  phone: string;
  username: string;
}

interface FollowUserBody {
  token: string;
  followee: string;
}

const initialState: UserSliceState = {
  loggedIn: undefined,
  following: [],
  followers: [],
  fromRegister: false,
  error: false,
  username: "",
  token: "",
};

async function getFollowers(username: string) {
  try {
    const req = await axios.get(
      `http://localhost:8000/user/followers/${username}`
    );
    return req.data;
  } catch (e) {
    return [];
  }
}

async function getFollowing(username: string) {
  try {
    const req = await axios.get(
      `http://localhost:8000/user/following/${username}`
    );
    return req.data;
  } catch (e) {
    return [];
  }
}

/**
 *  Create a login request
 */

export const loginUser = createAsyncThunk(
  "user/login",
  async (body: LoginBody, thuckAPI) => {
    try {
      const req = await axios.post("http://localhost:8000/auth/login", {
        username: body.username,
        password: body.password,
      });

      const user = req.data;

      const followers = getFollowers(user.user.username);
      const following = getFollowing(user.user.username);

      let followingAndFollowers = await Promise.all([followers, following]);

      return {
        loggedIn: user,
        followers: followingAndFollowers[0],
        following: followingAndFollowers[1],
      };
      //return req.data;
    } catch (e) {
      return thuckAPI.rejectWithValue(e);
    }
  }
);

/**
 * Verify User Name
 */

export const verifyUsername = createAsyncThunk(
  "user/username",
  async (body: VerifyUserBody, thuckAPI) => {
    try {
      const req = await axios.post("http://localhost:8000/auth/find", {
        email: body.email,
        phone: body.phone,
        username: body.username,
      });
      return req.data;
    } catch (e) {
      return thuckAPI.rejectWithValue(e);
    }
  }
);

export const getUserByToken = createAsyncThunk(
  "user/token",
  async (token: string, thuckAPI) => {
    try {
      const req = await axios.get("http://localhost:8000/user/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = req.data;

      const followers = getFollowers(user.username);
      const following = getFollowing(user.username);

      let followingAndFollowers = await Promise.all([followers, following]);

      return {
        loggedIn: user,
        followers: followingAndFollowers[0],
        following: followingAndFollowers[1],
      };
      //return req.data;
    } catch (e) {
      return thuckAPI.rejectWithValue(e);
    }
  }
);

export const followUser = createAsyncThunk(
  "user/follow",
  async (body: FollowUserBody, thuckAPI) => {
    try {
      const req = await axios.put(
        "http://localhost:8000/user/follow",
        { followedUser: body.followee },
        {
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        }
      );
      return req.data;
    } catch (e) {
      return thuckAPI.rejectWithValue(e);
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFromReigster(state, action: PayloadAction<boolean>) {
      state = {
        ...state,
        fromRegister: action.payload,
      };
      return state;
    },
    resetUsername(state) {
      state = {
        ...state,
        username: "",
      };
      return state;
    },
    setToken(state, action: PayloadAction<string>) {
      state = {
        ...state,
        token: action.payload,
      };
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state = {
        ...state,
        loggedIn: {
          userId: action.payload.loggedIn.user.userId,
          firstName: action.payload.loggedIn.user.firstName,
          lastName: action.payload.loggedIn.user.lastName,
          email: action.payload.loggedIn.user.email,
          phone: action.payload.loggedIn.user.phone,
          dateOfBirth: action.payload.loggedIn.user.dateOfBirth,
          username: action.payload.loggedIn.user.username,
          bio: action.payload.loggedIn.user.bio,
          nickname: action.payload.loggedIn.user.nickname,
          profilePicture: action.payload.loggedIn.user.profilePicture,
          bannerPicture: action.payload.loggedIn.user.bannerPicture,
          verifiedAccount:action.payload.loggedIn.user.verifiedAccount,
          organization:action.payload.loggedIn.user.organization,
        },
        token: action.payload.loggedIn.token,
        followers: action.payload.loggedIn.folowers,
        following: action.payload.loggedIn.following,
      };

      return state;
    });

    builder.addCase(verifyUsername.fulfilled, (state, action) => {
      state = {
        ...state,
        username: action.payload,
      };
      return state;
    });

    builder.addCase(loginUser.pending, (state, action) => {
      state = {
        ...state,
        error: false,
      };
      return state;
    });

    builder.addCase(verifyUsername.pending, (state, action) => {
      state = {
        ...state,
        error: false,
      };
      return state;
    });

    builder.addCase(verifyUsername.rejected, (state, action) => {
      state = {
        ...state,
        error: true,
      };
      return state;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state = {
        ...state,
        error: true,
      };
      return state;
    });

    builder.addCase(getUserByToken.fulfilled, (state, action) => {
      state = {
        ...state,
        loggedIn: action.payload.loggedIn,
        username: action.payload.loggedIn.username,
        followers: action.payload.followers,
        following: action.payload.following,
      };
      return state;
    });

    builder.addCase(getUserByToken.pending, (state, action) => {
      state = {
        ...state,
        error: false,
      };
      return state;
    });

    builder.addCase(getUserByToken.rejected, (state, action) => {
      state = {
        ...state,
        error: true,
      };
      return state;
    });

    builder.addCase(followUser.pending, (state, action) => {
      state = {
        ...state,
        error: false,
      };
      return state;
    });

    builder.addCase(followUser.fulfilled, (state, action) => {
      state = {
        ...state,
        following: action.payload,
      };
      return state;
    });

    builder.addCase(followUser.rejected, (state, action) => {
      state = {
        ...state,
        error: true,
      };
      return state;
    });
  },
});

export const { setFromReigster, resetUsername, setToken } = UserSlice.actions;

export default UserSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../utils/GlobalInterfaces";
import axios from "axios";

interface UserSliceState {
  loggedIn: User | undefined;
  fromRegister: boolean;
  error: boolean;
}

interface LoginBody {
  username: string;
  password: string;
}

const initialState: UserSliceState = {
  loggedIn: undefined,
  fromRegister: false,
  error: false,
};

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
  },
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
        state = {
            ...state,
            loggedIn:{
                userId: action.payload.user.userId,
                firstName: action.payload.user.firstName,
                lastName: action.payload.user.lastName,
                email:action.payload.user.email,
                phone:action.payload.user.phone,
                dateOfBirth:action.payload.user.dateOfBirth,
                username: action.payload.user.username,
                bio: action.payload.user.bio,
                nickname:action.payload.user.nickname,
                profilePicture:action.payload.user.profilePicture,
                bannerPicture:action.payload.user.bannerPicture
            }
            
        }
        
        return state;
      });
  },
});

export const { setFromReigster } = UserSlice.actions;

export default UserSlice.reducer;

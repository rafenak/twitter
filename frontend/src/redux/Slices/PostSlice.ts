import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, User } from "../../utils/GlobalInterfaces";
import axios from "axios";

interface PostSliceState {
  loading: boolean;
  error: boolean;
  currentPost: Post | undefined;
  posts: Post[];
}

interface updatePostPayLoad {
  name: string;
  vallue: string | number | boolean;
}

interface CreatePostBody {
  content: string;
  author: User;
  replies: Post[];
  scheduled: boolean;
  scheduledDate: boolean | undefined;
  audience: "EVERYONE" | "CIRCLE";
  replyRestriction: "EVERYONE" | "FOLLOW" | "MENTION";
  token: string;
}

export const createPost = createAsyncThunk(
  "post/create",
  async (body: CreatePostBody, thuckAPI) => {
    try {
      let post = {
        content: body.content,
        author: body.author,
        replies: body.replies,
        scheduled: body.scheduled,
        scheduledDate: body.scheduledDate,
        audience: body.audience,
        replyRestriction: body.replyRestriction,
      };
      const req = await axios.post("http://localhost:8000/posts/", post, {
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      });
      return req.data;
    } catch (e) {
      return thuckAPI.rejectWithValue(e);
    }
  }
);

const initialState: PostSliceState = {
  loading: false,
  error: false,
  currentPost: undefined,
  posts: [],
};

export const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    initializeCurrentPost(state, action: PayloadAction<Post>) {
      if (!state.currentPost) {
        state.currentPost = action.payload;
      } else {
        state = {
          ...state,
          currentPost: action.payload,
        };
      }
      return state;
    },

    updateCurrentPost(state, action: PayloadAction<updatePostPayLoad>) {
      if (state.currentPost) {
        state.currentPost = {
          ...state.currentPost,
          [action.payload.name]: action.payload.vallue,
        };
      }
      return state;
    },
  },
  extraReducers(builder){
    builder.addCase(createPost.pending,(state,action)=>{
        state={
            ...state,
            loading:true
        }
        return state;
    })
  }
});

export const { initializeCurrentPost, updateCurrentPost } = PostSlice.actions;

export default PostSlice.reducer;

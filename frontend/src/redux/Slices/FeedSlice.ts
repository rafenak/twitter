import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { FeedPost, Post } from "../../utils/GlobalInterfaces";

interface FeedSliceState {
    posts: FeedPost[],
    currentPost: Post | undefined,
    loading: boolean,
    error: boolean
}

interface FeedPagePayload {
    userId: number,
    token: string,
    sessionStart: Date,
    page: number
}

const initialState: FeedSliceState = {
    posts: [],
    currentPost: undefined,
    loading: false,
    error: false
}

export const loadFeedPage = createAsyncThunk(
    "feed/feedPage",
    async (payload: FeedPagePayload, thuckAPI) => {
        try {
            let req = await axios.post(`http://localhost:8000/feed`, {
                userId: payload.userId,
                page: payload.page,
                sessionStart: payload.sessionStart
            },
                {
                    headers: {
                        Authorization: `Bearer ${payload.token}`,
                    }
                })
            return req.data;
        } catch (e) {
            return thuckAPI.rejectWithValue(e);
        }
    }
);


export const FeedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        setCurrentPost(state, action: PayloadAction<Post | undefined>) {
            state = {
                ...state,
                currentPost: action.payload
            }
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadFeedPage.pending, (state, action) => {
            state = {
                ...state,
                loading: true,
                error: false
            }
            return state;
        });

        // builder.addCase(loadFeedPage.fulfilled, (state, action) => {
        //     state = {
        //         ...state,
        //         posts: [...state.posts,...action.payload],
        //         loading: false,
        //     }
        //     return state;
        // });


        builder.addCase(loadFeedPage.fulfilled, (state, action) => {
            const newPosts: FeedPost[] = action.payload;
            // Create a set of existing postIds from current state
            const existingPostIds = new Set(state.posts.map(feedPost => feedPost.post.postId));
            // Filter out posts from newPosts that already exist in the state
            const uniquePosts = [
              ...state.posts,
              ...newPosts.filter(feedPost => feedPost.post.postId && !existingPostIds.has(feedPost.post.postId))
            ];
            // Update the state with the unique posts
            state.posts = uniquePosts;
            state.loading = false;

            return state;
          });
     
        
        builder.addCase(loadFeedPage.rejected, (state, action) => {
            state = {
                ...state,
                loading: false,
                error: true
            }
            return state;
        })

    }
});

export const { setCurrentPost } = FeedSlice.actions;

export default FeedSlice.reducer;

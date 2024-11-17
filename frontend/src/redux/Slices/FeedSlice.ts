import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { FeedPost, Post } from "../../utils/GlobalInterfaces";

interface FeedSliceState {
    posts: FeedPost[];
    currentPost: Post | undefined;
    currentPageNumber: number;
    sessionStart: Date | undefined;
    loading: boolean;
    error: boolean;
}

interface LoadFeedPagePayload {
    userId: number;
    token: string;
}

interface FetchNextPagePayLoad {
    userId: number;
    token: string;
    page: number;
    sessionStart: Date;
}

const initialState: FeedSliceState = {
    posts: [],
    currentPageNumber: 0,
    sessionStart: undefined,
    currentPost: undefined,
    loading: false,
    error: false,
};

export const loadFeedPage = createAsyncThunk(
    "feed/feedPage",
    async (payload: LoadFeedPagePayload, thuckAPI) => {
        console.log(payload);
        const currentDate = new Date();
        const newDate = new Date(currentDate.setHours(currentDate.getHours() + 10));
        try {
            let req = await axios.post(
                `http://localhost:8000/feed`,
                {
                    userId: payload.userId,
                    page: 0,
                    sessionStart: newDate,
                },
                {
                    headers: {
                        Authorization: `Bearer ${payload.token}`,
                    },
                }
            );
            return req.data;
        } catch (e) {
            return thuckAPI.rejectWithValue(e);
        }
    }
);

export const fetchFeedNextPage = createAsyncThunk(
    "feed/nextPage",
    async (payload: FetchNextPagePayLoad, thuckAPI) => {
        console.log(payload);
        try {
            let req = await axios.post(
                `http://localhost:8000/feed`,
                {
                    userId: payload.userId,
                    page: payload.page,
                    sessionStart: payload.sessionStart,
                },
                {
                    headers: {
                        Authorization: `Bearer ${payload.token}`,
                    },
                }
            );
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
                currentPost: action.payload,
            };
            return state;
        },

        // setSessionStart(state, action: PayloadAction<Date | undefined>) {
        //     state = {
        //         ...state,
        //         sessionStart: action.payload
        //     }
        //     return state;
        // },

        // setCurrentPageNumber(state, action: PayloadAction<number>) {
        //     state = {
        //         ...state,
        //         currentPageNumber: action.payload
        //     }
        //     return state;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(loadFeedPage.pending, (state, action) => {
            state = {
                ...state,
                loading: true,
                error: false,
            };
            return state;
        });

        // builder.addCase(loadFeedPage.fulfilled, (state, action) => {
        //     state = {
        //         ...state,
        //         posts: action.payload.posts,
        //         loading: false,
        //         error:false,
        //         currentPageNumber: 1,
        //         sessionStart:action.payload.sessionStart;
        //     }
        //     return state;
        // });

        builder.addCase(loadFeedPage.fulfilled, (state, action) => {
            const newPosts: FeedPost[] = action.payload.posts;
            // Create a set of existing postIds from current state
            const existingPostIds = new Set(
                state.posts.map((feedPost) => feedPost.post.postId)
            );
            // Filter out posts from newPosts that already exist in the state
            const uniquePosts = [
                ...state.posts,
                ...newPosts.filter((feedPost) =>feedPost.post.postId && !existingPostIds.has(feedPost.post.postId)
                ),
            ];
            // Update the state with the unique posts
            state.posts = uniquePosts;
            state.sessionStart = action.payload.sessionStart;
            state.currentPageNumber = 1;
            state.loading = false;
            state.error = false;

            return state;
        });

        builder.addCase(fetchFeedNextPage.fulfilled, (state, action) => {
            const newPosts: FeedPost[] = action.payload.posts;
            // Create a set of existing postIds from current state
            const existingPostIds = new Set(state.posts.map((feedPost) => feedPost.post.postId)
            );
            // Filter out posts from newPosts that already exist in the state
            const uniquePosts = [
                ...state.posts,
                ...newPosts.filter((feedPost) =>feedPost.post.postId && !existingPostIds.has(feedPost.post.postId))
            ];
            // Update the state with the unique posts
            state.posts = uniquePosts;
            state.sessionStart = action.payload.sessionStart;
            state.currentPageNumber = action.payload.page + 1;
            state.loading = false;
            state.error = false;

            return state;
        });

        builder.addCase(loadFeedPage.rejected, (state, action) => {
            state = {
                ...state,
                loading: false,
                error: true,
            };
            return state;
        });
    },
});

export const { setCurrentPost } = FeedSlice.actions;

export default FeedSlice.reducer;

import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
  } from "@reduxjs/toolkit";
  import axios from "axios";
import { Post } from "../../utils/GlobalInterfaces";

interface FeedSliceState{
    post: Post[],
    currentPost : Post | undefined, 
    loading:boolean,
    error:boolean
}

interface FeedPagePayload{
    userId:number,
    token:string
}

const initialState:FeedSliceState ={
    post:[],
    currentPost: undefined,
    loading:false,
    error:false
}

export const loadFeedPage = createAsyncThunk(
    "feed/feedPage",
    async (payload:FeedPagePayload, thuckAPI) => {
      try {
        let req = await axios.get(`http://localhost:8000/feed/${payload.userId}`,{
            headers:{
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
    reducers : {
        setCurrentPost(state, action:PayloadAction<Post | undefined>){
                state ={
                    ...state,
                    currentPost: action.payload
                }
                return state; 
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(loadFeedPage.pending,(state,action)=>{
            state ={
                ...state,
                loading:true, 
                error:false
            }
            return state;
        });

        builder.addCase(loadFeedPage.fulfilled ,(state,action)=>{
            state ={
                ...state,
                post:action.payload,
                loading:false,
            }
            return state;
        });
        builder.addCase(loadFeedPage.rejected,(state,action)=>{
            state ={
                ...state,
                loading:false,
                error:true
            }
            return state;
        })

    }
});

export const {setCurrentPost} = FeedSlice.actions;

export default FeedSlice.reducer;

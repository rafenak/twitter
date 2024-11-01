import {
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  import axios from "axios";
import { Post } from "../../utils/GlobalInterfaces";

interface FeedSliceState{
    post: Post[],
    loading:boolean,
    error:boolean
}

interface FeedPagePayload{
    userId:number,
    token:string
}

const initialState:FeedSliceState ={
    post:[],
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
    reducers : {},
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

export const {} = FeedSlice.actions;

export default FeedSlice.reducer;

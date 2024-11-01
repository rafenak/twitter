import { configureStore } from "@reduxjs/toolkit";

import registerReducer from "../redux/Slices/RegisterSlice";
import userReducer from "../redux/Slices/UserSlice";
import postReducer from "../redux/Slices/PostSlice";
import modalReducer from '../redux/Slices/ModalSlice'
import gifReducer from '../redux/Slices/GifSlice'
import feedReduce from '../redux/Slices/FeedSlice'

export const store = configureStore({
  reducer: {
    register: registerReducer,
    user: userReducer,
    post: postReducer,
    modal:modalReducer,
    gif:gifReducer,
    feed:feedReduce
  },
  middleware : (getDefaultMiddleware) =>  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions : ['post/updateCurrentPostImages'],
      ignoredPaths:  ['post.currentPostImages']
    }
  })
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDisptach = typeof store.dispatch;

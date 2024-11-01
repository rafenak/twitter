 import React, { useEffect } from 'react'
 import './Feed.css'
import { FeedTopBar } from '../FeedTopBar/FeedTopBar'
import { FeedPostCreator } from '../FeedPostCreator/FeedPostCreator'
import { useDispatch, useSelector } from 'react-redux'
import { AppDisptach, RootState } from '../../../../redux/Store'
import { loadFeedPage } from '../../../../redux/Slices/FeedSlice'
 
 export const Feed:React.FC = () => {

  const userState = useSelector((state:RootState)=> state.user);
  const feedState =  useSelector((state:RootState)=> state.feed);
  const dispatch:AppDisptach = useDispatch();

  useEffect(() => {
    if (userState.loggedIn && userState.token) {
      dispatch(
        loadFeedPage({
          token: userState.token,
          userId: userState.loggedIn.userId,
        })
      );
    }
  }, [userState.loggedIn && userState.token]);


   return (
     <div className='feed'>
        <FeedTopBar />
        <FeedPostCreator />
     </div>
   )
 }
 
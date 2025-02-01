import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { AppDisptach, RootState } from '../redux/Store';
import { FeedPost, Post } from '../utils/GlobalInterfaces';
import axios from 'axios';
import './ViewPost.css'
import { PostBanner } from '../features/post/components/PostBanner/PostBanner';
import { IndividualPost } from '../features/post/components/IndividualPost/IndividualPost';
import { IndividualReply } from '../features/post/components/IndividualReply/IndividualReply';
import { setCurrentPost, setFeedPosts } from '../redux/Slices/FeedSlice';
import { IndividualPostReplies } from '../features/post/components/IndividualPostReplies/IndividualPostReplies';

export const ViewPost:React.FC = () => {

    const {postId} = useParams();
    const loggedIn = useSelector((state:RootState)=>state.user.loggedIn);
    //const [post,setPost] = useState<Post | undefined>();
    const feed =  useSelector((state:RootState)=>state.feed.posts);
    const post =  useSelector((state:RootState)=>state.feed.currentPost);
    const dispatch:AppDisptach = useDispatch()

    const setCurrentPostAndFeed = (post:Post) =>{
        dispatch(setCurrentPost(post));
        let feedPost:FeedPost[] = [];
        feedPost.push({
            post:post,
            replyTo: null,
            repost: false,
            repostUser: post.author
        });

        let replies = post.replies?.map((reply)=>{
            let feedPost:FeedPost={
                post:reply,
                replyTo:null,
                repost:false,
                repostUser:reply.author
            }
            return feedPost;
        });

        feedPost=[...feedPost,...replies || []];

        dispatch(setFeedPosts(feedPost));
         
    }

    const fetchPostById = async()=>{
        const req = await axios.get(`http://localhost:8000/posts/id/${postId}`);
        const post= req.data
        //setPost(req.data);
        setCurrentPostAndFeed(post);
    }

    useEffect(()=>{
        if(postId && feed.some((post)=> post.post.postId === +postId)){
            feed.forEach((post,idx)=>{
                if(post.post.postId === +postId){
                    setCurrentPostAndFeed(post.post);
                    return;
                }
            })
        }else{
            fetchPostById();
        }
    },[postId]);

    useEffect(()=>{
        if(post){
            setCurrentPostAndFeed(post);
        }

    },[post?.replies?.length])


  return (
    <div className='view-post'>
        <PostBanner />
        {post && <IndividualPost post={post}/>}
        {post &&  loggedIn && <IndividualReply original={post} user={loggedIn}/>}
        {post && <IndividualPostReplies />}
    </div>
  )
}

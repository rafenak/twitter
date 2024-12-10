import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { RootState } from '../redux/Store';
import { Post } from '../utils/GlobalInterfaces';
import axios from 'axios';
import './ViewPost.css'
import { PostBanner } from '../features/post/components/PostBanner/PostBanner';
import { IndividualPost } from '../features/post/components/IndividualPost/IndividualPost';

export const ViewPost:React.FC = () => {

    const {postId} = useParams();
    const loggedIn = useSelector((state:RootState)=>state.user.loggedIn);
    const [post,setPost] = useState<Post | undefined>()

    const fetchPostById = async()=>{
        const req = await axios.get(`http://localhost:8000/posts/id/${postId}`);
        setPost(req.data);
    }

    useEffect(()=>{
        if(postId && !post){
            fetchPostById();
        }
    },[postId,post])


  return (
    <div className='view-post'>
        <PostBanner />
        {post && <IndividualPost post={post}/>}
    </div>
  )
}

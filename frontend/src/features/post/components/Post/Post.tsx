import React, { useEffect, useRef } from 'react'
import { FeedPost } from '../../../../utils/GlobalInterfaces'
import CircleIcon from '@mui/icons-material/Circle';
import pfp from '../../../../assets/Generic-Profile.webp'
import VerifiedIcon from '@mui/icons-material/Verified';
import './Post.css'
import { AppDisptach, RootState } from '../../../../redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import {  updatePost } from '../../../../redux/Slices/FeedSlice';
import { convertPostDateToString } from '../../utils/PostUtils';
import { batchPostView} from '../../../../redux/Slices/PostSlice';
import { useNavigate } from 'react-router-dom';
import { PostMore } from '../PostMore/PostMore';
import { PostUsername } from '../PostUsername/PostUsername';
import { PostContent } from '../PostContent/PostContent';
import RepostSVG from '../../../../components/SVGs/RepostSVG';
import { PostActionBar } from '../PostActionBar/PostActionBar';
// import { covertPostContentToElements } from '../../../../utils/EmojiUtils';

interface PostProps {
    feedPost: FeedPost
}

interface HoverColors {
    reply: string;
    repost: string;
    like: string;
    views: string;
    bookmark: string;
    share: string;
}

export const Post: React.FC<PostProps> = ({ feedPost }) => {
    const { post, repost } = feedPost;
    const loggegIn = useSelector((state: RootState) => state.user.loggedIn)
    const dispatch: AppDisptach = useDispatch();
    const navigate = useNavigate();
    const postRef = useRef<HTMLDivElement>(null);
   

    const createBatchView = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                let updatedPost = JSON.parse(JSON.stringify(post))

                if (loggegIn && !post.views.some((user) => user.userId === loggegIn.userId)) {
                    let views = [...post.views, loggegIn]
                    updatedPost = {
                        ...updatedPost,
                        views
                    };
                    dispatch(updatePost(updatedPost))
                    // dispatch(viewPost({
                    //     postId: post.postId,
                    //     token: token
                    // }))
                    dispatch(batchPostView(post.postId))
                }
            }
        })
    }

    const openPost= () =>{
        navigate(`/post/${post.postId}`)
    }

    useEffect(()=>{
        if(postRef && postRef.current){
            const observer = new IntersectionObserver(createBatchView, {
                root: null,
                threshold: 1,
              });
             observer.observe(postRef.current);
        }
    },[])

   
    return (
        <div className='post' ref={postRef} onClick={openPost}>
            {repost &&
                <div className='post-repost-info' onMouseOver={() => {/** Popup a modal with the user information on Mouse Over*/ }}>
                    <RepostSVG height={16} width={16} color={"#657786"} />
                    {/* <span className='post-repost-user' onClick={() => navigate(`/${feedPost.repostUser.username}`)}>{feedPost.repostUser.nickname} reposted </span> */}
                    <PostUsername author={feedPost.repostUser} repost={true} key={feedPost.repostUser.userId}/>
                </div>
            }
            <div className='post-body-wrapper'> 
                <div className='post-left'>
                    <img className="post-pfp" src={post.author.profilePicture ? post.author.profilePicture?.imageURL : pfp} alt={`${post.author.nickname}'s pfp`} />
                </div>
                <div className='post-right'>
                    <div className='post-right-top'>
                        <div className='post-user-info'>
                            {/* <p className='post-nickname'>{post.author.nickname}</p> */}
                            <PostUsername author={post.author} key={post.postId} repost={false}/>
                            {post.author.verifiedAccount && <VerifiedIcon sx={{
                                color: '#1DA1F2',
                                height: '20px',
                                width: '20px'
                            }} />}
                            {post.author.organization && <img className='post-oragnization'
                                src={post.author.organization.imageURL} alt={`${post.author.username}'s organization`} />}
                            <p className='post-username'>@{post.author.username}</p>
                            <CircleIcon sx={{
                                width: "3.5px",
                                height: "3.5px",
                                color: "#657786"
                            }} />
                            {post.postDate && <p className='post-posted-at'>{convertPostDateToString(post.postDate)}</p>}
                        </div>
                        <PostMore postId={post.postId} postAuthor={post.author} key={post.postId} />
                    </div>
                    <PostContent post={feedPost.post} key={feedPost.post.postId}/>
                    <PostActionBar post={feedPost.post} isIndividual={false}/>
                </div>
            </div>
        </div>
    )
}

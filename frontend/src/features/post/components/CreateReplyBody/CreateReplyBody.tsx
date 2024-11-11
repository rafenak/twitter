import React, { useEffect } from 'react'
import './CreateReplyBody.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDisptach, RootState } from '../../../../redux/Store'
import pfp from '../../../../assets/Generic-Profile.jpg'
import VerifiedIcon from '@mui/icons-material/Verified';
import CircleIcon from '@mui/icons-material/Circle';
import { convertPostDateToString } from '../../utils/PostUtils';
import { CreatePostTextArea } from '../CreatePostTextArea/CreatePostTextArea'
import { initializeCurrentReply } from '../../../../redux/Slices/PostSlice'
import { FeedPostCreatorPoll } from '../../../feed/components/FeedPostCreatorPoll/FeedPostCreatorPoll'
import { FeedPostCreatorImages } from '../../../feed/components/FeedPostCreatorImages/FeedPostCreatorImages'
// import { covertPostContentToElements } from '../../../../utils/EmojiUtils';

export const CreateReplyBody: React.FC = () => {

    const feedPost = useSelector((state: RootState) => state.feed.currentPost)
    const postState = useSelector((state: RootState) => state.post)
    const user = useSelector((state: RootState) => state.user.loggedIn)
    const dispatch: AppDisptach = useDispatch();

    useEffect(() => {
        if (feedPost && user) {
            dispatch(initializeCurrentReply({
                post: feedPost,
                user: user
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [feedPost?.postId, user?.userId, postState.currentPost?.images])

    //console.log('postState', postState);


    return (
        <div className='create-reply-body'>
            {feedPost &&
                <div className='create-reply-body-post'>
                    <div className='create-reply-body-post-left'>
                        <img className='create-reply-body-post-pfp'
                            src={feedPost.author.profilePicture ? feedPost.author.profilePicture.imageURL : pfp}
                            alt={`${feedPost.author.nickname}s pfp`} height={40} width={40}/>
                        <div className='create-reply-body-post-divider'>  </div>
                    </div>
                    <div className='create-reply-body-post-right'>
                        <div className='create-reply-body-post-top-right'>
                            <p className='create-reply-body-post-nickname'>{feedPost.author.nickname}</p>
                            {feedPost.author.verifiedAccount && <VerifiedIcon sx={{
                                color: '#1DA1F2',
                                height: '20px',
                                width: '20px'
                            }} />}
                            {feedPost.author.organization && <img className='create-reply-body-post-oragnization'
                                src={feedPost.author.organization.imageURL} alt={`${feedPost.author.username}'s organization`} />}
                            <p className='create-reply-body-post-username'>@{feedPost.author.username}</p>
                            <CircleIcon sx={{
                                width: "4px",
                                height: "4px",
                                color: "#657786"
                            }} />
                            {feedPost.postDate && <p className='create-reply-body-posted-date'>{convertPostDateToString(feedPost.postDate)}</p>}
                        </div>
                        <div className='create-reply-body-post-bottom-right'>
                            <div className='create-reply-body-post-content'>
                                {feedPost.content}
                                {/* {covertPostContentToElements(content,"post")} */}
                            </div>
                            <div className='create-reply-body-post-replying-to'>
                                Replying to  <span className='create-reply-body-post-replying-to-user'>
                                    @{feedPost.author.username}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className='create-reply-body-reply'>
                {postState.currentReply ?
                    <>
                    <div className='create-reply-body-reply-content-group'>
                        <img className='create-reply-body-post-pfp'
                            style={{marginTop: '8px'}} 
                            src={user && user.profilePicture ? user.profilePicture.imageURL : pfp} 
                            alt={user ? `${user?.username}'s pfp` : 'user pfp'} />
                        <div className='create-reply-body-reply-content'>
                            < CreatePostTextArea location='reply' />
                        </div> 
                    </div> 
                        
                        {((postState.currentReplyImages.length > 0) || (postState.currentReply.images.length > 0)) &&
                            <FeedPostCreatorImages />}
                        {(postState.currentReply.poll) && <FeedPostCreatorPoll />}
                    </> : <></>
                }
            </div>
        </div>
    )
}

import React from 'react'
import './CreateReplyBody.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/Store'
import pfp from '../../../../assets/Generic-Profile.jpg'
import VerifiedIcon from '@mui/icons-material/Verified';
import { convertPostDateToString } from '../../utils/PostUtils';
// import { covertPostContentToElements } from '../../../../utils/EmojiUtils';

export const CreateReplyBody: React.FC = () => {

    const post = useSelector((state: RootState) => state.feed.currentPost)

    return (
        <div className='create-reply-body'>
            {post && <div className='create-reply-body-post'>
                <div className='create-reply-body-post-left'>
                    <img className='create-reply-body-post-pfp'
                        src={post.author.profilePicture ? post.author.profilePicture.imageURL : pfp}
                        alt={`${post.author.nickname}s pfp`} />
                    <div className='create-reply-body-post-divider'>  </div>
                </div>
                <div className='create-reply-body-post-right'>
                    <div className='create-reply-body-post-top-right'>
                    <p className='create-reply-body-post-nickname'>{post.author.nickname}</p>
                        {post.author.verifiedAccount && <VerifiedIcon sx={{
                            color: '#1DA1F2',
                            height: '20px',
                            width: '20px'
                        }} />}
                    {post.author.organization && <img className='create-reply-body-post-oragnization'
                            src={post.author.organization.imageURL} alt={`${post.author.username}'s organization`} />}
                     <p className='create-reply-body-post-username'>@{post.author.username}</p>       
                    </div>
                </div>
                <div className='create-reply-body-post-bottom-right'> 
                    <div className='create-reply-body-post-content'> 
                        {post.content}
                       {/* {covertPostContentToElements(content,"post")} */}
                    </div>
                    <div className='create-reply-body-post-replying-to'> 
                        Replying to  <span className='create-reply-body-post-replying-to-username'>
                            @{post.author.username}
                        </span>
                    </div>
                </div>
            </div>
            }
            <div className='create-reply-body-reply'>
                {/* Refactor the feed post to reuse here */}
            </div>
        </div>
    )
}

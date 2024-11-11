import React from 'react'
import { Post } from '../../../../utils/GlobalInterfaces'
import pfp from '../../../../assets/Generic-Profile.jpg'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircleIcon from '@mui/icons-material/Circle';
import VerifiedIcon from '@mui/icons-material/Verified';
import { convertPostDateToString } from '../../utils/PostUtils';
// import { covertPostContentToElements } from '../../../../utils/EmojiUtils';

interface ReplyProps {
    reply: Post
}

export const Reply: React.FC<ReplyProps> = ({ reply }) => {
    return (
        <div className='reply'>
            <div className='reply-left'>
                <img className="reply-pfp" src={reply.author.profilePicture ? reply.author.profilePicture?.imageURL : pfp} alt={`${reply.author.nickname}'s pfp`} />
            </div>
            <div className='reply -right'>
                <div className='post-right-top'>
                    <div className='post-user-info'>
                        <p className='post-nickname'>{reply.author.nickname}</p>
                        {reply.author.verifiedAccount && <VerifiedIcon sx={{
                            color: '#1DA1F2',
                            height: '20px',
                            width: '20px'
                        }} />}
                        {reply.author.organization && <img className='post-oragnization'
                            src={reply.author.organization.imageURL} alt={`${reply.author.username}'s organization`} />}
                        <p className='post-username'>@{reply.author.username}</p>
                        <CircleIcon sx={{
                            width: "3.5px",
                            height: "3.5px",
                            color: "#657786"
                        }} />
                        {reply.postDate && <p className='post-posted-at'>{convertPostDateToString(reply.postDate)}</p>}
                    </div>
                    <div className='post-more'>
                        <MoreHorizIcon sx={{
                            width: "20px",
                            height: "20px",
                        }} />
                    </div>
                </div> 
                <div className='post-content'>
                    {reply.content}
                    {/* {covertPostContentToElements(content,"post")} */}
                </div>
            </div>
        </div>
    )
}

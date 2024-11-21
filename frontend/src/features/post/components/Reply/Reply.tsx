import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Post } from '../../../../utils/GlobalInterfaces'
import pfp from '../../../../assets/Generic-Profile.webp'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircleIcon from '@mui/icons-material/Circle';
import VerifiedIcon from '@mui/icons-material/Verified';
import { convertPostDateToString } from '../../utils/PostUtils';
// import { covertPostContentToElements } from '../../../../utils/EmojiUtils';
import './Reply.css'
import { createPostImageContainer } from '../../../feed/utils/FeedUtils';

interface ReplyProps {
    reply: Post
}

export const Reply: React.FC<ReplyProps> = ({ reply }) => {

    const overFlowRef = useRef<HTMLDivElement>(null);
    const [overFlowing,setOverFlowing] = useState<boolean>(false);
    const rpleyImageContainer = useMemo(
        () => createPostImageContainer(reply.images), [reply.postId]);


    useEffect(()=>{
        if(reply.content && overFlowRef && overFlowRef.current){
            if(overFlowRef.current.clientHeight < overFlowRef.current.scrollHeight){
                setOverFlowing(true);
            }

        }

    },[reply.content])


    return (
        <div className='reply'>
            <div className='reply-left'>
                <img className="reply-pfp" src={reply.author.profilePicture ? reply.author.profilePicture?.imageURL : pfp} alt={`${reply.author.nickname}'s pfp`} />
            </div>
            <div className='reply-right'>
                <div className='reply-right-top'>
                    <div className='reply-user-info'>
                        <p className='reply-nickname'>{reply.author.nickname}</p>
                        {reply.author.verifiedAccount && <VerifiedIcon sx={{
                            color: '#1DA1F2',
                            height: '20px',
                            width: '20px'
                        }} />}
                        {reply.author.organization && <img className='reply-oragnization'
                            src={reply.author.organization.imageURL} alt={`${reply.author.username}'s organization`} />}
                        <p className='reply-username'>@{reply.author.username}</p>
                        <CircleIcon sx={{
                            width: "3.5px",
                            height: "3.5px",
                            color: "#657786"
                        }} />
                        {reply.postDate && <p className='reply-posted-at'>{convertPostDateToString(reply.postDate)}</p>}
                    </div>
                    <div className='post-more'>
                        <MoreHorizIcon sx={{
                            width: "20px",
                            height: "20px",
                        }} />
                    </div>
                </div> 
                <div className='reply-content' ref={overFlowRef}>
                    {reply.content}
                    {/* {covertPostContentToElements(reply.content,"post")} */}
                </div>
                {overFlowing && <p className='reply-show-more'>Show More</p>}
                 {reply.images.length > 0 && rpleyImageContainer}       
            </div>
        </div>
    )
}

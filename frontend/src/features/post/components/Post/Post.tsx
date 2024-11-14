import React, { useMemo, useState } from 'react'
import { FeedPost } from '../../../../utils/GlobalInterfaces'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircleIcon from '@mui/icons-material/Circle';

import pfp from '../../../../assets/Generic-Profile.jpg'
import ReplySVG from '../../../../components/SVGs/ReplySVG';
import RepostSVG from '../../../../components/SVGs/RepostSVG';
import LikeSVG from '../../../../components/SVGs/LikeSVG';
import ViewSVG from '../../../../components/SVGs/ViewSVG';
import ShareSVG from '../../../../components/SVGs/ShareSVG';
import BookMarkSVG from '../../../../components/SVGs/BookMarkSVG';
import VerifiedIcon from '@mui/icons-material/Verified';

import './Post.css'
import { AppDisptach, RootState } from '../../../../redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { updateDisplayCreateReply } from '../../../../redux/Slices/ModalSlice';
import { setCurrentPost } from '../../../../redux/Slices/FeedSlice';
import { convertPostDateToString } from '../../utils/PostUtils';
import { Reply } from '../Reply/Reply';
import { bookmarkPost, likePost, repostPost } from '../../../../redux/Slices/PostSlice';
import { createPostImageContainer } from '../../../feed/utils/FeedUtils';
import { useNavigate } from 'react-router-dom';
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
    const { post, replyTo, repost, repostUser } = feedPost;
    const token = useSelector((state: RootState) => state.user.token)
    const dispatch: AppDisptach = useDispatch();
    const postImageContainer = useMemo(() => createPostImageContainer(feedPost.post.images), [feedPost.post.postId]);
    const navigate = useNavigate();

    const [colors, setColors] = useState<HoverColors>({
        reply: '#AAB8C2',
        repost: '#AAB8C2',
        like: '#AAB8C2',
        views: '#AAB8C2',
        bookmark: '#AAB8C2',
        share: '#AAB8C2',
    })

    const updateHoverColors = (e: React.MouseEvent<HTMLDivElement>) => {
        const id = e.currentTarget.id;

        switch (id) {
            case "reply":
                setColors({
                    ...colors,
                    reply: "rgb(29,155,240)",
                });
                break;

            case "views":
                setColors({
                    ...colors,
                    views: "rgb(29,155,240)",
                });
                break;

            case "bookmark":
                setColors({
                    ...colors,
                    bookmark: "rgb(29,155,240)",
                });
                break;


            case "share":
                setColors({
                    ...colors,
                    share: "rgb(29,155,240)",
                });
                break;

            case "repost":
                setColors({
                    ...colors,
                    repost: "rgb(0,230,64)",
                });
                break;

            case "like":
                setColors({
                    ...colors,
                    like: "rgb(242,38,19)",
                });
                break;
        }
    };

    const restColors = () => {
        setColors({
            reply: '#AAB8C2',
            repost: '#AAB8C2',
            like: '#AAB8C2',
            views: '#AAB8C2',
            bookmark: '#AAB8C2',
            share: '#AAB8C2',
        })

    }

    const toggleReply = () => {
        dispatch(setCurrentPost(post))
        dispatch(updateDisplayCreateReply())
    }

    const convertCount = (count: number): string => {
        if (count >= 1_000_000) {
            return (count / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        } else if (count >= 1_000) {
            return (count / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return count.toString();
    };

    const createRepost = () => {
        dispatch(repostPost({
            postId: post.postId,
            token: token
        }))
    }

    const createLike = () => {
        dispatch(likePost({
            postId: post.postId,
            token: token
        }))
    }


    const createBookmark = () => {
        dispatch(bookmarkPost({
            postId: post.postId,
            token: token
        }))
    }

    return (
        <div className='post'>
            {feedPost.post &&
                <p className='post-repost-info' onMouseOver={()=> {/** Popup a modal with the user information on Mouse Over*/}}>
                    <RepostSVG height={16} width={16} color={"#657786"}/>
                    <span className='post-repost-user' onClick={()=> navigate(`/${feedPost.repostUser.username}`)}>{feedPost.repostUser && feedPost.repostUser.nickname} reposted </span>
                </p>
            }
            <div className='post-body-wrapper'>
                <div className='post-left'>
                    <img className="post-pfp" src={post.author.profilePicture ? post.author.profilePicture?. imageURL : pfp} alt={`${post.author.nickname}'s pfp`} />
                </div>
                <div className='post-right'>
                    <div className='post-right-top'>
                        <div className='post-user-info'>
                            <p className='post-nickname'>{post.author.nickname}</p>
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
                        <div className='post-more'>
                            <MoreHorizIcon sx={{
                                width: "20px",
                                height: "20px",
                            }} />
                        </div>
                    </div>
                    <div className='post-content'>
                        {post.content}
                        {/* {covertPostContentToElements(content,"post")} */}
                    </div>
                    {feedPost.post.images.length > 0 && postImageContainer}
                    {replyTo && <Reply reply={replyTo} />}
                    <div className='post-action-bar'>
                        <div className='post-action-bar-group'>
                            <div className='post-action-bar-blue-wrapper' id='reply' onMouseOver={updateHoverColors} onMouseLeave={restColors} onClick={toggleReply}>
                                <ReplySVG height={20} width={20} color={colors.reply} />
                            </div>
                            <p className='post-action-bar-count' style={{ color: colors.reply }}>{convertCount(post.replies?.length || 0)}</p>
                        </div>

                        <div className='post-action-bar-group'>
                            <div className='post-action-bar-repost-wrapper' id='repost' onMouseOver={updateHoverColors} onMouseLeave={restColors} onClick={createRepost}>
                                <RepostSVG height={20} width={20} color={colors.repost} />
                            </div>
                            <p className='post-action-bar-count' style={{ color: colors.reply }}>{convertCount(post.reposts.length || 0)}</p>
                        </div>

                        <div className='post-action-bar-group'>
                            <div className='post-action-bar-like-wrapper' id='like' onMouseOver={updateHoverColors} onMouseLeave={restColors} onClick={createLike}>
                                <LikeSVG height={20} width={20} color={colors.like} />
                            </div>
                            <p className='post-action-bar-count' style={{ color: colors.reply }}>{convertCount(post.likes.length || 0)}</p>
                        </div>

                        <div className='post-action-bar-group'>
                            <div className='post-action-bar-blue-wrapper' id='views' onMouseOver={updateHoverColors} onMouseLeave={restColors}>
                                <ViewSVG height={20} width={20} color={colors.views} />
                            </div>
                            {/* To do number of replied beside it */}
                            <p className='post-action-bar-count' style={{ color: colors.reply }}>{convertCount(post.views.length || 0)}</p>
                        </div>

                        <div className='post-action-bar-right'>
                            <div className='post-action-bar-group'>
                                <div className='post-action-bar-blue-wrapper' id='bookmark' onMouseOver={updateHoverColors} onMouseLeave={restColors} onClick={createBookmark}>
                                    <BookMarkSVG height={20} width={20} color={colors.bookmark} />
                                    <p className='post-action-bar-count' style={{ color: colors.reply }}>{convertCount(post.bookmarks.length || 0)}</p>
                                </div>
                            </div>
                            <div className='post-action-bar-blue-wrapper' id='share' onMouseOver={updateHoverColors} onMouseLeave={restColors}>
                                <ShareSVG height={20} width={20} color={colors.share} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

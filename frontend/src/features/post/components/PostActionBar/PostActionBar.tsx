import React, { useState } from 'react'
import { Post } from '../../../../utils/GlobalInterfaces'
import ReplySVG from '../../../../components/SVGs/ReplySVG';
import RepostSVG from '../../../../components/SVGs/RepostSVG';
import LikeSVG from '../../../../components/SVGs/LikeSVG';
import ViewSVG from '../../../../components/SVGs/ViewSVG';
import ShareSVG from '../../../../components/SVGs/ShareSVG';
import BookMarkSVG from '../../../../components/SVGs/BookMarkSVG';
import { convertCount } from '../../utils/PostUtils';
import { usePostActions } from '../../../../hooks/usePostActions';
import './PostActionBar.css'

interface PostActionBarProps {
    post: Post;
    isIndividual: boolean;

}

interface HoverColors {
    reply: string;
    repost: string;
    like: string;
    views: string;
    bookmark: string;
    share: string;
}


export const PostActionBar: React.FC<PostActionBarProps> = ({ post, isIndividual }) => {

    const { toggleReply, createRepost, createLike, createBookmark } = usePostActions();

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




    return (
        <div className='post-action-bar'>
            <div className='post-action-bar-group'>
                <div className='post-action-bar-blue-wrapper' id='reply' onMouseOver={updateHoverColors} onMouseLeave={restColors} onClick={() => toggleReply(post)}>
                    <ReplySVG height={20} width={20} color={colors.reply} />
                </div>
                {post.replies && post.replies?.length > 0 && <p className='post-action-bar-count' style={{ color: colors.reply }}>{convertCount(post.replies?.length || 0)}</p>}
            </div>

            <div className='post-action-bar-group'>
                <div className='post-action-bar-repost-wrapper' id='repost' onMouseOver={updateHoverColors} onMouseLeave={restColors} onClick={() => createRepost(post)}>
                    <RepostSVG height={20} width={20} color={colors.repost} />
                </div>
                {post.reposts.length > 0 && <p className='post-action-bar-count' style={{ color: colors.reply }}>{convertCount(post.reposts.length || 0)}</p>}
            </div>

            <div className='post-action-bar-group'>
                <div className='post-action-bar-like-wrapper' id='like' onMouseOver={updateHoverColors} onMouseLeave={restColors} onClick={() => createLike(post)}>
                    <LikeSVG height={20} width={20} color={colors.like} />
                </div>
                {post.likes.length > 0 && <p className='post-action-bar-count' style={{ color: colors.reply }}>{convertCount(post.likes.length || 0)}</p>}
            </div>

            <div className='post-action-bar-group'>
                <div className='post-action-bar-blue-wrapper' id='views' onMouseOver={updateHoverColors} onMouseLeave={restColors}>
                    <ViewSVG height={20} width={20} color={colors.views} />
                </div>
                {post.views.length > 0 && <p className='post-action-bar-count' style={{ color: colors.reply }}>{convertCount(post.views.length || 0)}</p>}
            </div>

            <div className='post-action-bar-right'>
                <div className='post-action-bar-group'>
                    <div className='post-action-bar-blue-wrapper' id='bookmark' onMouseOver={updateHoverColors} onMouseLeave={restColors} onClick={() => (post)}>
                        <BookMarkSVG height={20} width={20} color={colors.bookmark} />
                        {post.bookmarks.length > 0 && <p className='post-action-bar-count' style={{ color: colors.reply }}>{convertCount(post.bookmarks.length || 0)}</p>}
                    </div>
                </div>
                <div className='post-action-bar-blue-wrapper' id='share' onMouseOver={updateHoverColors} onMouseLeave={restColors}>
                    <ShareSVG height={20} width={20} color={colors.share} />
                </div>
            </div>
        </div>
    )
}

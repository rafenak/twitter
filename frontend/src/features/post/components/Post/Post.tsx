import React, { useState } from 'react'
import { Post as IPost } from '../../../../utils/GlobalInterfaces'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircleIcon from '@mui/icons-material/Circle';

import pfp from '../../../../assets/Generic-Profile.jpg'
import ReplySVG from '../../../../components/SVGs/ReplySVG';
import RepostSVG from '../../../../components/SVGs/RepostSVG';
import LikeSVG from '../../../../components/SVGs/LikeSVG';
import ViewSVG from '../../../../components/SVGs/ViewSVG';
import ShareSVG from '../../../../components/SVGs/ShareSVG';
import BookMarkSVG from '../../../../components/SVGs/BookMarkSVG';

import './Post.css'

interface PostProps {
    post: IPost
}

interface HoverColors {
    reply: string;
    repost: string;
    like: string;
    views: string;
    bookmark: string;
    share: string;
}

export const Post: React.FC<PostProps> = ({ post }) => {

    const { author, content, postDate } = post;

    const [colors, setColors] = useState<HoverColors>({
        reply: '#AAB8C2',
        repost: '#AAB8C2',
        like: '#AAB8C2',
        views: '#AAB8C2',
        bookmark: '#AAB8C2',
        share: '#AAB8C2',
    })

    const convertPostDateToSting = (): string => {
        const postDateString = `${postDate}`;
        let d = new Date(postDateString);
        return d.toDateString();
    }

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
        <div className='post'>
            <div className='post-left'>
                <img className="post-pfp" src={author.profilePicture ? author.profilePicture : pfp} alt={`${author.nickname}'s pfp`} />
            </div>
            <div className='post-right'>
                <div className='post-right-top'>
                    <div className='post-user-info'>
                        <p className='post-nickname'>{author.nickname}</p>
                        {/* Add in verfied and once verified is added in backend */}
                        {/* Add in org images once is added in backend */}
                        <p className='post-username'>@{author.username}</p>
                        {/* <div className='post-dot-section'>
                            <p className='post-dot'>.</p>
                        </div> */}
                        <CircleIcon sx={{
                            width: "3.5px",
                            height: "3.5px",
                            color: "#657786"
                        }} />
                        {postDate && <p className='post-posted-at'>{convertPostDateToSting()}</p>}
                    </div>
                    <div className='post-more'>
                        <MoreHorizIcon sx={{
                            width: "20px",
                            height: "20px",
                        }} />
                    </div>
                </div>
                <div className='post-content'>
                    {content}
                </div>
                <div className='post-action-bar'>
                    <div className='post-action-bar-group'>
                        <div className='post-action-bar-blue-wrapper' id='reply' onMouseOver={updateHoverColors} onMouseLeave={restColors}>
                            <ReplySVG height={20} width={20} color={colors.reply} />
                        </div>
                        {/* To do number of replied beside it */}
                    </div>

                    <div className='post-action-bar-group'>
                        <div className='post-action-bar-repost-wrapper' id='repost' onMouseOver={updateHoverColors} onMouseLeave={restColors}>
                            <RepostSVG height={20} width={20} color={colors.repost} />
                        </div>
                        {/* To do number of replied beside it */}
                    </div>

                    <div className='post-action-bar-group'> 
                        <div className='post-action-bar-like-wrapper' id='like' onMouseOver={updateHoverColors} onMouseLeave={restColors}>
                            <LikeSVG height={20} width={20} color={colors.like} />
                        </div>
                        {/* To do number of replied beside it */}
                    </div>

                    <div className='post-action-bar-group'>
                        <div className='post-action-bar-blue-wrapper' id='views' onMouseOver={updateHoverColors} onMouseLeave={restColors}>
                            <ViewSVG height={20} width={20} color={colors.views} />
                        </div>
                        {/* To do number of replied beside it */}
                    </div>

                    <div className='post-action-bar-right'>
                        <div className='post-action-bar-blue-wrapper' id='bookmark' onMouseOver={updateHoverColors} onMouseLeave={restColors}>
                            <BookMarkSVG height={20} width={20} color={colors.bookmark} />
                        </div>
                        <div className='post-action-bar-blue-wrapper' id='share' onMouseOver={updateHoverColors} onMouseLeave={restColors}>
                            <ShareSVG height={20} width={20} color={colors.share} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

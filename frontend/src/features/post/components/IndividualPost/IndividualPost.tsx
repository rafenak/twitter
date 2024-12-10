import React, { useEffect } from "react";
import { Post } from "../../../../utils/GlobalInterfaces";
import { useNavigate } from "react-router-dom";
import { AppDisptach } from "../../../../redux/Store";
import { useDispatch } from "react-redux";
import { usePostActions } from "../../../../hooks/usePostActions";
import { setCurrentPost } from "../../../../redux/Slices/FeedSlice";
import pfp from "../../../../assets/Generic-Profile.webp";
import { PostUsername } from "../PostUsername/PostUsername";
import VerifiedIcon from "@mui/icons-material/Verified";
import CircleIcon from '@mui/icons-material/Circle';
import { PostMore } from "../PostMore/PostMore";
import { PostContent } from "../PostContent/PostContent";
import { PostActionBar } from "../PostActionBar/PostActionBar";
import './IndividualPost.css'
import { stringifyFullDate, stringifyTime } from "../../../../utils/DateUtils";
import { convertCount } from "../../utils/PostUtils";

interface IndividualPostProps {
    post: Post;
}

export const IndividualPost: React.FC<IndividualPostProps> = ({ post }) => {
    const navigate = useNavigate();
    const dispatch: AppDisptach = useDispatch();

    const { createSingleView } = usePostActions();

    const navigateToProfile = () => {
        navigate(`/profile/${post.author.username}`);
    };

    useEffect(() => {
        dispatch(setCurrentPost(post));
        createSingleView(post);
    }, [post]);

    return (
        <div className="inidividual-post">
            <div className="inidividual-post-top">
                <div className="inidividual-post-top-right" onClick={navigateToProfile}>
                    <img
                        className="inidividual-post-pfp"
                        src={
                            post.author.profilePicture
                                ? post.author.profilePicture?.imageURL
                                : pfp
                        }
                        alt={`${post.author.nickname}'s pfp`}
                    />
                    <div className="inidividual-post-user">
                        <div className="inidividual-post-user-nickname-section">
                            <PostUsername author={post.author} repost={false} />
                            {post.author.verifiedAccount && (
                                <VerifiedIcon
                                    sx={{
                                        color: "#1DA1F2",
                                        height: "20px",
                                        width: "20px",
                                    }}
                                />
                            )}
                            {post.author.organization && (
                                <img
                                    className="inidividual-post-oragnization"
                                    src={post.author.organization.imageURL}
                                    alt={`${post.author.username}'s organization`}
                                />
                            )}
                        </div>
                        <p className="inidividual-post-username">@{post.author.username}</p>
                    </div>
                </div>
                <div className="inidividual-post-top-left">
                    <PostMore postId={post.postId} postAuthor={post.author} key={post.postId} />
                </div>
            </div>
            <div className="inidividual-post-content-wrapper">
                <PostContent post={post} key={post.postId} />
            </div>
            <div className="inidividual-post-data-section">
                {post.postDate && <p className="inidividual-post-data-text">{stringifyTime(new Date(post.postDate))}</p>}
                <CircleIcon sx={{
                    width: "4px",
                    height: "4px",
                    color: "#657786"
                }} />
                {post.postDate && <p className="inidividual-post-data-text">{stringifyFullDate(new Date(post.postDate))}</p>}
                <CircleIcon sx={{
                    width: "4px",
                    height: "4px",
                    color: "#657786"
                }} />
                <p className="inidividual-post-data-text-bold">{convertCount(post.views.length)}</p> 
                <p className="inidividual-post-data-text">Views</p> 
            </div>
            <div className="inidividual-post-divider"></div>
            <div className="inidividual-post-action-bar-wrapper">
                <PostActionBar post={post} isIndividual={true}/>
            </div>
            <div className="inidividual-post-divider"></div>
        </div>
    );
};

import React from "react";
import { Post, User } from "../../../../utils/GlobalInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDisptach, RootState } from "../../../../redux/Store";
import { useNavigate } from "react-router-dom";
import { initializeCurrentReply } from "../../../../redux/Slices/PostSlice";
import { CreatePostTextArea } from "../CreatePostTextArea/CreatePostTextArea";
import { FeedPostCreatorImages } from "../../../feed/components/FeedPostCreatorImages/FeedPostCreatorImages";
import { CreateReplyBottom } from "../CreateReplyBottom/CreateReplyBottom";
import './IndividualReply.css'
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";

interface IndividualReplyProps {
    user: User;
    original: Post;
}

export const IndividualReply: React.FC<IndividualReplyProps> = ({
    user,
    original,
}) => {
    const currentFeedPost = useSelector(
        (state: RootState) => state.feed.currentPost
    );
    const postState = useSelector((state: RootState) => state.post);

    const dispatch: AppDisptach = useDispatch();
    const navigate = useNavigate();

    const navigateToProfile = () => {
        navigate(`/profile/${original.author.username}`);
    };

    const initReply = () => {
        if (currentFeedPost && user && !postState.currentPost) {
            dispatch(
                initializeCurrentReply({
                    post: currentFeedPost,
                    user: user,
                })
            );
        }
    };

    return (
        <div
            className={
                postState.currentReply
                    ? "inidividual-reply"
                    : "inidividual-reply inactive"
            }
        >
            <div className="inidividual-reply-left">
                <ProfilePicture size={"40"} user={user} />
            </div>
            <div className="inidividual-reply-right">
                {postState.currentReply && (
                    <p className="inidividual-reply-replying-to">
                        Replying to{" "}
                        <span
                            className="inidividual-reply-replying-to-user"
                            onClick={navigateToProfile}
                        >
                            @{original.author.username}
                        </span>
                    </p>
                )}
                <div className="inidividual-reply-text-wrapper" onClick={initReply}>
                    <CreatePostTextArea location="reply" placeHolder="Post your reply" />
                </div>
                {(postState.currentReplyImages.length > 0 ||
                    (postState.currentReply &&
                        postState.currentReply?.images.length > 0)) && (
                        <FeedPostCreatorImages />
                    )}
                {postState.currentReply && <CreateReplyBottom type="reply" />}
            </div>
            {!postState.currentReply && (
                <div className="inidividual-reply-fake-btn">Reply</div>
            )}
        </div>
    );
};

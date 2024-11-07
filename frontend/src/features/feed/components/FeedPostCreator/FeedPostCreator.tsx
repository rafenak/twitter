import React from "react";
import { Link } from "react-router-dom";
import defaultProfile from "../../../../assets/Generic-Profile.jpg";
import "./FeedPostCreator.css";
import { FeedPostCreatorProgress } from "../FeedPostCreatorProgress/FeedPostCreatorProgress";
import { useDispatch, useSelector } from "react-redux";
import { AppDisptach, RootState } from "../../../../redux/Store";
import {
  createPost,
  initializeCurrentPost,
  createPostWithMedia,
} from "../../../../redux/Slices/PostSlice";
import { Post } from "../../../../utils/GlobalInterfaces";
import { FeedPostAudienceDropDown } from "../FeedPostAudienceDropDown/FeedPostAudienceDropDown";
import { FeedPostReplyRestrictionDropDown } from "../FeedPostReplyRestrictionDropDown/FeedPostReplyRestrictionDropDown";
import { FeedPostCreatorImages } from "../FeedPostCreatorImages/FeedPostCreatorImages";
import { FeedPostCreatorPoll } from "../FeedPostCreatorPoll/FeedPostCreatorPoll";
import { EmojiDropDown } from "../../../../components/EmojiDropDown/EmojiDropDown";
import { CreatePostButtonCluster } from "../../../post/components/CreatePostButtonCluster/CreatePostButtonCluster";
import { CreatePostTextArea } from "../../../post/components/CreatePostTextArea/CreatePostTextArea";
//import { covertPostContentToElements } from "../../../../utils/EmojiUtils";

export const FeedPostCreator: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const displayEmoji = useSelector((state: RootState) => state.modal.displayEmojis);
  const dispatch: AppDisptach = useDispatch();
 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const activate = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!state.post.currentPost ) {
      if (state.user.loggedIn) {
        let p: Post = {
          postId: 0,
          content: "",
          author: state.user.loggedIn,
          likes: 0,
          images: [],
          reposts: 0,
          views: 0,
          scheduled: false,
          audience: "EVERYONE",
          replyRestriction: "EVERYONE",
        };
        dispatch(initializeCurrentPost(p));
      }
    }
  };


  const submitPost = () => {
    if (state.post.currentPost && state.user.loggedIn) {
      if (state.post.currentPostImages.length === 0) {
        let poll = undefined;
        if (state.post.currentPost.poll !== undefined && state.post.currentPost.images.length < 1) {
          poll = JSON.parse(JSON.stringify(state.post.currentPost.poll))
          let timeString = state.post.currentPost.poll.endTime
          let days = timeString.split(":")[0]
          let hours = timeString.split(":")[1]
          let minutes = timeString.split(":")[2]

          let endTime = new Date();
          endTime.setDate(endTime.getDate() + (+days))
          endTime.setHours(endTime.getHours() + (+hours))
          endTime.setMinutes(endTime.getMinutes() + (+minutes))
          console.log(endTime)
          poll = {
            ...poll,
            endTime: `${endTime.getFullYear()}-${(endTime.getMonth() + 1).toString().padStart(2, '0')}-${endTime.getDate().toString().padStart(2, '0')} ${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`
          }
        }

        let body = {
          content: state.post.currentPost.content,
          author: state.post.currentPost.author,
          images: state.post.currentPost.images,
          poll: poll,
          replies: [],
          scheduled: state.post.currentPost.scheduled,
          scheduledDate: state.post.currentPost.scheduledDate,
          audience: state.post.currentPost.audience,
          replyRestriction: state.post.currentPost.replyRestriction,
          token: state.user.token,
        };
        dispatch(createPost(body));
      } else {


        let body = {
          content: state.post.currentPost.content,
          author: state.post.currentPost.author,
          replies: [],
          scheduled: state.post.currentPost.scheduled,
          scheduledDate: state.post.currentPost.scheduledDate,
          audience: state.post.currentPost.audience,
          replyRestriction: state.post.currentPost.replyRestriction,
          token: state.user.token,
          images: [],
          poll: undefined,
          imagesFiles: state.post.currentPostImages
        };
        dispatch(createPostWithMedia(body))
      }

      // if(imageSelectorRef && imageSelectorRef.current){
      //   imageSelectorRef.current.value=''
      // }

    }
  };

  
  const generateButtonClass = (): string => {
    if (state.post.currentPost) {
      let content: string = state.post.currentPost.content;
      return content !== "" ||
        state.post.currentPostImages.length > 0 ||
        (state.post.currentPost && state.post.currentPost.images.length >= 1) ||
        (state.post.currentPost && state.post.currentPost.poll !== undefined)
        ? "feed-post-creator-post-button post-active"
        : "feed-post-creator-post-button";
    }
    return "feed-post-creator-post-button";
  };

  const activateButton = (): boolean => {
    if (state.post.currentPost) {
      let content: string = state.post.currentPost.content;
      return !(
        content !== "" ||
        state.post.currentPostImages.length > 0 ||
        (state.post.currentPost && state.post.currentPost.images.length >= 1) ||
        (state.post.currentPost && state.post.currentPost.poll !== undefined)
      );
    }
    return false;
  };

  return (
    <div className="feed-post-creartor" onClick={activate}>
      <Link to={""}>
      <img className="feed-post-creator-pfp" src={state.user.loggedIn && state.user.loggedIn.profilePicture ?
        state.user.loggedIn.profilePicture.imageURL :defaultProfile} alt="users" />
      </Link>
      <div className="feed-post-creator-right">
        {state.post.currentPost ? <FeedPostAudienceDropDown /> : <></>}
        <CreatePostTextArea location="post" />
        {((state.post.currentPostImages.length > 0) || (state.post.currentPost && state.post.currentPost.images.length > 0)) &&
          <FeedPostCreatorImages />}
        {state.post.currentPost && state.post.currentPost.poll && <FeedPostCreatorPoll />}
        {state.post.currentPost  ? <FeedPostReplyRestrictionDropDown /> : <></>}
        <div
          className={
            state.post.currentPost 
              ? "feed-post-creator-botton-icons icons-border"
              : "feed-post-creator-botton-icons"
          }
        >
          <div className="feed-post-creator-botton-icons-left">
          <CreatePostButtonCluster location="post"/>
          </div>
          <div className="feed-post-creator-submit-cluster">
            {state.post.currentPost && (state.post.currentPost.content) !== "" ? (
              <div className="feed-post-creator-submit-cluster-left">
                <FeedPostCreatorProgress
                  percent={(state.post.currentPost ? state.post.currentPost.content.length/255 : 0) * 100}
                />
                <span className="feed-post-creator-submit-cluster-divider"></span>
                <div className="feed-post-creator-submit-cluster-add">+</div>
              </div>
            ) : (
              <></>
            )}
            <button
              className={generateButtonClass()}
              disabled={activateButton()}
              onClick={submitPost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      {displayEmoji ? <EmojiDropDown /> : <></>}
    </div>
  );
};
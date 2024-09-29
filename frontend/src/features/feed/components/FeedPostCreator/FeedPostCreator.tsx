import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import defaultProfile from "../../../../assets/Generic-Profile.jpg";
import MediaSVG from "../../../../components/SVGs/MediaSVG";
import GifSVG from "../../../../components/SVGs/GifSVG";
import PollSVG from "../../../../components/SVGs/PollSVG";
import EmojiSVG from "../../../../components/SVGs/EmojiSVG";
import ScheduleSVG from "../../../../components/SVGs/ScheduleSVG";
import LocationSVG from "../../../../components/SVGs/LocationSVG";
import "./FeedPostCreator.css";
import { FeedPostCreatorProgress } from "../FeedPostCreatorProgress/FeedPostCreatorProgress";
import { useDispatch, useSelector } from "react-redux";
import { AppDisptach, RootState } from "../../../../redux/Store";
import {
  createPost,
  initializeCurrentPost,
  updateCurrentPost,
  updateCurrentPostImages,
  createPostWithMedia
} from "../../../../redux/Slices/PostSlice";
import { Post } from "../../../../utils/GlobalInterfaces";
import { FeedPostAudienceDropDown } from "../FeedPostAudienceDropDown/FeedPostAudienceDropDown";
import { FeedPostReplyRestrictionDropDown } from "../FeedPostReplyRestrictionDropDown/FeedPostReplyRestrictionDropDown";
import { FeedPostCreatorImages } from "../FeedPostCreatorImages/FeedPostCreatorImages";
import { updateDisplayGif } from "../../../../redux/Slices/ModalSlice";

export const FeedPostCreator: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch: AppDisptach = useDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const imageSelectorRef = useRef<HTMLInputElement>(null);

  const [active, setActive] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<string>("");

  const [overLoadedImages,setOverLoadedImages] = useState<boolean>(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const activate = () => {
    if (!active) {
      setActive(true);
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
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "25px";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
    dispatch(
      updateCurrentPost({
        name: "content",
        value: e.target.value,
      })
    );
  };

  const submitPost = () => {
    if (state.post.currentPost && state.user.loggedIn) {

      if(state.post.currentPostImages.length ===0){
        let body = {
          content: state.post.currentPost.content,
          author: state.post.currentPost.author,
          images: state.post.currentPost.images,
          replies: [],
          scheduled: state.post.currentPost.scheduled,
          scheduledDate: state.post.currentPost.scheduledDate,
          audience: state.post.currentPost.audience,
          replyRestriction: state.post.currentPost.replyRestriction,
          token: state.user.token,
        };
        dispatch(createPost(body));
      } else{
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
          imagesFiles : state.post.currentPostImages
        };
        dispatch(createPostWithMedia(body))
      }
      
    }
    setActive(false);
    setPostContent("")

    if (textAreaRef && textAreaRef.current?.focus) {
      textAreaRef.current.blur();
      textAreaRef.current.value = "";
    }
  };

  const handleGetImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageList = state.post.currentPostImages;
    setOverLoadedImages(false)

    if (imageSelectorRef.current && e.target.files) {
      if (e.target.files.length + imageList.length > 4) {
        console.log("Selected too many files");
        imageSelectorRef.current.value = "";
        setOverLoadedImages(true);
        return;
      } 
      if(imageList[0]?.type ==='image/gif'){
        console.log("only one gif and no other images allowed");
        imageSelectorRef.current.value = "";
        setOverLoadedImages(true)
        return;
      }

      let fileArr:File[] = [...imageList]
      for (let i=0; i< e.target.files.length ; i++ ) {
        let file = e.target.files.item(i);
        if(file?.type === 'image/gif' && imageList.length >1  || file?.type === 'image/gif' && e.target.files.length >1 ){
          console.log("only one gif and no other images are allowed");
          imageSelectorRef.current.value = "";
          setOverLoadedImages(true);
          return;
        }
        if (file) fileArr.push(file)
      }    
      dispatch(updateCurrentPostImages(fileArr))
    }
  }; 

  const determineFull =(): boolean =>{
    if(state.post.currentPostImages.length === 4){
      return true;
    } 
    if(state.post.currentPostImages[0]?.type === 'image/gif'){
      return true;
    }
    return false;
  }

  const diplayGif =()=>{
    dispatch(updateDisplayGif());
  }


  useEffect(() => {
    if (!state.post.currentPost) {
      setPostContent("");
    }
  }, [state.post.currentPost, postContent, activate]);

  return (
    <div className="feed-post-creartor" onClick={activate}>
      <Link to={""}>
        <img className="feed-post-creator-pfp" src={defaultProfile} alt="pfd" />
      </Link>
      <div className="feed-post-creator-right">
       { active ?  <FeedPostAudienceDropDown /> : <></> }
        <textarea
          className={
            active
              ? "feed-post-creator-input input-active"
              : "feed-post-creator-input"
          }
          placeholder="what is happening!"
          ref={textAreaRef}
          onChange={autoGrow}
          cols={50}
          maxLength={256}
        />
       { ((state.post.currentPostImages.length > 0) || (state.post.currentPost && state.post.currentPost.images.length > 0)) &&
        <FeedPostCreatorImages />}
        {active ? <FeedPostReplyRestrictionDropDown /> : <></> }
        <div
          className={
            active
              ? "feed-post-creator-botton-icons icons-border"
              : "feed-post-creator-botton-icons"
          }
        >
          <div className="feed-post-creator-botton-icons-left">
            <div className="feed-post-creator-icon-bg-media">
              <input className="feed-post-creator-file-update" onChange={handleGetImages} type="file" id="images" accept="image/*" multiple={true} 
              ref={imageSelectorRef} hidden disabled={determineFull()}/>
              <label  htmlFor="images" className={ determineFull() ? "feed-post-creator-icon-bg" : 'feed-post-creator-icon-bg icon-active'}>
              <MediaSVG height={20} width={20} color={ determineFull() ? "rgba(19,161,242,0.5)":"#1DA1F2"} /> 
              </label>
            </div>
            <div className={state.post.currentPostImages.length > 0 ? "feed-post-creator-icon-bg" : "feed-post-creator-icon-bg icon-active"} onClick={diplayGif}>
              <GifSVG height={20} width={20} color={state.post.currentPostImages.length ? "rgba(19,161,242,0.5)" :"#1DA1F2"} />
            </div>
            <div className={state.post.currentPostImages.length > 0 ? "feed-post-creator-icon-bg" : "feed-post-creator-icon-bg icon-active"}>
              <PollSVG height={20} width={20} color={state.post.currentPostImages.length ? "rgba(19,161,242,0.5)" :"#1DA1F2"} />
            </div>
            <div className="feed-post-creator-icon-bg">
              <EmojiSVG height={20} width={20} color={"#1DA1F2"} />
            </div>
            <div className="feed-post-creator-icon-bg">
              <ScheduleSVG height={20} width={20} color={"#1DA1F2"} />
            </div>
            <div className="feed-post-creator-icon-location">
              <LocationSVG
                height={20}
                width={20}
                color={"rgba(29,161,242, 0.5)"}
              />
            </div>
          </div>
          <div className="feed-post-creator-submit-cluster">
            {postContent !== "" ? (
              <div className="feed-post-creator-submit-cluster-left">
                <FeedPostCreatorProgress
                  percent={(postContent.length / 255) * 100}
                />
                <span className="feed-post-creator-submit-cluster-divider"></span>
                <div className="feed-post-creator-submit-cluster-add">+</div>
              </div>
            ) : (
              <></>
            )}
            <button
              className={
                postContent === "" && state.post.currentPostImages.length < 1 && (state.post.currentPost && state.post.currentPost.images.length <1)
                  ? "feed-post-creator-post-button"
                  : "feed-post-creator-post-button post-active"
              } 
              disabled={postContent === "" &&  state.post.currentPostImages.length < 1 && (state.post.currentPost && state.post.currentPost.images.length <1) }
              onClick={submitPost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

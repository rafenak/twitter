import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import defaultProfile from "../../../../assets/Generic-Profile.jpg";
import { ExpandMore } from "@mui/icons-material";
import GlobeSVG from "../../../../components/SVGs/GlobeSVG";
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
  initializeCurrentPost,
  updateCurrentPost,
} from "../../../../redux/Slices/PostSlice";
import { Post } from "../../../../utils/GlobalInterfaces";

export const FeedPostCreator: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch: AppDisptach = useDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [active, setActive] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<string>("");

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
        vallue: e.target.value,
      })
    );
  };

  return (
    <div className="feed-post-creartor" onClick={activate}>
      <Link to={""}>
        <img className="feed-post-creator-pfp" src={defaultProfile} alt="pfd" />
      </Link>
      <div className="feed-post-creator-right">
        <div
          className={
            active
              ? "feed-post-creator-audience"
              : "feed-post-creator-audience hide"
          }
        >
          Everyone
          <ExpandMore
            sx={{
              fontSize: "22px",
            }}
          />
        </div>
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
        <div
          className={
            active ? "feed-post-creator-reply" : "feed-post-creator-reply hide"
          }
        >
          <GlobeSVG height={14} width={14} color={"#1DA1F2"} />
          Everyone can Reply
        </div>
        <div
          className={
            active
              ? "feed-post-creator-botton-icons icons-border"
              : "feed-post-creator-botton-icons"
          }
        >
          <div className="feed-post-creator-botton-icons-left">
            <div className="feed-post-creator-icon-bg">
              <MediaSVG height={20} width={20} color={"#1DA1F2"} />
            </div>
            <div className="feed-post-creator-icon-bg">
              <GifSVG height={20} width={20} color={"#1DA1F2"} />
            </div>
            <div className="feed-post-creator-icon-bg">
              <PollSVG height={20} width={20} color={"#1DA1F2"} />
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
                postContent === ""
                  ? "feed-post-creator-post-button"
                  : "feed-post-creator-post-button post-active"
              }
              disabled={postContent === ""}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

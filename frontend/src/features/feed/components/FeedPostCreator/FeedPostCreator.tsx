import React, { useRef } from "react";
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

export const FeedPostCreator: React.FC = () => {
  return (
    <div className="feed-post-creartor">
      <Link to={""}>
        <img className="feed-post-creator-pfp" src={defaultProfile} alt="pfd" />
      </Link>
      <div className="feed-post-creator-right">
        <div className="feed-post-creator-audience">
          Everyone
          <ExpandMore
            sx={{
              fontSize: "22px",
            }}
          />
        </div>
        <textarea
          className="feed-post-creator-input"
          placeholder="what is happening!"
        />
        <div className="feed-post-creator-reply">
          <GlobeSVG height={14} width={14} color={"#1DA1F2"} />
          Everyone can Reply
        </div>
        <div className="feed-post-creator-botton-icons">
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
          <div className="feed-post-creator-icon-bg">
            <LocationSVG height={20} width={20} color={'rgba(29,161,242, 0.5)'} />
          </div>
        </div>
        <button className="feed-post-creator-post-button">Post</button>
      </div>
    </div>
  );
};

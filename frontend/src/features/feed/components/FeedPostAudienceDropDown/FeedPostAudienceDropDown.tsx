import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDisptach, RootState } from "../../../../redux/Store";
import "./FeedPostAudienceDropDown.css";
import { Check, ExpandMore } from "@mui/icons-material";
import GlobeSVG from "../../../../components/SVGs/GlobeSVG";
import CircleSVG from "../../../../components/SVGs/CircleSVG";
import { updateCurrentPost } from "../../../../redux/Slices/PostSlice";

export const FeedPostAudienceDropDown: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch: AppDisptach = useDispatch();

  const [active, setActive] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>("Everyone");

  const handleClick = () =>{
    setActive(!active);
  }

  const handleChangeSelection = (e:React.MouseEvent<HTMLDivElement>)=>{
    setSelection(e.currentTarget.id)
    dispatch(updateCurrentPost({
      name: "audience",
      value: e.currentTarget.id.toUpperCase()
    }))

    dispatch(updateCurrentPost({
      name: "replyRestriction",
      value: e.currentTarget.id.toUpperCase()
    }))
  }

  return (
    <div
      className={
        selection === "Everyone"
          ? "feed-post-creator-audience everyone"
          : "feed-post-creator-audience cirlce"
      }
      onClick={handleClick}
    >
      {selection}
      <ExpandMore
        sx={{
          fontSize: "22px",
        }}
      />
      <div
        className="feed-post-creator-audience-dropdown"
        style={{
          display: active ? "block" : "none",
        }}
      >
        <h2 className="feed-post-creator-audience-dropdown-title">
          Choose audience
        </h2>
        <div
          id="Everyone"
          className="feed-post-creator-audience-dropdown-choice"
          onClick={handleChangeSelection}
        >
          <div className="feed-post-creator-audience-dropdown-choice-left">
            <div className="feed-post-creator-audience-dropdown-choice-everyone-bg">
              <GlobeSVG width={20} height={20} color={'#FFF'}/>           
            </div>
            <p className="feed-post-creator-audience-dropdown-choice-text">Everyone</p>
          </div>
          {
            selection === 'Everyone' ? <Check sx={{
              color : '#1DA1f2',
              fontSize : '18px'
            }} />: <></>
          }
        </div>
        <div
          id="Circle"
          className="feed-post-creator-audience-dropdown-choice"
          onClick={handleChangeSelection}
        >
          <div className="feed-post-creator-audience-dropdown-choice-left">
            <div className="feed-post-creator-audience-dropdown-choice-circle-bg">
              <CircleSVG width={20} height={20} color={'#FFF'}/>
              </div>
              <div className="feed-post-creator-audience-dropdown-choice-circle-group">
                <p className="feed-post-creator-audience-dropdown-choice-text">Circle</p>
              <div className="feed-post-creator-audience-dropdown-choice-circle-info">
                  <p className="feed-post-creator-audience-dropdown-choice-info-amount">0</p>
                  <p className="feed-post-creator-audience-dropdown-choice-info-people">People</p>
                  <p className="feed-post-creator-audience-dropdown-choice-info-edit">Edit</p>
              </div>
            </div>
          </div>
          {
            selection === 'Circle' ? <Check sx={{
              color : '#1DA1f2',
              fontSize : '18px'
            }} />: <></>
          }
        </div> 
      </div>
    </div>
  );
};

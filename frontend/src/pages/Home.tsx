import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RootState, AppDisptach } from "../redux/Store";
import { getUserByToken, setToken } from "../redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import './Home.css'
import { Navigation } from "../components/Navigation/Navigation";
import { Feed } from "../features/feed/components/Feed/Feed";
import { FeedPostCreatorImageEditImageModal } from "../features/feed/components/FeedPostCreatorImageEditImageModal/FeedPostCreatorImageEditImageModal";
import { FeedPostCreatorTagPeopleModal } from "../features/feed/components/FeedPostCreatorTagPeopleModal/FeedPostCreatorTagPeopleModal";
import { FeedPosterGifCreatorModal } from "../features/feed/components/FeedPostGifCreatorModal/FeedPostGifCreatorModal";
import { SchedulePostModal } from "../features/schedulepost/components/SchedulePostModal/SchedulePostModal";
import { EmojiDropDown } from "../components/EmojiDropDown/EmojiDropDown";
import { updateDisplayEmojis } from "../redux/Slices/ModalSlice";

export const Home: React.FC = () => {
  const state = useSelector((state: RootState) => state.user);
  const displayEditImageModal  = useSelector((state: RootState) => state.modal.displayEditPostImage);
  const displayTagPeopleModal  = useSelector((state: RootState) => state.modal.displayTagPeople);
  const displayGifModal = useSelector((state: RootState) => state.modal.displayGif);
  const displayScheduleModal = useSelector((state:RootState) => state.modal.displaySchedule);
  const displayEmoji = useSelector((state:RootState) => state.modal.displayEmojis);

  const dispatch: AppDisptach = useDispatch();
  const [jwt, setJwt, removeJwt] = useLocalStorage("token", "");
  const navigate = useNavigate();

  useEffect(() => { 
    if (jwt !== "" && state.token !== "") {
      dispatch(getUserByToken(state.token));
    } else if (jwt === "" && state.token !== "") {
      setJwt(state.token);
    } else if (jwt !== "" && state.token === "") {
      dispatch(setToken(jwt)); 
    } else {
      navigate("/");
    }
  }, [state.token]);

  const closedOpenedModals = (e:React.MouseEvent) =>{
    let element:any = e.currentTarget
    let className=element.firstChild.getAttribute('class');

    if(displayEmoji && className !=='emoji-drop-down') {
      dispatch(updateDisplayEmojis())
    }

  }
  return (
    <div className="home" onClick={closedOpenedModals}>
      {displayEditImageModal && <FeedPostCreatorImageEditImageModal />}
      {displayTagPeopleModal && <FeedPostCreatorTagPeopleModal />}
      {displayGifModal && <FeedPosterGifCreatorModal />}
      {displayScheduleModal && <SchedulePostModal />}
      {displayEmoji && <EmojiDropDown />}
      <div className="home-layout">
        <div className="home-navigation-section">
          <Navigation />
        </div>
        <div className="home-content-section">
          <Feed />
        </div>
        <div className="home-info-section"></div>
      </div>
    </div>
  );
};

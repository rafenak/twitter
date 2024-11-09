import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDisptach } from "../redux/Store";
import { Feed } from "../features/feed/components/Feed/Feed";
import { FeedPostCreatorImageEditImageModal } from "../features/feed/components/FeedPostCreatorImageEditImageModal/FeedPostCreatorImageEditImageModal";
import { FeedPostCreatorTagPeopleModal } from "../features/feed/components/FeedPostCreatorTagPeopleModal/FeedPostCreatorTagPeopleModal";
import { FeedPosterGifCreatorModal } from "../features/feed/components/FeedPostGifCreatorModal/FeedPostGifCreatorModal";
import { SchedulePostModal } from "../features/schedulepost/components/SchedulePostModal/SchedulePostModal";
import { EmojiDropDown } from "../components/EmojiDropDown/EmojiDropDown";
import { updateDisplayEmojis } from "../redux/Slices/ModalSlice";
import './Home.css'

export const Home: React.FC = () => {
  const displayEditImageModal = useSelector((state: RootState) => state.modal.displayEditPostImage);
  const displayTagPeopleModal = useSelector((state: RootState) => state.modal.displayTagPeople);
  const displayGifModal = useSelector((state: RootState) => state.modal.displayGif);
  const displayScheduleModal = useSelector((state: RootState) => state.modal.displaySchedule);
  const displayEmoji = useSelector((state: RootState) => state.modal.displayEmojis);

  const dispatch: AppDisptach = useDispatch();
  const closedOpenedModals = (e: React.MouseEvent) => {
    if (displayEmoji) {
      dispatch(updateDisplayEmojis())
    }
  }
  
  return (
    <div className="home" onClick={closedOpenedModals}>
      {displayEditImageModal && <FeedPostCreatorImageEditImageModal />}
      {displayTagPeopleModal && <FeedPostCreatorTagPeopleModal />}
      {displayGifModal && <FeedPosterGifCreatorModal />}
      {displayScheduleModal && <SchedulePostModal />}
      {displayEmoji ? <EmojiDropDown /> : <></>}
      <Feed />
    </div>
  );
};
 
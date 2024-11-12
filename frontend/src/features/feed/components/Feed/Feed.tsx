import React, { useEffect,useState } from "react";
import "./Feed.css";
import { FeedTopBar } from "../FeedTopBar/FeedTopBar";
import { FeedPostCreator } from "../FeedPostCreator/FeedPostCreator";
import { useDispatch, useSelector } from "react-redux";
import { AppDisptach, RootState } from "../../../../redux/Store";
import { loadFeedPage } from "../../../../redux/Slices/FeedSlice";
import { Post } from "../../../post/components/Post/Post";
import { FeedPostCreatorImageEditImageModal } from "../FeedPostCreatorImageEditImageModal/FeedPostCreatorImageEditImageModal";
import { FeedPostCreatorTagPeopleModal } from "../FeedPostCreatorTagPeopleModal/FeedPostCreatorTagPeopleModal";
import { FeedPosterGifCreatorModal } from "../FeedPostGifCreatorModal/FeedPostGifCreatorModal";
import { SchedulePostModal } from "../../../schedulepost/components/SchedulePostModal/SchedulePostModal";
import { CreateReply } from "../../../post/components/CreateReply/CreateReply";

export const Feed: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);
  const feedState = useSelector((state: RootState) => state.feed);
  const displayEditImageModal = useSelector((state: RootState) => state.modal.displayEditPostImage);
  const displayTagPeopleModal = useSelector((state: RootState) => state.modal.displayTagPeople);
  const displayGifModal = useSelector((state: RootState) => state.modal.displayGif);
  const displayScheduleModal = useSelector((state: RootState) => state.modal.displaySchedule);
  //const displayEmoji = useSelector((state: RootState) => state.modal.displayEmojis);
  const displayCreateReply = useSelector((state: RootState) => state.modal.displayCreateReply);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  // const [sessionStart,setSessionStart]= useState<Date>(()=> {return new Date()})
  const [sessionStart, setSessionStart] = useState<Date>(() => {
    const now = new Date();
    now.setHours(now.getHours() + 10); // Adds 1 hour to the current time
    return now;
  });

  const dispatch: AppDisptach = useDispatch(); 

  useEffect(() => {
    if (userState.loggedIn && userState.token) {
      dispatch(
        loadFeedPage( {
          token: userState.token,
          userId: userState.loggedIn.userId,
          page:currentPageNumber,
          sessionStart:sessionStart
        })
      );
    }
  }, [userState.loggedIn && userState.token]);

  return (
    <div className="feed">
      <FeedTopBar />

      {displayEditImageModal && <FeedPostCreatorImageEditImageModal />}
      {displayTagPeopleModal && <FeedPostCreatorTagPeopleModal />}
      {displayGifModal && <FeedPosterGifCreatorModal />}
      {displayScheduleModal && <SchedulePostModal />}
      {displayCreateReply && <CreateReply /> }

      <FeedPostCreator />
      {!feedState.loading && (
        <div className="feed-post">
          {feedState.posts.map((post) => (
            <Post feedPost={post} key={post.post.postId}></Post>
          ))}
        </div>
      )}
    </div>
  );
};

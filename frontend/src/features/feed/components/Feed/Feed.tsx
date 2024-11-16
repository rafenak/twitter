import React, { useEffect, useRef, useState } from "react";
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
  const displayCreateReply = useSelector((state: RootState) => state.modal.displayCreateReply);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [sessionStart] = useState<Date>(() => {
    const now = new Date();
    now.setHours(now.getHours() + 10); // Adds 10 hours to the current time
    return now;
  });

  const dispatch: AppDisptach = useDispatch();
  const hiddenDiv = useRef<HTMLDivElement>(null);

  const feedNextPost = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !feedState.loading && userState.loggedIn && userState.token) {
        setCurrentPageNumber((prevPage) => {
          const nextPage = prevPage + 1;
          dispatch(
            loadFeedPage({
              token: userState.token,
              userId: 5,
              page: nextPage,
              sessionStart: sessionStart,
            })
          );
          console.log("Page Number", nextPage);
          return nextPage;
        });
      }
    });
  };

  useEffect(() => {
    if (userState.loggedIn && userState.token) {
      dispatch(
        loadFeedPage({
          token: userState.token,
          userId: userState.loggedIn.userId,
          page: 0,
          sessionStart: sessionStart,
        })
      );
    }

    const observer = new IntersectionObserver(feedNextPost, {
      root: null,
      threshold: 1.0,
    });

    if (hiddenDiv.current) {
      observer.observe(hiddenDiv.current);
    }

    return () => {
      if (hiddenDiv.current) {
        observer.unobserve(hiddenDiv.current);
      }
    };
  }, [userState.loggedIn, userState.token]);

  return (
    <div className="feed">
      <FeedTopBar />

      {displayEditImageModal && <FeedPostCreatorImageEditImageModal />}
      {displayTagPeopleModal && <FeedPostCreatorTagPeopleModal />}
      {displayGifModal && <FeedPosterGifCreatorModal />}
      {displayScheduleModal && <SchedulePostModal />}
      {displayCreateReply && <CreateReply />}

      <FeedPostCreator />
      {feedState.posts.length > 0 && (
        <div className="feed-post">
          {feedState.posts.map((post) => (
            <Post feedPost={post} key={post.post.postId}></Post>
          ))}
        </div>
      )}
      <div id="autoload" ref={hiddenDiv} hidden={feedState.posts.length === 0}>
        {" "}
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState } from "react";
import "./Feed.css";
import { FeedTopBar } from "../FeedTopBar/FeedTopBar";
import { FeedPostCreator } from "../FeedPostCreator/FeedPostCreator";
import { useDispatch, useSelector } from "react-redux";
import { AppDisptach, RootState } from "../../../../redux/Store";
import { fetchFeedNextPage, loadFeedPage } from "../../../../redux/Slices/FeedSlice";
import { Post } from "../../../post/components/Post/Post";
import { FeedPostCreatorImageEditImageModal } from "../FeedPostCreatorImageEditImageModal/FeedPostCreatorImageEditImageModal";
import { FeedPostCreatorTagPeopleModal } from "../FeedPostCreatorTagPeopleModal/FeedPostCreatorTagPeopleModal";
import { FeedPosterGifCreatorModal } from "../FeedPostGifCreatorModal/FeedPostGifCreatorModal";
import { SchedulePostModal } from "../../../schedulepost/components/SchedulePostModal/SchedulePostModal";
import { CreateReply } from "../../../post/components/CreateReply/CreateReply";

export const Feed: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);
  const feedState = useSelector((state: RootState) => state.feed);
  const postState = useSelector((state: RootState) => state.post);
  const displayEditImageModal = useSelector((state: RootState) => state.modal.displayEditPostImage);
  const displayTagPeopleModal = useSelector((state: RootState) => state.modal.displayTagPeople);
  const displayGifModal = useSelector((state: RootState) => state.modal.displayGif);
  const displayScheduleModal = useSelector((state: RootState) => state.modal.displaySchedule);
  const displayCreateReply = useSelector((state: RootState) => state.modal.displayCreateReply);
  //const currentPageNumber = useSelector((state: RootState) => state.feed.currentPageNumber);
  //const sessionStart = useSelector((state: RootState) => state.feed.sessionStart);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [sessionStart, setSessionStart] = useState<Date>(() => {
    const now = new Date();
    now.setHours(now.getHours() + 10); // Adds 10 hours to the current time
    return now;
  });

  const dispatch: AppDisptach = useDispatch();
  const hiddenDiv = useRef<HTMLDivElement>(null);

  // const feedNextPost = (entries: IntersectionObserverEntry[]) => {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting && !feedState.loading && userState.loggedIn && userState.token) {
  //       setCurrentPageNumber((prevPage) => {
  //         const nextPage = prevPage + 1;
  //         dispatch(
  //           loadFeedPage({
  //             token: userState.token,
  //             userId: 5,
  //             page: nextPage,
  //             sessionStart: sessionStart,
  //           })
  //         );
  //         console.log("Page Number", nextPage);
  //         return nextPage;
  //       });
  //     }
  //   });
  // };

  const feedNextPost = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && userState.loggedIn && userState.token) {
        // Safeguard: Check if `userId` exists
        const userId = userState.loggedIn?.userId;

        if (!userId) {
          console.error('User ID is undefined');
          return;
        }

        const currentDate = new Date();
        const newDate = new Date(currentDate.setHours(currentDate.getHours() + 10));

        setCurrentPageNumber((prevPageNumber) => {
          const nextPageNumber = prevPageNumber + 1;

          dispatch(
            fetchFeedNextPage({
              token: userState.token,
              userId: userId,
              page: nextPageNumber,
              sessionStart: sessionStart ? sessionStart : newDate,
            })
          );

          return nextPageNumber;
        });
      }
    });
  };


  useEffect(() => {
    if (userState.loggedIn && userState.token && postState.loading === false) {
      dispatch(
        loadFeedPage({
          token: userState.token,
          userId: userState.loggedIn.userId,
          // page: 0,
          // sessionStart: newDate,
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
  }, [userState.loggedIn, userState.token, postState.loading]);

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

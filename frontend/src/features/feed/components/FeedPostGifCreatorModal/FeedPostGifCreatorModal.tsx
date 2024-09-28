import React, { useEffect } from "react";
import { BottomLessModal } from "../../../../components/BottomLessModal/BottomLessModal";
import { FeedPostGifCreatorModalTop } from "../FeedPostGifCreatorModalTop/FeedPostGifCreatorModalTop";
import { useDispatch, useSelector } from "react-redux";
import { AppDisptach, RootState } from "../../../../redux/Store";
import { fetchGifCategories, updatePerview, updateSearchTerms } from "../../../../redux/Slices/GifSlice";
import { FeedPostGifCreatorModalPerview } from "../FeedPostGifCreatorModalPerview/FeedPostGifCreatorModalPerview";
import { FeedPostGifCreatorModalDisplay } from "../FeedPostGifCreatorModalDisplay/FeedPostGifCreatorModalDisplay";

export const FeedPosterGifCreatorModal: React.FC = () => {
  const state = useSelector((state: RootState) => state.gif);
  const dispatch: AppDisptach = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(updateSearchTerms(""));
    };
  }, []);
 
  useEffect(() => {
    return () => {
      if (state.gifCategories.length < 1) {
        dispatch(fetchGifCategories());
      }
      console.log(state.searchTerm);
      if (state.searchTerm) {
        dispatch(updatePerview(false));
      } else {
        dispatch(updatePerview(true));
      }
    };
  }, [state.searchTerm]);

  return (
    <BottomLessModal
      topBar={<FeedPostGifCreatorModalTop />}
      content={state.perview || state.gifs.length=== 0 ? 
          <FeedPostGifCreatorModalPerview categories={state.gifCategories} />: 
          <FeedPostGifCreatorModalDisplay gifs={state.gifs} />}
    />
  ); 
};

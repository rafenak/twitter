import React, { useEffect } from "react";
import { BottomLessModal } from "../../../../components/BottomLessModal/BottomLessModal";
// import './FeedPosterGifCreatorModal.css'
import { FeedPosterGifCreatorModalTop } from "../FeedPosterGifCreatorModalTop/FeedPosterGifCreatorModalTop";
import { useDispatch, useSelector } from "react-redux";
import { AppDisptach, RootState } from "../../../../redux/Store";
import { fetchGifCategories, updatePerview, updateSerachTerm } from "../../../../redux/Slices/GifSlice";

export const FeedPosterGifCreatorModal: React.FC = () => {
  const state = useSelector((state: RootState) => state.gif);
  const dispatch: AppDisptach = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(updateSerachTerm(""));
    };
  }, []);

  useEffect(() => {
    return () => {

        if(state.gifCategories.length < 1){
            dispatch(fetchGifCategories())

        }
        if(state.searchTerm){
            dispatch(updatePerview(false));
        }
        else{
            dispatch(updatePerview(true));
        }
    };
  }, [state.searchTerm]);

  return (
    <BottomLessModal
      topBar={<FeedPosterGifCreatorModalTop />}
      content={<>content</>}
    />
  );
};

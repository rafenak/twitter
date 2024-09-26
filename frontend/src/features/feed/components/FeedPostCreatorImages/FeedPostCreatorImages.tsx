import React,{useState,useEffect, useMemo} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDisptach, RootState } from '../../../../redux/Store';
import TagPeopleSVG from '../../../../components/SVGs/TagPeopleSVG';
import ListSVG from '../../../../components/SVGs/ListSVG';
import './FeedPostCreatorImages.css'
import { createImageContainer } from '../../utils/FeedUtils';
import { updateDisplayEditPostImage, updateDisplayTagPeople } from '../../../../redux/Slices/ModalSlice';


export const FeedPostCreatorImages:React.FC = () => {

    const state = useSelector((state: RootState) => state.post);

    const dispatch:AppDisptach  = useDispatch();

    const imageContainer = 
    useMemo(()=> createImageContainer(state.currentPostImages),[state.currentPostImages])

    const toggleTagPeople = () =>{
        dispatch(updateDisplayTagPeople())
    }

    const toggleEditImage = () =>{
        dispatch(updateDisplayEditPostImage())
    }
 
  return (
    <div className='feed-post-creator-images'>
        {imageContainer}
        <div className='feed-post-creator-images-options'>
            <p className='feed-post-creator-images-option' onClick={toggleTagPeople}>
                <TagPeopleSVG height={16} width={16} color={'#536471'}/>
                Tag People
            </p> 
            <p className='feed-post-creator-images-option'  onClick={toggleEditImage}>
                <ListSVG height={16} width={16} color={'#536471'} />
                Add Description
            </p>
        </div>
    </div>
  )
}

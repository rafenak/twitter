import React,{useState,useEffect, useMemo} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDisptach, RootState } from '../../../../redux/Store';
import TagPeopleSVG from '../../../../components/SVGs/TagPeopleSVG';
import ListSVG from '../../../../components/SVGs/ListSVG';
import './FeedPostCreatorImages.css'
import { createImageContainer, dispalyTagPeople } from '../../utils/FeedUtils';
import { updateDisplayEditPostImage, updateDisplayTagPeople } from '../../../../redux/Slices/ModalSlice';
import { FeedPostCreatorImage } from '../FeedPostCreatorImage/FeedPostCreatorImage';


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
        {state .currentPost?.images.length ===0 ? imageContainer : 
        <div className='feed-post-creator-images-container container-odd'> 
        <FeedPostCreatorImage image={state.currentPost?.images[0].imageUrl || ''} 
                name={state.currentPost?.images[0].imageName || ''} type={'gif'} />
        </div>}
        <div className='feed-post-creator-images-options'>
            {dispalyTagPeople(state,toggleTagPeople)}
            <p className='feed-post-creator-images-option'  onClick={toggleEditImage}>
                <ListSVG height={16} width={16} color={'#536471'} />
                Add Description
            </p>
        </div>
    </div>
  )
}

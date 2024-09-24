import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/Store';
import TagPeopleSVG from '../../../../components/SVGs/TagPeopleSVG';
import ListSVG from '../../../../components/SVGs/ListSVG';
import './FeedPostCreatorImages.css'
import { createImageContainer } from '../../utils/FeedUtils';


export const FeedPostCreatorImages:React.FC = () => {

    const state = useSelector((state: RootState) => state.post);
  return (
    <div className='feed-post-creator-images'>
        {/* generate the image container */}
        {createImageContainer(state.currentPostImages)}
        <div className='feed-post-creator-images-options'>
            <p className='feed-post-creator-images-option'>
                <TagPeopleSVG height={16} width={16} color={'#536471'} />
                Tag People
            </p> 
            <p className='feed-post-creator-images-option'>
                <ListSVG height={16} width={16} color={'#536471'} />
                Add Description
            </p>
        </div>
    </div>
  )
}

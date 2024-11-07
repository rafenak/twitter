import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDisptach, RootState } from '../../../../redux/Store';
import TagPeopleSVG from '../../../../components/SVGs/TagPeopleSVG';
import ListSVG from '../../../../components/SVGs/ListSVG';
import './FeedPostCreatorImages.css'
import { createImageContainer, dispalyTagPeople } from '../../utils/FeedUtils';
import { updateDisplayEditPostImage, updateDisplayTagPeople } from '../../../../redux/Slices/ModalSlice';
import { FeedPostCreatorImage } from '../FeedPostCreatorImage/FeedPostCreatorImage';

export const FeedPostCreatorImages: React.FC = () => {
    const state = useSelector((state: RootState) => state.post);
    const dispatch: AppDisptach = useDispatch();

    // Create containers for post and reply images only when they are empty
    const postImageContainer = useMemo(
        () => createImageContainer(state.currentPostImages), 
        [state.currentPostImages]
    );

    const replyImageContainer = useMemo(
        () => createImageContainer(state.currentReplyImages), 
        [state.currentReplyImages]
    );

    const toggleTagPeople = () => {
        dispatch(updateDisplayTagPeople())
    }

    const toggleEditImage = () => {
        dispatch(updateDisplayEditPostImage())
    }

    return (
        <div className='feed-post-creator-images'>
            {/* Display either postImageContainer or replyImageContainer if they have no images */}
            {state.currentPost && (state.currentPost.images?.length === 0)
                ? postImageContainer
                : state.currentReply && (state.currentReply.images?.length === 0)
                ? replyImageContainer
                : null
            }

            {/* Display FeedPostCreatorImage component only if there are images in currentPost or currentReply */}
            {((state.currentPost?.images || []).length > 0 || (state.currentReply?.images || []).length > 0) && (
    <div className='feed-post-creator-images-container container-odd'>
        <FeedPostCreatorImage
            image={
                (state.currentPost?.images || [])[0]?.imageUrl ||
                (state.currentReply?.images || [])[0]?.imageUrl || ''
            }
            name={
                (state.currentPost?.images || [])[0]?.imageName ||
                (state.currentReply?.images || [])[0]?.imageName || ''
            }
            type={'gif'} 
        />
    </div>
)}

            {/* Display options section with Tag People and Add Description */}
            <div className='feed-post-creator-images-options'>
                {dispalyTagPeople(state, toggleTagPeople)}
                <p className='feed-post-creator-images-option' onClick={toggleEditImage}>
                    <ListSVG height={16} width={16} color={'#536471'} />
                    Add Description
                </p>
            </div>
        </div>
    )
}

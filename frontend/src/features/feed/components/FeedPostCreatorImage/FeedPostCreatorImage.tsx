import React from 'react'
import './FeedPostCreatorImage.css'
import { Close } from '@mui/icons-material'
import { AppDisptach, RootState } from '../../../../redux/Store'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentPost, updateCurrentPostImages } from '../../../../redux/Slices/PostSlice'
import { updateDisplayEditPostImage } from '../../../../redux/Slices/ModalSlice'

interface FeedPostCreatorImageProps{
image:string
name:string
type:string
}

export const FeedPostCreatorImage:React.FC<FeedPostCreatorImageProps> = ({image,name,type}) => {

    const state = useSelector((state: RootState) => state.post);
    const dispatch:AppDisptach = useDispatch();

    const removeImage = (e:React.MouseEvent<HTMLDivElement>) =>{
        e.stopPropagation();
        if((state.currentPost && state.currentPost.images.length > 0) || (state.currentReply && state.currentReply.images.length > 0)){
          dispatch(updateCurrentPost({
            name:"images",
            value : []
          }))
        }else{
         // let filteredImages:File[] = state.currentPostImages.filter((img:any) => img.name !== name); // Filter out the selected image

          let imageArrayCopy:File[] = state.currentPostImages;
          imageArrayCopy = imageArrayCopy.filter((img:any) => img.name !== name); // Filter out the selected image
          dispatch(updateCurrentPostImages({
            files:imageArrayCopy,
            location:'post'
          }))
        }      
    }

    const editImage = () =>{
        dispatch(updateDisplayEditPostImage())
    }


  return (
    <div className='feed-post-creator-image' style={{ backgroundImage: `url(${image})`}} onClick={editImage}>
         <div className='feed-post-creator-image-clear' onClick={removeImage}>
            <Close sx={{
                fontSize: "18px",
                color:"white"
            }} />
         </div>
         {
            type === 'image/gif' || 'gif' ? <></> :
            <div className='feed-post-creator-image-edit' onClick={editImage}>
              Edit
            </div>
          }
    </div>
  )
}

import React from 'react'
import './FeedPostCreatorImage.css'
import { Close } from '@mui/icons-material'
import { AppDisptach, RootState } from '../../../../redux/Store'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentPostImages } from '../../../../redux/Slices/PostSlice'
import { updateDisplayEditPostImage } from '../../../../redux/Slices/ModalSlice'

interface FeedPostCreatorImageProps{
image:string
name:string
}

export const FeedPostCreatorImage:React.FC<FeedPostCreatorImageProps> = ({image,name}) => {

    const state = useSelector((state: RootState) => state.post);
    const dispatch:AppDisptach = useDispatch();

    const removeImage = (e:React.MouseEvent<HTMLDivElement>) =>{

        e.stopPropagation();
       // let imageArrayCopy:string[] = JSON.parse(JSON.stringify(state.currentPostImages))
        //let imageArrayCopy = state.currentPostImages.slice();
        let imageArrayCopy:File[] = state.currentPostImages;
        imageArrayCopy = imageArrayCopy.filter((img) => img.name !== name); // Filter out the selected image
        //imageArrayCopy.splice(imageArrayCopy.indexOf(image),1)
        dispatch(updateCurrentPostImages(imageArrayCopy))
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
         <div className='feed-post-creator-image-edit' onClick={editImage}>
            Edit
         </div>
    </div>
  )
}

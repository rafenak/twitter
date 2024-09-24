import React from 'react'
import './FeedPostCreatorImage.css'
import { Close } from '@mui/icons-material'
import { AppDisptach, RootState } from '../../../../redux/Store'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentPostImages } from '../../../../redux/Slices/PostSlice'

interface FeedPostCreatorImageProps{
image:string
}

export const FeedPostCreatorImage:React.FC<FeedPostCreatorImageProps> = ({image}) => {

    const state = useSelector((state: RootState) => state.post);
    const dispatch:AppDisptach = useDispatch();

    const removeImage = () =>{
       // let imageArrayCopy:string[] = JSON.parse(JSON.stringify(state.currentPostImages))
        let imageArrayCopy = state.currentPostImages.slice();
        imageArrayCopy = imageArrayCopy.filter((img) => img !== image); // Filter out the selected image
        //imageArrayCopy.splice(imageArrayCopy.indexOf(image),1)
        dispatch(updateCurrentPostImages(imageArrayCopy))
    }
    
  return (
    <div className='feed-post-creator-image' style={{ backgroundImage: `url(${image})`}}>
         <div className='feed-post-creator-image-clear' onClick={removeImage}>
            <Close sx={{
                fontSize: "18px",
                color:"white"
            }} />
         </div>
         <div className='feed-post-creator-image-edit' onClick={()=>{ }}>
            Edit
         </div>
    </div>
  )
}

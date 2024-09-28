import React from 'react'
import { FeedPostFrozenGif } from '../FeedPostFrozenGif/FeedPostFrozenGif'
import { TenorCategories } from '../../../../utils/GlobalInterfaces'
import './FeedPostGifCreatorModalPerview.css'


interface FeedPostGifCreatorModalPerviewProps{
    categories: TenorCategories[]
}


export const FeedPostGifCreatorModalPerview:React.FC<FeedPostGifCreatorModalPerviewProps> = ({
    categories
}) => {
  return (
    <div className='feed-post-creator-gif-modal-preview'>
        {categories.map((gif)=> <FeedPostFrozenGif  image={gif.image} text={gif.searchterm} key={gif.searchterm}/> )}
    </div>
  )
}

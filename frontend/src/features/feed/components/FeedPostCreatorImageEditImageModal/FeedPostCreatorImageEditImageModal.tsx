import React from 'react'
import { Modal } from '../../../../components/Modal/Modal'
import { FeedPostCreatorImageEditImageModalTop } from '../FeedPostCreatorImageEditImageModalTop/FeedPostCreatorImageEditImageModalTop'

export const FeedPostCreatorImageEditImageModal:React.FC = () => {
  return (
    <Modal topContent={<FeedPostCreatorImageEditImageModalTop />}
            content={<>Content</>}
            bottomContent={<>bottom</>}/>
  )
}

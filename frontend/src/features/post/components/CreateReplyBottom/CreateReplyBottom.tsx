import React from 'react'
import './CreateReplyBottom.css'
import { CreatePostButtonCluster } from '../CreatePostButtonCluster/CreatePostButtonCluster'

export const CreateReplyBottom:React.FC = () => {
  return (
    <div className='create-reply-bottom'>
        <CreatePostButtonCluster location='reply'/>
        <button className='create-reply-bottom-button'>Reply</button>
    </div>
  )
}

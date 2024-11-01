import React from 'react'
import { Post as IPost } from '../../../../utils/GlobalInterfaces'

interface PostProps{
    post:IPost
}

export const Post:React.FC<PostProps> = ({post}) => {
  return (
    <div className='post'>
        
    </div>
  )
}

import React, { useMemo } from 'react'
import { Post } from '../../../../utils/GlobalInterfaces'
import { createPostImageContainer } from '../../../feed/utils/FeedUtils';
import { Reply } from '../Reply/Reply';
import './PostContent.css'
//import { covertPostContentToElements } from '../../../../utils/EmojiUtils';

export const PostContent: React.FC<{ post: Post }> = ({ post }) => {
  const postImageContainer = useMemo(() => createPostImageContainer(post.images), [post.postId]);
  return (
    <div className='post-content'>
      <div className='post-content-test-wrapper'>
        {post.content}
        {/* {covertPostContentToElements(post.content, "post").map((element: JSX.Element, index) => {

          let elementWithKey = createElement(
            element.type,
            { ...element.props, key: index }
          )
          return elementWithKey;
        })
        } */}
      </div>
      {post.images.length > 0 && postImageContainer}
      {post.replyTo && (typeof post.replyTo !== 'number') && <Reply reply={post.replyTo} />}
    </div>
  )
}

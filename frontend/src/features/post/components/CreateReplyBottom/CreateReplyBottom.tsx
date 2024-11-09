import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDisptach, RootState } from '../../../../redux/Store'
import './CreateReplyBottom.css'
import { CreatePostButtonCluster } from '../CreatePostButtonCluster/CreatePostButtonCluster'
import { EmojiDropDown } from '../../../../components/EmojiDropDown/EmojiDropDown'
import { FeedPostCreatorProgress } from '../../../feed/components/FeedPostCreatorProgress/FeedPostCreatorProgress'
import { createReply } from '../../../../redux/Slices/PostSlice'
import { updateDisplayCreateReply } from '../../../../redux/Slices/ModalSlice'

export const CreateReplyBottom: React.FC = () => {
  const postState = useSelector((state: RootState) => state.post)
  const displayEmoji = useSelector((state: RootState) => state.modal.displayEmojis);
  const token =  useSelector((state: RootState) => state.user.token);
  const dispatch: AppDisptach = useDispatch();

  const generateButtonClass = (): string => {
    if (postState.currentReply) {
      let content: string = postState.currentReply.replyContent;
      return content !== "" ||
        postState.currentReplyImages.length > 0 ||
        (postState.currentReply.images.length >= 1) ||
        (postState.currentReply.poll !== undefined)
        ? "create-reply-bottom-button reply-button-active" 
        : "create-reply-bottom-button reply-button-inactive";
    }
    return "create-reply-bottom-button reply-button-inactive"; 
  };

  const activateButton = (): boolean => {
    if (postState.currentReply ) {
      let content: string = postState.currentReply.replyContent; 
      return !(
        content !== "" ||
        postState.currentReplyImages.length > 0 ||
        (postState.currentReply.images.length >= 1) ||
        (postState.currentReply.poll !== undefined)
      ); 
    }
    return false;
  };


  const postReply = (e:React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    if(postState.currentReply){
      dispatch(createReply({
        reply: postState.currentReply,
        token: token
      }));
      dispatch(updateDisplayCreateReply())
    }
    
  }


  return (
    <div className='create-reply-bottom'>
      <CreatePostButtonCluster location='reply' />
      <div className='create-reply-bottom-submit-group'>
        {postState.currentReply && postState.currentReply.replyContent !== '' &&  <FeedPostCreatorProgress percent={(postState.currentReply ? postState.currentReply.replyContent.length / 255 : 0) * 100}
        />}
        <button className={generateButtonClass()} disabled={activateButton()} onClick={postReply}>Reply</button>
      </div>
      {displayEmoji && postState.currentReply && <EmojiDropDown />}
    </div>
  )
}

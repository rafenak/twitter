import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AppDisptach, RootState } from "../../../../redux/Store";
import { updateCurrentPost } from '../../../../redux/Slices/PostSlice';
//import { covertPostContentToElements } from "../../../../utils/EmojiUtils";
import './CreatePostTextArea.css'


export const CreatePostTextArea:React.FC = ( ) => {

  const state = useSelector((state: RootState) => state);
  const dispatch: AppDisptach = useDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "25px";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
    dispatch(
      updateCurrentPost({
        name: "content",
        value: e.target.value,
      })
    );
  };

  const activate = (e:React.MouseEvent<HTMLDivElement>) =>{
      if (textAreaRef && textAreaRef.current) {
        textAreaRef.current.focus();
      }
  } 

  
  return (
    <div className='create-post-text-area' onClick={activate}>

        {/* {state.post.currentPost &&
          <div className="create-post-text-area-content">
            {covertPostContentToElements(state.post.currentPost.content,'creator')}
          </div>
        } */}
        <textarea 
          className={ 
            state.post.currentPost 
              ? "create-post-text-area-creator-input input-active"
              : "create-post-text-area-creator-input"
          }
          placeholder="what is happening?!"
          ref={textAreaRef}
          onChange={autoGrow}
          cols={50}
          maxLength={256}
          id={"post-text"}
          value={state.post.currentPost ? state.post.currentPost.content : ""}/>
    </div>
  )
}
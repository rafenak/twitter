import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AppDisptach, RootState } from "../../../../redux/Store";
import { updateCurrentPost } from '../../../../redux/Slices/PostSlice';
import { covertPostContentToElements } from "../../../../utils/EmojiUtils";
import './CreatePostTextArea.css'


interface CreatePostTextAreaProps {
  location: string,
  placeHolder: string
}


export const CreatePostTextArea: React.FC<CreatePostTextAreaProps> = ({ location, placeHolder }) => {

  const state = useSelector((state: RootState) => state);
  const dispatch: AppDisptach = useDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [content, setContent] = useState<string>("");

  const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "25px";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }

    if (location === "post") {
      dispatch(
        updateCurrentPost({
          name: "content",
          value: e.target.value,
        })
      );
    }

    if (location === "reply") {
      dispatch(
        updateCurrentPost({
          name: "replyContent",
          value: e.target.value,
        })
      );
    }

    setContent(e.target.value)

  };

  const activate = (e: React.MouseEvent<HTMLDivElement>) => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }

  const textContent = (): { elements: JSX.Element[], content: string } => {
    if (location === "post" && state.post.currentPost) {
      //return covertPostContentToElements(state.post.currentPost.content,'creator')
      return {
        elements: covertPostContentToElements(state.post.currentPost.content, 'creator'),
        content: state.post.currentPost.content
      };
    }
    else if (location === "reply" && state.post.currentReply) {
      //return covertPostContentToElements(state.post.currentReply.replyContent,'creator')
      return {
        elements: covertPostContentToElements(state.post.currentReply.replyContent, 'creator'),
        content: state.post.currentReply.replyContent
      };
    }
    else {
      return {
        elements: [],
        content: ""
      }
    }
  }


  return (
    <div className='create-post-text-area' onClick={activate}>

      {/* {content !=='' &&
          <div className="create-post-text-area-content">
            {textContent().elements}
          </div>
        } */}
      <textarea
        className={
          state.post.currentPost || state.post.currentReply
            ? "create-post-text-area-creator-input input-active"
            : "create-post-text-area-creator-input"
        }
        placeholder={placeHolder}
        ref={textAreaRef}
        onChange={autoGrow}
        cols={50}
        maxLength={256}
        id={"post-text"}
        value={textContent().content} />
    </div>
  )
}

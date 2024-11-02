import React from 'react'
import { useDispatch } from 'react-redux';
import { AppDisptach } from '../../../../redux/Store';
import { updateDisplayCreateReply } from '../../../../redux/Slices/ModalSlice';
import CloseIcon from '@mui/icons-material/Close'
import './CreateReplyTop.css'
import { setCurrentPost } from '../../../../redux/Slices/FeedSlice';

export const CreateReplyTop = () => {

    const dispatch: AppDisptach = useDispatch();

    const  toggleReply = () => {
        dispatch(setCurrentPost(undefined));
        dispatch(updateDisplayCreateReply());
    }

    return (
        <div className='create-reply-top'>
            <div className='create-reply-top-bottom-bg' onClick={toggleReply}>
                <CloseIcon sx={{
                    height: '20px',
                    width: '20px'
                }} />
            </div>
            <div className='create-reply-top-drafts-bg'>
                Drafts
            </div>
        </div>
    )
} 

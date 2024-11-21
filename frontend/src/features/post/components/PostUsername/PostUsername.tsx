import React, { useState } from 'react'
import './PostUsername.css'
import { useNavigate } from 'react-router-dom';
import { User } from '../../../../utils/GlobalInterfaces';
import { PostProfilePopup } from '../PostProfilePopup/PostProfilePopup';

interface PostUsernameProps {
    author: User

}

export const PostUsername: React.FC<PostUsernameProps> = ({ author }) => {
    const [displayModal, setDisplayModal] = useState<boolean>(false);
    const navigate = useNavigate();

    const navigateToProfile = () => {
        navigate(`/${author.username}`)
    }

    const openPopup = async () => {
        //Do the logic to fetch the authors following and followers list
        setDisplayModal(true);

    }

    const closePopup = () => {
        //Do the logic to fetch the authors following and followers list
        setDisplayModal(false);
    }


    return (
        <div className='post-username-container' onMouseOver={openPopup} onMouseLeave={closePopup}>
            <p className='post-username-text' onClick={navigateToProfile}>{author.nickname}</p>
            {displayModal && <PostProfilePopup author={author} followers={[]} following={[]} key={author.userId}/>}
        </div>
    )
}

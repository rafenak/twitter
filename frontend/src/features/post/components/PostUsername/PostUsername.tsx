import React, { useState, useCallback, useRef } from 'react'
import './PostUsername.css'
import { useNavigate } from 'react-router-dom';
import { User } from '../../../../utils/GlobalInterfaces';
import { PostProfilePopup } from '../PostProfilePopup/PostProfilePopup';
import { getFollowers, getFollowing } from '../../../../services/UserService';

interface PostUsernameProps {
    author: User
    repost: boolean

}

export const PostUsername: React.FC<PostUsernameProps> = ({ author, repost }) => {
    const [displayModal, setDisplayModal] = useState<boolean>(false);
    const [followers, setFollowers] = useState<User[]>([]);
    const [following, setFollowing] = useState<User[]>([]);
    const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
    const isFetching = useRef(false);
    const navigate = useNavigate();

    const navigateToProfile = () => {
        navigate(`/${author.username}`)
    }

    // const openPopup = async () => {
    //     //Do the logic to fetch the authors following and followers list
    //     try {
    //         const followers = getFollowers(author.username);
    //         const following = getFollowing(author.username);

    //         let followingAndFollowers = await Promise.all([followers, following]);
    //         setFollowers(followingAndFollowers[0]);
    //         setFollowing(followingAndFollowers[1]);

    //         setDisplayModal(true);

    //     } catch (e) {
    //         console.log("Error is calling",e); 
    //     }
    // }

    const openPopup = useCallback(async () => {
        // Open the modal regardless of fetching state
        setDisplayModal(true);

        // Prevent unnecessary re-fetches
        if (isDataFetched || isFetching.current) return;

        isFetching.current = true;

        try {
            const [fetchedFollowers, fetchedFollowing] = await Promise.all([
                getFollowers(author.username),
                getFollowing(author.username),
            ]);
            setFollowers(fetchedFollowers);
            setFollowing(fetchedFollowing);
            setIsDataFetched(true);
        } catch (e) {
            console.error("Error fetching data", e);
        } finally {
            isFetching.current = false;
        }
    }, [author.username, isDataFetched]);

    const closePopup = () => {
        setDisplayModal(false);
    }


    // return (
    //     <div className='post-username-container' onMouseOver={openPopup} onMouseLeave={closePopup}>
    //         {repost ? <span className='post-repost-user' onClick={navigateToProfile}>{author.nickname} reposted</span> :
    //             <p className='post-username-text' onClick={navigateToProfile}>{author.nickname}</p>
    //         }
    //         {displayModal && <PostProfilePopup author={author} followersList={following} followingList={followers} closeModal={closePopup} key={author.userId} />}
    //     </div>
    // )  

    return (
        <div className='post-username-container' onMouseOver={openPopup} onMouseLeave={closePopup}>
            {repost ? (
                <p className='post-repost-user' onClick={navigateToProfile}>
                    {author.nickname} reposted
                </p>
            ) : (
                <p className='post-username-text' onClick={navigateToProfile}>
                    {author.nickname}
                </p>
            )}
            {displayModal && (
                <PostProfilePopup
                    author={author}
                    followersList={following}
                    followingList={followers}
                    closeModal={closePopup}
                    key={author.userId}
                />
            )}
        </div>
    );

}

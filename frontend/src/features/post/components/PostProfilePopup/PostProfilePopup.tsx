import React, { useState } from 'react'
import { User } from '../../../../utils/GlobalInterfaces'
import pfp from '../../../../assets/Generic-Profile.webp'
import VerifiedIcon from '@mui/icons-material/Verified';
import './PostProfilePopup.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppDisptach, RootState } from '../../../../redux/Store';
import { followUser } from '../../../../redux/Slices/UserSlice';
import { checkFollowing } from '../../../../services/UserService';

interface PostProfilePopupProps {
    author: User,
    followingList: User[],
    followersList: User[],
    closeModal: () => void
}

export const PostProfilePopup: React.FC<PostProfilePopupProps> = ({ author, followersList, followingList, closeModal }) => {

    const currentUserFollowingList = useSelector((state: RootState) => state.user.following);
    const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
    const token = useSelector((state: RootState) => state.user.token);
    const dispatch: AppDisptach = useDispatch();
    const [following, setFollowing] = useState<boolean>(()=>{
        if(loggedIn){
            return checkFollowing(followersList,loggedIn);
        }
        return false;
    });
    const [followedBy, setFollowedBy] = useState<User[]>(() => {
        return followersList.filter((user) => currentUserFollowingList.some((u) => u.userId === user.userId && u.userId !== loggedIn?.userId));
    })
    const [followingBtnContent, setFollowingBtnContent] = useState<string>("Following");

    const followingBtnActive = () => {
        setFollowingBtnContent("Unfollow")
    }

    const followingBtnInActive = () => {
        setFollowingBtnContent("Following")
    }

    const mapFollowedByContent = (): string => {
        let content = "Followed by ";
        followedBy.splice(0, 3).forEach((user) => {
            content += `${user.nickname}, `;
        })
        if (followedBy.length > 3) {
            content += `and ${followedBy.length - 3} other you follow.`
        }
        else {
            content = content.slice(0, 2) + ".";
        }
        return content;
    }

    const follow = () => {
        dispatch(followUser({
            followee: author.username,
            token: token
        }))
    }

    return (
        <div className='post-profile-popup' onMouseLeave={closeModal}>
            <div className='post-profile-top'>
                <img className="post-profile-pfp"
                    src={author.profilePicture ? author.profilePicture?.imageURL : pfp}
                    alt={`${author.username}'s pfp`} />
                {following ? <button className='post-profile-following-btn'
                    onMouseOver={followingBtnActive}
                    onMouseLeave={followingBtnInActive}
                    onClick={follow}>
                        {followingBtnContent}
                </button>
                :<button  className='post-profile-follow-btn' onClick={follow}>Follow</button>  
            }
            </div>
            <div className='post-profile-nickname-bar'>
                <p className='post-profile-nickname'>{author.nickname}</p>
                {author.verifiedAccount && <VerifiedIcon sx={{
                    color: '#1DA1F2',
                    height: '20px',
                    width: '20px' 
                }} />}

                {author.organization && <img className='post-profile-oragnization'
                    src={author.organization.imageURL} alt={`${author.username}'s organization`} />}
            </div>
            <p className='post-profile-username'>@{author.username}</p>
            <p className='post-profile-bio'>{author.bio}</p>
            <div className='post-profile-following-followers'>
                <p className='post-profile-following-followers-text'>
                    <span className='post-profile-count'>{followingList.length}</span>
                    {" "}Following
                </p>
                <p className='post-profile-following-followers-text'>
                    <span className='post-profile-count'>{followersList.length}</span>
                    {" "}Followers
                </p>
            </div>
            {
                followedBy.length > 0 &&
            <div className='post-profile-followed-by-container'>
                <div className='post-profile-followed-by-pfps'>{/*how to stack up to three pfps*/}</div>
                <p className='post-profile-followed-by-users'>{mapFollowedByContent()}</p>
            </div>
            }
        </div>
    )
}
